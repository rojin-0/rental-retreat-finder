
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyCard from './PropertyCard';
import { Property } from '@/lib/data';

interface FeaturedPropertiesProps {
  properties: Property[];
  title: string;
  subtitle?: string;
}

const FeaturedProperties = ({ properties, title, subtitle }: FeaturedPropertiesProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      setMaxScroll(
        scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
      );
    }

    const handleResize = () => {
      if (scrollContainerRef.current) {
        setMaxScroll(
          scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
        );
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [properties]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.firstElementChild?.clientWidth ?? 0;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });

      setScrollPosition(Math.max(0, Math.min(container.scrollLeft + scrollAmount, maxScroll)));
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  return (
    <div className="py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">{title}</h2>
            {subtitle && <p className="text-muted-foreground max-w-2xl">{subtitle}</p>}
          </div>
          
          <div className="flex gap-2 mt-4 sm:mt-0">
            <button
              onClick={() => scroll('left')}
              disabled={scrollPosition <= 0}
              className="p-2 rounded-full border border-border hover:bg-secondary transition-colors disabled:opacity-50 disabled:pointer-events-none"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={scrollPosition >= maxScroll}
              className="p-2 rounded-full border border-border hover:bg-secondary transition-colors disabled:opacity-50 disabled:pointer-events-none"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex space-x-5 overflow-x-auto hide-scrollbar snap-x snap-mandatory"
          onScroll={handleScroll}
        >
          {properties.map((property) => (
            <div
              key={property.id}
              className="min-w-[280px] sm:min-w-[340px] md:min-w-[380px] snap-start"
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties;
