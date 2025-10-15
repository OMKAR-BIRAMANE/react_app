import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthHeader = ({ mode }) => {
  const isSignIn = mode === 'signin';

  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
          <Icon name="Code" size={32} color="white" strokeWidth={2} />
        </div>
      </div>

      {/* Welcome Text */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-text-primary">
          {isSignIn ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="text-text-secondary max-w-md mx-auto">
          {isSignIn 
            ? 'Sign in to your WebGuide account to continue building amazing projects with AI-powered guidance.' :'Join WebGuide to start your journey in learning project architecture and system design with AI assistance.'
          }
        </p>
      </div>

      {/* Features highlight for registration */}
      {!isSignIn && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="flex flex-col items-center space-y-2 p-4 bg-muted/50 rounded-lg">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Zap" size={20} className="text-primary" />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-text-primary">AI-Powered</h3>
              <p className="text-xs text-text-secondary">Smart project breakdowns</p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2 p-4 bg-muted/50 rounded-lg">
            <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
              <Icon name="BookOpen" size={20} className="text-secondary" />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-text-primary">Educational</h3>
              <p className="text-xs text-text-secondary">Learn while building</p>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2 p-4 bg-muted/50 rounded-lg">
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
              <Icon name="Code2" size={20} className="text-accent" />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-text-primary">Ready Code</h3>
              <p className="text-xs text-text-secondary">Copy-paste snippets</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthHeader;