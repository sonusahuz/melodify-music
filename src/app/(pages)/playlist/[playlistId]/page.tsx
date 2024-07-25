'use client';
import SongList from '@/components/custom/SongList';
import { getPlaylistDetail } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import ArtistSlider from '../../artist/ArtistSlider';
import Spinner from '@/components/custom/Loading';
import { Button } from '@/components/ui/button';
import { useMusicPlayer } from '@/components/custom/MusicContextProvider';

interface Artist {
  id: string;
  name: string;
  role: string;
  image: Image[];
  type: string;
  url: string;
}

const removeDuplicateArtists = (artists: Artist[]): Artist[] => {
  const seen = new Set<string>();
  return artists.filter((artist) => {
    if (seen.has(artist.id)) {
      return false;
    } else {
      seen.add(artist.id);
      return true;
    }
  });
};

const Playlists = ({ params }: { params: { playlistId: string } }) => {
  const { playlists, addPlaylist, removePlaylist } = useMusicPlayer();
  const { playlistId } = params;
  const isPlaylist = playlists.some((artist) => artist.id === playlistId);
  const { data: playlist, isLoading } = useQuery({
    queryKey: ['playlists', playlistId],
    queryFn: () => getPlaylistDetail(playlistId),
  });

  const uniqueArtists = removeDuplicateArtists(playlist?.artists || []);

  if (isLoading) return <Spinner />;

  return (
    <div className=" mb-36">
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              height={200}
              width={200}
              className="object-cover rounded object-center w-[450px]"
              alt={`${playlist?.name || playlist?.title}`}
              src={playlist?.image[2]?.link || playlist?.image[2]?.url}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium lg:font-bold text-gray-900 dark:text-white">
              {playlist?.name || playlist?.title}
            </h1>
            <p className="mb-3 leading-relaxed dark:text-gray-400">
              {playlist?.description}
            </p>
            <div className="mb-3 dark:text-gray-400 hidden lg:block">
              {playlist?.artists?.map((artist: any) => artist?.name).join(', ')}
            </div>
            <p className="mb-3 leading-relaxed dark:text-gray-400 ">
              {playlist?.songs?.length} Songs
            </p>
            <div>
              {playlist && (
                <Button
                  size="sm"
                  className="w-36 rounded-full"
                  onClick={() => {
                    isPlaylist && isPlaylist
                      ? removePlaylist(`${playlist?.id}`)
                      : addPlaylist(playlist);
                  }}
                >
                  {isPlaylist ? 'Remove Playlist' : 'Save Playlist'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
      <section>
        <h1 className=" text-2xl font-bold mb-2">Songs</h1>
        <div className="mx-auto flex items-start flex-col w-full gap-3">
          {playlist?.songs?.map((song: any) => (
            <SongList key={song.id} song={song} />
          ))}
        </div>
      </section>
      <section>
        <div>
          <h1 className=" text-2xl font-bold py-4">Featured Artists</h1>
          <ArtistSlider>
            <div className="flex items-center justify-between gap-2">
              {uniqueArtists.map((artist) => (
                <div
                  key={artist.id}
                  className="flex items-center justify-between gap-3 text-center truncate"
                >
                  <Link
                    href={`/artist/${artist.id}`}
                    className="flex flex-col p-2 items-center cursor-pointer"
                  >
                    <div className="rounded-full overflow-hidden w-[120px] h-[120px] lg:w-[130px] lg:h-[130px]">
                      <img
                        height={100}
                        width={100}
                        src={artist?.image[2]?.url}
                        alt={artist.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h1 className="mt-2 text-xs font-normal">{artist.name}</h1>
                    <h1 className="mt-1 text-xs font-normal capitalize">
                      {artist.type}
                    </h1>
                  </Link>
                </div>
              ))}
            </div>
          </ArtistSlider>
        </div>
      </section>
    </div>
  );
};

export default Playlists;
