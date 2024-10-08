"use client"
import { useState, useEffect } from 'react';

const SLIDE_DURATION = 10000;

export default function CTA() {
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/flagged/photo-1559485034-2de9cd29f32a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Summer Collection 2024',
      description: 'Discover the essence of modern elegance'
    },
    {
      id: 2,
      image: 'https://www.laudert.com/en/wp-content/uploads/2023/09/hero-fashionfotografie.jpg',
      title: 'Sustainable Fashion',
      description: 'Eco-conscious designs for the future'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const changeSlide = (newIndex) => {
    setIsTransitioning(true);
    setCurrentSlide(newIndex);
    setProgress(0);
    setTimeout(() => setIsTransitioning(false), 1000); // Match the duration-1000 transition
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          const nextSlide = (currentSlide + 1) % slides.length;
          changeSlide(nextSlide);
          return 0;
        }
        return prevProgress + (100 / (SLIDE_DURATION / 100));
      });
    }, 100);

    return () => clearInterval(timer);
  }, [currentSlide, slides.length]);

  const goToSlide = (index) => {
    if (!isTransitioning && index !== currentSlide) {
      changeSlide(index);
    }
  };

  const nextSlide = () => {
    if (!isTransitioning) {
      const next = (currentSlide + 1) % slides.length;
      changeSlide(next);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      const prev = (currentSlide - 1 + slides.length) % slides.length;
      changeSlide(prev);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            style={{
              zIndex: index === currentSlide ? 1 : 0,
              opacity: index === currentSlide ? 1 : 0
            }}
            className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover bg-center"
            />
            
            {/* Text Overlay */}
            <div 
              className="absolute bottom-20 left-0 right-0 text-center text-white"
              style={{
                opacity: isTransitioning ? 0 : 1,
                transition: 'opacity 0.5s ease-in-out'
              }}
            >
              <h2 className="mb-2 text-4xl font-light tracking-wider">
                {slide.title}
              </h2>
              <p className="text-lg font-light">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/10 p-2 backdrop-blur-sm transition-all hover:bg-white/20 disabled:opacity-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/10 p-2 backdrop-blur-sm transition-all hover:bg-white/20 disabled:opacity-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
        </svg>
      </button>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 transform gap-2 z-40">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className="group relative h-[2px] w-16 overflow-hidden rounded-full bg-white/30"
          >
            <div
              className="absolute left-0 h-[2px] bg-white transition-all duration-100"
              style={{
                width: `${index === currentSlide ? progress : 0}%`
              }}
            />
          </button>
        ))}
      </div>

    </div>
  );
}