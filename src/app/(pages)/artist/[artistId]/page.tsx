'use client';
import SongList from '@/components/custom/SongList';
import { getArtists } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Spinner from '@/components/custom/Loading';
import { formatNumber } from '@/lib/utils';
import AlbumCard from '../../album/AlbumCard';
import { ShareButton } from '@/components/button/ShareButton';

const ArtistPage = ({ params }: { params: { artistId: string } }) => {
  const { artistId } = params;

  const { data: artists, isLoading } = useQuery({
    queryKey: ['artists', artistId],
    queryFn: () => getArtists(artistId),
  });
  if (isLoading) return <Spinner />;

  return (
    <div className="mb-20">
      <section className="text-gray-600 body-font">
        <div className="flex flex-col items-center justify-center gap-5 py-5 mx-auto md:flex-row lg:gap-10">
          <div>
            <img
              className="object-cover object-center mx-auto rounded-full"
              alt={`${artists?.name}`}
              height={250}
              width={250}
              src={artists?.image[2]?.link || artists?.image[2]?.url}
            />
          </div>
          <div className="flex flex-col items-center text-center lg:w-96 lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:items-start md:text-left">
            <h1 className="py-4 text-3xl font-bold title-font sm:text-5xl dark:text-white lg:py-0">
              {artists?.name}
            </h1>
            <div className="flex items-center justify-between gap-3 pt-1 lg:pt-4 dark:text-gray-400">
              <li className="mb-5 text-xs font-medium leading-relaxed capitalize list-none">
                {artists?.type}
              </li>
              <li className="mb-5 text-xs font-medium leading-relaxed">
                {formatNumber(Number(artists?.followerCount))} Listeners
              </li>
              <li className="mb-5 text-xs font-medium leading-relaxed">
                {formatNumber(Number(artists?.fanCount))} Followers
              </li>
            </div>
            <div className="flex items-center justify-start gap-6">
              <ShareButton />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <h1 className="py-2 text-xl font-bold ">Popular Tracks</h1>
          <div className="flex flex-col items-start w-full gap-3 mx-auto">
            {artists?.topSongs?.map((song: Song) => (
              <SongList key={song.id} song={song} />
            ))}
          </div>
        </div>
        <div>
          <h1 className="mt-6 mb-4 text-xl font-bold">Top Albums</h1>
          <div className="flex items-center justify-center gap-3 scroll-container">
            {artists?.topAlbums?.map((song: Albums) => (
              <AlbumCard key={song.id} song={song} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArtistPage;
