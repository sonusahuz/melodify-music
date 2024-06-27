'use client';
import SongList from '@/components/custom/SongList';
import { getArtists } from '@/lib/api';
import { formatNumber } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AlbumCard from '../../albums/AlbumCard';
import ResponsiveWrapper from '@/components/custom/Responsive';
import Spinner from '@/components/custom/Loading';

const ArtistPage = ({ params }: { params: { artistId: string } }) => {
  const { artistId } = params;

  const { data: artists, isLoading } = useQuery<SingleArtist>({
    queryKey: ['artists', artistId],
    queryFn: () => getArtists(artistId),
  });
  if (isLoading) return <Spinner />;
  
  return (
    <div className="mb-36">
      <section className="text-gray-600 body-font ">
        <div className="container mx-auto flex px-5 py-5 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded-full mx-auto"
              alt={`${artists?.name}`}
              height={250}
              width={250}
              src={artists?.image[2]?.link || artists?.image[2]?.url}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-5xl text-3xl font-bold dark:text-white lg:py-0 py-4">
              {artists?.name}
            </h1>

            <div className="flex items-center justify-between gap-3 pt-1 lg:pt-4 dark:text-gray-400">
              <small className="mb-8 leading-relaxed font-medium capitalize">
                {artists?.type} -
              </small>
              <small className="mb-8 leading-relaxed font-medium">
                {formatNumber(Number(artists?.followerCount))} Listeners
              </small>
              <small className="mb-8 leading-relaxed font-medium">
                {formatNumber(Number(artists?.fanCount))} Followers
              </small>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <h1 className="text-2xl font-bold py-2 m-2">Popular Songs</h1>
          <div>
            {artists?.topSongs?.map((song) => (
              <SongList key={song.id} song={song} />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold py-2 ">Top Albums</h1>
          <ResponsiveWrapper
            desktopWrapper={
              <>
                {artists?.topAlbums?.map((song) => (
                  <AlbumCard key={song.id} song={song} />
                ))}
              </>
            }
            mobileWrapper={
              <>
                {artists?.topAlbums?.map((song) => (
                  <AlbumCard key={song.id} song={song} />
                ))}
              </>
            }
          />
        </div>
      </section>
    </div>
  );
};

export default ArtistPage;
