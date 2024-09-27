import { Loader2 } from 'lucide-react';
import React from 'react';

const Loading = () => {
  return (
    <div>
      <div className="flex items-center justify-center h-[90vh]">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
      </div>
    </div>
  );
};

export default Loading;
