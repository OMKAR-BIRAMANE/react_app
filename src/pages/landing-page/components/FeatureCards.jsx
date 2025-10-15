import React from 'react';
import Icon from '../../../components/AppIcon';

const FeatureCards = () => {
  const features = [
    {
      id: 1,
      icon: "Brain",
      title: "AI-Powered Breakdowns",
      description: "Get intelligent project architecture analysis with detailed explanations of each component and their relationships.",
      color: "primary"
    },
    {
      id: 2,
      icon: "GitBranch",
      title: "Interactive Diagrams",
      description: "Visualize your project structure with interactive ER diagrams and folder trees that you can zoom, drag, and explore.",
      color: "secondary"
    },
    {
      id: 3,
      icon: "Code",
      title: "Ready-to-Use Code",
      description: "Access syntax-highlighted code snippets for React, Node.js, and Firebase with educational explanations.",
      color: "accent"
    },
    {
      id: 4,
      icon: "BookOpen",
      title: "Educational Explanations",
      description: "Understand the \'why\' behind each architectural decision with step-by-step reasoning and best practices.",
      color: "success"
    },
    {
      id: 5,
      icon: "Layers",
      title: "Module Breakdown",
      description: "See your project divided into logical modules with clear purposes, dependencies, and implementation guides.",
      color: "warning"
    },
    {
      id: 6,
      icon: "Download",
      title: "Export & Save",
      description: "Download diagrams as PNG files and save your project breakdowns for future reference and learning.",
      color: "error"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: "bg-primary/10 text-primary border-primary/20",
      secondary: "bg-secondary/10 text-secondary border-secondary/20",
      accent: "bg-accent/10 text-accent border-accent/20",
      success: "bg-success/10 text-success border-success/20",
      warning: "bg-warning/10 text-warning border-warning/20",
      error: "bg-error/10 text-error border-error/20"
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Everything You Need to Learn
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            From project ideation to implementation, our platform provides comprehensive tools designed specifically for beginner developers.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features?.map((feature) => (
            <div
              key={feature?.id}
              className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 border ${getColorClasses(feature?.color)}`}>
                <Icon name={feature?.icon} size={24} strokeWidth={2} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-primary transition-colors duration-200">
                {feature?.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {feature?.description}
              </p>

              {/* Hover Arrow */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Icon name="ArrowRight" size={16} className="text-primary" strokeWidth={2} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;