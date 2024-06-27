'use client';
import Spinner from '@/components/custom/Loading';
import { getGenres } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import SongCard from '@/components/custom/SongCard';

const Genre = ({ params }: { params: { genreId: string } }) => {
  const { genreId } = params;

  const { data: genreSong, isLoading } = useQuery<SongsTypes>({
    queryKey: ['genres', genreId],
    queryFn: () => getGenres(genreId),
  });

  if (isLoading) return <Spinner />;
  return (
    <div>
      <SongCard songs={genreSong} isLoading={isLoading} />
    </div>
  );
};

export default Genre;
