import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Home',
      path: '/landing-page',
      icon: 'Home',
      tooltip: 'Discover WebGuide and start your learning journey'
    },
    {
      label: 'Create',
      path: '/project-creation-form',
      icon: 'Plus',
      tooltip: 'Create a new project and get AI-powered breakdown',
      requiresAuth: true
    },
    {
      label: 'My Projects',
      path: '/my-projects-dashboard',
      icon: 'FolderOpen',
      tooltip: 'Manage your projects and view AI breakdowns',
      requiresAuth: true
    },
    {
      label: 'About',
      path: '/about-page',
      icon: 'Info',
      tooltip: 'Learn about our methodology and approach'
    }
  ];

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, [location]);

  const handleNavigation = (path, requiresAuth = false) => {
    if (requiresAuth && !isAuthenticated) {
      navigate('/authentication');
      return;
    }
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      localStorage.removeItem('isAuthenticated');
      setIsAuthenticated(false);
      navigate('/landing-page');
    } else {
      navigate('/authentication');
    }
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <Icon name="Code" size={20} color="white" strokeWidth={2} />
      </div>
      <span className="text-xl font-semibold text-text-primary">WebGuide</span>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex-shrink-0 cursor-pointer transition-transform duration-150 hover:scale-105"
            onClick={() => handleNavigation('/landing-page')}
          >
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <div key={item?.path} className="relative group">
                <button
                  onClick={() => handleNavigation(item?.path, item?.requiresAuth)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 hover:bg-muted hover:transform hover:-translate-y-0.5 ${
                    isActivePath(item?.path)
                      ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name={item?.icon} size={16} strokeWidth={2} />
                  <span>{item?.label}</span>
                </button>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-1200">
                  {item?.tooltip}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            ))}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" strokeWidth={2} />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAuthAction}
                  iconName="LogOut"
                  iconPosition="left"
                  iconSize={16}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={handleAuthAction}
                iconName="LogIn"
                iconPosition="left"
                iconSize={16}
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              iconSize={20}
            />
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border animate-slide-in">
          <div className="px-4 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path, item?.requiresAuth)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-150 hover:bg-muted ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name={item?.icon} size={20} strokeWidth={2} />
                <div>
                  <div className="font-medium">{item?.label}</div>
                  <div className="text-xs text-text-secondary mt-1">{item?.tooltip}</div>
                </div>
              </button>
            ))}
            
            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-border">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 px-4 py-2">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={20} color="white" strokeWidth={2} />
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">Developer</div>
                      <div className="text-sm text-text-secondary">Signed in</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    fullWidth
                    onClick={handleAuthAction}
                    iconName="LogOut"
                    iconPosition="left"
                    iconSize={16}
                    className="justify-start"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button
                  variant="default"
                  fullWidth
                  onClick={handleAuthAction}
                  iconName="LogIn"
                  iconPosition="left"
                  iconSize={16}
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;