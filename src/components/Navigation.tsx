
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export const Navigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/listings', label: 'Properties', icon: Search },
    { path: '/favorites', label: 'Favorites', icon: Heart },
    { path: '/profile', label: 'Account', icon: User },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header 
        className={cn(
          'fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ease-in-out',
          isScrolled ? 'glass-card' : 'bg-transparent'
        )}
      >
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-semibold tracking-tighter">RentalRetreat</span>
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
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {link.label}
                  <span className={cn(
                    'absolute bottom-0 left-0 w-full h-0.5 bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-300',
                    location.pathname === link.path ? 'scale-x-100' : ''
                  )} />
                </Link>
              ))}
            </nav>
          )}

          {/* Mobile menu toggle */}
          {isMobile && (
            <button 
              onClick={toggleMobileMenu}
              className="p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          )}
        </div>
      </header>

      {/* Mobile navigation */}
      {isMobile && (
        <div className={cn(
          'fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 py-2 px-6',
          'transition-transform duration-300',
          isMobileMenuOpen ? 'transform-none' : 'transform translate-y-full'
        )}>
          <nav className="flex items-center justify-around">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'flex flex-col items-center p-2 space-y-1',
                  location.pathname === link.path
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <link.icon size={20} />
                <span className="text-xs">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Fixed bottom navigation for quick access */}
      {isMobile && !isMobileMenuOpen && (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center z-40 pointer-events-none">
          <div className="glass-card rounded-full py-3 px-8 pointer-events-auto animate-fade-up">
            <div className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'flex items-center justify-center p-2',
                    location.pathname === link.path
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  <link.icon size={20} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
