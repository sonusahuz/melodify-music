import { Loader2 } from 'lucide-react';
import React from 'react';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-[90vh]">
      <Loader2 className="mr-2 h-8 w-8 animate-spin dark:text-white text-black" />
    </div>
  );
};

export default Spinner;
