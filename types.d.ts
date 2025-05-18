interface Artist {
  id: string;
  image: string | boolean;
  name: string;
  role: string;
  type: string;
  url: string;
}

interface Image {
  quality: string;
  link: string;
  url: string;
}

interface Albums {
  artists: Artist[];
  featuredArtists: Artist[];
  id: string;
  image: Image[];
  language: string;
  title: string;
  name: string;
  playCount: string;
  primaryArtists: Artist[];
  songCount: string;
  songs: string[];
  type: string;
  url: string;
  year: string;
}

interface Playlists {
  artists: Artist[];
  artists2: ArtistTypes;
  explicitContent: string;
  firstname: string;
  followerCount: string;
  id: string;
  description: string;
  name: string;
  image: Image[];
  songCount: string;
  title: string;
  type: string;
  url: string;
  songs: Song[];
}

interface Charts {
  explicitContent: string;
  firstname: string;
  id: string;
  image: Image[];
  language: string;
  subtitle: string;
  title: string;
  type: string;
  url: string;
  name: string;
}

interface ArtistTypes {
  all: Artist[];
  featured: Artist[];
  primary: Artist[];
}

interface DownloadUrl {
  quality: string;
  url: string;
}

interface Song {
  description: string;
  singers: string;
  album: Albums;
  artists: ArtistTypes;
  copyright: string;
  downloadUrl: DownloadUrl[];
  duration: number;
  explicitContent: boolean;
  hasLyrics: boolean;
  id: string;
  image: Image[];
  primaryArtists: string;
  label: string;
  language: string;
  lyricsId: string | null;
  name: string | undefined;
  playCount: number;
  title: string;
  releaseDate: string | null;
  type: string;
  url: string;
  year: string;
}

interface Trending {
  albums: Albums[];
  songs: Song[];
}

interface SongsTypes {
  albums: Albums[];
  charts: Charts[];
  playlists: Playlists[];
  trending: Trending;
}

interface SingleArtist {
  fanCount: string | undefined;
  followerCount: number | undefined;
  id: string;
  singles: Song[];
  image: Image[];
  topAlbums: Albums[];
  topSongs: Song[];
  type: string;
  url: string;
  name: string;
  role: string;
}

interface Songs {
  title: string;
  albums: string;
  description: string;
  primaryArtists: string;
  singers: string;
  album: Albums;
  artists: ArtistTypes;
  copyright: string;
  downloadUrl: DownloadUrl[];
  duration: number;
  explicitContent: boolean;
  hasLyrics: boolean;
  id: string;
  image: Image[];
  label: string;
  language: string;
  lyricsId: string | null;
  name: string | undefined;
  playCount: number;
  releaseDate: string | null;
  type: string;
  url: string;
  year: string;
}

interface AlbumsTypes {
  id: string;
  image: Image[];
  title: string;
  url: string;
  artist: string;
  type: string;
  description: string;
  language: string;
}

interface ArtistTypes {
  id: string;
  image: Image[];
  title: string;
  type: string;
  description: string;
}

interface SearchType {
  topQuery: { results: Song[] };
  songs: { results: Songs[] };
  albums: { results: AlbumsTypes[] };
  artists: { results: ArtistTypes[] };
  playlists: { results: AlbumsTypes[] };
}
