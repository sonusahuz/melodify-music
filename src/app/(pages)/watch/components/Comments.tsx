import { formatNumber } from '@/lib/utils';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import moment from 'moment';
import React from 'react';

const Comments = ({ commentData }: { commentData: any }) => {
  return (
    <div>
      <p>{commentData?.length} Comments</p>
      {commentData?.map((comment: any) => {
        const {
          authorDisplayName,
          authorProfileImageUrl,
          textDisplay,
          publishedAt,
          likeCount,
        } = comment?.snippet?.topLevelComment?.snippet;
        return (
          <div key={comment?.id} className="flex gap-2 my-4">
            <img
              src={authorProfileImageUrl}
              alt="S"
              className="rounded-full h-7 lg:h-10"
            />
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <h3 className="lg:text-sm text-xs font-semibold dark:text-gray-300">
                  {authorDisplayName}
                </h3>{' '}
                <p className="text-xs text-gray-500">
                  {moment(publishedAt).fromNow()}
                </p>
              </div>
              <p className="text-sm w-72 lg:w-96 truncate">{textDisplay}</p>
              <div className="flex items-center gap-2">
                <ThumbsUp size={15} />
                {formatNumber(likeCount)}
                <ThumbsDown size={15} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
