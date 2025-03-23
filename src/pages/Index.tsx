
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import FeaturedProperties from '@/components/FeaturedProperties';
import PropertyCard from '@/components/PropertyCard';
import { properties, getFeaturedProperties } from '@/lib/data';
import { Home, Bed, Bath, Car, Wifi, Tv, Coffee } from 'lucide-react';

const Index = () => {
  const featuredProperties = getFeaturedProperties();

  // Animate sections when they come into view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <Layout>
      <Hero />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <section className="py-16">
          <div className="animate-on-scroll opacity-0">
            <span className="text-sm font-medium bg-muted text-muted-foreground px-3 py-1 rounded-full mb-4 inline-block">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-semibold mb-12">Experience the difference</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.1s' }}>
              <div className="p-4 rounded-full bg-secondary w-14 h-14 flex items-center justify-center mb-5">
                <Home size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">Curated Selection</h3>
              <p className="text-muted-foreground">Every property meets our rigorous standards for quality, design, and comfort.</p>
            </div>

            <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
              <div className="p-4 rounded-full bg-secondary w-14 h-14 flex items-center justify-center mb-5">
                <Wifi size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">Modern Amenities</h3>
              <p className="text-muted-foreground">From high-speed WiFi to fully-equipped kitchens, our properties have everything you need.</p>
            </div>

            <div className="animate-on-scroll opacity-0" style={{ animationDelay: '0.3s' }}>
              <div className="p-4 rounded-full bg-secondary w-14 h-14 flex items-center justify-center mb-5">
                <Coffee size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">Exceptional Service</h3>
              <p className="text-muted-foreground">Our dedicated team ensures your stay is perfect from booking to checkout.</p>
            </div>
          </div>
        </section>
      </div>

      <div className="animate-on-scroll opacity-0">
        <FeaturedProperties 
          properties={featuredProperties} 
          title="Featured Properties" 
          subtitle="Discover our most popular and extraordinary accommodations."
        />
      </div>

      <section className="py-16 px-6 md:px-10 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="animate-on-scroll opacity-0">
              <span className="text-sm font-medium bg-background text-muted-foreground px-3 py-1 rounded-full mb-4 inline-block">Premium Experience</span>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">Find your perfect getaway</h2>
              <p className="text-muted-foreground mb-8">
                Whether you're looking for a cozy cabin retreat, a beachfront villa, or a modern urban apartment, our collection has the perfect property for your needs. Each space is thoughtfully designed and equipped with premium amenities.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Bed size={20} />
                  <span>Comfortable Bedrooms</span>
                </div>
                <div className="flex items-center gap-3">
                  <Bath size={20} />
                  <span>Luxurious Bathrooms</span>
                </div>
                <div className="flex items-center gap-3">
                  <Tv size={20} />
                  <span>Entertainment Systems</span>
                </div>
                <div className="flex items-center gap-3">
                  <Car size={20} />
                  <span>Convenient Parking</span>
                </div>
              </div>

              <a 
                href="/listings" 
                className="inline-flex items-center gap-2 mt-8 py-3 px-6 rounded-xl bg-foreground text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <span>Browse All Properties</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.33337 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 3.33337L12.6667 8.00004L8 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-5 animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
              <div className="space-y-5">
                <img 
                  src="https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?q=80&w=3287&auto=format&fit=crop" 
                  alt="Luxury interior" 
                  className="rounded-xl object-cover h-40 w-full"
                />
                <img 
                  src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=3292&auto=format&fit=crop" 
                  alt="Modern bathroom" 
                  className="rounded-xl object-cover h-64 w-full"
                />
              </div>
              <div className="space-y-5 pt-10">
                <img 
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=3270&auto=format&fit=crop" 
                  alt="House exterior" 
                  className="rounded-xl object-cover h-64 w-full"
                />
                <img 
                  src="https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?q=80&w=3270&auto=format&fit=crop" 
                  alt="Cozy bedroom" 
                  className="rounded-xl object-cover h-40 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="animate-on-scroll opacity-0">
            <span className="text-sm font-medium bg-muted text-muted-foreground px-3 py-1 rounded-full mb-4 inline-block">Property Spotlight</span>
            <h2 className="text-3xl md:text-4xl font-semibold mb-12">Our top picks</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.slice(0, 3).map((property, index) => (
              <div key={property.id} className="animate-on-scroll opacity-0" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                <PropertyCard property={property} featured={true} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-10 bg-muted/50 rounded-t-3xl">
        <div className="max-w-3xl mx-auto text-center animate-on-scroll opacity-0">
          <span className="text-sm font-medium bg-background text-muted-foreground px-3 py-1 rounded-full mb-4 inline-block">Ready to find your retreat?</span>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Start your journey today</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of satisfied guests who have found their perfect temporary home. Our properties are waiting to welcome you.
          </p>
          <a 
            href="/listings" 
            className="inline-flex items-center gap-2 py-3 px-8 rounded-xl bg-foreground text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <span>Browse All Properties</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.33337 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 3.33337L12.6667 8.00004L8 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
