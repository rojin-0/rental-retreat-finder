
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Library as LibraryIcon, Download } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { games } from '@/lib/game-data';
import { Game } from '@/components/GameCard';

const Library = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userGames, setUserGames] = useState<Game[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      // In a real app, you'd fetch the user's purchased games from your backend
      // For demo purposes, let's just show the first 3 games as "purchased"
      setUserGames(games.slice(0, 3));
    }
    
    setIsLoading(false);
  }, []);
  
  const handleLogin = () => {
    navigate('/login?redirect=library');
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-12 flex justify-center">
          <p className="text-white">Loading library...</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">Your Game Library</h1>
        
        {isLoggedIn ? (
          userGames.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {userGames.map((game) => (
                  <div 
                    key={game.id} 
                    className="bg-[#1c2333] border border-[#30363d] rounded-lg overflow-hidden"
                  >
                    <div className="relative overflow-hidden aspect-[16/9]">
                      <img 
                        src={game.coverImage} 
                        alt={game.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] to-transparent opacity-60"></div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-white mb-2">{game.title}</h3>
                      <div className="text-white/70 text-sm mb-4">
                        <span>Developed by {game.developer}</span>
                      </div>
                      
                      <Button 
                        className="w-full bg-[#58a6ff] hover:bg-[#58a6ff]/90 text-white"
                      >
                        <Download size={16} className="mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-[#1c2333] flex items-center justify-center mb-4">
                <LibraryIcon size={24} className="text-white/70" />
              </div>
              <h2 className="text-xl font-medium text-white mb-2">Your library is empty</h2>
              <p className="text-white/70 mb-6">You haven't purchased any games yet.</p>
              <Link 
                to="/category" 
                className="px-6 py-3 bg-gradient-to-r from-[#00ff4c] to-[#5200ff] rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
              >
                Browse Games
              </Link>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-[#1c2333] flex items-center justify-center mb-4">
              <LibraryIcon size={24} className="text-white/70" />
            </div>
            <h2 className="text-xl font-medium text-white mb-2">Sign in to access your library</h2>
            <p className="text-white/70 mb-6">Please sign in to view your purchased games.</p>
            <Button 
              onClick={handleLogin}
              className="px-6 py-3 bg-gradient-to-r from-[#00ff4c] to-[#5200ff] text-white font-medium hover:opacity-90 transition-opacity"
            >
              Sign In
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Library;
