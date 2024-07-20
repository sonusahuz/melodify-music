import React, { useRef } from 'react';

type SliderProps = {
  children: React.ReactNode;
};

const ArtistSlider = ({ children }: SliderProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="flex justify-center items-center gap-2">
      <div className="scroll-container w-full scroll-hide" ref={scrollRef}>
        {children}
      </div>
    </div>
  );
};

export default ArtistSlider;
