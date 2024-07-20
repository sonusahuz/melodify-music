'use client';
import { useMusicPlayer } from '@/components/custom/MusicContextProvider';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import {
  CircleUserRound,
  Disc3,
  Download,
  Heart,
  ListMusic,
  LogOut,
  MicVocal,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { signOut } from 'firebase/auth';
import { auth } from '../../(auth)/firebase';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Library = () => {
  const { favorites, currentUser, artists, playlists, downloads, albums } =
    useMusicPlayer();
  const router = useRouter();

  async function handleLogout() {
    if (currentUser) {
      await signOut(auth);
      toast.success('Logged out successfully');
      router.push('/');
    }
  }
  return (
    <div className="mx-auto mb-36 max-w-2xl">
      <section className="text-gray-600 body-font">
        <div className="flex flex-col items-center mx-auto w-full">
          <div className="mx-auto py-4">
            <CircleUserRound size={200} />
          </div>
          <div className="text-center">
            <h1 className="title-font sm:text-xl text-sm font-normal dark:text-white lg:py-0 py-2">
              {currentUser?.displayName || currentUser?.email}
            </h1>
          </div>
        </div>
      </section>
      <h1 className="text-2xl font-bold py-4">Library</h1>
      <div className="flex flex-col gap-4">
        <Link href={'/library/liked-songs'}>
          <Card className="w-full p-2">
            <div className="flex justify-start gap-4 items-center">
              <Heart size={37} />
              <div>
                <CardTitle className="text-xl">Liked Songs</CardTitle>
                <span className="text-xs">{favorites.length} Songs</span>
              </div>
            </div>
          </Card>
        </Link>
        <Link href={'/library/albums'}>
          <Card className="w-full p-2">
            <div className="flex justify-start gap-4 items-center">
              <Disc3 size={37} />
              <div>
                <CardTitle className="text-xl">Albums</CardTitle>
                <span className="text-xs">{albums.length} Albums</span>
              </div>
            </div>
          </Card>
        </Link>
        <Link href={'/library/playlists'}>
          <Card className="w-full p-2">
            <div className="flex justify-start gap-4 items-center">
              <ListMusic size={37} />
              <div>
                <CardTitle className="text-xl">Playlists</CardTitle>
                <span className="text-xs">{playlists.length} Playlists</span>
              </div>
            </div>
          </Card>
        </Link>
        <Link href={'/library/artists'}>
          <Card className="w-full p-2">
            <div className="flex justify-start gap-4 items-center">
              <MicVocal size={37} />
              <div>
                <CardTitle className="text-xl">Artists</CardTitle>
                <span className="text-xs">{artists.length} Artists</span>
              </div>
            </div>
          </Card>
        </Link>
        <Link href={'/library/downloads'}>
          <Card className="w-full p-2">
            <div className="flex justify-start gap-4 items-center">
              <Download size={37} />
              <div>
                <CardTitle className="text-xl">Downloads</CardTitle>
                <span className="text-xs">{downloads.length} Downloads</span>
              </div>
            </div>
          </Card>
        </Link>
      </div>
      <div>
        <Button
          onClick={handleLogout}
          className="bg-red-600 text-white w-full mt-5 h-11 flex items-center justify-center gap-3"
        >
          <LogOut size={23} strokeWidth={1.25} />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Library;
