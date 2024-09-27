/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import React from 'react';

const ArtistData = ({ artist }: { artist: any }) => {
  return (
    <div
      key={artist.id}
      className="flex items-center justify-between gap-3 text-center truncate"
    >
      <Link
        href={`/artist/${artist.id}`}
        className="flex flex-col items-center cursor-pointer"
      >
        <div className="rounded-full overflow-hidden w-[150px] h-[150px] ">
          <img
            height={100}
            width={100}
            src={artist?.image?.[2]?.url || artist?.image?.[2]?.link}
            alt={artist.name}
            className="object-cover w-full h-full"
          />
        </div>
        <h1 className="mt-2 text-xs font-normal">{artist.name}</h1>
        <h1 className="mt-1 text-xs font-normal capitalize">{artist.type}</h1>
      </Link>
    </div>
  );
};

export default ArtistData;
