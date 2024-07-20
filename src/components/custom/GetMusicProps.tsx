'use client';
import { usePathname } from 'next/navigation';
import { useMusicPlayer } from './MusicContextProvider';
import { useTheme } from 'next-themes';

const GetMusicProps = () => {
  const { getSong, handleDownloadSong, addDownload, currentUser} = useMusicPlayer();
  const path = usePathname();
  const { theme, setTheme } = useTheme();
  return {
    getSong,
    handleDownloadSong,
    addDownload,
    path,
    theme,
    currentUser,
    setTheme,
  };
};

export default GetMusicProps;
