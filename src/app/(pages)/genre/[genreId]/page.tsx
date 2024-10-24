'use client';
import React from 'react';
import Spinner from '@/components/custom/Loading';
import { useQuery } from '@tanstack/react-query';
import GenreCard from '../GenreCard';
import { getGenres } from '@/lib/api';

const Genre = ({ params }: { params: { genreId: string } }) => {
  const { genreId } = params;

  const { data: genreSong, isLoading } = useQuery<SongsTypes>({
    queryKey: ['genres', genreId],
    queryFn: () => getGenres(genreId),
  });

  if (isLoading) return <Spinner />;

  return <GenreCard songs={genreSong} isLoading={isLoading} query={genreId} />;
};

export default Genre;
