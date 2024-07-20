'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <span onClick={toggleTheme} className=" cursor-pointer">
      {theme === 'light' ? (
        <Sun
          strokeWidth={1.25}
          size={23}
          className="text-center mx-auto rotate-0 scale-100 transition-all"
        />
      ) : (
        <Moon
          strokeWidth={1.25}
          size={23}
          className="text-center mx-auto rotate-0 scale-100 transition-all"
        />
      )}
    </span>
  );
}
