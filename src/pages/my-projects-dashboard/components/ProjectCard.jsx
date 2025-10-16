import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Card3D from '../../../components/ui/Card3D';

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

  const createdDate = project?.createdAt ? new Date(project?.createdAt) : null;
  const monthLabel = createdDate ? createdDate.toLocaleString('en-US', { month: 'short' }).toUpperCase() : undefined;
  const dayLabel = createdDate ? String(createdDate.getDate()) : undefined;

  return (
    <>
      <div className={`rounded-lg ${isSelected ? 'ring-2 ring-primary' : ''}`}>
        {/* Selection Checkbox */}
        {showSelection && (
          <div className="flex justify-end mb-2">
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

        {/* 3D Card */}
        <Card3D
          title={project?.name}
          description={project?.description}
          ctaText="View"
          onCtaClick={handleView}
          month={monthLabel}
          date={dayLabel}
        >
          <div className="space-y-3">
            {/* Project Thumbnail */}
            <div className="w-full h-24 bg-[#d8ff87] rounded-md overflow-hidden">
              {project?.diagramPreview ? (
                <Image
                  src={project?.diagramPreview}
                  alt={`${project?.name} diagram preview`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="FileText" size={28} className="text-[#141414]" />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#141414]">
                Created {formatDate(project?.createdAt)}
              </span>
              <span className={`px-2 py-1 text-[10px] font-bold rounded-full border ${getProjectTypeColor(project?.type)}`}>
                {project?.type || 'Web'}
              </span>
            </div>

            {/* Tech Stack */}
            {project?.techStack && project?.techStack?.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {project?.techStack?.slice(0, 3)?.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-[10px] bg-[#d8ff87] text-[#141414] rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project?.techStack?.length > 3 && (
                  <span className="px-2 py-1 text-[10px] bg-[#d8ff87] text-[#141414] rounded">
                    +{project?.techStack?.length - 3} more
                  </span>
                )}
              </div>
            )}
          </div>
        </Card3D>

        {/* Secondary Action Buttons */}
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center space-x-2">
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