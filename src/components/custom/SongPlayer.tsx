import React from 'react';
import { ArrowDownToLine } from 'lucide-react';
import { useMusicPlayer } from './MusicContextProvider';
import AddFavorite from './AddFavorite';

const SongPlayer = () => {
  const { song, handleDownloadSong } = useMusicPlayer();
  if (!song) return null;
  return (
    <div>
      <div className="fixed bottom-0 right-0 left-0 bg-[#f1f3f4] p-2 z-20">
        <div className="">
          <div className="flex items-center lg:text-center justify-between gap-2 px-4 py-1">
            <div>
              <img
                src={song.image[2].url || song.image[2].link}
                alt={song.title}
                width={45}
                height={45}
                className="rounded"
              />
            </div>
            <div className="lg:w-auto w-48 truncate">
              <div className="flex items-center justify-between w-full">
                <h1
                  className="lg:text-xl text-sm truncate font-medium"
                  dangerouslySetInnerHTML={{ __html: `${song.name}` }}
                ></h1>
              </div>
              <small className="truncate text-xs">
                {song.artists.primary.map((artist) => artist.name).join(', ')}
              </small>
            </div>
            <div className="flex items-center justify-between gap-4">
              <AddFavorite song={song} />
              <ArrowDownToLine
                size={25}
                className=" cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadSong(song);
                }}
              />
            </div>
          </div>
          <audio
            className="w-[100%]"
            autoPlay={true}
            src={song.downloadUrl[4].url}
            controls
          ></audio>
        </div>
      </div>
    </div>
  );
};

export default SongPlayer;
