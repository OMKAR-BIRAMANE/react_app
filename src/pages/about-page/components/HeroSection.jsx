import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <Icon name="Code" size={32} color="white" strokeWidth={2} />
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-text-primary mb-6">
            About <span className="text-primary">WebGuide</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-text-secondary mb-8 leading-relaxed">
            Empowering beginner developers to think structurally about project building through AI-assisted architecture breakdown and visual learning.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              onClick={() => navigate('/project-creation-form')}
              iconName="Rocket"
              iconPosition="left"
              iconSize={20}
            >
              Start Your First Project
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/landing-page')}
              iconName="Home"
              iconPosition="left"
              iconSize={20}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;