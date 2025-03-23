
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Globe, Calendar, Users, Award, PlayCircle } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { games } from '@/lib/game-data';
import GameCard from '@/components/GameCard';
import { cn } from '@/lib/utils';

const GameDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Find the game by ID
  const game = games.find(g => g.id === id);
  
  // Find related games (same genre)
  const relatedGames = game 
    ? games
        .filter(g => 
          g.id !== game.id && 
          g.genres.some(genre => game.genres.includes(genre))
        )
        .slice(0, 4)
    : [];
  
  const handleAddToCart = () => {
    // Check if cart exists in localStorage
    const existingCart = localStorage.getItem('cart');
    let cartItems = existingCart ? JSON.parse(existingCart) : [];
    
    // Check if game is already in cart
    const isInCart = cartItems.some((item: any) => item.game.id === game?.id);
    
    if (isInCart) {
      toast({
        title: "Already in cart",
        description: "This game is already in your cart.",
      });
    } else if (game) {
      // Add game to cart
      cartItems.push({ game, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(cartItems));
      
      toast({
        title: "Added to cart",
        description: `${game.title} has been added to your cart.`,
      });
    }
  };
  
  const handleBuyNow = () => {
    if (game) {
      // Add to cart
      const cartItem = { game, quantity: 1 };
      localStorage.setItem('cart', JSON.stringify([cartItem]));
      
      // Redirect to checkout
      navigate('/checkout');
    }
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite 
        ? `${game?.title} has been removed from your favorites.`
        : `${game?.title} has been added to your favorites.`,
    });
  };
  
  if (!game) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-12 flex justify-center">
          <p className="text-white">Game not found.</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      {/* Hero banner */}
      <div className="relative h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${game.coverImage})`,
            filter: 'brightness(0.5)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/60 to-transparent" />
      </div>
      
      <div className="container mx-auto px-6 -mt-32 relative">
        {/* Game info section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Game cover */}
          <div className="md:w-1/3 lg:w-1/4">
            <div className="bg-[#1c2333] border border-[#30363d] p-4 rounded-lg shadow-xl">
              <img 
                src={game.coverImage} 
                alt={game.title} 
                className="w-full aspect-[3/4] object-cover rounded"
              />
              
              <div className="mt-6 space-y-4">
                <Button 
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-[#00ff4c] to-[#5200ff] hover:opacity-90 text-white"
                >
                  <ShoppingCart size={16} className="mr-2" />
                  Add to Cart
                </Button>
                
                <Button 
                  onClick={handleBuyNow}
                  className="w-full bg-white text-[#0d1117] hover:bg-white/90"
                >
                  Buy Now
                </Button>
                
                <Button 
                  onClick={toggleFavorite}
                  variant="outline" 
                  className="w-full border-[#30363d] hover:bg-[#30363d]/50"
                >
                  <Heart className={cn(
                    "mr-2",
                    isFavorite ? "fill-red-500 text-red-500" : ""
                  )} size={16} />
                  {isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Game details */}
          <div className="md:w-2/3 lg:w-3/4">
            <div className="bg-[#1c2333] border border-[#30363d] rounded-lg p-6 shadow-xl">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {game.genres.map((genre) => (
                      <Link 
                        key={genre} 
                        to={`/category/${genre.toLowerCase()}`}
                        className="text-xs px-3 py-1 bg-[#0d1117] text-white/70 rounded-full hover:bg-[#58a6ff]/20 hover:text-[#58a6ff]"
                      >
                        {genre}
                      </Link>
                    ))}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">{game.title}</h1>
                  <div className="mt-2 text-white/70">
                    <span>by {game.developer}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center mr-4">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-white font-medium">{game.rating.toFixed(1)}/5</span>
                    </div>
                    <span className="text-white/70">({game.reviewCount} reviews)</span>
                  </div>
                  
                  <div className="text-2xl font-bold">
                    {game.discountedPrice ? (
                      <div className="flex items-center gap-2">
                        <span className="text-white/50 line-through text-lg">
                          ${game.price.toFixed(2)}
                        </span>
                        <span className="text-white">
                          ${game.discountedPrice.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-white">
                        ${game.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-[#0d1117] rounded p-3">
                  <div className="flex items-center">
                    <Calendar size={18} className="text-white/70 mr-2" />
                    <span className="text-white/70 text-sm">Release Date</span>
                  </div>
                  <div className="text-white mt-1">{new Date(game.releaseDate).toLocaleDateString()}</div>
                </div>
                
                <div className="bg-[#0d1117] rounded p-3">
                  <div className="flex items-center">
                    <Globe size={18} className="text-white/70 mr-2" />
                    <span className="text-white/70 text-sm">Publisher</span>
                  </div>
                  <div className="text-white mt-1">{game.publisher}</div>
                </div>
                
                <div className="bg-[#0d1117] rounded p-3">
                  <div className="flex items-center">
                    <Users size={18} className="text-white/70 mr-2" />
                    <span className="text-white/70 text-sm">Platforms</span>
                  </div>
                  <div className="text-white mt-1">{game.platforms.join(', ')}</div>
                </div>
                
                <div className="bg-[#0d1117] rounded p-3">
                  <div className="flex items-center">
                    <Award size={18} className="text-white/70 mr-2" />
                    <span className="text-white/70 text-sm">Rating</span>
                  </div>
                  <div className="text-white mt-1">{game.rating.toFixed(1)} ({game.reviewCount} reviews)</div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4">About</h2>
                <p className="text-white/80 leading-relaxed">{game.description}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Game Trailer</h2>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-[#0d1117] flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center text-white/70">
                    <PlayCircle size={48} />
                    <span className="mt-2">Trailer not available in demo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar games section */}
        {relatedGames.length > 0 && (
          <section className="py-16">
            <h2 className="text-2xl font-bold text-white mb-8">Similar Games</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedGames.map((relatedGame) => (
                <GameCard key={relatedGame.id} game={relatedGame} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default GameDetail;
