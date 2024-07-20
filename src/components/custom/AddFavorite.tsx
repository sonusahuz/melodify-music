'use client';
import React from 'react';
import { useMusicPlayer } from './MusicContextProvider';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const AddFavorite: React.FC<{ song: Song }> = ({ song }) => {
  const { favorites, addFavorite, removeFavorite, currentUser } =
    useMusicPlayer();
  const router = useRouter();

  const isFavorite = favorites.some((favorite) => favorite.id === song.id);

  const toggleFavorite = () => {
    if (currentUser) {
      if (isFavorite) {
        toast.success('Removed from Liked Songs.');
        removeFavorite(song.id);
      } else {
        toast.success('Added to Liked Songs.');
        addFavorite(song);
      }
    } else {
      router.push('/login');
    }
  };

  return (
    <div onClick={toggleFavorite}>
      {isFavorite ? (
        <AiFillHeart
          title="Remove from Liked Songs"
          className="cursor-pointer text-red-700"
          size={25}
        />
      ) : (
        <AiOutlineHeart
          title="Add to Liked Songs"
          className="cursor-pointer"
          size={25}
        />
      )}
    </div>
  );
};

export default AddFavorite;
