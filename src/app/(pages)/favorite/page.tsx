'use client';
import { useMusicPlayer } from '@/components/custom/MusicContextProvider';
import SongList from '@/components/custom/SongList';
import React from 'react';

const Library = () => {
  const { favorites } = useMusicPlayer();

  if (favorites.length === 0) {
    return (
      <p className="text-center flex items-center justify-center text-2xl h-[80vh] font-semibold">
        No favorite songs yet.
      </p>
    );
  }

  return (
    <div className="mx-auto mb-36">
      <h1 className="text-2xl font-bold py-4">Favorite Songs</h1>
      <div className="flex items-center justify-start flex-wrap  mx-auto">
        {favorites.map((song) => (
          <SongList key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default Library;
