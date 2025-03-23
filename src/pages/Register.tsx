
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
      });
      return;
    }
    
    if (!acceptTerms) {
      toast({
        variant: "destructive",
        title: "Terms & Conditions",
        description: "Please accept the Terms & Conditions to continue.",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      // In a real app, you'd send this data to your backend
      if (name && email && password) {
        // Simulate successful registration
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify({ email, name }));
        
        toast({
          title: "Registration successful",
          description: "Welcome to Vortex!",
        });
        
        navigate('/');
      } else {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: "Please check your information and try again.",
        });
      }
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <Layout>
      <div className="container max-w-md mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create an Account</h1>
          <p className="text-white/70">Join Vortex and start your gaming journey</p>
        </div>
        
        <div className="bg-[#1c2333] border border-[#30363d] rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-[#0d1117] border-[#30363d]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#0d1117] border-[#30363d]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#0d1117] border-[#30363d]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-[#0d1117] border-[#30363d]"
              />
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="terms" 
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm font-normal leading-tight">
                I agree to the{" "}
                <Link to="#" className="text-[#58a6ff] hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link to="#" className="text-[#58a6ff] hover:underline">Privacy Policy</Link>
              </Label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-[#00ff4c] to-[#5200ff] hover:opacity-90" 
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-[#30363d] text-center">
            <p className="text-white/70">
              Already have an account?{" "}
              <Link to="/login" className="text-[#58a6ff] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
