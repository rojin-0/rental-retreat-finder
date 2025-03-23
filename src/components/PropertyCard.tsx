
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Bed, Bath, Move } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Property, formatPrice } from '@/lib/data';

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

const PropertyCard = ({ property, featured = false }: PropertyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleClick = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <div 
      className={cn(
        "property-card-container group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ease-out",
        "transform hover:-translate-y-1 hover:shadow-xl",
        featured ? "h-full" : ""
      )}
      onClick={handleClick}
    >
      <div className="relative overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="property-image w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <button
          onClick={toggleFavorite}
          className={cn(
            "absolute top-4 right-4 p-2 rounded-full backdrop-blur-md bg-white/20 transition-all duration-300",
            "hover:bg-white/40",
            isFavorite ? "text-red-500" : "text-white"
          )}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={cn(
            "transition-all duration-300",
            isFavorite ? "fill-red-500" : "fill-transparent"
          )} size={18} />
        </button>

        {property.isFeatured && !featured && (
          <div className="absolute top-4 left-4 py-1 px-3 rounded-full bg-white/90 text-xs font-medium">
            Featured
          </div>
        )}
      </div>

      <div className={cn(
        "p-4 bg-white dark:bg-card",
        featured ? "h-full flex flex-col" : ""
      )}>
        <div className="mb-2">
          <div className="text-sm text-muted-foreground">{property.location}</div>
          <h3 className="text-lg font-medium text-balance line-clamp-1">{property.title}</h3>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">
            {formatPrice(property.price, property.priceUnit)}
          </span>
          
          <div className="flex gap-1 text-muted-foreground text-sm">
            <span className="flex items-center">
              <Bed size={14} className="mr-1" /> {property.bedrooms}
            </span>
            <span className="ml-2 flex items-center">
              <Bath size={14} className="mr-1" /> {property.bathrooms}
            </span>
            <span className="ml-2 flex items-center">
              <Move size={14} className="mr-1" /> {property.squareFeet} ft²
            </span>
          </div>
        </div>

        {featured && (
          <div className="mt-3 text-sm text-muted-foreground line-clamp-3">
            {property.description}
          </div>
        )}

        {featured && (
          <div className="mt-4 flex flex-wrap gap-1 pt-2">
            {property.amenities.slice(0, 3).map((amenity) => (
              <span key={amenity} className="text-xs px-2 py-1 bg-secondary rounded-full">
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className={cn(
          "flex items-center justify-between text-sm text-muted-foreground",
          featured ? "mt-auto pt-4" : "mt-3"
        )}>
          <div className="flex items-center">
            <span className="flex items-center">
              ★ {property.rating}
            </span>
            <span className="ml-1">({property.reviewCount} reviews)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
