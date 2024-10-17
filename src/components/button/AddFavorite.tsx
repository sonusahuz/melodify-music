'use client';
import React from 'react';
import { useMusicPlayer } from '../custom/MusicContextProvider';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import toast from 'react-hot-toast';

const AddFavorite: React.FC<{ song: Song }> = ({ song }) => {
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
          title="Remove from Liked Songs"
          className="text-red-700"
          size={25}
          aria-hidden="true"
        />
      ) : (
        <AiOutlineHeart
          title="Add to Liked Songs"
          size={25}
          aria-hidden="true"
        />
      )}
      <span className="sr-only">
        {isFavorite ? 'Remove from Liked Songs' : 'Add to Liked Songs'}
      </span>
    </button>
  );
};

export default AddFavorite;
