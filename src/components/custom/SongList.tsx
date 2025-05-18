'use client';
import { useMusicPlayer } from '@/providers/MusicContextProvider';
import { ArrowDownToLine } from 'lucide-react';
import AddToFavoriteButton from '../button/AddToFavoriteButton';

const SongList = ({ song }: { song: Song }) => {
  const { getSong, handleDownloadSong } = useMusicPlayer();
  return (
    <main key={song.id} className="w-full p-2 border rounded cursor-pointer">
      <section className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center justify-between gap-3 truncate sm:w-auto w-52 lg:w-96">
          <img
            onClick={() => getSong(song.id)}
            src={`${song?.image[2]?.url || song?.image[2]?.link}`}
            alt={song.title}
            width={45}
            height={45}
            className="rounded"
          />
          <div
            className="truncate lg:w-96 w-60"
            onClick={() => getSong(song.id)}
          >
            <h1
              className="text-sm font-semibold truncate"
              dangerouslySetInnerHTML={{
                __html: `${song?.name || song?.title}`,
              }}
            ></h1>

            <small
              className="text-xs"
              dangerouslySetInnerHTML={{
                __html: song?.artists?.primary
                  ?.map((artist) => artist?.name)
                  .join(', '),
              }}
            ></small>
            <small
              className="text-xs"
              dangerouslySetInnerHTML={{ __html: song?.primaryArtists }}
            ></small>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <AddToFavoriteButton song={song} />
          <ArrowDownToLine
            size={25}
            strokeWidth={1.25}
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleDownloadSong(song);
            }}
          />
        </div>
      </section>
    </main>
  );
};

export default SongList;
