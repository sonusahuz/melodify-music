'use client';
import React from 'react';
import { useMusicPlayer } from './MusicContextProvider';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import toast from 'react-hot-toast';

const AddFavorite = ({ song }: { song: Song }) => {
  const { favorites, addFavorite, removeFavorite } = useMusicPlayer();

  const isFavorite = favorites.some((favorite) => favorite.id === song.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      toast.remove('Remove from Liked Songs.');
      removeFavorite(song.id);
    } else {
      toast.success('Added to Liked Songs.');
      addFavorite(song);
    }
  };

  return (
    <div onClick={toggleFavorite}>
      {isFavorite ? (
        <AiFillHeart className="cursor-pointer text-red-700" size={25} />
      ) : (
        <AiOutlineHeart className="cursor-pointer" size={25} />
      )}
    </div>
  );
};

export default AddFavorite;
