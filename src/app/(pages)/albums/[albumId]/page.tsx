'use client';
import { getAlbumDetail } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

import Link from 'next/link';
import React from 'react';
import ArtistSlider from '../../artists/ArtistSlider';
import Spinner from '@/components/custom/Loading';
import SongList from '@/components/custom/SongList';

interface Artist {
  id: string;
  name: string;
  role: string;
  image: Image[];
  type: string;
  url: string;
}

interface Album {
  id: string;
  name: string;
  description: string;
  explicitContent: boolean;
  image: Image[];
  language: string;
  playCount: number | null;
  songCount: number;
  songs: Song[];
  type: string;
  url: string;
  year: number;
  title: string;
  artists: {
    all: Artist[];
    featured: Artist[];
    primary: Artist[];
  };
}

const Albums = ({ params }: { params: { albumId: string } }) => {
  const { albumId } = params;

  const { data: album, isLoading } = useQuery<Album>({
    queryKey: ['album'],
    queryFn: () => getAlbumDetail(albumId),
  });

  if (isLoading) return <Spinner />;

  return (
    <div className=" mb-36">
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              height={200}
              width={200}
              className="object-cover object-center rounded w-96"
              alt={`${album?.name || album?.title}`}
              src={album?.image[2]?.link || album?.image[2]?.url}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font dark:text-white sm:text-4xl text-3xl mb-4 font-medium lg:font-bold text-gray-900">
              {album?.name || album?.title}
            </h1>
            <p className="mb-3 leading-relaxed dark:text-gray-400">
              {album?.description}
            </p>
            <div className="mb-3 dark:text-gray-400">
              {album?.artists?.all?.map((artist) => artist.name).join(', ')}
            </div>
            <p className="mb-3 leading-relaxed dark:text-gray-400">
              {album?.songs?.length} Songs
            </p>
          </div>
        </div>
      </section>
      <div>
        <h1 className=" text-2xl font-bold mb-2">Songs</h1>
        <div className="mx-auto flex items-start gap-3 flex-col w-full">
          {album?.songs?.map((song) => (
            <SongList key={song.id} song={song} />
          ))}
        </div>
      </div>
      <div>
        <h1 className=" text-2xl font-bold py-4">Featured Artists</h1>
        <ArtistSlider>
          <div className="flex items-center justify-between gap-3 text-center">
            {album?.artists?.all?.map((artist) => (
              <div
                key={artist.id}
                className="flex items-center justify-between gap-3 text-center truncate"
              >
                <Link
                  href={`/artists/${artist.id}`}
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
    </div>
  );
};

export default Albums;
