'use client';
import React from 'react';
import { useMusicPlayer } from '@/components/custom/MusicContextProvider';
import Spinner from '@/components/custom/Loading';
import { genre } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import AlbumCard from '../album/AlbumCard';
import SongList from '@/components/custom/SongList';
import AddFavorite from '@/components/custom/AddFavorite';
import { ArrowDownToLine } from 'lucide-react';
import InfiniteHorizontalScroll from '@/components/custom/InfiniteScroll';
import PlaylistCard from '../playlist/PlaylistCard';

const SearchSongs = () => {
  const {
    searchResults,
    searchLoading,
    searchError,
    songs,
    isLoading,
    search,
    getSong,
    handleDownloadSong,
  } = useMusicPlayer();

  if (searchLoading || isLoading) return <Spinner />;
  if (searchError) return <div>Something went wrong</div>;

  return (
    <div className="mb-36">
      {!searchResults?.songs.results?.length ? (
        <div>
          <div>
            <h1 className="text-2xl font-bold">Browse all</h1>
          </div>
          <div className="flex items-center justify-between gap-2 lg:gap-1 flex-wrap my-2">
            {genre.map((genre) => (
              <Link
                href={`/genre/${genre.link}`}
                className=" cursor-pointer"
                key={genre.id}
              >
                <Badge variant="outline">{genre.title}</Badge>
              </Link>
            ))}
          </div>
          <div className="mx-auto">
            <h1 className="text-2xl font-bold mt-6 mb-2">Trending Songs</h1>
            <div className="flex justify-center items-center scroll-container gap-4">
              {songs?.trending?.albums?.map((song) => (
                <AlbumCard key={song.id} song={song} />
              ))}
            </div>
          </div>
          <div className="mx-auto">
            <h1 className=" text-2xl font-bold mt-6 mb-2">Latest Punjabi</h1>
            <InfiniteHorizontalScroll query="punjabi" />
          </div>
        </div>
      ) : (
        <div>
          <div className="w-full mb-40 mt-5">
            {searchResults?.topQuery?.results?.map((item) => (
              <div key={item.id}>
                <div>
                  {item.type === 'song' && (
                    <div>
                      <h1 className="text-2xl font-bold mb-2 mt-6">
                        Top Result
                      </h1>
                      <div
                        onClick={() => getSong(item.id)}
                        key={item.id}
                        className="pt-2 rounded-lg w-full cursor-pointer my-2 border p-2 shadow-md"
                      >
                        <div className="flex items-center gap-2 justify-between flex-wrap">
                          <div className="flex items-center justify-between gap-3 sm:w-auto w-60 truncate">
                            <img
                              src={`${
                                item?.image[2]?.url || item?.image[2]?.link
                              }`}
                              alt={item.title}
                              width={50}
                              height={50}
                              className="rounded"
                            />
                            <div className="lg:w-96 w-60 truncate">
                              <h1
                                className="truncate text-sm font-semibold"
                                dangerouslySetInnerHTML={{
                                  __html: `${item?.name || item?.title}`,
                                }}
                              ></h1>
                              <small className="text-xs">
                                {item?.primaryArtists}
                              </small>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <AddFavorite song={item} />
                            <ArrowDownToLine
                              size={25}
                              className="cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownloadSong(item);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  {item.type === 'artist' && (
                    <div>
                      <h1 className="text-2xl font-bold mb-2 mt-6">
                        Top Result
                      </h1>
                      <Link href={`/artist/${item.id}`}>
                        <div className="flex items-center justify-start gap-3 p-2">
                          <img
                            src={item.image[2]?.url}
                            alt={item.name}
                            className="rounded-full object-cover w-[120px] h-[120px] lg:w-[130px] lg:h-[130px]"
                          />
                          <div>
                            <h1 className="text-2xl font-bold mt-2 capitalize">
                              {item.title}
                            </h1>
                            <h1 className="text-sm font-normal mt-2 capitalize">
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
                      <h1 className="text-2xl font-bold mb-2 mt-6">
                        Top Result
                      </h1>
                      <div className="flex items-center justify-start gap-3">
                        <Link
                          href={`/album/${item.id}`}
                          key={item.id}
                          className="flex justify-between gap-5 p-2 items-center cursor-pointer"
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
                      <h1 className="text-2xl font-bold mb-2 mt-6">
                        Top Result
                      </h1>
                      <Link
                        href={`/playlist/${item.id}`}
                        key={item.id}
                        className="w-36 rounded-lg"
                      >
                        <img
                          className="rounded"
                          height={150}
                          src={item.image[2]?.link || item.image[2]?.url}
                          alt={item.title || item.name}
                          width={150}
                        />
                        <h3 className=" truncate p-2 text-sm">{item.title}</h3>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div>
              <h1 className="text-2xl font-bold mb-2 mt-6">Songs</h1>
              {searchResults?.songs?.results?.map((item: any) => (
                <SongList key={item.id} song={item} />
              ))}
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2 mt-6">Albums</h1>
              <div
                className={`lg:flex md:justify-start md:items-center md:gap-4 md:flex-wrap ${'scroll-container gap-4'}`}
              >
                {searchResults?.albums?.results?.map((item: any) => (
                  <AlbumCard key={item.id} song={item} />
                ))}
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-bold mb-2 mt-6">Playlists</h1>
              <div
                className={`lg:flex md:justify-start md:items-center md:gap-4 md:flex-wrap ${'scroll-container gap-4'}`}
              >
                {searchResults?.playlists?.results?.map((item: any) => (
                  <PlaylistCard key={item.id} song={item} />
                ))}
              </div>
            </div>
            <div>
              <div className="mx-auto">
                <h1 className="text-2xl font-bold mb-2 mt-6">
                  Discover more songs
                </h1>
                <InfiniteHorizontalScroll query={search} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSongs;
