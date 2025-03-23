
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import PropertyCard from '@/components/PropertyCard';
import SearchBar from '@/components/SearchBar';
import { properties, Property } from '@/lib/data';
import { Bed, Bath, Move, Map as MapIcon, GridIcon, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Listings = () => {
  const [searchParams] = useSearchParams();
  const locationParam = searchParams.get('location') || '';
  const guestsParam = searchParams.get('guests') || '';

  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [activeView, setActiveView] = useState<'grid' | 'map'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [bedroomsFilter, setBedroomsFilter] = useState<string>('any');
  const [bathroomsFilter, setBathroomsFilter] = useState<string>('any');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Get unique amenities from all properties
  const allAmenities = Array.from(
    new Set(properties.flatMap(property => property.amenities))
  ).sort();

  // Initial filtering based on URL parameters
  useEffect(() => {
    let result = [...properties];
    
    if (locationParam) {
      result = result.filter(property => 
        property.location.toLowerCase().includes(locationParam.toLowerCase())
      );
    }
    
    if (guestsParam && guestsParam !== '5+') {
      const guestsNumber = parseInt(guestsParam, 10);
      result = result.filter(property => property.bedrooms * 2 >= guestsNumber);
    } else if (guestsParam === '5+') {
      result = result.filter(property => property.bedrooms * 2 >= 5);
    }
    
    setFilteredProperties(result);
  }, [locationParam, guestsParam]);

  // Apply all filters
  const applyFilters = () => {
    let result = [...properties];
    
    // Location filter
    if (locationParam) {
      result = result.filter(property => 
        property.location.toLowerCase().includes(locationParam.toLowerCase())
      );
    }
    
    // Guests filter
    if (guestsParam && guestsParam !== '5+') {
      const guestsNumber = parseInt(guestsParam, 10);
      result = result.filter(property => property.bedrooms * 2 >= guestsNumber);
    } else if (guestsParam === '5+') {
      result = result.filter(property => property.bedrooms * 2 >= 5);
    }
    
    // Price range filter
    result = result.filter(property => 
      property.price >= priceRange[0] && property.price <= priceRange[1]
    );
    
    // Bedrooms filter
    if (bedroomsFilter !== 'any') {
      if (bedroomsFilter === '4+') {
        result = result.filter(property => property.bedrooms >= 4);
      } else {
        result = result.filter(property => property.bedrooms === parseInt(bedroomsFilter, 10));
      }
    }
    
    // Bathrooms filter
    if (bathroomsFilter !== 'any') {
      if (bathroomsFilter === '3+') {
        result = result.filter(property => property.bathrooms >= 3);
      } else {
        result = result.filter(property => 
          Math.floor(property.bathrooms) === parseInt(bathroomsFilter, 10)
        );
      }
    }
    
    // Amenities filter
    if (selectedAmenities.length > 0) {
      result = result.filter(property => 
        selectedAmenities.every(amenity => 
          property.amenities.includes(amenity)
        )
      );
    }
    
    setFilteredProperties(result);
    setShowFilters(false);
  };

  // Reset all filters
  const resetFilters = () => {
    setPriceRange([0, 5000]);
    setBedroomsFilter('any');
    setBathroomsFilter('any');
    setSelectedAmenities([]);
    setFilteredProperties(properties);
  };

  // Toggle amenity selection
  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-4">Find Your Perfect Rental</h1>
          <SearchBar variant="minimal" />
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-muted-foreground">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
              {locationParam && ` in "${locationParam}"`}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 py-2 px-4 rounded-lg border border-border hover:bg-secondary transition-colors"
            >
              <Filter size={16} />
              <span>Filters</span>
            </button>
            
            <div className="flex rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => setActiveView('grid')}
                className={cn(
                  "p-2.5 transition-colors",
                  activeView === 'grid' ? "bg-muted" : "hover:bg-secondary"
                )}
                aria-label="Grid view"
              >
                <GridIcon size={16} />
              </button>
              <button
                onClick={() => setActiveView('map')}
                className={cn(
                  "p-2.5 transition-colors",
                  activeView === 'map' ? "bg-muted" : "hover:bg-secondary"
                )}
                aria-label="Map view"
              >
                <MapIcon size={16} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Filters panel */}
        {showFilters && (
          <div className="fixed inset-0 bg-background z-50 overflow-auto animate-fade-in">
            <div className="container mx-auto px-6 py-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold">Filters</h2>
                <button 
                  onClick={() => setShowFilters(false)}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  aria-label="Close filters"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-8">
                {/* Price Range */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Price Range</h3>
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
                
                {/* Bedrooms */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Bedrooms</h3>
                  <div className="flex flex-wrap gap-2">
                    {['any', '1', '2', '3', '4+'].map((option) => (
                      <button
                        key={option}
                        onClick={() => setBedroomsFilter(option)}
                        className={cn(
                          "py-2 px-4 rounded-lg border border-border transition-colors",
                          bedroomsFilter === option ? "bg-foreground text-primary-foreground" : "hover:bg-secondary"
                        )}
                      >
                        {option === 'any' ? 'Any' : option}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Bathrooms */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Bathrooms</h3>
                  <div className="flex flex-wrap gap-2">
                    {['any', '1', '2', '3+'].map((option) => (
                      <button
                        key={option}
                        onClick={() => setBathroomsFilter(option)}
                        className={cn(
                          "py-2 px-4 rounded-lg border border-border transition-colors",
                          bathroomsFilter === option ? "bg-foreground text-primary-foreground" : "hover:bg-secondary"
                        )}
                      >
                        {option === 'any' ? 'Any' : option}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Amenities */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {allAmenities.map((amenity) => (
                      <button
                        key={amenity}
                        onClick={() => toggleAmenity(amenity)}
                        className={cn(
                          "py-2 px-4 rounded-lg border border-border transition-colors text-left text-sm",
                          selectedAmenities.includes(amenity) ? "bg-foreground text-primary-foreground" : "hover:bg-secondary"
                        )}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={resetFilters}
                    className="py-3 px-6 rounded-xl border border-border hover:bg-secondary transition-colors"
                  >
                    Reset
                  </button>
                  <button
                    onClick={applyFilters}
                    className="py-3 px-6 rounded-xl bg-foreground text-primary-foreground hover:opacity-90 transition-opacity flex-1"
                  >
                    Show {filteredProperties.length} properties
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Property Grid View */}
        {activeView === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <h3 className="text-xl font-medium mb-2">No properties found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search criteria</p>
                <button
                  onClick={resetFilters}
                  className="py-2 px-4 rounded-lg bg-foreground text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* Map View */}
        {activeView === 'map' && (
          <div className="h-[70vh] rounded-xl bg-muted/30 flex items-center justify-center animate-fade-in">
            <div className="text-center">
              <MapIcon size={48} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-medium mb-2">Map View Coming Soon</h3>
              <p className="text-muted-foreground">We're working on an interactive map to make your property search even easier.</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Listings;
