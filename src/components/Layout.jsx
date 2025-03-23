
import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navigation from './Navigation';
import { Github, Twitter, Instagram, Youtube, Mail, Globe, Coffee, Shield, Headphones } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Games', path: '/category' },
    { label: 'My Library', path: '/library' },
    { label: 'Cart', path: '/cart' },
    { label: 'Profile', path: '/profile' },
  ];

  const supportLinks = [
    { label: 'Help Center', path: '#' },
    { label: 'Contact Us', path: '#' },
    { label: 'FAQs', path: '#' },
    { label: 'Refund Policy', path: '#' },
  ];

  const legalLinks = [
    { label: 'Terms of Service', path: '#' },
    { label: 'Privacy Policy', path: '#' },
    { label: 'Cookie Policy', path: '#' },
    { label: 'EULA', path: '#' },
  ];

  const socialLinks = [
    { icon: Twitter, label: 'Twitter', url: '#' },
    { icon: Github, label: 'Github', url: '#' },
    { icon: Instagram, label: 'Instagram', url: '#' },
    { icon: Youtube, label: 'YouTube', url: '#' },
  ];

  const features = [
    { icon: Globe, title: 'Global Games', description: 'Access games from around the world' },
    { icon: Shield, title: 'Secure Payments', description: 'Your transactions are always safe' },
    { icon: Headphones, title: '24/7 Support', description: 'Get help whenever you need it' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0d1117]">
      <Navigation />
      <main className="flex-grow pt-20 page-fade-in">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="mt-16 bg-gradient-to-b from-[#131922] to-[#0d1117] border-t border-white/5">
        {/* Features section - before main footer */}
        <div className="container mx-auto py-12 px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-[#1c2333]/40 hover:bg-[#1c2333]/60 border border-white/5 rounded-xl p-6 transition-all duration-300 hover:transform hover:translate-y-[-5px]"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-gradient-to-br from-[#00ff4c]/20 to-[#5200ff]/20 text-white">
                    <feature.icon size={20} className="text-[#00ff4c]" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">{feature.title}</h3>
                    <p className="text-white/60 text-sm">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Main footer */}
        <div className="container mx-auto px-6 pt-8 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Branding and description */}
            <div className="md:col-span-1">
              <div className="flex items-center mb-4">
                <img 
                  src="/lovable-uploads/108a1c70-0b58-47b5-bd3d-c846de2a1b79.png" 
                  alt="Vortex" 
                  className="h-10 w-auto mr-2" 
                />
                <span className="text-xl font-bold tracking-tighter bg-gradient-to-r from-[#00ff4c] to-[#5200ff] bg-clip-text text-transparent">VORTEX</span>
              </div>
              <p className="text-white/60 text-sm mb-6">The ultimate destination for gamers worldwide. Discover, download, and play the latest games all in one place.</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.url} 
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1c2333] hover:bg-[#30363d] transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon size={18} className="text-white/70" />
                  </a>
                ))}
              </div>
            </div>
            
            {/* Quick links */}
            <div>
              <h3 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className="text-white/60 hover:text-white/90 text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h3 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Support</h3>
              <ul className="space-y-2">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.path} className="text-white/60 hover:text-white/90 text-sm transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h3 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Legal</h3>
              <ul className="space-y-2">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.path} className="text-white/60 hover:text-white/90 text-sm transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Bottom footer - copyright, email, etc */}
          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/40 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Vortex Games. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="flex items-center gap-1 text-white/60 hover:text-white/90 text-sm transition-colors">
                <Mail size={14} />
                <span>support@vortexgames.io</span>
              </a>
              <a href="#" className="flex items-center gap-1 text-white/60 hover:text-white/90 text-sm transition-colors">
                <Coffee size={14} />
                <span>Buy us a coffee</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
