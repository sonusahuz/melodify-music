import Link from 'next/link';
import React from 'react';

interface PlaylistCardProps {
  song: Playlists | Charts; // Assuming Playlists and Charts are defined elsewhere
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ song }) => {
  const imageUrl =
    song.image[2]?.link || song.image[2]?.url || '/default-image.jpg'; // Default image

  return (
    <Link
      href={`/playlist/${song.id}`}
      className="lg:w-[170px] w-[150px]"
      aria-label={`View playlist ${song.name || song.title}`}
    >
      <figure>
        <img
          className="rounded-lg"
          height={170}
          width={170}
          src={imageUrl}
          alt={song.title || song.name || 'Playlist cover'}
        />
        <figcaption className="pt-2">
          <h3 className="text-sm truncate">{song.name || song.title}</h3>
        </figcaption>
      </figure>
    </Link>
  );
};

export default PlaylistCard;
