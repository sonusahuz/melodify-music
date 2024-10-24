'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { useMusicPlayer } from '../../providers/MusicContextProvider';
import { Button } from '../ui/button';

const PlayPauseButton: React.FC<{
  togglePlayPause: () => void;
  isPlaying: boolean;
}> = ({ togglePlayPause }) => {
  const { songId } = useParams();
  const { getSong } = useMusicPlayer();

  const handleClick = () => {
    togglePlayPause();
    getSong(`${songId}`);
  };
  return (
    <Button
      aria-label="Play"
      onClick={handleClick}
      className="cursor-pointer h-8 rounded-full"
    >
      Play
    </Button>
  );
};

export default PlayPauseButton;
