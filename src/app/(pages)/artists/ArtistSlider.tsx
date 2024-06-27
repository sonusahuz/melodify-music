import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type SliderProps = {
  children: React.ReactNode;
};

const ArtistSlider = ({ children }: SliderProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 800;
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 800;
    }
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <ArrowLeft
        className="text-3xl text-gray-400 hover:scale-125 transition-all duration-500 ease-in-out cursor-pointer hidden lg:block"
        onClick={scrollLeft}
      />

      <div
        className="scroll-container w-full scroll-hide"
        ref={scrollRef}
      >
        {children}
      </div>

      <ArrowRight
        className="text-3xl text-gray-400 hover:scale-125 transition-all duration-500 ease-in-out cursor-pointer hidden lg:block"
        onClick={scrollRight}
      />
    </div>
  );
};

export default ArtistSlider;
