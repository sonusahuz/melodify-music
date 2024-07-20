import toast from 'react-hot-toast';
export const BASE_URL = 'https://saavn.dev/api';
const HOME_DATA = 'https://jiosaavan-harsh-patel.vercel.app';
const GOOGLE_API_KEY = 'AIzaSyBgkjyjUj4yogj8ulwlRr9vaIfTcKrIYTY';

export const YOUTUBE_VIDEOS_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${GOOGLE_API_KEY}`;

export const SINGLE_VIDEO_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=${GOOGLE_API_KEY}&id=`;

export const SEARCH_RESULT_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&key=${GOOGLE_API_KEY}&q=`;

export const COMMENTS_API = `https://www.googleapis.com/youtube/v3/commentThreads?textFormat=plainText&part=snippet&maxResults=50&key=${GOOGLE_API_KEY}&videoId=`;

// Home data
export const homeData = async () => {
  try {
    const res = await fetch(`${HOME_DATA}/modules?language=hindi`);
    if (!res.ok) {
      throw new Error('Failed to fetch home data');
    }
    const data = await res.json();
    return data?.data;
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
    return data?.data[0];
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
    return data?.data;
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
    return data?.data;
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
    return data?.data;
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
    return data?.data;
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
    return data?.data;
  } catch (error: any) {
    toast.error(error.message);
  }
};

// Get youtube videos
export const getYoutubeVideos = async () => {
  try {
    const data = await fetch(YOUTUBE_VIDEOS_API);
    const res = await data.json();
    return res?.items;
  } catch (error) {
    return toast.error("Something went wrong, couldn't fetch videos");
  }
};

// get single youtube videos
export const getSingleVideo = async (videoId: string) => {
  try {
    const data = await fetch(SINGLE_VIDEO_API + videoId);
    const res = await data.json();
    return res?.items[0];
  } catch (error) {
    return toast.error("Something went wrong, couldn't fetch videos");
  }
};

// get search videos
export const getSearchVideos = async (videoId: string) => {
  try {
    const data = await fetch(SEARCH_RESULT_API + videoId);
    if (!data.ok) {
      throw new Error('Network response was not ok');
    }
    const res = await data.json();
    return res?.items || [];
  } catch (error) {
    return toast.error("Something went wrong, couldn't fetch videos");
  }
};

// get videos comments
export const getVideosComments = async (videoId: string) => {
  try {
    const data = await fetch(COMMENTS_API + videoId);
    if (!data.ok) {
      throw new Error('Network response was not ok');
    }
    const res = await data.json();
    return res?.items || [];
  } catch (error) {
    return toast.error("Something went wrong, couldn't fetch videos");
  }
};
