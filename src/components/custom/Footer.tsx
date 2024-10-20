import { AudioLines } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <footer className="mx-auto max-w-screen-2xl mt-10">
      <div className="flex items-center justify-between flex-wrap">
        <div>
          <div className="flex items-center justify-start gap-3 mb-4 ">
            <AudioLines size={25} />
            <span className="text-xl">Melodify</span>
          </div>

          <p className="mb-2 text-gray-500">
            Melodify - Listen to New & Old Indian & English Songs. Anywhere,
            Anytime.
          </p>

          <p className="mb-6 text-gray-500">
            Designed and developed by{' '}
            <a
              target="_blank"
              href="https://sonusahu.vercel.app"
              className="underline"
            >
              Sonu Sahu
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
