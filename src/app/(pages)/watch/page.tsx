'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';
import VideoCard from './components/VideoCard';
import Spinner from '@/components/custom/Loading';
import { getYoutubeVideos } from '@/lib/api';

const WatchVideos = () => {
  const { data: videos, isLoading } = useQuery({
    queryKey: ['videos'],
    queryFn: async () => getYoutubeVideos(),
    staleTime: Infinity,
  });

  if (isLoading) return <Spinner />;
  return (
    <div className="md:flex md:flex-wrap md:justify-between">
      {videos && videos.length > 0 ? (
        videos.map((video: any) => (
          <div key={video.id.videoId || video.id}>
            <Link href={`/watch/${video.id.videoId || video.id}`}>
              <VideoCard info={video} />
            </Link>
          </div>
        ))
      ) : (
        <p className="flex items-center justify-center h-[90vh] w-full">
          No videos found.
        </p>
      )}
    </div>
  );
};

export default WatchVideos;
