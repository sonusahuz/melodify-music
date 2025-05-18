import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import QueryProvider from '@/providers/QueryProvider';
import { MusicPlayerProvider } from '@/providers/MusicContextProvider';
import Header from '@/components/custom/Header';
import SongProvider from '@/providers/SongProvider';

const inter = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300' , "400"],
});

export const metadata: Metadata = {
  title:
    'Melodify - Listen to New & Old Indian & English Songs. Anywhere, Anytime.',
  description:
    'Melodify, a dynamic music website powered by Next.js 14, TypeScript, and TailwindCSS. Leveraging the JioSaavn API via Context API, Musicolet offers seamless access to a vast library of music tracks and albums. trending, albums, top charts, and enjoy personalized playlists and recommendations, all with a modern and responsive user interface.',
  generator: 'Next.js',
  applicationName: 'Melodify',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'music',
    'streaming',
    'Indian songs',
    'English songs',
    'playlists',
    'albums',
    'sonusahu melodify',
    'melodify',
    'jiosaavn',
    'melodify music',
    'artists',
  ],
  authors: [{ name: 'Sonu Sahu' }],
  creator: 'Melodify Team',
  publisher: 'Melodify',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://melodifymusic.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'hi-IN': '/hi-IN',
    },
  },
  openGraph: {
    title: 'Melodify - Your Ultimate Music Companion',
    description: 'Stream new and old Indian & English songs anytime, anywhere.',
    url: 'https://melodifymusic.vercel.app',
    siteName: 'Melodify',
    images: [
      {
        url: 'https://melodifymusic.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Melodify - Your Ultimate Music Companion',
    description: 'Stream new and old Indian & English songs anytime, anywhere.',
    siteId: '@melodify',
    creator: '@melodify',
    creatorId: '@melodify',
    images: ['https://melodifymusic.vercel.app/twitter-image.jpg'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
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
                  <div className="w-full px-2 sm:px-10">
                    <Header />
                    {children}
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
