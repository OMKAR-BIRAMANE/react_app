import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThinkingProcess = ({ thinkingSteps, isCollapsed, onToggleCollapse }) => {
  const [expandedSteps, setExpandedSteps] = useState(new Set([0]));

  const toggleStep = (index) => {
    const newExpanded = new Set(expandedSteps);
    if (newExpanded?.has(index)) {
      newExpanded?.delete(index);
    } else {
      newExpanded?.add(index);
    }
    setExpandedSteps(newExpanded);
  };

  const expandAll = () => {
    setExpandedSteps(new Set(thinkingSteps.map((_, index) => index)));
  };

  const collapseAll = () => {
    setExpandedSteps(new Set());
  };

  if (isCollapsed) {
    return (
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40">
        <Button
          variant="default"
          size="icon"
          onClick={onToggleCollapse}
          iconName="ChevronLeft"
          iconSize={20}
          className="rounded-l-lg rounded-r-none shadow-lg"
        />
      </div>
    );
  }

  return (
    <div className="w-80 bg-card border-l border-border h-full overflow-y-auto">
      <div className="sticky top-0 bg-card border-b border-border p-4 z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="Brain" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-text-primary">AI Thinking Process</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            iconName="ChevronRight"
            iconSize={16}
          />
        </div>
        <p className="text-sm text-text-secondary mb-3">
          Step-by-step breakdown of how the AI analyzed your project
        </p>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="xs"
            onClick={expandAll}
            iconName="ChevronDown"
            iconSize={14}
          >
            Expand All
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={collapseAll}
            iconName="ChevronUp"
            iconSize={14}
          >
            Collapse All
          </Button>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {thinkingSteps?.map((step, index) => (
          <div key={index} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleStep(index)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step?.status === 'completed' ? 'bg-success text-white' :
                  step?.status === 'current'? 'bg-primary text-white' : 'bg-muted text-text-secondary'
                }`}>
                  {step?.status === 'completed' ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    index + 1
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-text-primary">{step?.title}</h4>
                  <p className="text-sm text-text-secondary">{step?.subtitle}</p>
                </div>
              </div>
              <Icon 
                name={expandedSteps?.has(index) ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-text-secondary" 
              />
            </button>

            {expandedSteps?.has(index) && (
              <div className="px-4 pb-4 border-t border-border bg-muted/20">
                <div className="pt-4 space-y-3">
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {step?.description}
                  </p>

                  {step?.considerations && step?.considerations?.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-text-primary mb-2">Key Considerations:</h5>
                      <ul className="space-y-1">
                        {step?.considerations?.map((consideration, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-text-secondary">
                            <Icon name="ArrowRight" size={12} className="mt-1 flex-shrink-0" />
                            <span>{consideration}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {step?.decisions && step?.decisions?.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-text-primary mb-2">Decisions Made:</h5>
                      <div className="space-y-2">
                        {step?.decisions?.map((decision, idx) => (
                          <div key={idx} className="p-3 bg-card rounded-lg border border-border">
                            <div className="flex items-start space-x-2">
                              <Icon name="Lightbulb" size={14} className="text-warning mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-text-primary">{decision?.choice}</p>
                                <p className="text-xs text-text-secondary mt-1">{decision?.reasoning}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step?.output && (
                    <div>
                      <h5 className="text-sm font-medium text-text-primary mb-2">Output:</h5>
                      <div className="p-3 bg-card rounded-lg border border-border">
                        <p className="text-sm text-text-secondary">{step?.output}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-xs text-text-secondary">
                      Duration: {step?.duration || '2-3 seconds'}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      step?.confidence === 'high' ? 'bg-success/10 text-success' :
                      step?.confidence === 'medium'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                    }`}>
                      {step?.confidence || 'high'} confidence
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center space-x-2 text-xs text-text-secondary">
          <Icon name="Info" size={14} />
          <span>This breakdown helps you understand architectural thinking patterns</span>
        </div>
      </div>
    </div>
  );
};

export default ThinkingProcess;