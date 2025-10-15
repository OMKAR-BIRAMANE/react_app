import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/project-creation-form');
  };

  const handleLearnMore = () => {
    navigate('/about-page');
  };

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Icon name="Sparkles" size={16} strokeWidth={2} />
            <span>AI-Powered Learning Platform</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight">
            Learn{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Structural Thinking
            </span>
            <br />
            for Project Building
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
            Master project architecture through AI-assisted breakdowns, interactive diagrams, and ready-to-use code snippets designed for beginner developers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
            <Button
              variant="default"
              size="lg"
              onClick={handleGetStarted}
              iconName="ArrowRight"
              iconPosition="right"
              iconSize={20}
              className="w-full sm:w-auto"
            >
              Start Your First Project
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleLearnMore}
              iconName="BookOpen"
              iconPosition="left"
              iconSize={20}
              className="w-full sm:w-auto"
            >
              Learn More
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-text-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} strokeWidth={2} />
              <span className="text-sm">10,000+ Developers Learning</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} strokeWidth={2} className="text-warning" />
              <span className="text-sm">4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} strokeWidth={2} className="text-success" />
              <span className="text-sm">100% Free to Start</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;