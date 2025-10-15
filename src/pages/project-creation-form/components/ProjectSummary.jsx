import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectSummary = ({ 
  projectData, 
  onEdit, 
  onSubmit, 
  isSubmitting = false 
}) => {
  const { projectName, projectDescription, projectType, techStack } = projectData;

  const getProjectTypeInfo = (type) => {
    const types = {
      web: { label: 'Web Application', icon: 'Globe' },
      mobile: { label: 'Mobile Application', icon: 'Smartphone' },
      api: { label: 'API/Backend Service', icon: 'Server' }
    };
    return types?.[type] || types?.web;
  };

  const formatTechStack = (stack) => {
    const formatted = [];
    Object.entries(stack)?.forEach(([category, technologies]) => {
      if (technologies && technologies?.length > 0) {
        formatted?.push({
          category: category?.charAt(0)?.toUpperCase() + category?.slice(1),
          techs: technologies
        });
      }
    });
    return formatted;
  };

  const typeInfo = getProjectTypeInfo(projectType);
  const formattedTechStack = formatTechStack(techStack);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Review Your Project Details
        </h3>
        <p className="text-sm text-text-secondary mb-6">
          Please review your project information before we generate your AI-powered breakdown and architecture suggestions.
        </p>
      </div>
      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        {/* Project Name */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-text-primary flex items-center space-x-2">
              <Icon name="FileText" size={18} strokeWidth={2} />
              <span>Project Name</span>
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(0)}
              iconName="Edit2"
              iconSize={14}
            >
              Edit
            </Button>
          </div>
          <p className="text-text-primary font-medium ml-6">{projectName}</p>
        </div>

        {/* Project Description */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-text-primary flex items-center space-x-2">
              <Icon name="AlignLeft" size={18} strokeWidth={2} />
              <span>Description</span>
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(0)}
              iconName="Edit2"
              iconSize={14}
            >
              Edit
            </Button>
          </div>
          <div className="ml-6 p-3 bg-muted/50 rounded-lg">
            <p className="text-text-secondary text-sm leading-relaxed">
              {projectDescription}
            </p>
            <div className="mt-2 text-xs text-text-secondary">
              {projectDescription?.length} characters
            </div>
          </div>
        </div>

        {/* Project Type */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-text-primary flex items-center space-x-2">
              <Icon name="Layers" size={18} strokeWidth={2} />
              <span>Project Type</span>
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(1)}
              iconName="Edit2"
              iconSize={14}
            >
              Edit
            </Button>
          </div>
          <div className="ml-6 flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={typeInfo?.icon} size={16} className="text-primary" strokeWidth={2} />
            </div>
            <span className="text-text-primary font-medium">{typeInfo?.label}</span>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-text-primary flex items-center space-x-2">
              <Icon name="Code" size={18} strokeWidth={2} />
              <span>Tech Stack</span>
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(2)}
              iconName="Edit2"
              iconSize={14}
            >
              Edit
            </Button>
          </div>
          <div className="ml-6 space-y-3">
            {formattedTechStack?.length > 0 ? (
              formattedTechStack?.map((category, index) => (
                <div key={index} className="space-y-1">
                  <h5 className="text-sm font-medium text-text-primary">{category?.category}:</h5>
                  <div className="flex flex-wrap gap-2">
                    {category?.techs?.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-text-secondary text-sm">No technologies selected</p>
            )}
          </div>
        </div>
      </div>
      {/* AI Generation Info */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Sparkles" size={18} className="text-accent mt-0.5" strokeWidth={2} />
          <div>
            <h5 className="font-medium text-text-primary mb-1">What happens next?</h5>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• AI will analyze your project requirements</li>
              <li>• Generate system architecture breakdown</li>
              <li>• Create visual ER diagrams and folder structure</li>
              <li>• Provide code snippets and implementation guidance</li>
              <li>• Offer educational explanations for each component</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <Button
          variant="default"
          size="lg"
          onClick={onSubmit}
          loading={isSubmitting}
          iconName="Sparkles"
          iconPosition="left"
          iconSize={18}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Generating AI Breakdown...' : 'Generate AI Project Breakdown'}
        </Button>
      </div>
      {isSubmitting && (
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
          <p className="text-sm text-text-secondary">
            This may take 10-30 seconds. Please don't close this page.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectSummary;