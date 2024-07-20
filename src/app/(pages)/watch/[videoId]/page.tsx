'use client';
import Spinner from '@/components/custom/Loading';
import { Button } from '@/components/ui/button';
import { COMMENTS_API, getSingleVideo } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import React from 'react';
import Comments from '../components/Comments';
import { formatNumber } from '@/lib/utils';

const SingleVideo = ({ params }: { params: { videoId: string } }) => {
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [showComments, setShowComments] = React.useState(false);

  // fetch single videos
  const { data, isLoading: videoLoading } = useQuery({
    queryKey: ['videos', params.videoId],
    queryFn: async () => getSingleVideo(params.videoId),
  });

  // fetch comments
  const { data: commentData, isLoading: commentLoading } = useQuery({
    queryKey: ['comments', params.videoId],
    queryFn: async () => {
      const res = await fetch(COMMENTS_API + params?.videoId);
      const json = await res.json();
      return json.items;
    },
  });

  if (videoLoading || commentLoading) return <Spinner />;

  return (
    <div className="lg:flex lg:items-start lg:justify-between lg:gap-5">
      <div className="flex flex-col lg:w-[65%]">
        <div>
          <iframe
            className="md:h-[30rem] h-60 w-full lg:rounded-lg"
            src={`https://www.youtube.com/embed/${params?.videoId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div>
          <div className="">
            <div className="flex flex-col gap-1">
              <div>
                <h2 className="md:text-xl font-semibold pt-2">
                  {data?.snippet?.title}
                </h2>
              </div>
              <div className=" dark:bg-gray-950 rounded-lg">
                <div className="flex flex-col">
                  <p className="font-semibold text-xs text-gray-500">
                    {formatNumber(data?.statistics?.viewCount)} views &nbsp;{' '}
                    {moment(data?.snippet?.publishedAt).fromNow()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center ">
                <div className="bg-gray-200 rounded-full w-2 p-5 md:p-6 h-2"></div>
                <div className="ml-2">
                  <h2 className="font-semibold text-sm md:text-base">
                    {data?.snippet?.channelTitle}
                  </h2>
                  <p className="text-gray-500 text-xs">20M subscribers</p>
                </div>
              </div>
              <div>
                <Button
                  onClick={() => setIsSubscribed(!isSubscribed)}
                  className="bg-black dark:bg-white rounded-full"
                >
                  {isSubscribed ? 'Subscribed' : 'Subscribe'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5 mb-36 lg:mb-0 md:border md:p-4 lg:w-[35%] lg:rounded-lg lg:overflow-y-scroll lg:h-[88vh]">
        <Comments commentData={commentData} />
      </div>
    </div>
  );
};

export default SingleVideo;
