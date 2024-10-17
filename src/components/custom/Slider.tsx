import React, { useRef } from 'react';

type SliderProps = {
  children: React.ReactNode;
};

const Slider = ({ children }: SliderProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <section
      className="flex items-center justify-center gap-2"
      aria-label="Image slider"
    >
      <div
        className="grid items-center justify-between w-full grid-flow-col-dense grid-rows-2 gap-4 overflow-x-scroll scroll-container scroll-hide"
        ref={scrollRef}
        role="region"
        aria-labelledby="slider-title"
      >
        <h2 id="slider-title" className="sr-only">
          Slider Content
        </h2>
        {children}
      </div>
    </section>
  );
};

export default Slider;
