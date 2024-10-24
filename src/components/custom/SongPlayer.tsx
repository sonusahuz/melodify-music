'use client';
import Link from 'next/link';
import { useMusicPlayer } from '@/providers/MusicContextProvider';
import SongControls from './SongControls';

const SongPlayer: React.FC = () => {
  const { song, audioRef, togglePlayPause, isPlaying } = useMusicPlayer();

  if (!song) return null;

  return (
    <footer className="fixed bottom-0 right-0 left-0 dark:bg-[#3a3a3a] bg-[#f1f3f4] z-20 lg:px-6">
      <div className="p-2 px-4 md:px-0">
        <div className="flex items-center justify-between gap-2 md:px-4">
          <Link
            href={`/song/${song.id}`}
            className="flex items-center justify-start gap-2 cursor-pointer"
          >
            <img
              src={song.image[2].url || song.image[2].link}
              alt={song.title}
              width={45}
              height={45}
              className="rounded"
            />
            <div className="truncate cursor-pointer w-48">
              <div className="flex items-center justify-between w-full">
                <h2
                  className="text-sm font-semibold truncate lg:text-xl"
                  dangerouslySetInnerHTML={{ __html: `${song.name}` }}
                ></h2>
              </div>
              <small className="text-xs truncate">
                {song.artists.primary.map((artist) => artist.name).join(', ')}
              </small>
            </div>
          </Link>
          <div className="w-[500px]">
            <audio
              className="w-[600px] hidden lg:block"
              ref={audioRef}
              autoPlay
              src={song.downloadUrl[4].url}
              controls
            ></audio>
          </div>
          <div className="flex items-center justify-between gap-4">
            <SongControls
              song={song}
              togglePlayPause={togglePlayPause}
              isPlaying={isPlaying}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SongPlayer;
