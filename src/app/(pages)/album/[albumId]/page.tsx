'use client'; // Ensures this is treated as a client-side component

import { getAlbumDetail } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Spinner from '@/components/custom/Loading';
import SongList from '@/components/custom/SongList';
import { ShareButton } from '@/components/button/ShareButton';
import ArtistData from '@/components/custom/ArtistData';

interface Album {
  id: string;
  name?: string;
  title?: string;
  image: { url: string; link: string }[];
  description?: string;
  songs?: Song[];
  artists?: {
    all: Artist[];
  };
}

interface Artist {
  id: string;
  name: string;
  type: string;
  image: { url: string }[];
  url: string;
  role: string;
}

const Albums = ({ params }: { params: { albumId: string } }) => {
  const { albumId } = params;

  const { data: album, isLoading } = useQuery<Album>({
    queryKey: ['album', albumId],
    queryFn: () => getAlbumDetail(albumId),
  });

  if (isLoading) return <Spinner />;

  if (!album) return <div>No album found.</div>;

  return (
    <div className="mb-20">
      <section className="text-gray-600  body-font">
        <div className="flex flex-col items-center justify-center py-5 mx-auto md:flex-row">
          <div className="w-64 mb-6 md:mb-0">
            <img
              height={200}
              width={200}
              className="object-cover object-center rounded w-96"
              alt={`${album.name || album.title}`}
              src={album?.image?.[2]?.link || album?.image?.[2]?.url}
            />
          </div>
          <div className="flex flex-col items-center w-64 text-center lg:w-96 lg:flex-grow md:w-1/2 md:pl-16 md:items-start md:text-left">
            <h1 className="mb-4 text-2xl font-medium text-gray-900 title-font dark:text-white sm:text-3xl lg:font-bold">
              {album.name || album.title}
            </h1>
            {album.description && (
              <p
                dangerouslySetInnerHTML={{ __html: album.description }}
                className="mb-3 leading-relaxed dark:text-gray-400"
              />
            )}
            <p className="mb-3 leading-relaxed dark:text-gray-400">
              {album?.songs?.length || 0} Songs
            </p>
            <div className="flex items-center justify-start gap-6 mt-2">
              <ShareButton />
            </div>
          </div>
        </div>
      </section>

      <div>
        <h1 className="mb-4 text-xl font-bold ">Songs</h1>
        <div className="flex flex-col items-start w-full gap-3 mx-auto">
          {album?.songs?.map((song: Song) => (
            <SongList key={song.id} song={song} />
          ))}
        </div>
      </div>
      <div>
        <h1 className="py-4 text-xl font-bold ">Featured Artists</h1>
        <div className="w-full scroll-container scroll-hide">
          <div className="flex items-center justify-between gap-3 text-center">
            {album?.artists?.all?.map((artist) => (
              <ArtistData key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Albums;
