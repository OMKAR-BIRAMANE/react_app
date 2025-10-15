import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkDeleteModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  selectedCount = 0,
  projectNames = [] 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
            <Icon name="AlertTriangle" size={20} className="text-destructive" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Delete Multiple Projects</h3>
            <p className="text-sm text-text-secondary">This action cannot be undone</p>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-text-secondary mb-4">
            Are you sure you want to delete {selectedCount} project{selectedCount !== 1 ? 's' : ''}? 
            This will permanently remove all selected projects and their associated data.
          </p>
          
          {/* Show project names if available and not too many */}
          {projectNames?.length > 0 && projectNames?.length <= 5 && (
            <div className="bg-muted rounded-lg p-3 mb-4">
              <p className="text-sm font-medium text-text-primary mb-2">Projects to be deleted:</p>
              <ul className="space-y-1">
                {projectNames?.map((name, index) => (
                  <li key={index} className="text-sm text-text-secondary flex items-center space-x-2">
                    <Icon name="FileText" size={14} />
                    <span className="truncate">{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {projectNames?.length > 5 && (
            <div className="bg-muted rounded-lg p-3 mb-4">
              <p className="text-sm font-medium text-text-primary mb-2">
                {selectedCount} projects selected for deletion
              </p>
              <p className="text-sm text-text-secondary">
                Including: {projectNames?.slice(0, 3)?.join(', ')} and {selectedCount - 3} more...
              </p>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-end space-x-3">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            iconName="Trash2"
            iconPosition="left"
            iconSize={16}
          >
            Delete {selectedCount} Project{selectedCount !== 1 ? 's' : ''}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkDeleteModal;