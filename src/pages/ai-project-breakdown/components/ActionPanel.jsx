import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionPanel = ({ projectData, onSaveProject, onDownloadDiagram, onEditProject }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const navigate = useNavigate();

  const handleSaveProject = async () => {
    setIsSaving(true);
    try {
      await onSaveProject(projectData);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadDiagram = async () => {
    try {
      await onDownloadDiagram();
    } catch (error) {
      console.error('Failed to download diagram:', error);
    }
  };

  const handleCreateNew = () => {
    navigate('/project-creation-form');
  };

  const handleViewProjects = () => {
    navigate('/my-projects-dashboard');
  };

  const getStatusIcon = () => {
    if (isSaving) return 'Loader';
    if (saveStatus === 'success') return 'Check';
    if (saveStatus === 'error') return 'X';
    return 'Save';
  };

  const getStatusText = () => {
    if (isSaving) return 'Saving...';
    if (saveStatus === 'success') return 'Saved!';
    if (saveStatus === 'error') return 'Failed';
    return 'Save Project';
  };

  const getStatusVariant = () => {
    if (saveStatus === 'success') return 'success';
    if (saveStatus === 'error') return 'destructive';
    return 'default';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Project Actions</h3>
          <p className="text-sm text-text-secondary">Manage your project breakdown</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            saveStatus === 'success' ? 'bg-success' :
            saveStatus === 'error'? 'bg-error' : 'bg-muted'
          }`} />
          <span className="text-sm text-text-secondary">
            {saveStatus === 'success' ? 'Synced' :
             saveStatus === 'error'? 'Error' : 'Ready'}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Button
          variant={getStatusVariant()}
          onClick={handleSaveProject}
          disabled={isSaving}
          loading={isSaving}
          iconName={getStatusIcon()}
          iconPosition="left"
          iconSize={16}
          fullWidth
        >
          {getStatusText()}
        </Button>

        <Button
          variant="outline"
          onClick={handleDownloadDiagram}
          iconName="Download"
          iconPosition="left"
          iconSize={16}
          fullWidth
        >
          Download Diagram
        </Button>

        <Button
          variant="secondary"
          onClick={onEditProject}
          iconName="Edit"
          iconPosition="left"
          iconSize={16}
          fullWidth
        >
          Edit Project
        </Button>

        <Button
          variant="ghost"
          onClick={handleCreateNew}
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
          fullWidth
        >
          Create New
        </Button>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="Clock" size={20} className="text-text-secondary" />
            <div>
              <p className="text-sm font-medium text-text-primary">Last Updated</p>
              <p className="text-xs text-text-secondary">
                {new Date()?.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleViewProjects}
            iconName="ExternalLink"
            iconSize={14}
          >
            View All
          </Button>
        </div>

        <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center space-x-3">
            <Icon name="Zap" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-text-primary">AI Analysis Complete</p>
              <p className="text-xs text-text-secondary">
                Generated {projectData?.modules?.length || 0} modules with code snippets
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
              {projectData?.complexity || 'Medium'}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-text-secondary mt-0.5" />
          <div className="text-sm text-text-secondary">
            <p className="font-medium text-text-primary mb-1">Next Steps:</p>
            <ul className="space-y-1 text-xs">
              <li>• Save your project to access it later</li>
              <li>• Download the ER diagram for reference</li>
              <li>• Copy code snippets to start building</li>
              <li>• Review the thinking process to learn</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPanel;