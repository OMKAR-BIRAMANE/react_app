import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ProjectDetailsForm = ({ 
  projectName, 
  projectDescription, 
  onProjectNameChange, 
  onProjectDescriptionChange,
  errors = {} 
}) => {
  const [charCount, setCharCount] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  const maxChars = 500;
  const minChars = 50;

  useEffect(() => {
    setCharCount(projectDescription?.length);
    
    // Generate suggestions based on description length and content
    const newSuggestions = [];
    
    if (projectDescription?.length < minChars) {
      newSuggestions?.push({
        type: 'warning',
        text: `Add ${minChars - projectDescription?.length} more characters for better AI analysis`
      });
    }
    
    if (projectDescription?.length > 0 && !projectDescription?.includes('user')) {
      newSuggestions?.push({
        type: 'tip',
        text: 'Consider mentioning your target users or audience'
      });
    }
    
    if (projectDescription?.length > 0 && !projectDescription?.toLowerCase()?.includes('feature')) {
      newSuggestions?.push({
        type: 'tip',
        text: 'Describe key features or functionality you want to include'
      });
    }

    setSuggestions(newSuggestions);
  }, [projectDescription]);

  const handleDescriptionChange = (e) => {
    const value = e?.target?.value;
    if (value?.length <= maxChars) {
      onProjectDescriptionChange(value);
    }
  };

  const examplePrompts = [
    "A social media platform for book lovers to share reviews and recommendations",
    "An expense tracking app that helps users manage their monthly budgets",
    "A task management system for small teams with real-time collaboration",
    "An e-commerce website for handmade crafts with payment integration"
  ];

  const insertExample = (example) => {
    onProjectDescriptionChange(example);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Tell us about your project
        </h3>
        <p className="text-sm text-text-secondary mb-6">
          Provide basic information about your project idea. The more details you share, the better our AI can help structure your project.
        </p>
      </div>
      {/* Project Name */}
      <div className="space-y-4">
        <Input
          label="Project Name"
          type="text"
          placeholder="Enter your project name"
          value={projectName}
          onChange={(e) => onProjectNameChange(e?.target?.value)}
          error={errors?.projectName}
          required
          description="Choose a clear, descriptive name for your project"
        />

        {/* Project Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            Project Description *
          </label>
          <div className="relative">
            <textarea
              value={projectDescription}
              onChange={handleDescriptionChange}
              placeholder="Describe your project idea in detail. What problem does it solve? Who are your target users? What key features do you want to include?"
              className={`w-full min-h-32 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-150 ${
                errors?.projectDescription 
                  ? 'border-destructive' 
                  : charCount < minChars 
                    ? 'border-warning' :'border-border'
              }`}
              rows={6}
            />
            <div className={`absolute bottom-3 right-3 text-xs ${
              charCount > maxChars * 0.9 
                ? 'text-warning' 
                : charCount < minChars 
                  ? 'text-warning' :'text-text-secondary'
            }`}>
              {charCount}/{maxChars}
            </div>
          </div>
          
          {errors?.projectDescription && (
            <div className="flex items-center space-x-2 text-destructive text-sm">
              <Icon name="AlertCircle" size={16} strokeWidth={2} />
              <span>{errors?.projectDescription}</span>
            </div>
          )}

          <p className="text-xs text-text-secondary">
            Minimum {minChars} characters recommended for detailed analysis
          </p>
        </div>

        {/* Suggestions */}
        {suggestions?.length > 0 && (
          <div className="space-y-2">
            {suggestions?.map((suggestion, index) => (
              <div 
                key={index}
                className={`flex items-start space-x-2 p-3 rounded-lg text-sm ${
                  suggestion?.type === 'warning' ?'bg-warning/10 border border-warning/20 text-warning' :'bg-accent/10 border border-accent/20 text-accent'
                }`}
              >
                <Icon 
                  name={suggestion?.type === 'warning' ? 'AlertTriangle' : 'Lightbulb'} 
                  size={16} 
                  className="mt-0.5 flex-shrink-0" 
                  strokeWidth={2} 
                />
                <span>{suggestion?.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Example Prompts */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h5 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
            <Icon name="Sparkles" size={16} strokeWidth={2} />
            <span>Need inspiration? Try these examples:</span>
          </h5>
          <div className="space-y-2">
            {examplePrompts?.map((example, index) => (
              <button
                key={index}
                onClick={() => insertExample(example)}
                className="w-full text-left p-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface rounded border border-border hover:border-primary/30 transition-all duration-150"
              >
                "{example}"
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsForm;