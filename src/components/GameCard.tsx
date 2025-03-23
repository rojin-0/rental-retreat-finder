
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface Game {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice?: number;
  coverImage: string;
  releaseDate: string;
  developer: string;
  publisher: string;
  platforms: string[];
  genres: string[];
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
}

interface GameCardProps {
  game: Game;
  featured?: boolean;
}

const GameCard = ({ game, featured = false }: GameCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add to cart logic
    console.log('Added to cart:', game.title);
  };

  const handleClick = () => {
    navigate(`/game/${game.id}`);
  };

  // Calculate discount percentage if there's a discounted price
  const discountPercent = game.discountedPrice
    ? Math.round(((game.price - game.discountedPrice) / game.price) * 100)
    : 0;

  return (
    <div 
      className={cn(
        "group relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-out bg-[#1c2333] border border-[#30363d]",
        "hover:-translate-y-1 hover:shadow-xl hover:shadow-[#00ff4c]/5",
        featured ? "h-full flex flex-col" : ""
      )}
      onClick={handleClick}
    >
      <div className="relative overflow-hidden aspect-[16/9]">
        <img 
          src={game.coverImage} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] to-transparent opacity-60"></div>
        
        <button
          onClick={toggleFavorite}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full backdrop-blur-md bg-black/20 transition-all duration-300",
            "hover:bg-black/40",
            isFavorite ? "text-red-500" : "text-white"
          )}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={cn(
            "transition-all duration-300",
            isFavorite ? "fill-red-500" : "fill-transparent"
          )} size={18} />
        </button>

        {game.isFeatured && (
          <div className="absolute top-3 left-3 py-1 px-3 rounded-full bg-gradient-to-r from-[#00ff4c] to-[#5200ff] text-xs font-medium text-white">
            Featured
          </div>
        )}

        {discountPercent > 0 && (
          <div className="absolute bottom-3 left-3 py-1 px-3 rounded-full bg-[#00ff4c] text-xs font-bold text-[#0d1117]">
            -{discountPercent}%
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-2 flex-1">
          <div className="flex items-center justify-between mb-1">
            <div className="flex flex-wrap gap-1">
              {game.platforms.slice(0, 3).map((platform) => (
                <span key={platform} className="text-xs px-1.5 py-0.5 bg-[#30363d] rounded-sm text-white/70">
                  {platform}
                </span>
              ))}
            </div>
          </div>
          <h3 className="text-lg font-medium text-white mb-1 line-clamp-1">{game.title}</h3>
          
          {featured && (
            <p className="text-sm text-white/70 line-clamp-2 mb-2">{game.description}</p>
          )}
          
          {featured && (
            <div className="flex flex-wrap gap-1 mb-2">
              {game.genres.slice(0, 3).map((genre) => (
                <span key={genre} className="text-xs px-2 py-1 bg-[#30363d] rounded-full text-white/70">
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center text-sm text-white/70">
              <span className="flex items-center text-yellow-400">
                ★ {game.rating.toFixed(1)}
              </span>
              <span className="ml-1">({game.reviewCount})</span>
            </div>
            
            <div className="flex items-end">
              {game.discountedPrice ? (
                <>
                  <span className="text-sm text-white/50 line-through mr-2">${game.price.toFixed(2)}</span>
                  <span className="text-lg font-bold text-white">${game.discountedPrice.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-lg font-bold text-white">${game.price.toFixed(2)}</span>
              )}
            </div>
          </div>
          
          <Button 
            onClick={handleAddToCart} 
            className="w-full bg-gradient-to-r from-[#00ff4c] to-[#5200ff] hover:opacity-90 text-white"
          >
            <ShoppingCart size={16} className="mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
