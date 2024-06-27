'use client';
import AritistCard from '@/app/(pages)/artists/AritistCard';
import { useMusicPlayer } from '@/components/custom/MusicContextProvider';
import SongCard from '@/components/custom/SongCard';

const Home = () => {
  const { songs, isLoading } = useMusicPlayer();
  
  return (
    <div>
      <AritistCard />
      <div className="mt-6">
        <SongCard songs={songs} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Home;
