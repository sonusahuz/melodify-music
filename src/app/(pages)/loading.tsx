import { Loader2 } from 'lucide-react';
import React from 'react';

const Loading = () => {
  return (
    <main className="flex items-center justify-center h-[90vh]">
      <Loader2 className="mr-2 h-8 w-8 animate-spin" aria-label="Loading..." />
      <span className="sr-only">Loading...</span>
    </main>
  );
};

export default Loading;
