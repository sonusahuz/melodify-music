/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useMusicPlayer } from '@/components/custom/MusicContextProvider';
import Link from 'next/link';
import AritistCard from '@/app/(pages)/artist/AritistCard';
import Spinner from './Loading';

const NewRelease = () => {
  const { songs, isLoading } = useMusicPlayer();

  if (isLoading) return <Spinner />;
  const SongList = ({ title, songs, type }: any) => (
    <div className="mb-5">
      <h1 className="my-3 text-xl font-bold">{title}</h1>
      <div className="flex gap-3 overflow-x-auto scroll-container">
        {songs?.map((song: any) => (
          <Link
            href={`/${type}/${song.id}`}
            key={song.id}
            className="w-[150px]"
          >
            <img
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
    </div>
  );

  return (
    <div className="mb-20">
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
    </div>
  );
};

export default NewRelease;
