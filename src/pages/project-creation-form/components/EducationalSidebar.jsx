import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EducationalSidebar = ({ 
  currentStep = 0, 
  isCollapsed = false, 
  onToggleCollapse 
}) => {
  const [activeSection, setActiveSection] = useState(null);

  const educationalContent = {
    0: {
      title: "Project Planning Fundamentals",
      sections: [
        {
          id: 'naming',
          title: 'Effective Project Naming',
          icon: 'FileText',
          content: `Choose names that are:\n• Clear and descriptive\n• Easy to remember\n• Professional sounding\n• Avoid generic terms like "app" or "system"`
        },
        {
          id: 'description',
          title: 'Writing Good Descriptions',
          icon: 'Edit3',
          content: `Include these elements:\n• Problem you're solving\n• Target audience\n• Key features\n• Success metrics\n• Technical constraints`
        },
        {
          id: 'planning',title: 'Why Planning Matters',icon: 'Target',
          content: `Good planning helps:\n• Reduce development time\n• Avoid scope creep\n• Identify technical challenges early\n• Create better user experiences`
        }
      ]
    },
    1: {
      title: "Choosing Project Types",
      sections: [
        {
          id: 'web-apps',title: 'Web Applications',icon: 'Globe',
          content: `Best for:\n• Cross-platform accessibility\n• Easy deployment and updates\n• SEO and discoverability\n• Lower development costs`
        },
        {
          id: 'mobile-apps',title: 'Mobile Applications',icon: 'Smartphone',
          content: `Consider when:\n• Need device-specific features\n• Offline functionality required\n• Performance is critical\n• App store distribution needed`
        },
        {
          id: 'apis',title: 'APIs & Backend Services',icon: 'Server',
          content: `Essential for:\n• Data management\n• Business logic\n• Third-party integrations\n• Scalable architecture`
        }
      ]
    },
    2: {
      title: "Technology Selection Guide",
      sections: [
        {
          id: 'frontend',title: 'Frontend Technologies',icon: 'Layout',
          content: `Consider:\n• Learning curve\n• Community support\n• Performance requirements\n• Team expertise\n• Project timeline`
        },
        {
          id: 'backend',title: 'Backend Considerations',icon: 'Server',
          content: `Factors to evaluate:\n• Scalability needs\n• Data complexity\n• Security requirements\n• Integration needs\n• Hosting options`
        },
        {
          id: 'database',title: 'Database Selection',icon: 'Database',
          content: `Choose based on:\n• Data structure (SQL vs NoSQL)\n• Scalability requirements\n• Consistency needs\n• Query complexity\n• Team familiarity`
        }
      ]
    },
    3: {
      title: "Review & Next Steps",
      sections: [
        {
          id: 'review',title: 'Final Review Tips',icon: 'CheckCircle',
          content: `Before submitting:\n• Verify all details are accurate\n• Ensure description is comprehensive\n• Check technology selections\n• Consider project scope`
        },
        {
          id: 'ai-process',title: 'AI Analysis Process',icon: 'Sparkles',
          content: `Our AI will:\n• Analyze your requirements\n• Suggest architecture patterns\n• Generate ER diagrams\n• Provide code templates\n• Offer learning resources`
        },
        {
          id: 'next-steps',title: 'After Generation',icon: 'ArrowRight',content: `You'll receive:\n• System architecture breakdown\n• Visual diagrams\n• Folder structure\n• Code snippets\n• Implementation guidance`
        }
      ]
    }
  };

  const currentContent = educationalContent?.[currentStep] || educationalContent?.[0];

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  if (isCollapsed) {
    return (
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
        <Button
          variant="default"
          size="icon"
          onClick={onToggleCollapse}
          iconName="ChevronLeft"
          iconSize={20}
          className="shadow-lg"
        />
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="BookOpen" size={18} className="text-primary" strokeWidth={2} />
          <h4 className="font-semibold text-text-primary">Learning Guide</h4>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          iconName="ChevronRight"
          iconSize={16}
        />
      </div>
      {/* Current Step Title */}
      <div className="pb-2 border-b border-border">
        <h5 className="font-medium text-text-primary">{currentContent?.title}</h5>
      </div>
      {/* Educational Sections */}
      <div className="space-y-3">
        {currentContent?.sections?.map((section) => (
          <div key={section?.id} className="space-y-2">
            <button
              onClick={() => toggleSection(section?.id)}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors duration-150 text-left"
            >
              <div className="flex items-center space-x-2">
                <Icon name={section?.icon} size={16} className="text-primary" strokeWidth={2} />
                <span className="text-sm font-medium text-text-primary">{section?.title}</span>
              </div>
              <Icon 
                name={activeSection === section?.id ? "ChevronUp" : "ChevronDown"} 
                size={14} 
                className="text-text-secondary" 
                strokeWidth={2} 
              />
            </button>
            
            {activeSection === section?.id && (
              <div className="ml-6 p-3 bg-muted/30 rounded-lg animate-fade-in">
                <pre className="text-xs text-text-secondary whitespace-pre-wrap font-sans leading-relaxed">
                  {section?.content}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Progress Indicator */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-xs text-text-secondary">
          <Icon name="Clock" size={14} strokeWidth={2} />
          <span>Step {currentStep + 1} of 4</span>
        </div>
        <div className="mt-2 w-full bg-muted rounded-full h-1">
          <div 
            className="bg-primary h-1 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
          />
        </div>
      </div>
      {/* Quick Tips */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={14} className="text-accent mt-0.5" strokeWidth={2} />
          <div>
            <h6 className="text-xs font-medium text-text-primary mb-1">Quick Tip</h6>
            <p className="text-xs text-text-secondary">
              {currentStep === 0 && "Take your time with the description - it's the foundation of good AI analysis."}
              {currentStep === 1 && "Choose the type that best matches your learning goals and project scope."}
              {currentStep === 2 && "Don't worry about selecting everything - focus on what you want to learn."}
              {currentStep === 3 && "Review everything carefully - you can always edit later from your dashboard."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalSidebar;