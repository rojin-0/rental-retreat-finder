
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { getPropertyById, formatPrice } from '@/lib/data';
import { Heart, Bed, Bath, Move, Map, Calendar, ArrowLeft, Share2, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const property = getPropertyById(parseInt(id || '0', 10));
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Reset to top when component mounts
    window.scrollTo(0, 0);
    
    // Reset image index when property changes
    setCurrentImageIndex(0);
  }, [id]);

  // If property doesn't exist, redirect to listings
  useEffect(() => {
    if (!property) {
      navigate('/listings');
    }
  }, [property, navigate]);

  if (!property) {
    return null;
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const showNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const showPrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8 animate-fade-in">
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={16} className="mr-2" />
            <span>Back to properties</span>
          </button>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold mb-1">{property.title}</h1>
              <p className="text-muted-foreground">{property.location}</p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={toggleFavorite}
                className={cn(
                  "p-2.5 rounded-full border border-border hover:bg-secondary transition-colors",
                  isFavorite ? "text-red-500" : ""
                )}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={isFavorite ? "fill-red-500" : "fill-transparent"} size={18} />
              </button>
              
              <button
                className="p-2.5 rounded-full border border-border hover:bg-secondary transition-colors"
                aria-label="Share property"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Property Images */}
        <div className="relative mb-10 overflow-hidden rounded-2xl">
          <div className="aspect-[16/9] relative">
            <div className="absolute inset-0 flex transition-opacity duration-500 ease-in-out">
              {property.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${property.title} - Image ${index + 1}`}
                  className={cn(
                    "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
                    currentImageIndex === index ? "opacity-100" : "opacity-0"
                  )}
                />
              ))}
            </div>
            
            {/* Image navigation */}
            <button
              onClick={showPrevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 text-foreground shadow-md hover:bg-white transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            
            <button
              onClick={showNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 text-foreground shadow-md hover:bg-white transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
            
            {/* Image indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentImageIndex(index);
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    currentImageIndex === index 
                      ? "bg-white w-6" 
                      : "bg-white/60 hover:bg-white/80"
                  )}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Property details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border">
              <div>
                <h2 className="text-2xl font-semibold">{formatPrice(property.price, property.priceUnit)}</h2>
                <div className="flex items-center mt-1 text-muted-foreground">
                  <div className="flex items-center">
                    <Star size={16} className="fill-current text-yellow-500 mr-1" />
                    <span>{property.rating}</span>
                    <span className="mx-1">•</span>
                    <span>{property.reviewCount} reviews</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Bed size={18} />
                  <div>
                    <div className="font-medium">{property.bedrooms}</div>
                    <div className="text-sm text-muted-foreground">Bedrooms</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Bath size={18} />
                  <div>
                    <div className="font-medium">{property.bathrooms}</div>
                    <div className="text-sm text-muted-foreground">Bathrooms</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Move size={18} />
                  <div>
                    <div className="font-medium">{property.squareFeet}</div>
                    <div className="text-sm text-muted-foreground">Sq Ft</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Overview</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{property.description}</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-foreground"></div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Location</h3>
              <div className="aspect-video bg-muted rounded-xl overflow-hidden flex items-center justify-center">
                <div className="text-center p-6">
                  <Map size={36} className="mx-auto mb-2 text-muted-foreground" />
                  <p className="text-muted-foreground">Interactive map coming soon</p>
                </div>
              </div>
              <p className="mt-3 text-muted-foreground">{property.location}</p>
            </div>
          </div>
          
          {/* Booking section */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-xl p-6 space-y-6 sticky top-24">
              <div>
                <h3 className="text-lg font-semibold mb-1">Book this property</h3>
                <p className="text-muted-foreground">Available from {new Date(property.available.from).toLocaleDateString()} to {new Date(property.available.to).toLocaleDateString()}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Check-in</label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="date"
                      className="w-full pl-10 py-2.5 px-3 rounded-lg border border-border bg-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Check-out</label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="date"
                      className="w-full pl-10 py-2.5 px-3 rounded-lg border border-border bg-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Guests</label>
                  <select className="w-full py-2.5 px-3 rounded-lg border border-border bg-transparent appearance-none">
                    <option value="1">1 guest</option>
                    <option value="2">2 guests</option>
                    <option value="3">3 guests</option>
                    <option value="4">4 guests</option>
                    <option value="5">5 guests</option>
                    <option value="6">6+ guests</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-4">
                <button className="w-full py-3 px-4 bg-foreground text-primary-foreground rounded-xl hover:opacity-90 transition-opacity">
                  Request to Book
                </button>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex justify-between mb-2">
                    <span>{formatPrice(property.price, property.priceUnit)} x 5 nights</span>
                    <span>{formatPrice(property.price * 5, 'total')}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Cleaning fee</span>
                    <span>{formatPrice(150, 'total')}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Service fee</span>
                    <span>{formatPrice(property.price * 0.12, 'total')}</span>
                  </div>
                  <div className="flex justify-between pt-2 mt-2 border-t border-border font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(property.price * 5 + 150 + property.price * 0.12, 'total')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertyDetail;
