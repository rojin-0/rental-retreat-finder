
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { LogIn, UserPlus, ChevronLeft } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Get redirect from query params
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirect') || '/';
  
  // Check if user is already logged in
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      navigate('/');
    }
  }, [navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      // In a real app, you'd validate credentials with your backend
      if (email && password) {
        // Simulate successful login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify({ 
          email, 
          name: email.split('@')[0]
        }));
        
        toast({
          title: "Login successful",
          description: "Welcome back to Vortex!",
        });
        
        navigate(redirectTo);
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Please check your credentials and try again.",
        });
      }
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <Layout>
      <div className="container max-w-md mx-auto px-6 py-12">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/70">Sign in to your Vortex account</p>
        </div>
        
        <div className="bg-[#1c2333]/60 backdrop-blur-sm border border-[#30363d] rounded-lg p-6 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#0d1117]/70 border-[#30363d]"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-xs text-[#58a6ff] hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#0d1117]/70 border-[#30363d]"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-[#00ff4c] to-[#5200ff] hover:opacity-90 flex items-center justify-center gap-2 h-11" 
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : (
                <>
                  <LogIn size={18} />
                  <span>Sign In</span>
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-[#30363d] text-center">
            <p className="text-white/70 mb-4">
              Don't have an account yet?
            </p>
            <Link 
              to="/register" 
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg border border-[#30363d] text-white hover:bg-[#30363d]/30 transition-colors"
            >
              <UserPlus size={18} />
              <span>Create New Account</span>
            </Link>
            
            <Link to={redirectTo === '/' ? '/' : redirectTo} className="mt-4 inline-flex items-center gap-1 text-[#58a6ff] hover:underline text-sm">
              <ChevronLeft size={14} />
              <span>Back to {redirectTo === '/' ? 'Home' : 'Previous Page'}</span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
