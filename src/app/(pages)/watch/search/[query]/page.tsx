'use client';

import Spinner from '@/components/custom/Loading';
import { getSearchVideos } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import VideoCard from '../../components/VideoCard';
import Link from 'next/link';

const SearchQuery = ({ params }: { params: { query: string } }) => {
  const {
    data: searchData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['searchQuery', params.query],
    queryFn: () => getSearchVideos(params.query),
  });

  if (isLoading) return <Spinner />;
  if (isError) return <div>Video not found</div>;
  const filterData = searchData?.filter((video: any) => video?.id?.videoId);
  return (
    <div className="md:flex md:flex-wrap md:justify-between">
      {searchData && searchData?.length > 0 ? (
        <>
          {filterData.map((video: any) => (
            <div key={video?.id?.videoId}>
              <Link href={`/watch/${video?.id?.videoId}`}>
                <VideoCard info={video} />
              </Link>
            </div>
          ))}
        </>
      ) : (
        <p className="flex items-center justify-center h-[90vh] w-full">
          No videos found.
        </p>
      )}
    </div>
  );
};

export default SearchQuery;
