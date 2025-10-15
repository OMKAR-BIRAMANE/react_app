import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const AuthForm = ({ 
  mode, 
  onModeChange, 
  onSubmit, 
  loading = false,
  error = null 
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    rememberMe: false,
    acceptTerms: false
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors?.[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData?.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex?.test(formData?.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData?.password) {
      errors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    // Registration-specific validations
    if (mode === 'register') {
      if (!formData?.username) {
        errors.username = 'Username is required';
      } else if (formData?.username?.length < 3) {
        errors.username = 'Username must be at least 3 characters';
      }

      if (!formData?.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }

      if (!formData?.acceptTerms) {
        errors.acceptTerms = 'You must accept the terms and conditions';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const isSignIn = mode === 'signin';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Username field for registration */}
      {!isSignIn && (
        <Input
          label="Username"
          type="text"
          placeholder="Choose a username"
          value={formData?.username}
          onChange={(e) => handleInputChange('username', e?.target?.value)}
          error={validationErrors?.username}
          required
          disabled={loading}
        />
      )}
      {/* Email field */}
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        value={formData?.email}
        onChange={(e) => handleInputChange('email', e?.target?.value)}
        error={validationErrors?.email}
        required
        disabled={loading}
      />
      {/* Password field */}
      <Input
        label="Password"
        type="password"
        placeholder={isSignIn ? "Enter your password" : "Create a password"}
        value={formData?.password}
        onChange={(e) => handleInputChange('password', e?.target?.value)}
        error={validationErrors?.password}
        description={!isSignIn ? "Must be at least 6 characters long" : ""}
        required
        disabled={loading}
      />
      {/* Confirm password for registration */}
      {!isSignIn && (
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
          error={validationErrors?.confirmPassword}
          required
          disabled={loading}
        />
      )}
      {/* Remember me checkbox for sign in */}
      {isSignIn && (
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            checked={formData?.rememberMe}
            onChange={(e) => handleInputChange('rememberMe', e?.target?.checked)}
            disabled={loading}
          />
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-1 py-0.5"
            disabled={loading}
          >
            Forgot password?
          </button>
        </div>
      )}
      {/* Terms acceptance for registration */}
      {!isSignIn && (
        <Checkbox
          label={
            <span className="text-sm">
              I agree to the{' '}
              <button
                type="button"
                className="text-primary hover:text-primary/80 underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              >
                Terms of Service
              </button>
              {' '}and{' '}
              <button
                type="button"
                className="text-primary hover:text-primary/80 underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              >
                Privacy Policy
              </button>
            </span>
          }
          checked={formData?.acceptTerms}
          onChange={(e) => handleInputChange('acceptTerms', e?.target?.checked)}
          error={validationErrors?.acceptTerms}
          required
          disabled={loading}
        />
      )}
      {/* Global error message */}
      {error && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
            <p className="text-sm text-error">{error}</p>
          </div>
        </div>
      )}
      {/* Submit button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={loading}
        disabled={loading}
        iconName={isSignIn ? "LogIn" : "UserPlus"}
        iconPosition="left"
        iconSize={18}
      >
        {isSignIn ? 'Sign In' : 'Create Account'}
      </Button>
      {/* Mode toggle */}
      <div className="text-center">
        <p className="text-sm text-text-secondary">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          {' '}
          <button
            type="button"
            onClick={() => onModeChange(isSignIn ? 'register' : 'signin')}
            className="text-primary hover:text-primary/80 font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-1 py-0.5"
            disabled={loading}
          >
            {isSignIn ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </form>
  );
};

export default AuthForm;