'use client';
import { useMusicPlayer } from '@/components/custom/MusicContextProvider';
import Link from 'next/link';

import React from 'react';

const AlbumList = () => {
  const { albums } = useMusicPlayer();

  if (albums.length === 0) {
    return (
      <p className="text-center flex items-center justify-center text-2xl h-[80vh] font-semibold">
        No Albums yet.
      </p>
    );
  }

  return (
    <div className='mb-36'>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Albums</h1>
        <span className="text-sm">{albums.length} Albums</span>
      </div>
      <div className="flex items-center justify-start flex-wrap flex-col">
        {albums.map((album: any) => (
          <Link
            href={`/album/${album.id}`}
            className="mt-4 space-x-3 border p-2 rounded-lg w-full"
            key={album.id}
          >
            <div className="flex items-center justify-start gap-3 truncate">
              <img
                className="object-cover object-center rounded-sm"
                alt={`${album?.name}`}
                height={60}
                width={60}
                src={album.image[2].url || album?.image[2]?.url}
              />
              <div className="w-full truncate">
                <h1 className="text-xl font-semibold truncate">{album.name}</h1>
                <small className="mb-8 leading-relaxed font-medium capitalize">
                  {album.type}
                </small>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AlbumList;
