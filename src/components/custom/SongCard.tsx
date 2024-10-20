import Spinner from './Loading';
import PlaylistCard from '../../app/(pages)/playlist/PlaylistCard';
import AlbumCard from '@/app/(pages)/album/AlbumCard';

const SongCard = ({
  songs,
  isLoading,
}: {
  songs: SongsTypes | undefined;
  isLoading: boolean;
  query: string;
}) => {
  if (isLoading) return <Spinner />;

  return (
    <main className="mb-20">
      <section className="mx-auto">
        <h1 className="mt-6 mb-3 text-xl font-bold ">Top Playlists</h1>
        <div className="flex items-center justify-center gap-3 lg:gap-6 scroll-container">
          {songs?.playlists?.map((song) => (
            <PlaylistCard key={song.id} song={song} />
          ))}
        </div>
      </section>
      <section className="mx-auto">
        <h1 className="mt-6 mb-3 text-xl font-bold ">Top Albums</h1>
        <div className="flex items-center justify-center gap-3 lg:gap-6 scroll-container">
          {songs?.albums?.map((song) => (
            <AlbumCard key={song.id} song={song} />
          ))}
        </div>
      </section>
      <section className="mx-auto">
        <h1 className="mt-6 mb-3 text-xl font-bold ">Top Charts</h1>
        <div className="flex items-center justify-center gap-3 lg:gap-6 scroll-container">
          {songs?.charts?.map((song) => (
            <PlaylistCard key={song.id} song={song} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default SongCard;
