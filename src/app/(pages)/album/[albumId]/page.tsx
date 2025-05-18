import { getAlbumDetail } from '@/lib/api';
import React from 'react';
import ArtistData from '../../artist/ArtistData';
import { ShareButton } from '@/components/button/ShareButton';
import SongList from '@/components/custom/SongList';

interface Artist {
  id: string;
  name: string;
  type: string;
  image: Image[];
  url: string;
  role: string;
}

interface Album {
  id: string;
  name?: string;
  title?: string;
  image: Image[];
  description?: string;
  songs?: Song[]; // Assuming Song is defined elsewhere
  artists?: {
    all: Artist[];
  };
}

const Albums = async ({ params }: { params: { albumId: string } }) => {
  const { albumId } = params;

  const album: Album = await getAlbumDetail(albumId);

  if (!album) return <p>No album found.</p>;

  const albumImage =
    album.image?.[2]?.link || album.image?.[2]?.url || '/default-album.jpg';
  const albumTitle = album.name || album.title;

  return (
    <main className="mb-20">
      {/* Album Info Section */}
      <section className="text-gray-600 body-font">
        <div className="flex flex-col items-center justify-center py-5 mx-auto md:flex-row">
          {/* Album Image */}
          <figure className="w-64 mb-6 md:mb-0">
            <img
              height={200}
              width={200}
              className="object-cover object-center rounded w-96"
              alt={albumTitle || 'Album cover'}
              src={albumImage}
            />
          </figure>

          {/* Album Details */}
          <div className="flex flex-col items-center w-64 text-center lg:w-96 lg:flex-grow md:w-1/2 md:pl-16 md:items-start md:text-left">
            <h1 className="mb-4 text-2xl font-medium text-gray-900 title-font dark:text-white sm:text-3xl lg:font-bold">
              {albumTitle}
            </h1>
            {album.description && (
              <p
                dangerouslySetInnerHTML={{ __html: album.description }}
                className="mb-3 leading-relaxed dark:text-gray-400"
              />
            )}
            <p className="mb-3 leading-relaxed dark:text-gray-400">
              {album.songs?.length || 0} Songs
            </p>
            <div className="flex items-center justify-start gap-6 mt-2">
              <ShareButton />
            </div>
          </div>
        </div>
      </section>

      {/* Songs List */}
      <section>
        <h2 className="mb-4 text-xl font-bold">Songs</h2>
        <div className="flex flex-col items-start w-full gap-3 mx-auto">
          {album.songs?.map((song) => (
            <SongList key={song.id} song={song} />
          )) || <p>No songs available.</p>}
        </div>
      </section>

      {/* Featured Artists */}
      <section>
        <h2 className="py-4 text-xl font-bold">Featured Artists</h2>
        <div className="w-full scroll-container scroll-hide">
          <div className="flex items-center justify-between gap-3 lg:gap-6 text-center">
            {album.artists?.all?.map((artist) => (
              <ArtistData key={artist.id} artist={artist} />
            )) || <p>No artists available.</p>}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Albums;
