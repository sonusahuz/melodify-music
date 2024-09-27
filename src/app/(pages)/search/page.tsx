/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { useMusicPlayer } from '@/components/custom/MusicContextProvider';
import Spinner from '@/components/custom/Loading';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import SongList from '@/components/custom/SongList';
import PlaylistCard from '../playlist/PlaylistCard';
import AlbumCard from '../album/AlbumCard';
import { artists, genre } from '@/lib/data';

const SearchSongs = () => {
  const { searchResults, searchLoading, searchError, songs, isLoading } =
    useMusicPlayer();

  if (searchLoading || isLoading) return <Spinner />;
  if (searchError) return <div>Something went wrong</div>;

  return (
    <div className="mt-3 mb-20">
      {!searchResults?.songs.results?.length ? (
        <div>
          <div>
            <h1 className="text-xl font-bold">Browse all</h1>
          </div>
          <div className="flex flex-wrap items-center justify-start gap-4 my-3 lg:gap-9">
            {genre.map((genre) => (
              <Link
                href={`/genre/${genre.link}`}
                className="cursor-pointer "
                key={genre.id}
              >
                <Badge variant="outline" className="text-white">
                  {genre.title}
                </Badge>
              </Link>
            ))}
          </div>
          <div>
            <h1 className="mt-6 mb-4 text-xl font-bold">Trending Artists</h1>
          </div>
          <div className="flex flex-wrap items-center justify-start gap-3 my-3 scroll-container scroll-hide">
            {artists.slice(10).map((artist) => (
              <Link
                href={`/artist/${artist.id}`}
                className="cursor-pointer "
                key={artist.id}
              >
                <div className="rounded-full overflow-hidden w-[150px] h-[150px]">
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
          <div className="mx-auto">
            <h1 className="mt-6 mb-4 text-xl font-bold">New Releases</h1>
            <div className="flex items-center justify-center gap-4 scroll-container">
              {songs?.trending?.albums?.map((song) => (
                <AlbumCard key={song.id} song={song} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="w-full mt-5">
            {searchResults?.topQuery?.results?.map((item) => (
              <div key={item.id}>
                <div>
                  {item.type === 'song' && (
                    <div>
                      <h1 className="mt-6 mb-2 text-xl font-bold">
                        Top Result
                      </h1>
                      <SongList song={item} />
                    </div>
                  )}
                </div>
                <div>
                  {item.type === 'artist' && (
                    <div>
                      <h1 className="mt-6 mb-3 text-xl font-bold">
                        Top Result
                      </h1>
                      <Link href={`/artist/${item.id}`}>
                        <div className="flex flex-wrap items-center justify-start gap-4">
                          <div>
                            <img
                              src={item.image[2]?.url}
                              alt={item.name}
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
                    </div>
                  )}
                </div>

                <div>
                  {item.type === 'album' && (
                    <div>
                      <h1 className="mt-6 mb-4 text-xl font-bold">
                        Top Result
                      </h1>
                      <div className="flex items-center justify-start gap-3">
                        <Link
                          href={`/album/${item.id}`}
                          key={item.id}
                          className="flex items-center justify-between gap-5 p-2 cursor-pointer"
                        >
                          <div className="rounded-md overflow-hidden w-[150px] h-auto lg:w-[130px] lg:h-[130px]">
                            <img
                              height={100}
                              width={100}
                              src={item.image[2].link || item.image[2].url}
                              alt={item.name}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="">
                            <h1 className="mt-2 text-xl font-normal">
                              {item?.name || item?.title}
                            </h1>
                            <h1 className="mt-1 text-xs font-normal">
                              {item?.type}
                            </h1>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  {item.type === 'playlist' && (
                    <div>
                      <h1 className="mt-6 mb-4 text-xl font-bold">
                        Top Result
                      </h1>
                      <Link
                        href={`/playlist/${item.id}`}
                        key={item.id}
                        className="rounded-lg w-36"
                      >
                        <img
                          className="rounded"
                          height={150}
                          src={item.image[2]?.link || item.image[2]?.url}
                          alt={item.title || item.name}
                          width={150}
                        />
                        <h3 className="p-2 text-sm truncate ">{item.title}</h3>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div>
              <h1 className="mt-6 mb-4 text-xl font-bold">Songs</h1>
              <div className="flex flex-col items-center gap-3">
                {searchResults?.songs?.results?.map((item: Song) => (
                  <SongList key={item.id} song={item} />
                ))}
              </div>
            </div>
            <div>
              <h1 className="mt-6 mb-2 text-xl font-bold">Albums</h1>
              <div
                className={`lg:flex md:justify-start md:items-center md:gap-4 md:flex-wrap ${'scroll-container gap-4'}`}
              >
                {searchResults?.albums?.results?.map((item: any) => (
                  <AlbumCard key={item.id} song={item} />
                ))}
              </div>
            </div>

            <div>
              <h1 className="mt-6 mb-4 text-xl font-bold">Playlists</h1>
              <div
                className={`lg:flex md:justify-start md:items-center md:gap-4 md:flex-wrap ${'scroll-container gap-4'}`}
              >
                {searchResults?.playlists?.results?.length === 0 && (
                  <p>No playlists found</p>
                )}
                {searchResults?.playlists?.results?.map((item: any) => (
                  <PlaylistCard key={item.id} song={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSongs;
