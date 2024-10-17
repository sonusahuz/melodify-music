import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface AlbumCardProps {
  song: Albums;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ song }) => {
  const albumImage =
    song.image?.[2]?.link || song.image?.[2]?.url || '/default-image.jpg';
  const albumTitle = song.name || song.title || 'Album cover';

  return (
    <Link
      href={`/album/${song.id}`}
      aria-label={`View album: ${albumTitle}`}
      className="w-[150px]"
    >
      <figure className="w-full">
        <Image
          className="rounded-lg"
          height={150}
          width={150}
          loading="lazy" // Lazy load the image for performance
          src={albumImage}
          alt={albumTitle}
        />
        <figcaption className="pt-2">
          <h3 className="text-sm truncate">{albumTitle}</h3>
        </figcaption>
      </figure>
    </Link>
  );
};

export default AlbumCard;
