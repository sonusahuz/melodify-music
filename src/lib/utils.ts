import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const loadItemFromLocalStorage = (item: string) => {
  if (typeof window !== 'undefined') {
    const storedItem = localStorage.getItem(item);
    return storedItem ? JSON.parse(storedItem) : [];
  }
  return [];
};

export function formatNumber(num: number) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + ' B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + ' M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + ' K';
  }
  return num?.toString();
}
