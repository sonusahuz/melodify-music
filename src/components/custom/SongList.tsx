import { ArrowDownToLine } from 'lucide-react';
import AddFavorite from './AddFavorite';
import GetMusicProps from './GetMusicProps';

const SongList = ({ song }: { song: Song }) => {
  const { getSong, handleDownloadSong, addDownload } = GetMusicProps();
  return (
    <div
      key={song.id}
      className="border p-2 shadow-md rounded w-full cursor-pointer my-2"
    >
      <div className="flex items-center gap-2 justify-between flex-wrap">
        <div className="flex items-center justify-between gap-3 sm:w-auto w-60 lg:w-96 truncate">
          <img
            onClick={() => getSong(song.id)}
            src={`${song?.image[2]?.url || song?.image[2]?.link}`}
            alt={song.title}
            width={50}
            height={50}
            className="rounded"
          />
          <div
            className="lg:w-96 w-60 truncate"
            onClick={() => getSong(song.id)}
          >
            <h1
              className="truncate text-sm font-semibold"
              dangerouslySetInnerHTML={{
                __html: `${song?.name || song?.title}`,
              }}
            ></h1>
            <small className="text-xs">
              {song?.artists?.primary?.map((artist) => artist?.name).join(', ')}
            </small>
            <small className="text-xs">{song?.primaryArtists}</small>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <AddFavorite song={song} />
          <ArrowDownToLine
            size={25}
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleDownloadSong(song);
              addDownload(song);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SongList;
