import React, { useRef } from 'react';

type SliderProps = {
  children: React.ReactNode;
};

const Slider = ({ children }: SliderProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="flex justify-center items-center gap-2">
      <div
        className="scroll-container grid grid-rows-2 grid-flow-col-dense justify-between items-center gap-4 overflow-x-scroll w-full scroll-hide"
        ref={scrollRef}
      >
        {children}
      </div>
    </div>
  );
};

export default Slider;
