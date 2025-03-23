
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingCart } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { games } from '@/lib/game-data';
import { Game } from '@/components/GameCard';

// For demo purposes, we'll use local storage to persist cart items
interface CartItem {
  game: Game;
  quantity: number;
}

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // For demo purposes, initialize cart with sample items
  useEffect(() => {
    // Check if cart exists in localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    } else {
      // For demo purposes, add one sample item
      const sampleCart = [
        { game: games[0], quantity: 1 }
      ];
      setCartItems(sampleCart);
      localStorage.setItem('cart', JSON.stringify(sampleCart));
    }
    setIsLoading(false);
  }, []);
  
  // Update localStorage whenever cart changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading]);
  
  const removeFromCart = (gameId: string) => {
    setCartItems(cartItems.filter(item => item.game.id !== gameId));
  };
  
  const updateQuantity = (gameId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.game.id === gameId 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };
  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.game.discountedPrice || item.game.price;
      return total + (price * item.quantity);
    }, 0);
  };
  
  const tax = calculateSubtotal() * 0.10; // 10% tax
  const total = calculateSubtotal() + tax;
  
  const handleCheckout = () => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-12 flex justify-center">
          <p className="text-white">Loading cart...</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">Your Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart items */}
            <div className="lg:w-2/3">
              <div className="bg-[#1c2333] border border-[#30363d] rounded-lg overflow-hidden">
                <div className="p-6 border-b border-[#30363d]">
                  <h2 className="text-xl font-semibold text-white">Cart Items ({cartItems.length})</h2>
                </div>
                <div>
                  {cartItems.map((item) => (
                    <div key={item.game.id} className="p-6 flex flex-col sm:flex-row border-b border-[#30363d] last:border-0">
                      <div className="flex-shrink-0 w-full sm:w-32 h-24 rounded overflow-hidden mb-4 sm:mb-0">
                        <img 
                          src={item.game.coverImage} 
                          alt={item.game.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="sm:ml-6 flex-1">
                        <div className="flex justify-between">
                          <Link to={`/game/${item.game.id}`} className="text-lg font-medium text-white hover:text-[#58a6ff]">
                            {item.game.title}
                          </Link>
                          <div className="text-right">
                            {item.game.discountedPrice ? (
                              <>
                                <span className="text-white/50 line-through text-sm block">
                                  ${item.game.price.toFixed(2)}
                                </span>
                                <span className="text-white font-medium">
                                  ${item.game.discountedPrice.toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="text-white font-medium">
                                ${item.game.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center">
                            <button
                              className="w-8 h-8 flex items-center justify-center bg-[#0d1117] text-white rounded"
                              onClick={() => updateQuantity(item.game.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="mx-3 text-white">{item.quantity}</span>
                            <button
                              className="w-8 h-8 flex items-center justify-center bg-[#0d1117] text-white rounded"
                              onClick={() => updateQuantity(item.game.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.game.id)}
                            className="text-white/70 hover:text-white"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order summary */}
            <div className="lg:w-1/3">
              <div className="bg-[#1c2333] border border-[#30363d] rounded-lg overflow-hidden sticky top-24">
                <div className="p-6 border-b border-[#30363d]">
                  <h2 className="text-xl font-semibold text-white">Order Summary</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-white/70">Subtotal</span>
                      <span className="text-white">${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Tax (10%)</span>
                      <span className="text-white">${tax.toFixed(2)}</span>
                    </div>
                    <div className="pt-4 border-t border-[#30363d] flex justify-between">
                      <span className="text-white font-medium">Total</span>
                      <span className="text-white font-bold">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleCheckout}
                    className="w-full mt-6 bg-gradient-to-r from-[#00ff4c] to-[#5200ff] hover:opacity-90"
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <div className="mt-4 text-center">
                    <Link to="/category" className="text-[#58a6ff] text-sm hover:underline">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-[#1c2333] flex items-center justify-center mb-4">
              <ShoppingCart size={24} className="text-white/70" />
            </div>
            <h2 className="text-xl font-medium text-white mb-2">Your cart is empty</h2>
            <p className="text-white/70 mb-6">Looks like you haven't added any games to your cart yet.</p>
            <Link 
              to="/category" 
              className="px-6 py-3 bg-gradient-to-r from-[#00ff4c] to-[#5200ff] rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
            >
              Browse Games
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
