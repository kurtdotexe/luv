import { useEffect, useRef, useState } from 'react';
import FlowerSection from './components/FlowerSection';

function App() {
  const [showArrow, setShowArrow] = useState(true);
  const flowerRef = useRef<HTMLDivElement>(null); // ✅ create reference

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowArrow(scrollPosition <= 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFlowers = () => {
    flowerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-black">
      {/* --- Top Section --- */}
      <div className="h-screen w-full flex items-center justify-center overflow-hidden relative">
        <img
          src="/luvluv.png"
          alt="Luv Luv"
          className="w-full h-full object-cover"
        />

        {/* Down Arrow */}
        <div
          onClick={scrollToFlowers} // ✅ added onClick
          className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-opacity duration-700 cursor-pointer ${
            showArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center animate-bounce hover:scale-110 transition-transform duration-300">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-32 md:h-64 bg-black" />

      {/* --- Flower Section --- */}
      <div ref={flowerRef}>
        <FlowerSection />
      </div>
    </div>
  );
}

export default App;
