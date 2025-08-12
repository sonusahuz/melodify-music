import React from 'react';
import GenreClient from '../GenreClient';

type PageProps = {
  params: Promise<{
    genreId: string;
  }>;
};

export default async function GenrePage({ params }: Awaited<PageProps>) {
  const { genreId } = await params;
  return <GenreClient genreId={genreId} />;
}
