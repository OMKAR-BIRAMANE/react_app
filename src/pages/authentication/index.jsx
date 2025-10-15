import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthHeader from './components/AuthHeader';
import AuthForm from './components/AuthForm';
import GoogleSignInButton from './components/GoogleSignInButton';
import LoadingOverlay from './components/LoadingOverlay';

const Authentication = () => {
  const [mode, setMode] = useState('signin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Mock credentials for testing
  const mockCredentials = {
    email: "developer@webguide.com",
    password: "webguide123"
  };

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      const from = location?.state?.from?.pathname || '/my-projects-dashboard';
      navigate(from, { replace: true });
    }
  }, [navigate, location]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setError(null);
  };

  const simulateAuthDelay = () => {
    return new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setShowLoadingOverlay(true);

    try {
      await simulateAuthDelay();

      if (mode === 'signin') {
        // Validate mock credentials for sign in
        if (formData?.email === mockCredentials?.email && formData?.password === mockCredentials?.password) {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userEmail', formData?.email);
          
          const from = location?.state?.from?.pathname || '/my-projects-dashboard';
          navigate(from, { replace: true });
        } else {
          setError(`Invalid credentials. Use email: ${mockCredentials?.email} and password: ${mockCredentials?.password}`);
        }
      } else {
        // Registration mode - simulate successful registration
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData?.email);
        localStorage.setItem('userName', formData?.username);
        
        navigate('/my-projects-dashboard', { replace: true });
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
      setShowLoadingOverlay(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    setShowLoadingOverlay(true);

    try {
      await simulateAuthDelay();
      
      // Simulate successful Google sign in
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', 'developer@gmail.com');
      localStorage.setItem('userName', 'Google Developer');
      localStorage.setItem('authProvider', 'google');
      
      const from = location?.state?.from?.pathname || '/my-projects-dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
      setShowLoadingOverlay(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <>
      <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="max-w-md w-full space-y-8"
        >
          {/* Auth Header */}
          <AuthHeader mode={mode} />

          {/* Main Auth Card */}
          <div className="bg-card border border-border rounded-xl shadow-card p-8">
            {/* Auth Form */}
            <AuthForm
              mode={mode}
              onModeChange={handleModeChange}
              onSubmit={handleFormSubmit}
              loading={loading}
              error={error}
            />

            {/* Google Sign In */}
            <div className="mt-8">
              <GoogleSignInButton
                onGoogleSignIn={handleGoogleSignIn}
                loading={loading}
                disabled={loading}
              />
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center">
            <p className="text-xs text-text-secondary max-w-sm mx-auto">
              By continuing, you agree to WebGuide's Terms of Service and Privacy Policy. 
              Your data is secure and encrypted.
            </p>
          </div>

          {/* Security Badges */}
          <div className="flex justify-center items-center space-x-4 pt-4">
            <div className="flex items-center space-x-1 text-xs text-text-secondary">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-text-secondary">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span>GDPR Compliant</span>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Loading Overlay */}
      <LoadingOverlay 
        isVisible={showLoadingOverlay}
        message={mode === 'signin' ? "Signing you in..." : "Creating your account..."}
      />
    </>
  );
};

export default Authentication;