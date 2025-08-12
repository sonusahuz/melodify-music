import SongDetail from '../SongDetail';

type PageProps = {
  params: Promise<{
    songId: string;
  }>;
};

export default async function SongQueue({ params }: Awaited<PageProps>) {
  const { songId } = await params;

  return <SongDetail songId={songId} />;
}
