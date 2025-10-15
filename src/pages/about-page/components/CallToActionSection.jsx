import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const CallToActionSection = () => {
  const navigate = useNavigate();

  const stats = [
    {
      number: "1000+",
      label: "Projects Created",
      icon: "FolderPlus"
    },
    {
      number: "500+",
      label: "Developers Helped",
      icon: "Users"
    },
    {
      number: "50+",
      label: "Tech Stacks Supported",
      icon: "Code"
    },
    {
      number: "24/7",
      label: "AI Assistance",
      icon: "Zap"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name={stat?.icon} size={28} className="text-primary" strokeWidth={2} />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-text-primary mb-2">
                {stat?.number}
              </div>
              <div className="text-text-secondary font-medium">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>

        {/* Main CTA */}
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold text-text-primary mb-6">
            Ready to Transform Your
            <span className="text-primary"> Development Journey?</span>
          </h2>
          
          <p className="text-lg lg:text-xl text-text-secondary mb-8 leading-relaxed">
            Join thousands of developers who have learned to think structurally about project building. Start your first AI-powered project breakdown today and discover the difference proper planning makes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              variant="default"
              size="xl"
              onClick={() => navigate('/project-creation-form')}
              iconName="Rocket"
              iconPosition="left"
              iconSize={20}
            >
              Start Your First Project
            </Button>
            
            <Button
              variant="outline"
              size="xl"
              onClick={() => navigate('/authentication')}
              iconName="UserPlus"
              iconPosition="left"
              iconSize={20}
            >
              Create Free Account
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
              <div className="flex items-center mb-3">
                <Icon name="Zap" size={20} className="text-primary mr-2" strokeWidth={2} />
                <span className="font-semibold text-text-primary">Instant AI Analysis</span>
              </div>
              <p className="text-sm text-text-secondary">
                Get comprehensive project breakdowns in seconds with our advanced AI integration.
              </p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
              <div className="flex items-center mb-3">
                <Icon name="Eye" size={20} className="text-primary mr-2" strokeWidth={2} />
                <span className="font-semibold text-text-primary">Visual Learning</span>
              </div>
              <p className="text-sm text-text-secondary">
                Interactive diagrams and folder structures make complex concepts easy to understand.
              </p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border">
              <div className="flex items-center mb-3">
                <Icon name="Code" size={20} className="text-primary mr-2" strokeWidth={2} />
                <span className="font-semibold text-text-primary">Ready-to-Use Code</span>
              </div>
              <p className="text-sm text-text-secondary">
                Copy production-ready code snippets with educational explanations for each component.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;