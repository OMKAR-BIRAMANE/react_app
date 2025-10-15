import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ 
  type = 'no-projects', // 'no-projects' | 'no-results'
  searchQuery = '',
  onCreateNew,
  onClearFilters 
}) => {
  const navigate = useNavigate();

  const handleCreateProject = () => {
    if (onCreateNew) {
      onCreateNew();
    } else {
      navigate('/project-creation-form');
    }
  };

  if (type === 'no-results') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <Icon name="Search" size={32} className="text-text-secondary" />
        </div>
        
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          No projects found
        </h3>
        
        <p className="text-text-secondary text-center mb-6 max-w-md">
          {searchQuery ? (
            <>No projects match your search for "<strong>{searchQuery}</strong>". Try adjusting your filters or search terms.</>
          ) : (
            "No projects match your current filters. Try adjusting your filter criteria."
          )}
        </p>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={onClearFilters}
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
          >
            Clear Filters
          </Button>
          
          <Button
            variant="default"
            onClick={handleCreateProject}
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            Create New Project
          </Button>
        </div>
      </div>
    );
  }

  // Default: no-projects state
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <Icon name="FolderPlus" size={32} className="text-primary" />
      </div>
      
      <h3 className="text-xl font-semibold text-text-primary mb-2">
        Start Your First Project
      </h3>
      
      <p className="text-text-secondary text-center mb-6 max-w-md">
        Welcome to WebGuide! Create your first project to get AI-powered architectural breakdowns, 
        ER diagrams, and ready-to-use code snippets that help you learn structural thinking.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3">
        <Button
          variant="default"
          onClick={handleCreateProject}
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
        >
          Create Your First Project
        </Button>
        
        <Button
          variant="outline"
          onClick={() => navigate('/about-page')}
          iconName="Info"
          iconPosition="left"
          iconSize={16}
        >
          Learn More
        </Button>
      </div>
      
      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Zap" size={20} className="text-primary" />
          </div>
          <h4 className="font-medium text-text-primary mb-2">AI-Powered Breakdown</h4>
          <p className="text-sm text-text-secondary">
            Get intelligent project architecture analysis with detailed explanations
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="GitBranch" size={20} className="text-secondary" />
          </div>
          <h4 className="font-medium text-text-primary mb-2">Visual Diagrams</h4>
          <p className="text-sm text-text-secondary">
            Interactive ER diagrams and folder structures to visualize your project
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Code" size={20} className="text-accent" />
          </div>
          <h4 className="font-medium text-text-primary mb-2">Ready Code Snippets</h4>
          <p className="text-sm text-text-secondary">
            Get production-ready code with educational explanations for each module
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;