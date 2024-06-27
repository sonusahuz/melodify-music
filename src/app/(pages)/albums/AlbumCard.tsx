import Link from 'next/link';
import React from 'react';

const AlbumCard = ({ song }: { song: Albums }) => {
  return (
    <Link href={`/albums/${song.id}`} key={song.id} className="w-36">
      <img
        className=" rounded-lg"
        height={150}
        src={song.image[2]?.link || song.image[2]?.url}
        alt={song.name}
        width={150}
      />
      <div className="pt-2">
        <h3 className=" truncate text-sm">{song?.name || song?.title}</h3>
      </div>
    </Link>
  );
};

export default AlbumCard;
