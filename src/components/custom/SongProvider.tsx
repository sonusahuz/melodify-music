'use client';
import React from 'react';
import { useMusicPlayer } from './MusicContextProvider';
import SongPlayer from './SongPlayer';

const SongProvider = ({ children }: { children: React.ReactNode }) => {
  const { isSongPlay} = useMusicPlayer();
  return (
    <div>
      {isSongPlay && <SongPlayer />}
      {children}
    </div>
  );
};

export default SongProvider;
