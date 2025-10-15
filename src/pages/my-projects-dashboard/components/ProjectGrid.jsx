import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectGrid = ({ 
  projects = [], 
  onDelete, 
  onEdit,
  selectedProjects = [],
  onSelectProject = null,
  showSelection = false 
}) => {
  const isProjectSelected = (projectId) => {
    return selectedProjects?.includes(projectId);
  };

  if (!projects?.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects?.map((project) => (
        <ProjectCard
          key={project?.id}
          project={project}
          onDelete={onDelete}
          onEdit={onEdit}
          isSelected={isProjectSelected(project?.id)}
          onSelect={onSelectProject}
          showSelection={showSelection}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;