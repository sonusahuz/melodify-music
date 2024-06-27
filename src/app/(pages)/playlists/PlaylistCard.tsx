import Link from 'next/link';
import React from 'react';

const PlaylistCard = ({ song }: { song: Playlists | Charts }) => {
  return (
    <Link href={`/playlists/${song.id}`} key={song.id} className="w-36">
      <img
        className="rounded-lg"
        height={150}
        src={song.image[2]?.link || song.image[2]?.url}
        alt={song.title || song.name}
        width={150}
      />
      <h3 className=" truncate pt-2 text-sm">{song?.name || song?.title}</h3>
    </Link>
  );
};

export default PlaylistCard;
