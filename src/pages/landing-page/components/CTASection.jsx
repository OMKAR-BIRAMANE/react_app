import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CTASection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/project-creation-form');
  };

  const handleViewProjects = () => {
    navigate('/my-projects-dashboard');
  };

  const benefits = [
    {
      id: 1,
      text: "AI-powered project breakdowns",
      icon: "Brain"
    },
    {
      id: 2,
      text: "Interactive learning experience",
      icon: "MousePointer"
    },
    {
      id: 3,
      text: "Production-ready code snippets",
      icon: "Code"
    },
    {
      id: 4,
      text: "Visual architecture diagrams",
      icon: "GitBranch"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full blur-lg"></div>
        <div className="absolute top-1/4 right-1/4 w-36 h-36 bg-white rounded-full blur-2xl"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Master Project Architecture?
          </h2>
          
          {/* Subheading */}
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of developers who have transformed their coding journey from tutorial hell to confident project builders.
          </p>

          {/* Benefits List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            {benefits?.map((benefit) => (
              <div key={benefit?.id} className="flex items-center space-x-3 text-white/90">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name={benefit?.icon} size={16} strokeWidth={2} />
                </div>
                <span className="text-sm font-medium">{benefit?.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleGetStarted}
              iconName="Rocket"
              iconPosition="left"
              iconSize={20}
              className="w-full sm:w-auto bg-white text-primary hover:bg-white/90"
            >
              Start Learning Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleViewProjects}
              iconName="FolderOpen"
              iconPosition="left"
              iconSize={20}
              className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10"
            >
              View Sample Projects
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/80">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} strokeWidth={2} />
              <span className="text-sm">100% Free to Start</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} strokeWidth={2} />
              <span className="text-sm">Get Results in Minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} strokeWidth={2} />
              <span className="text-sm">Join 10,000+ Developers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;