/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ArtistData: React.FC<{ artist: any }> = ({ artist }) => {
  return (
    <main
      className="flex flex-col items-center justify-center gap-3 text-center truncate"
      key={artist.id}
    >
      <Link
        href={`/artist/${artist.id}`}
        className="flex flex-col items-center cursor-pointer"
      >
        <figure className="rounded-full overflow-hidden lg:w-[170px] w-[150px]">
          <Image
            height={100}
            width={100}
            src={artist?.image?.[2]?.url || artist?.image?.[2]?.link}
            alt={artist.name}
            className="object-cover w-full h-full"
            loading="lazy" // Improve performance by deferring offscreen images
          />
        </figure>
        <h2
          className="mt-2 text-xs font-normal"
          aria-label={`Artist name: ${artist.name}`}
        >
          {artist.name}
        </h2>
        <p
          className="mt-1 text-xs font-normal capitalize"
          aria-label={`Artist type: ${artist.type}`}
        >
          {artist.type}
        </p>
      </Link>
    </main>
  );
};

export default ArtistData;
