'use client';
import SongList from '@/components/custom/SongList';
import { useMusicPlayer } from '@/providers/MusicContextProvider';
import React from 'react';

const LikedSongs: React.FC = () => {
  const { favorites } = useMusicPlayer();

  if (favorites.length === 0) {
    return (
      <p
        className="text-center flex items-center justify-center text-2xl h-[80vh] font-semibold"
        aria-live="polite"
      >
        No liked songs yet.
      </p>
    );
  }

  return (
    <section title="Liked Songs" className="mt-3 mb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Liked Songs</h1>
        <span
          className="text-sm"
          aria-label={`${favorites.length} liked songs`}
        >
          {favorites.length} Songs
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-start gap-3 mx-auto mt-4">
        {favorites.map((song: Song) => (
          <SongList key={song.id} song={song} />
        ))}
      </div>
    </section>
  );
};

export default LikedSongs;
