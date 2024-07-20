import InfiniteHorizontalScroll from '@/components/custom/InfiniteScroll';
const exploreList = [
  {
    id: 1,
    title: 'Best of 90s',
    query: '90s songs',
  },
  {
    id: 2,
    title: 'Bhakti - Hindi',
    query: 'bhakti hindi',
  },
  {
    id: 3,
    title: 'Best Lofi Songs',
    query: 'lofi songs',
  },
  {
    id: 4,
    title: 'International Top Hits',
    query: 'english',
  },
  {
    id: 5,
    title: 'Top Party Hits',
    query: 'party songs',
  },
];
const Explore = () => {
  return (
    <div className="mb-36">
      <div className="mx-auto">
        <h1 className="text-2xl font-bold mb-2 mt-2">New Releases</h1>
        <InfiniteHorizontalScroll query="hindi" />
      </div>
      {exploreList.map((item) => (
        <div key={item.id} className="mx-auto">
          <h1 className="text-2xl font-bold mb-2 mt-6">{item.title}</h1>
          <InfiniteHorizontalScroll query={item.query} />
        </div>
      ))}
    </div>
  );
};

export default Explore;
