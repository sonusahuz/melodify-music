'use client';
import Link from 'next/link';
import { FaLinkedin, FaSquareXTwitter } from 'react-icons/fa6';
import React from 'react';
import { PiMusicNoteSimpleFill } from 'react-icons/pi';
import { useMusicPlayer } from '@/providers/MusicContextProvider';
import { artists, genre } from '@/lib/data';

const Footer = () => {
  const { songs } = useMusicPlayer();
  return (
    <footer className="mx-auto max-w-screen-2xl">
      <div className="mb-16 grid grid-cols-2 gap-12 pt-6 md:grid-cols-4 lg:grid-cols-6 lg:gap-8 lg:pt-12">
        <div className="col-span-full lg:col-span-2">
          <Link href={'/'} className="flex mb-4 gap-2 items-center">
            <PiMusicNoteSimpleFill size={25} name="website-logo" />
            <span className="text-[22px]">Melodify</span>
          </Link>

          <p className="mb-6 text-gray-500 sm:pr-8">
            Melodify - Listen to New & Old Indian & English Songs. Anywhere,
            Anytime.
          </p>

          <div className="flex gap-4">
            <Link href={'https://linkedin.com/in/sonusahu'}>
              <FaLinkedin size={26} />
            </Link>
            <Link href={'https://x.com/in/sonusahuz'}>
              <FaSquareXTwitter size={26} />
            </Link>
          </div>
        </div>

        <div>
          <div className="mb-4 font-bold uppercase tracking-widest dark:text-white text-black text-sm">
            Language
          </div>

          <nav className="flex flex-col gap-3">
            {genre.slice(0, 7).map((item) => (
              <Link
                className="text-gray-500 text-[15px] transition duration-100"
                href={`/genre/${item.link}`}
                key={item.id}
              >
                {item.title} Songs
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <div className="mb-4 font-bold uppercase tracking-widest dark:text-white text-black text-sm">
            Artists
          </div>

          <nav className="flex flex-col gap-3">
            {artists.slice(0, 7).map((item) => (
              <Link
                className="text-gray-500 text-[15px] transition duration-100"
                href={`/artist/${item.id}`}
                key={item.id}
                dangerouslySetInnerHTML={{
                  __html: item.name,
                }}
              ></Link>
            ))}
          </nav>
        </div>

        <div>
          <div className="mb-4 font-bold uppercase tracking-widest dark:text-white text-black text-sm">
            Charts
          </div>

          <nav className="flex flex-col gap-3">
            {songs?.charts.slice(2, 10).map((item) => (
              <Link
                className="text-gray-500 text-[15px] transition duration-100"
                href={`/playlist/${item.id}`}
                key={item.id}
              >
                {item.name || item.title}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <div className="mb-4 font-bold uppercase tracking-widest dark:text-white text-black text-sm">
            Legal
          </div>

          <nav className="flex flex-col gap-3">
            <div>
              <Link
                href="/terms-of-service"
                className="text-gray-500 text-[15px] transition duration-100"
              >
                Terms of Service
              </Link>
            </div>

            <div>
              <Link
                href="/privacy-policy"
                className="text-gray-500 text-[15px] transition duration-100"
              >
                Privacy Policy
              </Link>
            </div>
          </nav>
        </div>
      </div>
      <div className="py-8 flex items-center justify-between flex-wrap text-center gap-4">
        <p className="text-center text-sm text-gray-400">
          Designed & Developed by{' '}
          <a
            href="https://sonusahu.vercel.app"
            className="underline"
            target="_blank"
          >
            Sonu Sahu
          </a>
        </p>
        <p className="text-center text-sm text-gray-400">
          © 2024 - Melodify. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;