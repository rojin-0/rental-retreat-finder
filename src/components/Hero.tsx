
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import SearchBar from './SearchBar';
import { cn } from '@/lib/utils';

// Array of hero images URLs
const heroImages = [
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=3270&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1613977257592-4a9a32f9285e?q=80&w=3287&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=3270&auto=format&fit=crop',
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Effect to handle image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        setIsTransitioning(false);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[90vh] min-h-[600px] max-h-[900px] w-full overflow-hidden">
      {/* Background image with fade transition */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center",
            currentImageIndex === index ? "opacity-100" : "opacity-0"
          )}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center px-6 md:px-10 max-w-7xl mx-auto">
        <div className="text-center mb-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Find Your Perfect Retreat
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Discover exceptional homes for every style and occasion, carefully selected for quality and comfort.
          </p>
        </div>

        <div className="w-full max-w-4xl mx-auto animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <SearchBar />
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center gap-8 animate-fade-up" style={{ animationDelay: '0.7s' }}>
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-2">1000+</div>
            <div className="text-white/80">Premium Properties</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-2">200+</div>
            <div className="text-white/80">Cities Worldwide</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-2">24/7</div>
            <div className="text-white/80">Customer Support</div>
          </div>
        </div>

        <a 
          href="/listings" 
          className="mt-12 text-white group flex items-center gap-2 border-b border-white/30 pb-1 hover:border-white transition-all duration-300 animate-fade-up"
          style={{ animationDelay: '0.9s' }}
        >
          <span>Explore all properties</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
