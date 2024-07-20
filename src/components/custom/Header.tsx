'use client';
import { ArrowLeft, Music2 } from 'lucide-react';
import Link from 'next/link';
import { Input } from '../ui/input';
import { usePathname, useRouter } from 'next/navigation';
import { useMusicPlayer } from './MusicContextProvider';
import { Button } from '../ui/button';
import { ModeToggle } from './DarkModeButton';
import React from 'react';
import toast from 'react-hot-toast';

const Header = ({ children }: { children: React.ReactNode }) => {
  const { search, setSearch, currentUser } = useMusicPlayer();
  const [youtubeSearch, setYoutubeSearch] = React.useState('');
  const path = usePathname();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (youtubeSearch.trim() === '') {
        toast.error('Please fill the input field');
      } else {
        setYoutubeSearch('');
        router.push(`/watch/search/${youtubeSearch}`);
      }
    }
  };
  return (
    <div>
      <header className="flex items-center justify-between gap-4 py-4">
        <div className="">
          {path.startsWith('/search') ? (
            <Link href={'/'}>
              <ArrowLeft size={30} />
            </Link>
          ) : (
            <Link href={'/'}>
              <Music2 size={30} />
            </Link>
          )}
        </div>
        <div>
          {path.startsWith('/watch') ? (
            <Input
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={youtubeSearch}
              type="text"
              placeholder="Search..."
              className="lg:w-[700px] w-72 md:w-[500px] rounded-full px-4"
            />
          ) : (
            <Link href={'/search'}>
              <Input
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="text"
                placeholder="Search..."
                className="lg:w-[700px] w-72 md:w-[500px] rounded-full px-4"
              />
            </Link>
          )}
        </div>
        <div className="hidden md:block">
          <ul className="flex items-center gap-4">
            <Link href={'/watch'}>
              <Button className="h-10 rounded-full">Watch</Button>
            </Link>
            <li>
              {currentUser ? (
                <Link href={'/library'}>
                  <Button className="h-10 rounded-full">Library</Button>
                </Link>
              ) : (
                <Link href={'/login'}>
                  <Button className="h-10 rounded-full">Login</Button>
                </Link>
              )}
            </li>
            <li>
              <ModeToggle />
            </li>
          </ul>
        </div>
      </header>
      {children}
    </div>
  );
};

export default Header;
