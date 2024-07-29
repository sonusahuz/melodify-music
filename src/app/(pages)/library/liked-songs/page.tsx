'use client';
import { useMusicPlayer } from '@/components/custom/MusicContextProvider';
import SongList from '@/components/custom/SongList';
import React from 'react';

const LikedSongs = () => {
  const { favorites } = useMusicPlayer();

  if (favorites.length === 0) {
    return (
      <p className="text-center flex items-center justify-center text-2xl h-[80vh] font-semibold">
        No Liked songs yet.
      </p>
    );
  }

  return (
    <div className="mb-36">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Liked Songs</h1>
        <span className="text-sm">{favorites.length} Songs</span>
      </div>
      <div className="flex items-center justify-start flex-wrap gap-3 mx-auto mt-4">
        {favorites.map((song) => (
          <SongList key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default LikedSongs;
