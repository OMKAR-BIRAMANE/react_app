import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingOverlay = ({ isVisible, message = "Authenticating..." }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card border border-border rounded-xl p-8 shadow-modal max-w-sm w-full mx-4">
        <div className="text-center space-y-4">
          {/* Animated spinner */}
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon 
                name="Loader2" 
                size={24} 
                className="text-primary animate-spin" 
                strokeWidth={2}
              />
            </div>
          </div>

          {/* Loading message */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-text-primary">
              Please wait
            </h3>
            <p className="text-sm text-text-secondary">
              {message}
            </p>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;