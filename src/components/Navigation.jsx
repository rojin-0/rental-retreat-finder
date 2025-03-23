
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Library, User, Search, Menu, X, Home, Tag, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export const Navigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loginStatus);
  }, [location]); // Re-check when location changes

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get cart count from localStorage
  const getCartCount = () => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      try {
        return JSON.parse(cart).length;
      } catch (e) {
        return 0;
      }
    }
    return 0;
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/category', label: 'Games', icon: Tag },
    { path: '/library', label: 'Library', icon: Library, authRequired: true },
    { path: '/cart', label: 'Cart', icon: ShoppingCart, badge: getCartCount() },
    { path: !isLoggedIn ? '/login' : '/profile', label: !isLoggedIn ? 'Sign In' : 'Account', icon: !isLoggedIn ? LogIn : User },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic - redirect to category page with search param
    if (searchQuery.trim()) {
      window.location.href = `/category?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      <header 
        className={cn(
          'fixed top-0 left-0 right-0 z-50 py-3 px-4 transition-all duration-300 ease-in-out',
          isScrolled ? 'bg-[#0d1117]/95 backdrop-blur-lg shadow-lg border-b border-white/5' : 'bg-[#0d1117]'
        )}
      >
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/108a1c70-0b58-47b5-bd3d-c846de2a1b79.png" 
              alt="Vortex" 
              className="h-10 w-auto" 
            />
            <span className="text-xl font-bold tracking-tighter bg-gradient-to-r from-[#00ff4c] to-[#5200ff] bg-clip-text text-transparent">VORTEX</span>
          </Link>

          {/* Desktop navigation */}
          {!isMobile && (
            <nav className="flex items-center space-x-8">
              {navLinks.filter(link => !link.authRequired || isLoggedIn || link.path === '/login').map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'text-sm font-medium transition-colors relative group py-2 flex items-center gap-1',
                    location.pathname === link.path
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  )}
                >
                  <link.icon size={16} className="opacity-80" />
                  <span>{link.label}</span>
                  {link.badge > 0 && (
                    <span className="absolute -top-2 -right-3 bg-gradient-to-r from-[#00ff4c] to-[#5200ff] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {link.badge}
                    </span>
                  )}
                  <span className={cn(
                    'absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#00ff4c] to-[#5200ff] scale-x-0 group-hover:scale-x-100 transition-transform duration-300',
                    location.pathname === link.path ? 'scale-x-100' : ''
                  )} />
                </Link>
              ))}
            </nav>
          )}

          {/* Search bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center relative max-w-md flex-1 mx-8">
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1c2333] border border-[#30363d] rounded-full py-2 pl-4 pr-10 text-sm text-white/90 focus:outline-none focus:ring-1 focus:ring-[#58a6ff] focus:border-[#58a6ff]"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70"
              aria-label="Search"
            >
              <Search size={16} />
            </button>
          </form>

          {/* Cart icon (desktop) */}
          {!isMobile && (
            <div className="flex items-center gap-4">
              <Link to="/cart" className="relative p-2 text-white/80 hover:text-white transition-colors">
                <ShoppingCart size={22} />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#00ff4c] to-[#5200ff] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </Link>
            </div>
          )}
          
          {/* Mobile menu toggle */}
          {isMobile && (
            <button 
              onClick={toggleMobileMenu}
              className="p-2 rounded-full bg-[#1c2333]/50 text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </header>

      {/* Mobile navigation */}
      {isMobile && (
        <div className={cn(
          'fixed inset-0 z-40 bg-[#0d1117]/98 backdrop-blur-lg pt-20',
          'transition-transform duration-300 ease-in-out',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}>
          <div className="flex flex-col p-6 space-y-6">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1c2333] border border-[#30363d] rounded-full py-2 pl-4 pr-10 text-white/90 focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70"
                  aria-label="Search"
                >
                  <Search size={16} />
                </button>
              </div>
            </form>
            
            {navLinks.filter(link => !link.authRequired || isLoggedIn || link.path === '/login').map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'flex items-center py-3 px-4 rounded-lg gap-3 relative',
                  location.pathname === link.path
                    ? 'bg-[#1c2333] text-white'
                    : 'text-white/70 hover:bg-[#1c2333]/50 hover:text-white'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <link.icon className="text-[#00ff4c]" size={20} />
                <span>{link.label}</span>
                {link.badge > 0 && (
                  <span className="ml-auto bg-gradient-to-r from-[#00ff4c] to-[#5200ff] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
            
            <div className="pt-4 mt-4 border-t border-[#30363d] flex justify-center">
              {isLoggedIn ? (
                <button 
                  onClick={() => {
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('user');
                    window.location.href = '/';
                  }}
                  className="px-4 py-2 rounded-lg border border-[#30363d] text-white/70 hover:text-white"
                >
                  Sign Out
                </button>
              ) : (
                <Link 
                  to="/register" 
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00ff4c] to-[#5200ff] text-white font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Create Account
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
