import Loading from '@/components/custom/Loading';
import AlbumCard from '../album/AlbumCard';
import PlaylistCard from '../playlist/PlaylistCard';

const GenreCard = ({
  songs,
  isLoading,
}: {
  songs: SongsTypes | undefined;
  isLoading: boolean;
  query: string;
}) => {
  if (isLoading) return <Loading />;

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
          {songs?.trending.albums?.map((song) => (
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

export default GenreCard;
