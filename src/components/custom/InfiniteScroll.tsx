'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useMusicPlayer } from './MusicContextProvider';

const InfiniteHorizontalScroll = ({ query = 'hindi' }: { query: string }) => {
  const { getSong } = useMusicPlayer();
  const [page, setPage] = useState<number>(1);
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://saavn.dev/api/search/songs?query=${query}&page=${page}&limit=20`,
          { cache: 'force-cache' }
        );
        const jsonData = await response.json();
        setResults((prevResults) => [...prevResults, ...jsonData.data.results]);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, query]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth, scrollWidth } = scrollContainerRef.current;
    if (scrollLeft + clientWidth >= scrollWidth - 10 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [loading]);

  return (
    <div className="scroll-container gap-4" ref={scrollContainerRef}>
      {results.map((song) => (
        <div
          onClick={() => getSong(song.id)}
          key={song.id}
          className="rounded-lg w-36 cursor-pointer truncate"
        >
          <img
            className="rounded-lg"
            height={150}
            src={song.image[2]?.link || song.image[2]?.url}
            alt={song.title || song.name}
            width={150}
          />
          <h3
            className="truncate pt-2 text-sm"
            dangerouslySetInnerHTML={{
              __html: `${song?.name || song?.title}`,
            }}
          ></h3>
        </div>
      ))}
      {loading && <h1>Loading...</h1>}
    </div>
  );
};

export default InfiniteHorizontalScroll;
