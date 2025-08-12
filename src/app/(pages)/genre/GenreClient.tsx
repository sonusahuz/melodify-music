// app/(pages)/genre/[genreId]/GenreClient.tsx
'use client';

import React from 'react';
import Spinner from '@/components/custom/Loading';
import { useQuery } from '@tanstack/react-query';
import { getGenres } from '@/lib/api';
import GenreCard from './GenreCard';

interface GenreClientProps {
  genreId: string;
}

export default function GenreClient({ genreId }: GenreClientProps) {
  const { data: genreSong, isLoading } = useQuery<SongsTypes>({
    queryKey: ['genres', genreId],
    queryFn: () => getGenres(genreId),
  });

  if (isLoading) return <Spinner />;

  return <GenreCard songs={genreSong} isLoading={isLoading} query={genreId} />;
}
