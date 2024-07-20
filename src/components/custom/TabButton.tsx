'use client';
import { Compass, House, Library, LogIn, Search, TvMinimalPlay } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { ModeToggle } from './DarkModeButton';
import GetMusicProps from './GetMusicProps';

const TabButton = () => {
  const { currentUser, theme, setTheme } = GetMusicProps();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  return (
    <div className="fixed bottom-0 border-t-2 right-0 left-0 dark:bg-gray-950 bg-[#f1f3f4] z-20 px-5 py-2 md:hidden">
      <div className="flex items-center gap-4 justify-between">
        <Link href={'/'}>
          <House strokeWidth={1.25} size={23} className="text-center mx-auto" />
          <span className="text-xs">Home</span>
        </Link>

        <Link href={'/explore'}>
          <Compass
            strokeWidth={1.25}
            size={23}
            className="text-center mx-auto"
          />
          <span className="text-xs">Explore</span>
        </Link>

        <Link href={'/watch'}>
          <TvMinimalPlay
            strokeWidth={1.25}
            size={23}
            className="text-center mx-auto"
          />
          <span className="text-xs">Watch</span>
        </Link>

        {currentUser ? (
          <Link href={'/library'}>
            <Library
              strokeWidth={1.25}
              size={23}
              className="text-center mx-auto"
            />
            <span className="text-xs">Library</span>
          </Link>
        ) : (
          <Link href={'/login'}>
            <LogIn
              strokeWidth={1.25}
              size={23}
              className="text-center mx-auto"
            />
            <span className="text-xs">Login</span>
          </Link>
        )}
        <div onClick={toggleTheme}>
          <ModeToggle />
          <span className="text-xs">
            {theme === 'light' ? 'Light' : 'Dark'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TabButton;
