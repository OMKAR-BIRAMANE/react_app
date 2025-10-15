import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectTypesSection = () => {
  const navigate = useNavigate();

  const projectTypes = [
    {
      id: 1,
      type: "Web Application",
      icon: "Globe",
      description: "Full-stack web applications with React, Node.js, and database integration",
      examples: ["E-commerce Platform", "Social Media Dashboard", "Task Management App"],
      techStack: ["React", "Node.js", "MongoDB", "Express"],
      color: "primary",
      preview: "Frontend + Backend + Database architecture with user authentication and API design"
    },
    {
      id: 2,
      type: "Mobile Application",
      icon: "Smartphone",
      description: "Cross-platform mobile apps with React Native and cloud backend services",
      examples: ["Fitness Tracker", "Food Delivery App", "Chat Application"],
      techStack: ["React Native", "Firebase", "Redux", "Expo"],
      color: "secondary",
      preview: "Mobile-first design with offline capabilities, push notifications, and cloud sync"
    },
    {
      id: 3,
      type: "API Service",
      icon: "Server",
      description: "RESTful APIs and microservices with proper documentation and testing",
      examples: ["User Management API", "Payment Gateway", "Data Analytics Service"],
      techStack: ["Node.js", "Express", "PostgreSQL", "Docker"],
      color: "accent",
      preview: "Scalable API architecture with authentication, rate limiting, and comprehensive testing"
    }
  ];

  const handleExploreType = (type) => {
    navigate('/project-creation-form', { state: { selectedType: type } });
  };

  const getColorClasses = (color) => {
    const colorMap = {
      primary: "border-primary/20 hover:border-primary/40 bg-primary/5",
      secondary: "border-secondary/20 hover:border-secondary/40 bg-secondary/5",
      accent: "border-accent/20 hover:border-accent/40 bg-accent/5"
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  const getIconColor = (color) => {
    const colorMap = {
      primary: "text-primary",
      secondary: "text-secondary",
      accent: "text-accent"
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Choose Your Project Type
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Get tailored architectural breakdowns based on your project type. Each breakdown includes specific patterns, best practices, and implementation guides.
          </p>
        </div>

        {/* Project Types Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {projectTypes?.map((project) => (
            <div
              key={project?.id}
              className={`group bg-card border-2 rounded-xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${getColorClasses(project?.color)}`}
            >
              {/* Header */}
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 rounded-lg bg-surface border border-border flex items-center justify-center ${getIconColor(project?.color)}`}>
                  <Icon name={project?.icon} size={24} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold text-text-primary">
                  {project?.type}
                </h3>
              </div>

              {/* Description */}
              <p className="text-text-secondary mb-4 leading-relaxed">
                {project?.description}
              </p>

              {/* Examples */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-text-primary mb-2">Popular Examples:</h4>
                <div className="space-y-1">
                  {project?.examples?.map((example, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                      <Icon name="CheckCircle" size={14} className="text-success" strokeWidth={2} />
                      <span>{example}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-text-primary mb-2">Tech Stack:</h4>
                <div className="flex flex-wrap gap-2">
                  {project?.techStack?.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-md border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="mb-6 p-3 bg-muted/50 rounded-lg border border-border">
                <h4 className="text-sm font-medium text-text-primary mb-1">What You'll Learn:</h4>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {project?.preview}
                </p>
              </div>

              {/* CTA Button */}
              <Button
                variant="outline"
                fullWidth
                onClick={() => handleExploreType(project?.type)}
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={16}
                className="group-hover:border-current group-hover:bg-current group-hover:text-white transition-all duration-200"
              >
                Explore {project?.type}
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-text-secondary mb-6">
            Not sure which type fits your idea? Our AI will help you choose the right architecture.
          </p>
          <Button
            variant="default"
            size="lg"
            onClick={() => navigate('/project-creation-form')}
            iconName="Sparkles"
            iconPosition="left"
            iconSize={20}
          >
            Let AI Guide You
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectTypesSection;