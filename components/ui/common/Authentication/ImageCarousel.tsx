import React, { useState, useEffect } from 'react';
import { Text } from '../text';

interface IImageCarousel {
  slides: {
    img: string;
    title?: string;
    description?: string;
  }[];
}

const ImageCarousel: React.FC<IImageCarousel> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
      }, 5000); // Change slides every 5 seconds
      return () => clearInterval(interval);
    }
  }, [slides.length]);

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <div className="relative text-center w-full">
      <div className="overflow-hidden ">
        <div
          className="flex transition-transform duration-500 ease-in-out py-11 transform"
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(-${currentSlide * (100 / slides.length)}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-full flex flex-col items-center justify-center"
            >
              <img
                src={slide.img}
                alt={`Slide ${index + 1}`}
                className="w-[80%]"
              />
              {slide.title && <Text typography="header">{slide.title}</Text>}
              {slide.description && (
                <Text className="pt-2">{slide.description}</Text>
              )}
            </div>
          ))}
        </div>
      </div>
      {slides.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full mx-2 focus:outline-none ${index === currentSlide ? 'bg-black' : 'bg-gray-400'}`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
