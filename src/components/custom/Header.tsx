'use client';
import { ArrowLeft, Search, Heart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillGithub } from 'react-icons/ai';
import { PiMusicNoteSimpleFill } from 'react-icons/pi';
import React from 'react';
import { useMusicPlayer } from '@/providers/MusicContextProvider';
import { Input } from '../ui/input';
import { ModeToggle } from '../button/DarkModeButton';

const Header = () => {
  const { search, setSearch } = useMusicPlayer();
  const path = usePathname();
  const [showSearch, setShowSearch] = React.useState(false);

  return (
    <header className="sticky top-0 flex items-center justify-between gap-4 py-3 dark:bg-black bg-white">
      <div className="">
        {path.startsWith('/search') ? (
          <Link href={'/'}>
            <ArrowLeft size={25} name="back-button" />
          </Link>
        ) : (
          <Link href={'/'} className="flex items-center gap-2 justify-center">
            <PiMusicNoteSimpleFill size={25} name="website-logo" />
            <span className="text-[22px]">Melodify</span>
          </Link>
        )}
      </div>
      <div className="hidden md:block">
        <Link href={'/search'}>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder="Search..."
            className="lg:w-[700px] w-72 md:w-[500px] rounded-full px-4 dark:bg-[#000000] border"
          />
        </Link>
      </div>
      <div className="md:hidden">
        {path.startsWith('/search') && (
          <Input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder="Search..."
            className="lg:w-[700px] w-72 md:w-[500px] rounded-full px-4 dark:bg-[#000000]"
          />
        )}
        <div className="flex items-center gap-4">
          {!path.startsWith('/search') && (
            <>
              <Link href={'/search'}>
                <Search
                  name="search-bar"
                  size={25}
                  strokeWidth={1.25}
                  onClick={() => setShowSearch(!showSearch)}
                />
              </Link>
              <Link href={'/liked-songs'}>
                <Heart
                  className="cursor-pointer"
                  size={25}
                  strokeWidth={1.25}
                />
              </Link>
              <ModeToggle />
            </>
          )}
        </div>
      </div>
      <div className="hidden md:block">
        <div className="flex items-center gap-4">
          <div>
            <Search
              name="search-bar"
              className="cursor-pointer md:hidden"
              size={25}
              strokeWidth={1.25}
              onClick={() => setShowSearch(!showSearch)}
            />
            <Link href={'/liked-songs'}>
              <Heart className="cursor-pointer" size={25} strokeWidth={1.25} />
            </Link>
          </div>

          <a href="https://github.com/sonusahuz/melodify-music" target="_blank">
            <AiFillGithub size={25} strokeWidth={1.25} />
          </a>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
