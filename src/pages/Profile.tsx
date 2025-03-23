
import { useState } from 'react';
import Layout from '@/components/Layout';
import { User, Mail, Phone, Home, LogOut, Settings, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const Profile = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'security'>('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-semibold mb-8">Your Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-3">
            <div className="glass-card rounded-xl p-6 space-y-4">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <User size={32} className="text-muted-foreground" />
                </div>
                <div className="ml-4">
                  <h2 className="font-medium">Guest User</h2>
                  <p className="text-sm text-muted-foreground">guest@example.com</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={cn(
                        "flex items-center gap-3 w-full p-3 rounded-lg transition-colors",
                        activeTab === tab.id 
                          ? "bg-secondary text-foreground" 
                          : "text-muted-foreground hover:bg-muted"
                      )}
                    >
                      <tab.icon size={18} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
              
              <button className="flex items-center gap-3 w-full p-3 rounded-lg transition-colors text-muted-foreground hover:bg-muted">
                <LogOut size={18} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:col-span-9">
            <div className="glass-card rounded-xl p-6">
              {activeTab === 'profile' && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <div className="relative">
                        <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          value="Guest User"
                          className="w-full pl-10 py-2.5 px-3 rounded-lg border border-border bg-transparent"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="email"
                          value="guest@example.com"
                          className="w-full pl-10 py-2.5 px-3 rounded-lg border border-border bg-transparent"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="tel"
                          placeholder="Add phone number"
                          className="w-full pl-10 py-2.5 px-3 rounded-lg border border-border bg-transparent"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Location</label>
                      <div className="relative">
                        <Home size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Add location"
                          className="w-full pl-10 py-2.5 px-3 rounded-lg border border-border bg-transparent"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <button className="py-2.5 px-6 bg-foreground text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-muted-foreground">Receive emails about new properties and updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-foreground"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div>
                        <h3 className="font-medium">Dark Mode</h3>
                        <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-foreground"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div>
                        <h3 className="font-medium">Language</h3>
                        <p className="text-sm text-muted-foreground">Select your preferred language</p>
                      </div>
                      <select className="py-1.5 px-3 rounded-lg border border-border bg-transparent">
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'security' && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Current Password</label>
                          <input
                            type="password"
                            className="w-full py-2.5 px-3 rounded-lg border border-border bg-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">New Password</label>
                          <input
                            type="password"
                            className="w-full py-2.5 px-3 rounded-lg border border-border bg-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                          <input
                            type="password"
                            className="w-full py-2.5 px-3 rounded-lg border border-border bg-transparent"
                          />
                        </div>
                        <div>
                          <button className="py-2.5 px-6 bg-foreground text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                            Update Password
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-border">
                      <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                        <div>
                          <h3 className="font-medium">Two-Factor Authentication</h3>
                          <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-foreground"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
