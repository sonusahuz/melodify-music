import { getPlaylistDetail } from '@/lib/api';
import React from 'react';
import { ShareButton } from '@/components/button/ShareButton';
import SongList from '@/components/custom/SongList';
import ArtistData from '../../artist/ArtistData';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { playlistId: string };
}): Promise<Metadata> {
  const album = await getPlaylistDetail(params.playlistId);

  return {
    title: `Melodify - ${album.name}`,
    description: `Explore ${album.name}'s music, albums, and top tracks`,
    openGraph: {
      title: album.name,
      description: `Discover ${album.name}'s music on our platform`,
      images: [
        {
          url:
            album.image[2]?.link ||
            album.image[2]?.url ||
            '/default-artist.jpg',
        },
      ],
    },
  };
}

interface Artist {
  id: string;
  name: string;
  role: string;
  image: Image[];
  type: string;
  url: string;
}

const removeDuplicateArtists = (artists: Artist[]): Artist[] => {
  const seen = new Set<string>();
  return artists.filter((artist) => {
    if (seen.has(artist.id)) {
      return false;
    }
    seen.add(artist.id);
    return true;
  });
};

const Playlists = async ({ params }: { params: { playlistId: string } }) => {
  const { playlistId } = params;

  const playlist = await getPlaylistDetail(playlistId);

  const uniqueArtists = removeDuplicateArtists(playlist?.artists || []);

  return (
    <main className="mb-20">
      <section className="text-gray-600 body-font">
        <div className="flex flex-col items-center justify-center py-5 mx-auto md:flex-row">
          <figure className="w-64 mb-6 md:mb-0">
            <img
              height={200}
              width={200}
              className="object-cover rounded w-[450px]"
              alt={playlist?.name || playlist?.title}
              src={playlist?.image[2]?.link || playlist?.image[2]?.url}
            />
          </figure>
          <div className="flex flex-col items-center w-64 text-center lg:w-96 lg:flex-grow md:w-1/2 md:pl-16 md:items-start md:text-left">
            <h1 className="mb-4 text-2xl font-medium text-gray-900 title-font sm:text-3xl lg:font-bold dark:text-white">
              {playlist?.name || playlist?.title}
            </h1>
            <p
              dangerouslySetInnerHTML={{ __html: playlist?.description }}
              className="mb-3 leading-relaxed dark:text-gray-400"
            />
            <p className="mb-3 leading-relaxed dark:text-gray-400 ">
              {playlist?.songs?.length} Songs
            </p>
            <div className="flex items-center justify-start gap-6 mt-2">
              <ShareButton />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-xl font-bold">Songs</h2>
        <div className="flex flex-col items-start w-full gap-3 mx-auto">
          {playlist?.songs?.map((song: Song) => (
            <SongList key={song.id} song={song} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="py-4 text-xl font-bold">Featured Artists</h2>
        <div className="w-full scroll-container scroll-hide">
          <div className="flex items-center justify-between gap-3 lg:gap-6">
            {uniqueArtists.map((artist) => (
              <ArtistData key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Playlists;
