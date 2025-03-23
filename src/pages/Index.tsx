
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import GameCard from '@/components/GameCard';
import { games, categories, platforms } from '@/lib/game-data';

const Index = () => {
  const [activeTab, setActiveTab] = useState('featured');
  const featuredGames = games.filter(game => game.isFeatured);
  const newReleases = [...games].sort((a, b) => 
    new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  ).slice(0, 4);
  const discounted = games.filter(game => game.discountedPrice).slice(0, 4);
  
  let displayedGames;
  switch (activeTab) {
    case 'newReleases':
      displayedGames = newReleases;
      break;
    case 'discounted':
      displayedGames = discounted;
      break;
    default:
      displayedGames = featuredGames;
  }

  return (
    <Layout>
      {/* Hero section */}
      <section className="relative h-[75vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${featuredGames[0]?.coverImage})`,
            filter: 'brightness(0.5)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/60 to-transparent" />
        
        <div className="relative h-full container mx-auto px-6 flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Welcome to <span className="bg-gradient-to-r from-[#00ff4c] to-[#5200ff] bg-clip-text text-transparent">Vortex</span>
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Discover and play the latest games. Your adventure begins here.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/category" 
                className="px-6 py-3 bg-gradient-to-r from-[#00ff4c] to-[#5200ff] rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
              >
                Browse Games
              </Link>
              <Link 
                to="/login" 
                className="px-6 py-3 bg-white/10 border border-white/20 backdrop-blur-sm rounded-lg text-white font-medium hover:bg-white/20 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories section */}
      <section className="py-16 container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Browse by Category</h2>
          <Link to="/category" className="text-[#00ff4c] flex items-center hover:underline">
            <span>View all</span> 
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.slice(0, 5).map((category) => (
            <Link 
              key={category.id}
              to={`/category/${category.id}`} 
              className="relative h-32 rounded-lg overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] to-[#0d1117]/30 group-hover:from-[#0d1117]/80 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <span className="text-lg font-medium text-white">{category.name}</span>
                <span className="text-sm text-white/70">{category.count} Games</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Games section */}
      <section className="py-12 container mx-auto px-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Discover Games</h2>
            <Link to="/category" className="text-[#00ff4c] flex items-center hover:underline">
              <span>View all</span> 
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="flex overflow-x-auto space-x-2 py-1 mb-4 no-scrollbar">
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                activeTab === 'featured' 
                  ? 'bg-gradient-to-r from-[#00ff4c] to-[#5200ff] text-white' 
                  : 'bg-[#1c2333] text-white/70 hover:text-white'
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setActiveTab('newReleases')}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                activeTab === 'newReleases' 
                  ? 'bg-gradient-to-r from-[#00ff4c] to-[#5200ff] text-white' 
                  : 'bg-[#1c2333] text-white/70 hover:text-white'
              }`}
            >
              New Releases
            </button>
            <button
              onClick={() => setActiveTab('discounted')}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                activeTab === 'discounted' 
                  ? 'bg-gradient-to-r from-[#00ff4c] to-[#5200ff] text-white' 
                  : 'bg-[#1c2333] text-white/70 hover:text-white'
              }`}
            >
              Special Offers
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Platforms section */}
      <section className="py-16 container mx-auto px-6">
        <h2 className="text-2xl font-bold text-white mb-8">Shop by Platform</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {platforms.map((platform) => (
            <Link 
              key={platform.id}
              to={`/category?platform=${platform.id}`} 
              className="flex flex-col items-center justify-center p-6 bg-[#1c2333] border border-[#30363d] rounded-lg hover:border-[#58a6ff] transition-colors"
            >
              <span className="text-lg font-medium text-white mb-1">{platform.name}</span>
              <span className="text-sm text-white/70">{platform.count} Games</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 container mx-auto px-6">
        <div className="bg-gradient-to-r from-[#1c2333] to-[#30363d] rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            <div className="p-8 md:p-12 flex-1">
              <h2 className="text-3xl font-bold text-white mb-4">Join the Vortex Community</h2>
              <p className="text-white/80 mb-6">Create an account to track your library, wishlist games, and get personalized recommendations.</p>
              <Link 
                to="/register" 
                className="inline-block px-6 py-3 bg-gradient-to-r from-[#00ff4c] to-[#5200ff] rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
              >
                Sign Up Now
              </Link>
            </div>
            <div className="md:w-1/2 h-64 md:h-auto">
              <div className="h-full bg-[#30363d] opacity-75" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
