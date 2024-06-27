import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const genre = [
  {
    id: '1',
    link: 'hindi',
    title: 'Hindi',
  },
  {
    id: '2',
    link: 'hindi,english',
    title: 'New Releases',
  },
  {
    id: '3',
    link: 'hindi,punjabi',
    title: 'Party',
  },
  {
    id: '4',
    link: 'hindi,bhojpuri',
    title: 'Mood',
  },
  {
    id: '6',
    link: 'english',
    title: 'English',
  },
  {
    id: '7',
    link: 'punjabi',
    title: 'Punjabi',
  },
  {
    id: '8',
    link: 'bhojpuri',
    title: 'Bhojpuri',
  },
  {
    id: '9',
    link: 'tamil',
    title: 'Tamil',
  },
  {
    id: '10',
    link: 'telugu',
    title: 'Telugu',
  },
  {
    id: '11',
    link: 'marathi',
    title: 'Marathi',
  },
  {
    id: '12',
    link: 'gujarati',
    title: 'Gujarati',
  },
  {
    id: '13',
    link: 'bengali',
    title: 'Bengali',
  },

  {
    id: '14',
    link: 'haryanvi',
    title: 'Haryanvi',
  },
  {
    id: '15',
    link: 'rajasthani',
    title: 'Rajasthani',
  },
];

export const artists = [
  {
    id: '459320',
    name: 'Arijit Singh',
    type: 'Artist',
    image:
      'https://c.saavncdn.com/artists/Arijit_Singh_002_20230323062147_500x500.jpg',
  },
  {
    id: '3319750',
    name: 'Sidhu Moose Wala',
    type: 'Artist',
    image:
      'https://c.saavncdn.com/artists/Sidhu_Moose_Wala_20190627113332_500x500.jpg',
  },
  {
    id: '615155',
    name: 'The Weeknd',
    type: 'Artist',
    image: 'https://c.saavncdn.com/artists/The_Weeknd_500x500.jpg',
  },

  {
    id: '702452',
    name: 'Vishal Mishra',
    type: 'Artist',
    image:
      'https://c.saavncdn.com/artists/Vishal_Mishra_004_20230804115745_500x500.jpg',
  },
  {
    id: '888127',
    name: 'Darshan Raval',
    type: 'Artist',
    image:
      'https://c.saavncdn.com/artists/Darshan_Raval_005_20201029161434_500x500.jpg',
  },
  {
    id: '485956',
    name: 'Yo Yo Honey Singh',
    type: 'Artist',
    image:
      'https://c.saavncdn.com/artists/Yo_Yo_Honey_Singh_002_20221216102650_500x500.jpg',
  },
  {
    id: '455130',
    name: 'Shreya Ghoshal',
    type: 'Artist',
    image:
      'https://c.saavncdn.com/artists/Shreya_Ghoshal_006_20240318080459_500x500.jpg',
  },
  {
    id: '455125',
    name: 'Sonu Nigam',
    type: 'Artist',
    image: 'https://c.saavncdn.com/artists/Sonu_Nigam_500x500.jpg',
  },
  {
    id: '456323',
    name: 'Pritam',
    type: 'Artist',
    image:
      'https://c.saavncdn.com/artists/Pritam_Chakraborty-20170711073326_500x500.jpg',
  },
  {
    id: '468245',
    name: 'Diljit Dosanjh',
    type: 'Artist',
    image:
      'https://c.saavncdn.com/artists/Diljit_Dosanjh_005_20231025073054_500x500.jpg',
  },

  {
    id: '457737',
    name: 'Gippy Grewal',
    type: 'Artist',
    image:
      'https://c.saavncdn.com/artists/Gippy_Grewal_004_20191118143844_500x500.jpg',
  },
  {
    id: '480711',
    name: 'Amrinder Gill',
    type: 'Artist',
    image: 'https://c.saavncdn.com/artists/Amrinder_Gill_500x500.jpg',
  },
  {
    id: '712878',
    name: 'Guru Randhawa',
    type: 'Artist',
    image: 'https://c.saavncdn.com/artists/Guru_Randhawa_500x500.jpg',
  },
  {
    id: '512453',
    name: 'Drake',
    type: 'Artist',
    image:
      'https://c.saavncdn.com/artists/Drake_005_20220704120432_500x500.jpg',
  },
  {
    id: '2861360',
    name: 'Jassie Gill',
    type: 'Artist',
    image:
      'https://c.saavncdn.com/artists/Jassie_Gill_007_20240124121355_500x500.jpg',
  },
];

export const formatNumber = (number: number) => {
  if (number >= 10000000) {
    return (number / 10000000).toFixed(1) + ' Cr'; // Crores for large numbers
  } else if (number >= 100000) {
    return (number / 100000).toFixed(1) + ' L'; // Lakhs
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + ' M'; // Millions
  } else {
    return number.toString();
  }
};
