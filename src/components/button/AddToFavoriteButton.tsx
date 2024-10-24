'use client';
import React from 'react';
import toast from 'react-hot-toast';
import { Heart } from 'lucide-react';
import { AiFillHeart } from 'react-icons/ai';
import { useMusicPlayer } from '@/providers/MusicContextProvider';

const AddToFavoriteButton: React.FC<{ song: Song }> = ({ song }) => {
  const { favorites, addFavorite, removeFavorite } = useMusicPlayer();
  const isFavorite = favorites.some((favorite) => favorite.id === song.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      toast.success('Removed from Liked Songs.');
      removeFavorite(song.id);
    } else {
      toast.success('Added to Liked Songs.');
      addFavorite(song);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      aria-label={isFavorite ? 'Remove from Liked Songs' : 'Add to Liked Songs'}
      className="flex items-center p-2"
      role="switch" // Indicating it's a toggle action
      aria-checked={isFavorite} // Indicates the current state
    >
      {isFavorite ? (
        <AiFillHeart
          className="text-red-700"
          size={25}
          aria-hidden="true"
          strokeWidth={1.25}
        />
      ) : (
        <Heart size={25} aria-hidden="true" strokeWidth={1.25} />
      )}
      <span className="sr-only">
        {isFavorite ? 'Remove from Liked Songs' : 'Add to Liked Songs'}
      </span>
    </button>
  );
};

export default AddToFavoriteButton;
