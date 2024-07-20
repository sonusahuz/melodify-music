import { artists } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';
import ArtistSlider from './ArtistSlider';

const AritistCard = () => {
  return (
    <div className="">
      <h1 className="text-2xl font-bold py-2">Popular Artists</h1>
      <ArtistSlider>
        <div className="flex items-center justify-between gap-3 text-center ">
          {artists.map((artist) => (
            <Link
              href={`/artist/${artist.id}`}
              key={artist.id}
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="rounded-full overflow-hidden w-[120px] h-[120px] lg:w-[130px] lg:h-[130px]">
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
      </ArtistSlider>
    </div>
  );
};

export default AritistCard;
