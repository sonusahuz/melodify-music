/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Pause, Play } from 'lucide-react';
import React from 'react';
import AddFavorite from '../button/AddFavorite';

interface SongControlsProps {
  song: Song;
  togglePlayPause: () => void;
  isPlaying: boolean;
}

const SongControls: React.FC<SongControlsProps> = ({
  song,
  togglePlayPause,
  isPlaying,
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <AddFavorite song={song} />
      <button onClick={togglePlayPause} className="cursor-pointer md:hidden">
        {isPlaying ? (
          <Pause strokeWidth={1.25} size={25} aria-label="Pause" />
        ) : (
          <Play size={25} strokeWidth={1.25} aria-label="Play" />
        )}
      </button>
    </div>
  );
};

export default SongControls;
