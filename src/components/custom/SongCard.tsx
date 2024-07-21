import Spinner from './Loading';
import PlaylistCard from '../../app/(pages)/playlist/PlaylistCard';
import AlbumCard from '../../app/(pages)/album/AlbumCard';
import InfiniteHorizontalScroll from './InfiniteScroll';
import GetMusicProps from './GetMusicProps';

const SongCard = ({
  songs,
  isLoading,
  query,
}: {
  songs: SongsTypes | undefined;
  isLoading: boolean;
  query: string;
}) => {
  const { path } = GetMusicProps();
  if (isLoading) return <Spinner />;

  return (
    <div className="mb-36">
      <div className="mx-auto">
        {path.startsWith('/genre') ? (
          <div>
            <h1 className="text-2xl font-bold mb-2 mt-6">Trending Now</h1>
            <InfiniteHorizontalScroll query={query} />
          </div>
        ) : (
          <div className="">
            <h1 className="text-2xl font-bold mb-2 mt-6">Trending Now</h1>
            <InfiniteHorizontalScroll query="hindi" />
          </div>
        )}
      </div>
      <div className="mx-auto">
        <h1 className=" text-2xl font-bold mb-2 mt-6">Top Playlists</h1>
        <div className="flex justify-center items-center scroll-container gap-4">
          {songs?.playlists?.map((song) => (
            <PlaylistCard key={song.id} song={song} />
          ))}
        </div>
      </div>
      <div className="mx-auto">
        {path.startsWith('/genre') ? (
          <div className=" hidden">
            <h1 className="text-2xl font-bold mb-2 mt-6">Best of 90s</h1>
            <InfiniteHorizontalScroll query={query} />
          </div>
        ) : (
          <div className="hidden md:block">
            <h1 className="text-2xl font-bold mb-2 mt-6">Best of 90s</h1>
            <InfiniteHorizontalScroll query="90s songs" />
          </div>
        )}
      </div>
      <div className="mx-auto">
        <h1 className=" text-2xl font-bold mb-2 mt-6">Top Albums</h1>
        <div className="flex justify-center items-center scroll-container gap-4">
          {songs?.albums?.map((song) => (
            <AlbumCard key={song.id} song={song} />
          ))}
        </div>
      </div>
      <div className="mx-auto">
        {path.startsWith('/genre') ? (
          <div className=" hidden">
            <h1 className="text-2xl font-bold mb-2 mt-6 hidden">
              Bhakti - Hindi
            </h1>
            <InfiniteHorizontalScroll query="" />
          </div>
        ) : (
          <div className="">
            <h1 className="text-2xl font-bold mb-2 mt-6">Bhakti - Hindi</h1>
            <InfiniteHorizontalScroll query="bhakti hindi" />
          </div>
        )}
      </div>
      <div className="mx-auto">
        {path.startsWith('/genre') ? (
          <div className=" hidden">
            <h1 className="text-2xl font-bold mb-2 mt-6">Explore Lofi Songs</h1>
            <InfiniteHorizontalScroll query={query} />
          </div>
        ) : (
          <div className="">
            <h1 className="text-2xl font-bold mb-2 mt-6">Explore Lofi Songs</h1>
            <InfiniteHorizontalScroll query="lofi songs" />
          </div>
        )}
      </div>
      <div className="mx-auto">
        {path.startsWith('/genre') ? (
          <div className="hidden">
            <h1 className="text-2xl font-bold mb-2 mt-6">
              International Top Hits
            </h1>
            <InfiniteHorizontalScroll query="english" />
          </div>
        ) : (
          <div className="">
            <h1 className="text-2xl font-bold mb-2 mt-6">
              International Top Hits
            </h1>
            <InfiniteHorizontalScroll query="english" />
          </div>
        )}
      </div>
      <div className="mx-auto">
        {path.startsWith('/genre') ? (
          <div className="hidden">
            <h1 className="text-2xl font-bold mb-2 mt-6">Top Party Hits</h1>
            <InfiniteHorizontalScroll query="party songs" />
          </div>
        ) : (
          <div className="">
            <h1 className="text-2xl font-bold mb-2 mt-6">Top Party Hits</h1>
            <InfiniteHorizontalScroll query="party songs" />
          </div>
        )}
      </div>
      <div className="mx-auto">
        <h1 className=" text-2xl font-bold mb-2 mt-6">Top Charts</h1>
        <div
          className={`lg:flex md:justify-start md:items-center md:gap-4 md:flex-wrap ${'scroll-container gap-4'}`}
        >
          {songs?.charts?.map((song) => (
            <PlaylistCard key={song.id} song={song} />
          ))}
        </div>
      </div>
      <div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-center text-gray-500 sm:text-center dark:text-gray-400">
          Design & Developed By Sonu Sahu
        </span>
      </div>
    </div>
  );
};

export default SongCard;
