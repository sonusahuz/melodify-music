import toast from 'react-hot-toast';

// URLs
const HOME_DATA =
  'https://jiosaavan-harsh-patel.vercel.app/modules?language=hindi';
export const BASE_URL = 'https://saavn.dev/api';

// Home data
export const homeData = async () => {
  try {
    const res = await fetch(HOME_DATA);
    if (!res.ok) {
      throw new Error('Failed to fetch home data');
    }
    const data = await res.json();
    return data?.data;
  } catch (error) {
    handleError(error);
  }
};

// Get genres
export const getGenres = async (genreId: string) => {
  try {
    const res = await fetch(
      `https://jiosaavan-harsh-patel.vercel.app/modules?language=${genreId}`
    );
    if (!res.ok) {
      throw new Error('Failed to fetch genres');
    }
    const data = await res.json();
    return data?.data;
  } catch (error) {
    handleError(error);
  }
};

// Get single playing song
export const getPlayingSong = async (songId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/songs/${songId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch playing song');
    }
    const data = await res.json();
    return data?.data[0];
  } catch (error) {
    handleError(error);
  }
};

// Get album details
export const getAlbumDetail = async (albumsId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/albums?id=${albumsId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch album details');
    }
    const data = await res.json();
    return data?.data;
  } catch (error) {
    handleError(error);
  }
};

// Get playlist details
export const getPlaylistDetail = async (playlistId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/playlists?id=${playlistId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch playlist details');
    }
    const data = await res.json();
    return data?.data;
  } catch (error) {
    handleError(error);
  }
};

// Search songs
export const searchSongs = async (songname: string) => {
  try {
    const res = await fetch(`${BASE_URL}/search?query=${songname}`);
    if (!res.ok) {
      throw new Error('Failed to search songs');
    }
    const data = await res.json();
    return data?.data;
  } catch (error) {
    handleError(error);
  }
};

// Get artists
export const getArtists = async (artistId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/artists/${artistId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch artist details');
    }
    const data = await res.json();
    return data?.data;
  } catch (error) {
    handleError(error);
  }
};

// Handle errors with more specific error type checks
const handleError = (error: unknown) => {
  if (error instanceof TypeError) {
    // Likely a network issue or API being unreachable
    toast.error('Network error. Please check your connection.');
  } else if (error instanceof Error) {
    // Handle general errors
    toast.error(error.message || 'Something went wrong');
  } else {
    toast.error('An unexpected error occurred');
  }
};
