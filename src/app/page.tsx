'use client';
import AritistCard from '@/app/(pages)/artist/AritistCard';
import { useMusicPlayer } from '@/components/custom/MusicContextProvider';
import SongCard from '@/components/custom/SongCard';

const Home = () => {
  const { songs, isLoading } = useMusicPlayer();

  return (
    <>
      <AritistCard />
      <div className="mt-6">
        <SongCard songs={songs} isLoading={isLoading} query="hindi" />
      </div>
    </>
  );
};

export default Home;
