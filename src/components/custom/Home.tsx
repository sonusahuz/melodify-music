/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useMusicPlayer } from '@/components/custom/MusicContextProvider';
import Link from 'next/link';
import AritistCard from '@/app/(pages)/artist/AritistCard';
import Spinner from './Loading';
import Image from 'next/image';

const NewRelease = () => {
  const { songs, isLoading } = useMusicPlayer();

  if (isLoading) return <Spinner />;

  const SongList = ({ title, songs, type }: any) => (
    <section className="mb-5">
      <h2 className="my-3 text-xl font-bold">{title}</h2>
      <div className="flex gap-3 overflow-x-auto scroll-container">
        {songs?.map((song: any) => (
          <Link
            href={`/${type}/${song.id}`}
            key={song.id}
            className="w-[150px]"
            aria-label={`Go to ${song.name} ${type}`}
          >
            <Image
              className="rounded-lg"
              height={150}
              width={150}
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
        title="Trending Albums"
        songs={songs?.trending.albums}
        type="album"
      />
      <SongList
        title="Top Playlists"
        songs={songs?.playlists}
        type="playlist"
      />
      <SongList title="Top Albums" songs={songs?.albums} type="album" />
      <SongList title="Top Charts" songs={songs?.charts} type="playlist" />
    </main>
  );
};

export default NewRelease;
