import React from 'react';
import moment from 'moment/moment';
import { formatNumber } from '@/lib/utils';
import { FaCircleCheck } from 'react-icons/fa6';
const VideoCard = ({ info }: { info: any }) => {
  const { snippet } = info;
  const { channelTitle, title, thumbnails, publishedAt } = snippet;
  const { viewCount } = info?.statistics || {};
  return (
    <div className="space-y-2 mb-6 md:w-[19.5rem] cursor-pointer rounded-lg">
      <img
        src={thumbnails?.medium?.url}
        alt="thumbnail"
        className="rounded-xl w-full"
      />
      <div className="flex flex-col ">
        <h2 className="font-semibold truncate">{title}</h2>
        <div className="flex items-center justify-start gap-2 text-xs font-semibold text-gray-500">
          <p>{channelTitle}</p>
          <FaCircleCheck />
        </div>
        <div className="flex items-center justify-start gap-2 text-xs font-normal text-gray-500 pt-1">
          <p>{formatNumber(viewCount)} views</p>
          <li>{moment(publishedAt).fromNow()}</li>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
