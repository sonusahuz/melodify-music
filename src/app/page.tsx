/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Link from 'next/link';
import { useMusicPlayer } from '@/providers/MusicContextProvider';
import Loading from '@/components/custom/Loading';
import AritistCard from './(pages)/artist/AritistCard';
import Footer from '@/components/custom/Footer';

const Home = () => {
  const { songs, isLoading } = useMusicPlayer();

  if (isLoading) return <Loading />;

  const SongList = ({ title, songs, type }: any) => (
    <section className="mb-5">
      <h2 className="my-3 text-xl font-bold">{title}</h2>
      <div className="flex overflow-x-auto scroll-container">
        {songs?.map((song: any) => (
          <Link
            href={`/${type}/${song.id}`}
            key={song.id}
            className="lg:w-[170px] w-[150px]"
            aria-label={`Go to ${song.name} ${type}`}
          >
            <img
              className="rounded-lg"
              height={170}
              width={170}
              src={song.image[2]?.link || song.image[2]?.url}
              alt={song.name}
            />
            <div className="pt-2">
              <h3 className="text-sm truncate">{song?.name || song?.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );

  return (
    <main className="mb-20">
      <AritistCard />
      <SongList
        title="Top Albums"
        songs={songs?.trending.albums}
        type="album"
      />
      <SongList
        title="Top Playlists"
        songs={songs?.playlists}
        type="playlist"
      />
      <SongList title="Top Charts" songs={songs?.charts} type="playlist" />
      <Footer />
    </main>
  );
};

export default Home;
