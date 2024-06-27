import toast from 'react-hot-toast';
export const BASE_URL = 'https://saavn.dev/api';
const HOME_DATA = 'https://jiosaavan-harsh-patel.vercel.app';


// Home data
export const homeData = async () => {
  try {
    const res = await fetch(`${HOME_DATA}/modules?language=hindi`);
    if (!res.ok) {
      throw new Error('Failed to fetch home data');
    }
    const data = await res.json();
    return data.data;
  } catch (error: any) {
    toast.error(error.message);
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
    return data.data[0];
  } catch (error: any) {
    toast.error(error.message);
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
    return data.data;
  } catch (error: any) {
    toast.error(error.message);
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
    return data.data;
  } catch (error: any) {
    toast.error(error.message);
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
    return data.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

// Get genres
export const getGenres = async (genreId: string) => {
  try {
    const res = await fetch(`${HOME_DATA}/modules?language=${genreId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch genres');
    }
    const data = await res.json();
    return data.data;
  } catch (error: any) {
    toast.error(error.message);
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
    return data.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};
