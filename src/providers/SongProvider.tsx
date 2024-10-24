'use client';
import React from 'react';
import { useMusicPlayer } from './MusicContextProvider';
import SongPlayer from '@/components/custom/SongPlayer';

const SongProvider = ({ children }: { children: React.ReactNode }) => {
  const { isSongPlay } = useMusicPlayer();
  return (
    <div>
      {isSongPlay && <SongPlayer />}
      {children}
    </div>
  );
};

export default SongProvider;
