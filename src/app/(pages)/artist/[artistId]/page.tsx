import { getArtists } from '@/lib/api';
import React from 'react';
import { formatNumber } from '@/lib/utils';
import AlbumCard from '../../album/AlbumCard';
import SongList from '@/components/custom/SongList';
import { ShareButton } from '@/components/button/ShareButton';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { artistId: string };
}): Promise<Metadata> {
  const artist = await getArtists(params.artistId);

  return {
    title: `Melodify - ${artist.name}`,
    description: `Explore ${artist.name}'s music, albums, and top tracks`,
    openGraph: {
      title: artist.name,
      description: `Discover ${artist.name}'s music on our platform`,
      images: [
        {
          url:
            artist.image[2]?.link ||
            artist.image[2]?.url ||
            '/default-artist.jpg',
        },
      ],
    },
  };
}

interface Image {
  link?: string;
  url?: string;
}

interface Artist {
  id: string;
  name: string;
  type: string;
  followerCount: number;
  fanCount: number;
  image: Image[];
  topSongs: Song[]; // Assuming Song is defined elsewhere
  topAlbums: Albums[]; // Assuming Albums is defined elsewhere
}

const ArtistPage = async ({ params }: { params: { artistId: string } }) => {
  const { artistId } = params;

  const artist: Artist = await getArtists(artistId);

  if (!artist) return <p>No artist found.</p>;

  const artistImage =
    artist.image[2]?.link || artist.image[2]?.url || '/default-artist.jpg';

  return (
    <main className="mb-20">
      <section className="text-gray-600 body-font">
        <div className="flex flex-col items-center justify-center gap-5 py-5 mx-auto md:flex-row lg:gap-10">
          {/* Artist Image */}
          <figure>
            <img
              className="object-cover object-center mx-auto rounded-full"
              alt={`Image of ${artist.name}`}
              height={250}
              width={250}
              src={artistImage}
            />
          </figure>

          {/* Artist Info */}
          <div className="flex flex-col items-center text-center lg:w-96 lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:items-start md:text-left">
            <h1 className="py-4 text-3xl font-bold title-font sm:text-5xl dark:text-white lg:py-0">
              {artist.name}
            </h1>
            <ul className="flex items-center justify-between gap-3 pt-1 lg:pt-4 dark:text-gray-400">
              <li className="mb-5 text-xs font-medium leading-relaxed capitalize list-none">
                {artist.type}
              </li>
              <li className="mb-5 text-xs font-medium leading-relaxed">
                {formatNumber(artist.followerCount)} Listeners
              </li>
              <li className="mb-5 text-xs font-medium leading-relaxed">
                {formatNumber(artist.fanCount)} Followers
              </li>
            </ul>
            <div className="flex items-center justify-start gap-6">
              <ShareButton />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tracks Section */}
      <section>
        <div>
          <h2 className="py-2 text-xl font-bold">Popular Tracks</h2>
          <div className="flex flex-col items-start w-full gap-3 mx-auto">
            {artist.topSongs?.map((song) => (
              <SongList key={song.id} song={song} />
            )) || <p>No tracks available.</p>}
          </div>
        </div>

        {/* Top Albums Section */}
        <div>
          <h2 className="mt-6 mb-4 text-xl font-bold">Top Albums</h2>
          <div className="flex items-center justify-center gap-3 lg:gap-6 scroll-container">
            {artist.topAlbums?.map((album) => (
              <AlbumCard key={album.id} song={album} />
            )) || <p>No albums available.</p>}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ArtistPage;
