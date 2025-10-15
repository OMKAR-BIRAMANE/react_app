import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ModuleCard = ({ module, onViewCode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(null);

  const handleCopyCode = async (snippet, index) => {
    try {
      await navigator.clipboard?.writeText(snippet?.code);
      setCopiedSnippet(index);
      setTimeout(() => setCopiedSnippet(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const getLanguageIcon = (language) => {
    const icons = {
      'javascript': 'FileText',
      'jsx': 'Code',
      'typescript': 'FileCode',
      'json': 'Braces',
      'css': 'Palette',
      'html': 'Globe'
    };
    return icons?.[language?.toLowerCase()] || 'Code';
  };

  const getLanguageColor = (language) => {
    const colors = {
      'javascript': 'text-yellow-600',
      'jsx': 'text-blue-600',
      'typescript': 'text-blue-700',
      'json': 'text-green-600',
      'css': 'text-purple-600',
      'html': 'text-orange-600'
    };
    return colors?.[language?.toLowerCase()] || 'text-gray-600';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={module.icon || 'Package'} size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{module.name}</h3>
            <p className="text-sm text-text-secondary">{module.type}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            module.priority === 'high' ? 'bg-error/10 text-error' :
            module.priority === 'medium'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
          }`}>
            {module.priority} priority
          </span>
        </div>
      </div>
      <p className="text-text-secondary mb-4 leading-relaxed">{module.description}</p>
      <div className="mb-4">
        <h4 className="text-sm font-medium text-text-primary mb-2">Purpose & Benefits</h4>
        <p className="text-sm text-text-secondary leading-relaxed">{module.purpose}</p>
      </div>
      {module.reasoning && (
        <div className="mb-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
            <span>Why this module? (Educational)</span>
          </button>
          {isExpanded && (
            <div className="mt-3 p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
              <p className="text-sm text-text-secondary leading-relaxed">{module.reasoning}</p>
            </div>
          )}
        </div>
      )}
      {module.dependencies && module.dependencies?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-text-primary mb-2">Dependencies</h4>
          <div className="flex flex-wrap gap-2">
            {module.dependencies?.map((dep, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-md font-mono"
              >
                {dep}
              </span>
            ))}
          </div>
        </div>
      )}
      {module.codeSnippets && module.codeSnippets?.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-text-primary">Code Snippets</h4>
          {module.codeSnippets?.map((snippet, index) => (
            <div key={index} className="bg-muted rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getLanguageIcon(snippet?.language)} 
                    size={16} 
                    className={getLanguageColor(snippet?.language)}
                  />
                  <span className="text-sm font-medium text-text-primary">{snippet?.filename}</span>
                  <span className="text-xs text-text-secondary">({snippet?.language})</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopyCode(snippet, index)}
                  iconName={copiedSnippet === index ? "Check" : "Copy"}
                  iconSize={14}
                >
                  {copiedSnippet === index ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <div className="p-4">
                <pre className="text-sm text-text-primary font-mono overflow-x-auto">
                  <code>{snippet?.code}</code>
                </pre>
                {snippet?.explanation && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-text-secondary leading-relaxed">
                      <Icon name="Info" size={12} className="inline mr-1" />
                      {snippet?.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-xs text-text-secondary">
          <span>Est. time: {module.estimatedTime || '2-4 hours'}</span>
          <span>Difficulty: {module.difficulty || 'Beginner'}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewCode(module)}
          iconName="ExternalLink"
          iconPosition="right"
          iconSize={14}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default ModuleCard;