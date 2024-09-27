import React, { useRef } from 'react';

type SliderProps = {
  children: React.ReactNode;
};

const Slider = ({ children }: SliderProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="flex items-center justify-center gap-2">
      <div
        className="grid items-center justify-between w-full grid-flow-col-dense grid-rows-2 gap-4 overflow-x-scroll scroll-container scroll-hide"
        ref={scrollRef}
      >
        {children}
      </div>
    </div>
  );
};

export default Slider;
