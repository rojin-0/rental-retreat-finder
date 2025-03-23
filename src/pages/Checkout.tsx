
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/use-toast';
import { Game } from '@/components/GameCard';

interface CartItem {
  game: Game;
  quantity: number;
}

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Load cart from localStorage
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login?redirect=checkout');
      return;
    }
    
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    setIsLoading(false);
  }, [navigate]);
  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.game.discountedPrice || item.game.price;
      return total + (price * item.quantity);
    }, 0);
  };
  
  const tax = calculateSubtotal() * 0.10; // 10% tax
  const total = calculateSubtotal() + tax;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Clear cart
      localStorage.removeItem('cart');
      
      toast({
        title: "Purchase successful!",
        description: "Thank you for your purchase. Your games are now available in your library.",
      });
      
      navigate('/library');
      setIsProcessing(false);
    }, 2000);
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-12 flex justify-center">
          <p className="text-white">Loading checkout...</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout form */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit}>
              {/* Billing information */}
              <div className="bg-[#1c2333] border border-[#30363d] rounded-lg overflow-hidden mb-8">
                <div className="p-6 border-b border-[#30363d]">
                  <h2 className="text-xl font-semibold text-white">Billing Information</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        required 
                        className="bg-[#0d1117] border-[#30363d]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        required 
                        className="bg-[#0d1117] border-[#30363d]"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      required 
                      className="bg-[#0d1117] border-[#30363d]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      required 
                      className="bg-[#0d1117] border-[#30363d]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        required 
                        className="bg-[#0d1117] border-[#30363d]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input 
                        id="state" 
                        required 
                        className="bg-[#0d1117] border-[#30363d]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input 
                        id="zip" 
                        required 
                        className="bg-[#0d1117] border-[#30363d]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Payment method */}
              <div className="bg-[#1c2333] border border-[#30363d] rounded-lg overflow-hidden mb-8">
                <div className="p-6 border-b border-[#30363d]">
                  <h2 className="text-xl font-semibold text-white">Payment Method</h2>
                </div>
                <div className="p-6">
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={setPaymentMethod}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card">Credit / Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal">PayPal</Label>
                    </div>
                  </RadioGroup>
                  
                  {paymentMethod === 'credit-card' && (
                    <div className="mt-6 space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input 
                          id="cardNumber" 
                          placeholder="1234 5678 9012 3456" 
                          required 
                          className="bg-[#0d1117] border-[#30363d]"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="expiration">Expiration Date</Label>
                          <Input 
                            id="expiration" 
                            placeholder="MM/YY" 
                            required 
                            className="bg-[#0d1117] border-[#30363d]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input 
                            id="cvv" 
                            placeholder="123" 
                            required 
                            className="bg-[#0d1117] border-[#30363d]"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="nameOnCard">Name on Card</Label>
                        <Input 
                          id="nameOnCard" 
                          required 
                          className="bg-[#0d1117] border-[#30363d]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#00ff4c] to-[#5200ff] hover:opacity-90"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing payment..." : `Complete Purchase $${total.toFixed(2)}`}
              </Button>
            </form>
          </div>
          
          {/* Order summary */}
          <div className="lg:w-1/3">
            <div className="bg-[#1c2333] border border-[#30363d] rounded-lg overflow-hidden sticky top-24">
              <div className="p-6 border-b border-[#30363d]">
                <h2 className="text-xl font-semibold text-white">Order Summary</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.game.id} className="flex gap-4 pb-4 border-b border-[#30363d] last:border-0">
                      <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={item.game.coverImage} 
                          alt={item.game.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white text-sm font-medium">{item.game.title}</h3>
                        <p className="text-white/70 text-xs">Qty: {item.quantity}</p>
                        <div className="text-white font-medium text-sm mt-1">
                          ${(item.game.discountedPrice || item.game.price).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4 mt-6">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
