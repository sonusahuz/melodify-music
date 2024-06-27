import React from 'react';
import Slider from './Slider';

interface ResponsiveWrapperProps {
  mobileWrapper: React.ReactNode;
  desktopWrapper: React.ReactNode;
}

const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({
  mobileWrapper,
  desktopWrapper,
}) => {
  return (
    <>
      <div className="md:hidden">
        <Slider>{mobileWrapper}</Slider>
      </div>

      <div className="hidden md:block">
        <div className="flex items-center justify-start flex-wrap gap-6">
          {desktopWrapper}
        </div>
      </div>
    </>
  );
};

export default ResponsiveWrapper;
