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
    <span onClick={toggleTheme} className="cursor-pointer ">
      {theme === 'light' ? (
        <Sun
          strokeWidth={1.25}
          size={25}
          className="mx-auto text-center transition-all scale-100 rotate-0"
        />
      ) : (
        <Moon
          strokeWidth={1.25}
          size={25}
          className="mx-auto text-center transition-all scale-100 rotate-0"
        />
      )}
    </span>
  );
}
