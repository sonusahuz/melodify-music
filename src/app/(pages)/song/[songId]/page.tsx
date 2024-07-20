'use client';
import Spinner from '@/components/custom/Loading';
import SongList from '@/components/custom/SongList';
import { BASE_URL, getPlayingSong } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

const SongQueue = ({ params }: { params: { songId: string } }) => {
  const { songId } = params;
  const [song, setSong] = useState<Song | null>(null);

  const artists = song?.artists.primary.map((artist) => artist.name).join(', ');

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

  const playingSong = async () => {
    const res = await getPlayingSong(songId);
    setSong(res);
  };

  useEffect(() => {
    playingSong();
  }, [songId]);

  const removeDuplicates = (songs: Song[]) => {
    const uniqueSongs = new Map<string, Song>();
    songs.forEach((song) => {
      if (!uniqueSongs.has(song.name || song.title)) {
        uniqueSongs.set(song?.name || song?.title, song);
      }
    });
    return Array.from(uniqueSongs.values());
  };

  const filteredSongQueue = songQueue ? removeDuplicates(songQueue) : [];
  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className="flex items-start justify-start flex-wrap lg:flex-nowrap">
        <div className="lg:order-2 order-1">
          <div className="flex items-center justify-between flex-wrap">
            <h1 className="text-3xl font-bold  hidden lg:block">Now Playing</h1>
            <small className="mb-2  hidden lg:block">Playing from</small>
          </div>
          <div>
            <div>
              <img
                src={song?.image[2]?.url || song?.image[2]?.link}
                alt={song?.title}
                width={400}
                height={400}
                className="rounded lg:mt-2 w-full mx-auto object-cover object-center"
              />
            </div>
            <div className="truncate mt-2 lg:mb-8 flex items-center justify-between gap-4">
              <div className="w-80">
                <div>
                  <h1
                    className="text-2xl truncate font-semibold"
                    dangerouslySetInnerHTML={{
                      __html: `${song?.name || song?.title}`,
                    }}
                  ></h1>
                  <small className="truncate text-xs">
                    {song?.artists.primary
                      .map((artist) => artist.name)
                      .join(', ')}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-40 order-2 lg:order-1 lg:mr-5 lg:mt-0 mt-6 w-full">
          <div className='flex items-center justify-between flex-wrap'>
            <h1 className="text-3xl font-bold">Queue</h1>
            <small>{filteredSongQueue.length} Songs</small>
          </div>
          {filteredSongQueue.map((song) => (
            <SongList key={song.id} song={song} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SongQueue;
