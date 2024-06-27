'use client';

import { ArrowLeft, Heart, Music2 } from 'lucide-react';
import Link from 'next/link';
import { Input } from '../ui/input';
import { usePathname } from 'next/navigation';
import { useMusicPlayer } from './MusicContextProvider';

const Header = ({ children }: { children: React.ReactNode }) => {
  const { search, setSearch } = useMusicPlayer();
  const path = usePathname();

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
          <Link href={'/search'}>
            <Input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder="Search..."
              className={
                path.startsWith('/search')
                  ? 'sm:w-[500px] w-72'
                  : 'md:w-[500px]'
              }
            />
          </Link>
        </div>
        {path.startsWith('/search') ? (
          <div className="hidden md:block">
            <div className="flex items-center justify-between gap-3 ">
              <Link
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                href={'/favorite'}
              >
                <Heart />
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4">
            <Link
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              href={'/favorite'}
            >
              <Heart />
            </Link>
          </div>
        )}
      </header>
      {children}
    </div>
  );
};

export default Header;
