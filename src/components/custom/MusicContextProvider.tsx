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
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/app/(auth)/firebase';
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
  currentUser: User | null;
  artists: Artist[];
  albums: Albums[];
  playlists: Playlists[];
  downloads: Song[];
  addArtist: (artist: Artist) => void;
  removeArtist: (artistId: string) => void;
  addAlbum: (album: Albums) => void;
  removeAlbum: (albumId: string) => void;
  addPlaylist: (playlist: Playlists) => void;
  removePlaylist: (playlistId: string) => void;
  addDownload: (song: Song) => void;
  removeDownload: (songId: string) => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextProps | undefined>(
  undefined
);

export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [isSongPlay, setIsSongPlay] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  const [search, setSearch] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [favorites, setFavorites] = useState<Song[]>(
    loadItemFromLocalStorage('favorites') || []
  );
  const [artists, setArtists] = useState<Artist[]>(
    loadItemFromLocalStorage('artists') || []
  );
  const [albums, setAlbums] = useState<Albums[]>(
    loadItemFromLocalStorage('albums') || []
  );
  const [playlists, setPlaylists] = useState<Playlists[]>(
    loadItemFromLocalStorage('playlists') || []
  );
  const [downloads, setDownloads] = useState<Song[]>(
    loadItemFromLocalStorage('downloads') || []
  );
  const debounce = useDebounce(search, 500);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('artists', JSON.stringify(artists));
  }, [artists]);

  useEffect(() => {
    localStorage.setItem('albums', JSON.stringify(albums));
  }, [albums]);

  useEffect(() => {
    localStorage.setItem('playlists', JSON.stringify(playlists));
  }, [playlists]);

  useEffect(() => {
    localStorage.setItem('downloads', JSON.stringify(downloads));
  }, [downloads]);

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
      a.download = `${song?.title || song?.name}.mp3`;
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

  const addArtist = (artist: Artist) => {
    setArtists((prevArtists) => {
      const updatedArtists = [...prevArtists, artist];
      localStorage.setItem('artists', JSON.stringify(updatedArtists));
      return updatedArtists;
    });
  };

  const removeArtist = (artistId: string) => {
    setArtists((prevArtists) => {
      const updatedArtists = prevArtists.filter(
        (artist) => artist.id !== artistId
      );
      localStorage.setItem('artists', JSON.stringify(updatedArtists));
      return updatedArtists;
    });
  };

  const addAlbum = (album: Albums) => {
    setAlbums((prevAlbums) => {
      const updatedAlbums = [...prevAlbums, album];
      localStorage.setItem('albums', JSON.stringify(updatedAlbums));
      return updatedAlbums;
    });
  };

  const removeAlbum = (albumId: string) => {
    setAlbums((prevAlbums) => {
      const updatedAlbums = prevAlbums.filter((album) => album.id !== albumId);
      localStorage.setItem('albums', JSON.stringify(updatedAlbums));
      return updatedAlbums;
    });
  };

  const addPlaylist = (playlist: Playlists) => {
    setPlaylists((prevPlaylists) => {
      const updatedPlaylists = [...prevPlaylists, playlist];
      localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
      return updatedPlaylists;
    });
  };

  const removePlaylist = (playlistId: string) => {
    setPlaylists((prevPlaylists) => {
      const updatedPlaylists = prevPlaylists.filter(
        (playlist) => playlist.id !== playlistId
      );
      localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
      return updatedPlaylists;
    });
  };

  const addDownload = (song: Song) => {
    setDownloads((prevDownloads) => {
      const updatedDownloads = [...prevDownloads, song];
      localStorage.setItem('downloads', JSON.stringify(updatedDownloads));
      return updatedDownloads;
    });
  };

  const removeDownload = (songId: string) => {
    setDownloads((prevDownloads) => {
      const updatedDownloads = prevDownloads.filter(
        (download) => download.id !== songId
      );
      localStorage.setItem('downloads', JSON.stringify(updatedDownloads));
      return updatedDownloads;
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
        artists,
        albums,
        playlists,
        downloads,
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
        currentUser,
        addArtist,
        removeArtist,
        addAlbum,
        removeAlbum,
        addPlaylist,
        removePlaylist,
        addDownload,
        removeDownload,
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
