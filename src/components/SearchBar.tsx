
import { useState } from 'react';
import { Search, Calendar, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  variant?: 'default' | 'minimal';
}

const SearchBar = ({ variant = 'default' }: SearchBarProps) => {
  const [location, setLocation] = useState('');
  const [guests, setGuests] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/listings?location=${encodeURIComponent(location)}&guests=${guests}`);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn(
        "relative w-full",
        variant === 'default' 
          ? "glass-card rounded-2xl overflow-hidden px-2 py-2 sm:py-3" 
          : "bg-transparent"
      )}
    >
      <div className={cn(
        "flex flex-col sm:flex-row",
        variant === 'default' ? "divide-y sm:divide-y-0 sm:divide-x divide-border" : "gap-2"
      )}>
        <div className="flex-1 p-2 sm:p-3">
          <label className="block text-xs font-medium text-muted-foreground mb-1">Location</label>
          <div className="flex items-center gap-2">
            <Search size={16} className="text-muted-foreground" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where are you going?"
              className="w-full bg-transparent border-none focus:outline-none text-sm"
            />
          </div>
        </div>

        <div className="flex-1 p-2 sm:p-3">
          <label className="block text-xs font-medium text-muted-foreground mb-1">Dates</label>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Add dates"
              className="w-full bg-transparent border-none focus:outline-none text-sm"
              onFocus={(e) => e.target.type = 'date'}
              onBlur={(e) => !e.target.value && (e.target.type = 'text')}
            />
          </div>
        </div>

        <div className="flex-1 p-2 sm:p-3">
          <label className="block text-xs font-medium text-muted-foreground mb-1">Guests</label>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-muted-foreground" />
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-transparent border-none focus:outline-none text-sm appearance-none cursor-pointer"
            >
              <option value="">Add guests</option>
              <option value="1">1 guest</option>
              <option value="2">2 guests</option>
              <option value="3">3 guests</option>
              <option value="4">4 guests</option>
              <option value="5+">5+ guests</option>
            </select>
          </div>
        </div>

        <div className={cn(
          "flex items-center justify-center",
          variant === 'default' ? "p-2 sm:p-3" : ""
        )}>
          <button
            type="submit"
            className={cn(
              "flex items-center justify-center transition-all duration-300",
              variant === 'default' 
                ? "bg-foreground text-primary-foreground hover:opacity-90 rounded-xl w-full sm:w-12 h-12" 
                : "bg-foreground text-primary-foreground hover:opacity-90 rounded-xl px-4 py-3"
            )}
            aria-label="Search"
          >
            {variant === 'default' ? (
              <Search size={18} />
            ) : (
              <div className="flex items-center gap-2">
                <span>Search</span>
                <ArrowRight size={16} />
              </div>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
