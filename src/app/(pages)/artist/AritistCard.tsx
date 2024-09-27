import Link from 'next/link';
import React from 'react';
import { artists } from '@/lib/data';

const AritistCard = () => {
  return (
    <div className="mb-5">
      <h1 className="my-3 text-xl font-bold">Popular Artists</h1>
      <div className="w-full scroll-container scroll-hide">
        <div className="flex items-center justify-between gap-3 text-center ">
          {artists.map((artist) => (
            <Link
              href={`/artist/${artist.id}`}
              key={artist.id}
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="rounded-full overflow-hidden w-[150px] h-[150px]">
                <img
                  height={100}
                  width={100}
                  src={artist.image}
                  alt={artist.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <h1 className="mt-2 text-xs font-normal">{artist.name}</h1>
              <h1 className="mt-1 text-xs font-normal">{artist.type}</h1>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AritistCard;
