import Link from 'next/link';
import React from 'react';
import { artists } from '@/lib/data';

const AritistCard = () => {
  return (
    <section className="mb-5">
      <h1 className="my-3 text-xl font-bold">Popular Artists</h1>
      <div className="w-full scroll-container scroll-hide">
        <div className="flex items-center justify-between gap-3 lg:gap-6 text-center">
          {artists.map((artist) => (
            <article
              key={artist.id}
              className="flex flex-col items-center cursor-pointer"
            >
              <Link href={`/artist/${artist.id}`}>
                <div className="rounded-full overflow-hidden lg:w-[170px] w-[150px] lg:h-[170px] h-[150px]">
                  <img
                    height={100}
                    width={100}
                    src={artist.image}
                    alt={artist.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h2 className="mt-2 text-xs font-normal">{artist.name}</h2>
                <h3 className="mt-1 text-xs font-normal">{artist.type}</h3>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AritistCard;
