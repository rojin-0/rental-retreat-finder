
import Layout from '@/components/Layout';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-semibold mb-8">Your Favorites</h1>
        
        <div className="h-[50vh] flex flex-col items-center justify-center">
          <div className="p-6 bg-muted rounded-full mb-4">
            <Heart size={32} className="text-muted-foreground" />
          </div>
          <h2 className="text-xl font-medium mb-2">No favorites yet</h2>
          <p className="text-muted-foreground mb-6 text-center max-w-md">
            Add properties to your favorites by clicking the heart icon on any property card or detail page.
          </p>
          <Link
            to="/listings"
            className="py-3 px-6 bg-foreground text-primary-foreground rounded-xl hover:opacity-90 transition-opacity"
          >
            Browse Properties
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Favorites;
