'use client';
import { useMusicPlayer } from '@/components/custom/MusicContextProvider';
import Link from 'next/link';

import React from 'react';

const ArtistList = () => {
  const { artists } = useMusicPlayer();

  if (artists.length === 0) {
    return (
      <p className="text-center flex items-center justify-center text-2xl h-[80vh] font-semibold">
        No Artists yet.
      </p>
    );
  }

  return (
    <div className='mb-36'>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Artists</h1>
        <span className="text-sm">{artists.length} Artists</span>
      </div>
      <div className="flex items-center justify-start flex-wrap flex-col">
        {artists.map((artist: any) => (
          <Link
            href={`/artist/${artist.id}`}
            className="mt-4 space-x-3 border p-2 rounded-lg w-full"
            key={artist.id}
          >
            <div className="flex items-center justify-start gap-3 truncate">
              <img
                className="object-cover object-center rounded-full"
                alt={`${artist?.name}`}
                height={60}
                width={60}
                src={artist.image[2].url || artist?.image[2]?.url}
              />
              <div>
                <h1 className="text-xl font-semibold truncate">{artist.name}</h1>
                <small className="mb-8 leading-relaxed font-medium capitalize">
                  {artist.type}
                </small>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArtistList;
