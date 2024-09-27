import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/components/custom/QueryProvider';
import { MusicPlayerProvider } from '@/components/custom/MusicContextProvider';
import SongProvider from '@/components/custom/SongProvider';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/components/custom/theme-provider';
import Header from '@/components/custom/Header';

const inter = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '400'],
});

export const metadata: Metadata = {
  title:
    'Melodify - Listen to New & Old Indian & English Songs. Anywhere, Anytime.',
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
        <main className="">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <QueryProvider>
              <Toaster position="top-center" reverseOrder={false} />
              <MusicPlayerProvider>
                <SongProvider>
                  <div className="flex items-start justify-start">
                    <div className="w-full px-2 sm:px-10">
                      <Header>{children}</Header>
                    </div>
                  </div>
                </SongProvider>
              </MusicPlayerProvider>
            </QueryProvider>
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
