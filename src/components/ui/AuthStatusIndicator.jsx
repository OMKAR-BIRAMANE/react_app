import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AuthStatusIndicator = ({ 
  user = null, 
  onSignOut = null,
  className = "" 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setIsDropdownOpen(false);
    if (onSignOut) {
      onSignOut();
    } else {
      navigate('/landing-page');
    }
  };

  const handleSignIn = () => {
    navigate('/authentication');
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    // Navigate to profile page when implemented
  };

  const handleSettingsClick = () => {
    setIsDropdownOpen(false);
    // Navigate to settings page when implemented
  };

  if (!isAuthenticated) {
    return (
      <div className={className}>
        <Button
          variant="default"
          size="sm"
          onClick={handleSignIn}
          iconName="LogIn"
          iconPosition="left"
          iconSize={16}
        >
          Sign In
        </Button>
      </div>
    );
  }

  const displayName = user?.name || 'Developer';
  const displayEmail = user?.email || 'developer@webguide.com';
  const avatarInitials = displayName?.split(' ')?.map(n => n?.[0])?.join('')?.toUpperCase()?.slice(0, 2);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* User Avatar Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
          {user?.avatar ? (
            <img 
              src={user?.avatar} 
              alt={displayName}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            avatarInitials
          )}
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-text-primary">{displayName}</div>
          <div className="text-xs text-text-secondary">{displayEmail}</div>
        </div>
        <Icon 
          name={isDropdownOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-text-secondary hidden md:block" 
          strokeWidth={2}
        />
      </button>
      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-modal z-1200 animate-fade-in">
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                {user?.avatar ? (
                  <img 
                    src={user?.avatar} 
                    alt={displayName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  avatarInitials
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-text-primary truncate">{displayName}</div>
                <div className="text-xs text-text-secondary truncate">{displayEmail}</div>
              </div>
            </div>
          </div>

          <div className="py-2">
            <button
              onClick={handleProfileClick}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted transition-colors duration-150"
            >
              <Icon name="User" size={16} strokeWidth={2} />
              <span>Profile</span>
            </button>
            
            <button
              onClick={handleSettingsClick}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted transition-colors duration-150"
            >
              <Icon name="Settings" size={16} strokeWidth={2} />
              <span>Settings</span>
            </button>
            
            <div className="border-t border-border my-2"></div>
            
            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors duration-150"
            >
              <Icon name="LogOut" size={16} strokeWidth={2} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthStatusIndicator;