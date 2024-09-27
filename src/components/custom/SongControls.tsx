/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ArrowDownToLine, Pause, Play } from 'lucide-react';
import React from 'react';
import AddFavorite from '../button/AddFavorite';

interface SongControlsProps {
  song: Song;
  handleDownloadSong: (song: any) => void;
  togglePlayPause: () => void;
  isPlaying: boolean;
}

const SongControls: React.FC<SongControlsProps> = ({
  song,
  handleDownloadSong,
  togglePlayPause,
  isPlaying,
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <AddFavorite song={song} />
      <ArrowDownToLine
        size={25}
        strokeWidth={1.25}
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          handleDownloadSong(song);
        }}
      />
      <button onClick={togglePlayPause} className="cursor-pointer md:hidden">
        {isPlaying ? (
          <Pause strokeWidth={1.25} size={25} />
        ) : (
          <Play size={25} strokeWidth={1.25} />
        )}
      </button>
    </div>
  );
};

export default SongControls;
