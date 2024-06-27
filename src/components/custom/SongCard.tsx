'use client';
import Spinner from '@/components/custom/Loading';
import PlaylistCard from '../../app/(pages)/playlists/PlaylistCard';
import AlbumCard from '@/app/(pages)/albums/AlbumCard';
import ResponsiveWrapper from './Responsive';

const SongCard = ({
  songs,
  isLoading,
}: {
  songs: SongsTypes | undefined;
  isLoading: boolean;
}) => {
  if (isLoading) return <Spinner />;

  return (
    <div className="mb-36">
      <div className="mx-auto">
        <h1 className=" text-2xl font-bold pb-4">Top Playlists</h1>
        <ResponsiveWrapper
          mobileWrapper={
            <>
              {songs?.playlists?.map((song) => (
                <PlaylistCard key={song.id} song={song} />
              ))}
            </>
          }
          desktopWrapper={
            <>
              {songs?.playlists?.map((song) => (
                <PlaylistCard key={song.id} song={song} />
              ))}
            </>
          }
        />
      </div>
      <div className="mx-auto">
        <h1 className=" text-2xl font-bold py-4">Top Albums</h1>
        <ResponsiveWrapper
          mobileWrapper={
            <>
              {songs?.albums?.map((song) => (
                <AlbumCard key={song.id} song={song} />
              ))}
            </>
          }
          desktopWrapper={
            <>
              {songs?.albums?.map((song) => (
                <AlbumCard key={song.id} song={song} />
              ))}
            </>
          }
        />
      </div>
      <div className="mx-auto">
        <h1 className=" text-2xl font-bold py-4">Trending Songs</h1>
        <ResponsiveWrapper
          mobileWrapper={
            <>
              {songs?.trending?.albums?.map((song) => (
                <AlbumCard key={song.id} song={song} />
              ))}
            </>
          }
          desktopWrapper={
            <>
              {songs?.trending?.albums?.map((song) => (
                <AlbumCard key={song.id} song={song} />
              ))}
            </>
          }
        />
      </div>
      <div>
        <h1 className=" text-2xl font-bold py-4">Top Charts</h1>
        <ResponsiveWrapper
          mobileWrapper={
            <>
              {songs?.charts?.map((song) => (
                <PlaylistCard key={song.id} song={song} />
              ))}
            </>
          }
          desktopWrapper={
            <>
              {songs?.charts?.map((song) => (
                <PlaylistCard key={song.id} song={song} />
              ))}
            </>
          }
        />
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
