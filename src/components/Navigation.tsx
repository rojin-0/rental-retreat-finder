
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Library, User, Search, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export const Navigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/library', label: 'Library', icon: Library },
    { path: '/category', label: 'Category', icon: Search },
    { path: '/cart', label: 'Cart', icon: ShoppingCart },
    { path: '/profile', label: 'Account', icon: User },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic
    console.log('Searching for:', searchQuery);
  };

  return (
    <>
      <header 
        className={cn(
          'fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ease-in-out',
          isScrolled ? 'bg-[#0d1117]/80 backdrop-blur-lg border-b border-white/5' : 'bg-[#0d1117]'
        )}
      >
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/108a1c70-0b58-47b5-bd3d-c846de2a1b79.png" 
              alt="Vortex" 
              className="h-8 w-auto" 
            />
            <span className="text-xl font-semibold tracking-tighter bg-gradient-to-r from-[#00ff4c] to-[#5200ff] bg-clip-text text-transparent">VORTEX</span>
          </Link>

          {/* Desktop navigation */}
          {!isMobile && (
            <nav className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'text-sm font-medium transition-colors relative group py-2',
                    location.pathname === link.path
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  )}
                >
                  {link.label}
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
              placeholder="Search..."
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

          {/* Cart and Account icons */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-white/80 hover:text-white transition-colors">
              <ShoppingCart size={22} />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#00ff4c] to-[#5200ff] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link to="/profile" className="p-2 text-white/80 hover:text-white transition-colors">
              <User size={22} />
            </Link>
            
            {/* Mobile menu toggle */}
            {isMobile && (
              <button 
                onClick={toggleMobileMenu}
                className="p-2 text-white"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      {isMobile && (
        <div className={cn(
          'fixed inset-0 z-40 bg-[#0d1117] pt-20',
          'transition-transform duration-300',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}>
          <nav className="flex flex-col p-6 space-y-6">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
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
            
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'flex items-center py-3 px-4 rounded-lg',
                  location.pathname === link.path
                    ? 'bg-[#1c2333] text-white'
                    : 'text-white/70 hover:bg-[#1c2333]/50 hover:text-white'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <link.icon className="mr-3" size={20} />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Navigation;
