import React from 'react';
import Icon from '../../../components/AppIcon';

const ProjectTypeSelector = ({ 
  selectedType, 
  onTypeSelect, 
  error = null 
}) => {
  const projectTypes = [
    {
      id: 'web',
      label: 'Web Application',
      description: 'Build responsive websites and web apps',
      icon: 'Globe',
      examples: 'E-commerce, Portfolio, Blog, Dashboard',
      techStack: 'React, Vue, Angular, HTML/CSS'
    },
    {
      id: 'mobile',
      label: 'Mobile Application',
      description: 'Create native or cross-platform mobile apps',
      icon: 'Smartphone',
      examples: 'Social Media, Productivity, Games',
      techStack: 'React Native, Flutter, Swift, Kotlin'
    },
    {
      id: 'api',
      label: 'API/Backend Service',
      description: 'Design server-side applications and APIs',
      icon: 'Server',
      examples: 'REST API, GraphQL, Microservices',
      techStack: 'Node.js, Python, Java, Express'
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          What type of project are you building?
        </h3>
        <p className="text-sm text-text-secondary mb-4">
          Choose the platform that best fits your project idea. This helps us provide relevant architecture suggestions.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projectTypes?.map((type) => (
          <div
            key={type?.id}
            onClick={() => onTypeSelect(type?.id)}
            className={`relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedType === type?.id
                ? 'border-primary bg-primary/5 shadow-sm'
                : 'border-border bg-card hover:border-primary/30'
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                selectedType === type?.id
                  ? 'bg-primary text-white' :'bg-muted text-text-secondary'
              }`}>
                <Icon name={type?.icon} size={24} strokeWidth={2} />
              </div>
              
              <div>
                <h4 className={`font-semibold ${
                  selectedType === type?.id ? 'text-primary' : 'text-text-primary'
                }`}>
                  {type?.label}
                </h4>
                <p className="text-sm text-text-secondary mt-1">
                  {type?.description}
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-medium text-text-primary">Examples:</span>
                  <p className="text-text-secondary">{type?.examples}</p>
                </div>
                <div>
                  <span className="font-medium text-text-primary">Tech Stack:</span>
                  <p className="text-text-secondary">{type?.techStack}</p>
                </div>
              </div>
            </div>

            {selectedType === type?.id && (
              <div className="absolute top-3 right-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Check" size={14} color="white" strokeWidth={2} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {error && (
        <div className="flex items-center space-x-2 text-destructive text-sm">
          <Icon name="AlertCircle" size={16} strokeWidth={2} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default ProjectTypeSelector;