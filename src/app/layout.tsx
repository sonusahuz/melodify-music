import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/components/custom/QueryProvider';
import Header from '@/components/custom/Header';
import { MusicPlayerProvider } from '@/components/custom/MusicContextProvider';
import SongProvider from '@/components/custom/SongProvider';
import { Toaster } from 'react-hot-toast';

const inter = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Melodify - Listen to New & Old Indian & English Songs.',
  description:
    'Melodify, a dynamic music website powered by Next.js 14, TypeScript, and TailwindCSS. Leveraging the JioSaavn API via Context API, Musicolet offers seamless access to a vast library of music tracks and albums. trending, albums, top charts, and enjoy personalized playlists and recommendations, all with a modern and responsive user interface.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="md:container px-2">
          <QueryProvider>
            <Toaster position="top-center" reverseOrder={false} />
            <MusicPlayerProvider>
              <SongProvider>
                <Header>{children}</Header>
              </SongProvider>
            </MusicPlayerProvider>
          </QueryProvider>
        </main>
      </body>
    </html>
  );
}
