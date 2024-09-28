/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import AddFavorite from '@/components/button/AddFavorite';
import PlayPauseButton from '@/components/button/PlayPauseButton';
import { ShareButton } from '@/components/button/ShareButton';
import Spinner from '@/components/custom/Loading';
import { useMusicPlayer } from '@/components/custom/MusicContextProvider';
import SongList from '@/components/custom/SongList';
import { BASE_URL, getPlayingSong } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { ArrowDownToLine } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ArtistData from '@/components/custom/ArtistData';

const SongQueue = ({ params }: { params: { songId: string } }) => {
  const { songId } = params;
  const { handleDownloadSong, togglePlayPause, isPlaying } = useMusicPlayer();
  const [singleSong, setSingleSong] = useState<Song | null>(null);

  useEffect(() => {
    const fetchPlayingSong = async () => {
      const res = await getPlayingSong(songId);
      setSingleSong(res);
    };

    fetchPlayingSong();
  }, [songId]);

  const artists = singleSong?.artists.primary
    .map((artist) => artist.name)
    .join(', ');

  const { data: songQueue, isLoading } = useQuery<Song[]>({
    queryKey: ['songQueue', artists],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/search/songs?query=${artists}&page=1&limit=50`
      );
      const json = await res.json();
      return json.data.results;
    },
    enabled: !!artists,
  });

  const removeDuplicates = (songs: Song[]) => {
    const uniqueSongs = new Map<string, Song>();
    songs.forEach((singleSong) => {
      if (!uniqueSongs.has(singleSong.name || singleSong.title)) {
        uniqueSongs.set(singleSong?.name || singleSong?.title, singleSong);
      }
    });
    return Array.from(uniqueSongs.values());
  };

  const filteredSongQueue = songQueue ? removeDuplicates(songQueue) : [];

  if (isLoading) return <Spinner />;

  if (!singleSong) return null;

  return (
    <div className="mb-20 md:py-0">
      <div className="body-font">
        <div className="flex flex-col items-center py-5 mx-auto md:flex-row">
          {/* Song Image */}
          <div className="w-64 mb-6 md:mb-0">
            <img
              src={singleSong?.image[2]?.url || singleSong?.image[2]?.link}
              alt={singleSong?.title}
              width={200}
              height={200}
              className="object-cover object-center w-64 rounded md:w-96"
            />
          </div>

          {/* Song Info */}
          <div className="flex flex-col items-center text-center md:ml-10 lg:flex-grow md:w-1/2 md:pl-6 md:items-start md:text-left">
            <div className="w-56 lg:w-96">
              {/* Song Title */}
              <h1
                className="text-lg font-semibold truncate md:text-2xl lg:text-3xl"
                dangerouslySetInnerHTML={{
                  __html: `${singleSong?.name || singleSong?.title}`,
                }}
              ></h1>

              {/* Artists */}
              <small className="block text-xs text-gray-600 truncate md:text-sm">
                {singleSong?.artists.primary
                  .map((artist) => artist.name)
                  .join(', ')}
              </small>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 mt-5">
              <AddFavorite song={singleSong} />
              <ArrowDownToLine
                size={25}
                strokeWidth={1.25}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadSong(singleSong);
                }}
              />
              <ShareButton />
              <PlayPauseButton
                togglePlayPause={togglePlayPause}
                isPlaying={isPlaying}
              />
            </div>
          </div>
        </div>

        {/* Recommended Songs */}
        <div className="w-full mt-6 lg:mr-5">
          <div className="flex flex-wrap items-center justify-between">
            <h1 className="text-xl font-bold">Recommended Songs</h1>
          </div>
          <div className="flex flex-col items-center gap-3 mt-2">
            {filteredSongQueue.map((song) => (
              <SongList key={song.id} song={song} />
            ))}
          </div>
        </div>

        {/* Featured Artists */}
        <div>
          <h1 className="py-4 text-xl font-bold">Featured Artists</h1>
          <div className="w-full overflow-x-auto scroll-container scroll-hide">
            <div className="flex items-center justify-between gap-2">
              {singleSong.artists.primary.map((artist) => (
                <ArtistData artist={artist} key={artist.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongQueue;
