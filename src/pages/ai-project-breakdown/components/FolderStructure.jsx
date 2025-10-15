import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FolderStructure = ({ projectStructure, onCopyStructure }) => {
  const [expandedFolders, setExpandedFolders] = useState(new Set(['root', 'src', 'components', 'pages']));
  const [copiedPath, setCopiedPath] = useState(null);

  const toggleFolder = (path) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded?.has(path)) {
      newExpanded?.delete(path);
    } else {
      newExpanded?.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const copyPath = async (path) => {
    try {
      await navigator.clipboard?.writeText(path);
      setCopiedPath(path);
      setTimeout(() => setCopiedPath(null), 2000);
    } catch (err) {
      console.error('Failed to copy path:', err);
    }
  };

  const getFileIcon = (item) => {
    if (item?.type === 'folder') {
      return expandedFolders?.has(item?.path) ? 'FolderOpen' : 'Folder';
    }
    
    const extension = item?.name?.split('.')?.pop()?.toLowerCase();
    const iconMap = {
      'js': 'FileText',
      'jsx': 'Code',
      'ts': 'FileCode',
      'tsx': 'Code',
      'json': 'Braces',
      'css': 'Palette',
      'html': 'Globe',
      'md': 'FileText',
      'png': 'Image',
      'jpg': 'Image',
      'jpeg': 'Image',
      'svg': 'Image',
      'env': 'Settings'
    };
    
    return iconMap?.[extension] || 'File';
  };

  const getFileColor = (item) => {
    if (item?.type === 'folder') {
      return 'text-blue-600';
    }
    
    const extension = item?.name?.split('.')?.pop()?.toLowerCase();
    const colorMap = {
      'js': 'text-yellow-600',
      'jsx': 'text-blue-600',
      'ts': 'text-blue-700',
      'tsx': 'text-blue-600',
      'json': 'text-green-600',
      'css': 'text-purple-600',
      'html': 'text-orange-600',
      'md': 'text-gray-600',
      'png': 'text-pink-600',
      'jpg': 'text-pink-600',
      'jpeg': 'text-pink-600',
      'svg': 'text-pink-600',
      'env': 'text-gray-500'
    };
    
    return colorMap?.[extension] || 'text-gray-600';
  };

  const renderItem = (item, level = 0) => {
    const isExpanded = expandedFolders?.has(item?.path);
    const paddingLeft = level * 20 + 8;

    return (
      <div key={item?.path}>
        <div 
          className="flex items-center hover:bg-muted/50 rounded-md py-1 px-2 group cursor-pointer"
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={() => item?.type === 'folder' ? toggleFolder(item?.path) : copyPath(item?.path)}
        >
          <Icon 
            name={getFileIcon(item)} 
            size={16} 
            className={`mr-2 ${getFileColor(item)}`}
          />
          <span className="text-sm text-text-primary flex-1 font-mono">{item?.name}</span>
          
          {item?.description && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="relative">
                <Icon name="Info" size={12} className="text-text-secondary" />
                <div className="absolute right-0 top-6 w-64 p-2 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {item?.description}
                </div>
              </div>
            </div>
          )}
          
          {copiedPath === item?.path && (
            <Icon name="Check" size={12} className="text-success ml-2" />
          )}
        </div>
        {item?.type === 'folder' && isExpanded && item?.children && (
          <div>
            {item?.children?.map(child => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const expandAll = () => {
    const allPaths = new Set();
    const collectPaths = (item) => {
      if (item?.type === 'folder') {
        allPaths?.add(item?.path);
        if (item?.children) {
          item?.children?.forEach(collectPaths);
        }
      }
    };
    projectStructure?.forEach(collectPaths);
    setExpandedFolders(allPaths);
  };

  const collapseAll = () => {
    setExpandedFolders(new Set(['root']));
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="FolderTree" size={20} className="text-primary" />
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Project Structure</h3>
            <p className="text-sm text-text-secondary">Recommended folder organization</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={expandAll}
            iconName="ChevronDown"
            iconSize={14}
          >
            Expand
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={collapseAll}
            iconName="ChevronUp"
            iconSize={14}
          >
            Collapse
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onCopyStructure}
            iconName="Copy"
            iconSize={14}
          >
            Copy
          </Button>
        </div>
      </div>
      <div className="p-4">
        <div className="bg-muted/30 rounded-lg p-4 font-mono text-sm max-h-96 overflow-y-auto">
          {projectStructure?.map(item => renderItem(item))}
        </div>
      </div>
      <div className="p-4 bg-muted/50 border-t border-border">
        <div className="flex items-start space-x-2 text-sm text-text-secondary">
          <Icon name="Lightbulb" size={16} className="text-warning mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-text-primary mb-1">Structure Benefits:</p>
            <ul className="space-y-1 text-xs">
              <li>• Separates concerns for better maintainability</li>
              <li>• Follows React best practices and conventions</li>
              <li>• Scales well as your project grows</li>
              <li>• Makes it easy for other developers to understand</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderStructure;