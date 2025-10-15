import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ 
  project, 
  onDelete, 
  onEdit,
  isSelected = false,
  onSelect = null,
  showSelection = false 
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/ai-project-breakdown?id=${project?.id}`);
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(project?.id);
    } else {
      navigate(`/project-creation-form?edit=${project?.id}`);
    }
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    onDelete(project?.id);
    setIsDeleteModalOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getProjectTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'web':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'mobile':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'api':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  return (
    <>
      <div className={`bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 ${
        isSelected ? 'ring-2 ring-primary border-primary' : ''
      }`}>
        {/* Selection Checkbox */}
        {showSelection && (
          <div className="flex justify-end mb-3">
            <button
              onClick={() => onSelect && onSelect(project?.id)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                isSelected 
                  ? 'bg-primary border-primary text-white' :'border-border hover:border-primary'
              }`}
            >
              {isSelected && <Icon name="Check" size={12} strokeWidth={3} />}
            </button>
          </div>
        )}

        {/* Project Thumbnail */}
        <div className="mb-4">
          <div className="w-full h-32 bg-muted rounded-lg overflow-hidden">
            {project?.diagramPreview ? (
              <Image
                src={project?.diagramPreview}
                alt={`${project?.name} diagram preview`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Icon name="FileText" size={32} className="text-text-secondary" />
              </div>
            )}
          </div>
        </div>

        {/* Project Info */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">
            {project?.name}
          </h3>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-text-secondary">
              Created {formatDate(project?.createdAt)}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getProjectTypeColor(project?.type)}`}>
              {project?.type || 'Web'}
            </span>
          </div>

          {/* Tech Stack */}
          {project?.techStack && project?.techStack?.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {project?.techStack?.slice(0, 3)?.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-muted text-text-secondary rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project?.techStack?.length > 3 && (
                  <span className="px-2 py-1 text-xs bg-muted text-text-secondary rounded">
                    +{project?.techStack?.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Description */}
          {project?.description && (
            <p className="text-sm text-text-secondary line-clamp-2 mb-3">
              {project?.description}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleView}
              iconName="Eye"
              iconPosition="left"
              iconSize={14}
            >
              View
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              iconName="Edit"
              iconSize={14}
            />
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            iconName="Trash2"
            iconSize={14}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          />
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Delete Project</h3>
                <p className="text-sm text-text-secondary">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-text-secondary mb-6">
              Are you sure you want to delete "{project?.name}"? This will permanently remove the project and all associated data.
            </p>
            
            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                iconName="Trash2"
                iconPosition="left"
                iconSize={16}
              >
                Delete Project
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;