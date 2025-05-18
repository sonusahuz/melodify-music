/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { useMusicPlayer } from '@/providers/MusicContextProvider';
import Spinner from '@/components/custom/Loading';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import SongList from '@/components/custom/SongList';
import { artists, genre } from '@/lib/data';
import AlbumCard from '../album/AlbumCard';
import PlaylistCard from '../playlist/PlaylistCard';

const SearchSongs = () => {
  const { searchResults, searchLoading, searchError, songs, isLoading } =
    useMusicPlayer();

  if (searchLoading || isLoading) return <Spinner />;
  if (searchError) return <div>Something went wrong</div>;

  return (
    <main className="mt-3 mb-20">
      {!searchResults?.songs.results?.length ? (
        <section>
          <header>
            <h1 className="text-xl font-bold">Browse all</h1>
          </header>
          <div className="flex flex-wrap items-center justify-start gap-4 my-3 lg:gap-9">
            {genre.map((genre) => (
              <Link
                href={`/genre/${genre.link}`}
                className="cursor-pointer"
                key={genre.id}
              >
                <Badge variant="outline">{genre.title}</Badge>
              </Link>
            ))}
          </div>
          <header>
            <h1 className="mt-6 mb-4 text-xl font-bold">Trending Artists</h1>
          </header>
          <div className="flex flex-wrap items-center justify-start gap-3 lg:gap-6 my-3 scroll-container scroll-hide">
            {artists.slice(10).map((artist) => (
              <Link
                href={`/artist/${artist.id}`}
                className="cursor-pointer"
                key={artist.id}
              >
                <div className="rounded-full overflow-hidden w-[150px] lg:h-[170px] h-[150px] lg:w-[170px]">
                  <img
                    height={100}
                    width={100}
                    src={artist.image}
                    alt={artist.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h1 className="mt-2 text-xs font-normal text-center">
                  {artist.name}
                </h1>
                <h1 className="mt-1 text-xs font-normal text-center">
                  {artist.type}
                </h1>
              </Link>
            ))}
          </div>
          <header className="mx-auto">
            <h1 className="mt-6 mb-4 text-xl font-bold">New Releases</h1>
          </header>
          <div className="flex items-center justify-center gap-3 lg:gap-6 scroll-container">
            {songs?.trending?.albums?.map((song) => (
              <AlbumCard key={song.id} song={song} />
            ))}
          </div>
        </section>
      ) : (
        <section>
          <div className="w-full mt-5">
            {searchResults?.topQuery?.results?.map((item) => (
              <article key={item.id}>
                {item.type === 'song' && (
                  <section>
                    <h1 className="mt-6 mb-2 text-xl font-bold">Top Result</h1>
                    <SongList song={item} />
                  </section>
                )}
                {item.type === 'artist' && (
                  <section>
                    <h1 className="mt-6 mb-3 text-xl font-bold">Top Result</h1>
                    <Link href={`/artist/${item.id}`}>
                      <div className="flex flex-wrap items-center justify-start gap-4">
                        <div>
                          <img
                            height={100}
                            width={100}
                            src={item.image[2]?.url}
                            alt={item.name as string}
                            className="rounded-full object-cover w-[100px] h-[100px] lg:w-[150px] lg:h-[150px]"
                          />
                        </div>
                        <div>
                          <h1 className="mt-2 text-xl font-bold capitalize">
                            {item.title}
                          </h1>
                          <h1 className="mt-2 text-sm font-normal capitalize">
                            {item.type}
                          </h1>
                        </div>
                      </div>
                    </Link>
                  </section>
                )}
                {item.type === 'album' && (
                  <section>
                    <h1 className="mt-6 mb-4 text-xl font-bold">Top Result</h1>
                    <Link
                      href={`/album/${item.id}`}
                      className="flex items-center justify-start gap-5 p-2 cursor-pointer"
                    >
                      <div className="rounded-md overflow-hidden w-[150px] h-auto lg:w-[130px] lg:h-[130px]">
                        <img
                          height={100}
                          width={100}
                          src={item.image[2].link || item.image[2].url}
                          alt={item.title || (item.name as string)}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <h1 className="mt-2 text-xl font-normal">
                          {item?.name || item?.title}
                        </h1>
                        <h1 className="mt-1 text-xs font-normal">
                          {item?.type}
                        </h1>
                      </div>
                    </Link>
                  </section>
                )}
                {item.type === 'playlist' && (
                  <section>
                    <h1 className="mt-6 mb-4 text-xl font-bold">Top Result</h1>
                    <Link
                      href={`/playlist/${item.id}`}
                      className="rounded-lg w-36"
                    >
                      <img
                        className="rounded"
                        height={150}
                        src={item.image[2]?.link || item.image[2]?.url}
                        alt={item.title || (item.name as string)}
                        width={150}
                      />
                      <h3 className="p-2 text-sm truncate">{item.title}</h3>
                    </Link>
                  </section>
                )}
              </article>
            ))}
            <section>
              <h1 className="mt-6 mb-4 text-xl font-bold">Songs</h1>
              <div className="flex flex-col items-center gap-3">
                {searchResults?.songs?.results?.map((item: Song) => (
                  <SongList key={item.id} song={item} />
                ))}
              </div>
            </section>
            <section>
              <h1 className="mt-6 mb-2 text-xl font-bold">Albums</h1>
              <div
                className={`scroll-container gap-4`}
              >
                {searchResults?.albums?.results?.map((item: any) => (
                  <AlbumCard key={item.id} song={item} />
                ))}
              </div>
            </section>
            <section>
              <h1 className="mt-6 mb-4 text-xl font-bold">Playlists</h1>
              <div
                className={`scroll-container gap-4`}
              >
                {searchResults?.playlists?.results?.length === 0 && (
                  <p>No playlists found</p>
                )}
                {searchResults?.playlists?.results?.map((item: any) => (
                  <PlaylistCard key={item.id} song={item} />
                ))}
              </div>
            </section>
          </div>
        </section>
      )}
    </main>
  );
};

export default SearchSongs;
