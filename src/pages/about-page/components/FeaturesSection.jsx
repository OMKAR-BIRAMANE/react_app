import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FeaturesSection = () => {
  const features = [
    {
      icon: "Zap",
      title: "AI-Powered Breakdown",
      description: "Gemini API integration provides intelligent project architecture analysis and component suggestions.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=center",
      benefits: [
        "Instant project structure analysis",
        "Smart component recommendations",
        "Educational explanations for each decision"
      ]
    },
    {
      icon: "GitBranch",
      title: "Interactive ER Diagrams",
      description: "Visual relationship diagrams using Mermaid.js with zoom, drag, and export functionality.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center",
      benefits: [
        "Drag and zoom interactions",
        "PNG export functionality",
        "Real-time diagram updates"
      ]
    },
    {
      icon: "Code2",
      title: "Ready-to-Use Code Snippets",
      description: "Syntax-highlighted code generation for React, Node.js, and Firebase with copy functionality.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop&crop=center",
      benefits: [
        "Multiple framework support",
        "One-click copy functionality",
        "Best practices implementation"
      ]
    },
    {
      icon: "BookOpen",
      title: "Educational Explanations",
      description: "Step-by-step thinking process with collapsible educational panels and reasoning behind each decision.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&crop=center",
      benefits: [
        "Detailed reasoning explanations",
        "Progressive learning approach",
        "Collapsible content organization"
      ]
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
            Powerful Features for Learning
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Our comprehensive toolkit helps you understand project architecture through interactive visualizations, AI insights, and practical code examples.
          </p>
        </div>

        <div className="space-y-16">
          {features?.map((feature, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
              <div className="flex-1">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mr-4">
                    <Icon name={feature?.icon} size={24} color="white" strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-text-primary">
                    {feature?.title}
                  </h3>
                </div>
                
                <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                  {feature?.description}
                </p>
                
                <div className="space-y-3">
                  {feature?.benefits?.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center">
                      <Icon name="Check" size={20} className="text-success mr-3" strokeWidth={2} />
                      <span className="text-text-secondary">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={feature?.image}
                    alt={feature?.title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;