"use client";
import React, { useState, useRef, useEffect } from 'react';
import { ArrowDownToLine, Pause, Play } from 'lucide-react';
import { useMusicPlayer } from './MusicContextProvider';
import AddFavorite from './AddFavorite';
import Link from 'next/link';

const SongPlayer: React.FC = () => {
  const { song, handleDownloadSong, addDownload } = useMusicPlayer();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);

      return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
      };
    }
  }, []);

  if (!song) return null;

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-16 md:bottom-0 right-0 left-0 bg-[#f1f3f4] dark:bg-[#020817] z-20">
      <div className="p-2">
        <div className="flex items-center justify-between gap-2 md:px-4">
          <Link
            href={`/song/${song.id}`}
            className="cursor-pointer flex items-center justify-start gap-2"
          >
            <img
              src={song.image[2].url || song.image[2].link}
              alt={song.title}
              width={45}
              height={45}
              className="rounded"
            />
            <div className="lg:w-96 w-40 truncate cursor-pointer">
              <div className="flex items-center justify-between w-full">
                <h1
                  className="lg:text-xl text-sm truncate font-semibold"
                  dangerouslySetInnerHTML={{ __html: `${song.name}` }}
                ></h1>
              </div>
              <small className="truncate text-xs">
                {song.artists.primary.map((artist) => artist.name).join(', ')}
              </small>
            </div>
          </Link>
          <div className="flex items-center justify-between gap-4">
            <AddFavorite song={song} />
            <ArrowDownToLine
              size={25}
              className="cursor-pointer "
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadSong(song);
                addDownload(song);
              }}
            />
            <button
              onClick={togglePlayPause}
              className="cursor-pointer md:hidden"
            >
              {isPlaying ? (
                <Pause strokeWidth={1.25} size={25} />
              ) : (
                <Play size={25} />
              )}
            </button>
          </div>
        </div>
        <audio
          className="w-[100%] hidden md:block dark:bg-gray-950"
          ref={audioRef}
          autoPlay={true}
          src={song.downloadUrl[4].url}
          controls
        ></audio>
      </div>
    </div>
  );
};

export default SongPlayer;
