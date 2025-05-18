/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import { getPlayingSong, homeData, searchSongs } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useDebounce from '@/hooks/useDebounce';
import { loadItemFromLocalStorage } from '@/lib/utils';

interface MusicPlayerContextProps {
  isSongPlay: boolean;
  setIsSongPlay: (play: boolean) => void;
  song: Song | undefined;
  setSong: (song: Song | undefined) => void;
  getSong: (songId: string) => Promise<void>;
  songs: SongsTypes | undefined;
  isLoading: boolean;
  searchResults: SearchType | undefined;
  search: string;
  setSearch: (search: string) => void;
  searchLoading: boolean;
  searchError: boolean;
  handleDownloadSong: (song: Song | undefined) => void;
  favorites: Song[];
  addFavorite: (song: Song) => void;
  removeFavorite: (songId: string) => void;
  isDownloading: boolean;
  setIsDownloading: (isDownloading: boolean) => void;
  togglePlayPause: () => void;
  isPlaying: boolean;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const MusicPlayerContext = createContext<MusicPlayerContextProps | undefined>(
  undefined
);

export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isSongPlay, setIsSongPlay] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const [search, setSearch] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [favorites, setFavorites] = useState<Song[]>(
    loadItemFromLocalStorage('favorites') || []
  );
  const debounce = useDebounce(search, 500);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);

      return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
      };
    }
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const {
    data: searchResults,
    isLoading: searchLoading,
    isError: searchError,
  } = useQuery<SearchType>({
    queryKey: ['search', debounce],
    queryFn: () => searchSongs(debounce),
    enabled: !!debounce,
  });

  const { data: songs, isLoading } = useQuery<SongsTypes>({
    queryKey: ['songs'],
    queryFn: homeData,
    staleTime: 20000,
  });

  const getSong = async (songId: string) => {
    const data = await getPlayingSong(songId);
    setIsSongPlay(true);
    setSong(data);
  };

  const downloadSong = async (url: string) => {
    toast.loading('Downloading Please wait...');
    setIsDownloading(true);
    try {
      const response = await fetch(url);
      const data = await response.blob();
      const songUrl = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = songUrl;
      a.download = `${song?.title || song?.name}`;
      a.click();
      URL.revokeObjectURL(songUrl);
      toast.dismiss();
      toast.success('Downloaded Successfully ✅');
    } catch (error) {
      toast.dismiss();
      toast.error('Download failed ❌');
    } finally {
      setIsDownloading(false);
    }
  };

  const addFavorite = (song: Song) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, song];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const removeFavorite = (songId: string) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(
        (favorite) => favorite.id !== songId
      );
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        isSongPlay,
        setIsSongPlay,
        song,
        setSong,
        getSong,
        songs,
        isLoading,
        searchResults,
        search,
        setSearch,
        searchLoading,
        searchError,
        handleDownloadSong: (song: Song | undefined) => {
          downloadSong(song?.downloadUrl[4].url || '');
        },
        favorites,
        addFavorite,
        removeFavorite,
        isDownloading,
        setIsDownloading,
        togglePlayPause,
        isPlaying,
        audioRef,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = (): MusicPlayerContextProps => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};
