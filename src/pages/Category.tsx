
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import GameCard from '@/components/GameCard';
import { games, categories, platforms, getGamesByCategory, getGamesByPlatform } from '@/lib/game-data';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const Category = () => {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const platformId = searchParams.get('platform');
  
  const [filteredGames, setFilteredGames] = useState(games);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(platformId ? [platformId] : []);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryId ? [categoryId] : []);
  
  // Update filters when URL params change
  useEffect(() => {
    if (categoryId) {
      setSelectedCategories([categoryId]);
    }
    if (platformId) {
      setSelectedPlatforms([platformId]);
    }
  }, [categoryId, platformId]);
  
  // Apply filters
  useEffect(() => {
    let result = [...games];
    
    // Filter by price
    result = result.filter(game => {
      const gamePrice = game.discountedPrice || game.price;
      return gamePrice >= priceRange[0] && gamePrice <= priceRange[1];
    });
    
    // Filter by platforms
    if (selectedPlatforms.length > 0) {
      result = result.filter(game => 
        game.platforms.some(platform => 
          selectedPlatforms.includes(platform.toLowerCase())
        )
      );
    }
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter(game => 
        game.genres.some(genre => 
          selectedCategories.includes(genre.toLowerCase())
        )
      );
    }
    
    setFilteredGames(result);
  }, [selectedPlatforms, selectedCategories, priceRange]);
  
  const handlePlatformChange = (platformId: string) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platformId)) {
        return prev.filter(id => id !== platformId);
      } else {
        return [...prev, platformId];
      }
    });
  };
  
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };
  
  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };
  
  // Get title based on filters
  const getTitle = () => {
    if (selectedCategories.length === 1) {
      const category = categories.find(c => c.id === selectedCategories[0]);
      return category ? `${category.name} Games` : 'Games';
    }
    if (selectedPlatforms.length === 1) {
      const platform = platforms.find(p => p.id === selectedPlatforms[0]);
      return platform ? `Games for ${platform.name}` : 'Games';
    }
    return 'All Games';
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">{getTitle()}</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-[#1c2333] border border-[#30363d] rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-white mb-6">Filters</h2>
              
              {/* Price range filter */}
              <div className="mb-8">
                <h3 className="text-white font-medium mb-4">Price</h3>
                <Slider 
                  defaultValue={[0, 100]} 
                  max={100} 
                  step={5} 
                  onValueChange={handlePriceChange}
                />
                <div className="flex justify-between mt-2 text-sm text-white/70">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}+</span>
                </div>
              </div>
              
              {/* Platform filter */}
              <div className="mb-8">
                <h3 className="text-white font-medium mb-4">Platforms</h3>
                <div className="space-y-2">
                  {platforms.map(platform => (
                    <div key={platform.id} className="flex items-center">
                      <Checkbox 
                        id={`platform-${platform.id}`} 
                        checked={selectedPlatforms.includes(platform.id)}
                        onCheckedChange={() => handlePlatformChange(platform.id)}
                      />
                      <Label 
                        htmlFor={`platform-${platform.id}`}
                        className="ml-2 text-sm font-normal text-white/70 cursor-pointer"
                      >
                        {platform.name} ({platform.count})
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Category filter */}
              <div>
                <h3 className="text-white font-medium mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center">
                      <Checkbox 
                        id={`category-${category.id}`} 
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => handleCategoryChange(category.id)}
                      />
                      <Label 
                        htmlFor={`category-${category.id}`}
                        className="ml-2 text-sm font-normal text-white/70 cursor-pointer"
                      >
                        {category.name} ({category.count})
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Games grid */}
          <div className="lg:w-3/4">
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredGames.map(game => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <h3 className="text-xl font-medium text-white mb-2">No games found</h3>
                <p className="text-white/70 mb-6">Try adjusting your filters to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Category;
