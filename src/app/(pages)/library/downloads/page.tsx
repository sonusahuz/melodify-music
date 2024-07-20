'use client';
import { useMusicPlayer } from '@/components/custom/MusicContextProvider';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';

import React from 'react';

const AlbumList = () => {
  const { downloads, getSong, removeDownload } = useMusicPlayer();

  if (downloads.length === 0) {
    return (
      <p className="text-center flex items-center justify-center text-2xl h-[80vh] font-semibold">
        No Downloads yet.
      </p>
    );
  }

  return (
    <div className="mb-36">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Downloads</h1>
        <span className="text-sm">{downloads.length} Downloads</span>
      </div>
      <div className="flex items-center justify-start flex-wrap flex-col">
        {downloads.map((download: any) => (
          <div
            className="mt-4 space-x-3 border p-2 rounded-lg w-full cursor-pointer"
            key={download.id}
          >
            <div className="flex items-center justify-start gap-3 truncate">
              <img
                onClick={() => getSong(download.id)}
                className="object-cover object-center rounded-sm"
                alt={`${download?.name}`}
                height={100}
                width={100}
                src={download.image[2].url || download?.image[2]?.url}
              />
              <div className="w-full truncate flex-col gap-1 flex">
                <h1
                  onClick={() => getSong(download.id)}
                  className="text-xl font-semibold truncate"
                >
                  {download.name}
                </h1>
                <small className="text-xs" onClick={() => getSong(download.id)}>
                  {download?.artists?.primary
                    ?.map((artist: any) => artist?.name)
                    .join(', ')}
                </small>
                <small className="text-xs">{download?.primaryArtists}</small>
                <Button
                  className="bg-red-600 font-medium flex items-center justify-center gap-2 h-8 w-28 dark:text-white"
                  onClick={() => removeDownload(download.id)}
                >
                  <Trash2 strokeWidth={1.25}  size={18}/>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumList;
