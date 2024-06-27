'use client';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { getPlayingSong, homeData, searchSongs } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import useDebounce from '@/hooks/useDebounce';
import toast from 'react-hot-toast';

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
}

const MusicPlayerContext = createContext<MusicPlayerContextProps | undefined>(
  undefined
);

const loadFavoritesFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }
  return [];
};

export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [isSongPlay, setIsSongPlay] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const [search, setSearch] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [favorites, setFavorites] = useState<Song[]>(
    loadFavoritesFromLocalStorage()
  );
  const debounce = useDebounce(search, 500);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

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
    setIsDownloading(true);
    const response = await fetch(url);
    const datas = await response.blob();
    const songUrl = URL.createObjectURL(datas);
    const a = document.createElement('a');
    a.href = songUrl;
    a.download = `${song?.title || song?.name}.mp3`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Downloaded Successfully 😊');
    setIsDownloading(false);
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
        handleDownloadSong(song) {
          downloadSong(song?.downloadUrl[4].url || '');
        },
        searchError,
        isDownloading,
        setIsDownloading,
        searchLoading,
        songs,
        isLoading,
        setSong,
        getSong,
        searchResults,
        search,
        setSearch,
        favorites,
        addFavorite,
        removeFavorite,
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
