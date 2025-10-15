import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const TechStackSelector = ({ 
  selectedTechStack, 
  onTechStackChange, 
  projectType = 'web',
  error = null 
}) => {
  const techStackOptions = {
    web: {
      frontend: [
        { id: 'react', label: 'React', description: 'Popular library for building UIs' },
        { id: 'vue', label: 'Vue.js', description: 'Progressive framework for web UIs' },
        { id: 'angular', label: 'Angular', description: 'Full-featured framework by Google' },
        { id: 'vanilla', label: 'HTML/CSS/JS', description: 'Pure web technologies' }
      ],
      backend: [
        { id: 'nodejs', label: 'Node.js', description: 'JavaScript runtime for servers' },
        { id: 'python', label: 'Python/Django', description: 'High-level programming language' },
        { id: 'php', label: 'PHP/Laravel', description: 'Server-side scripting language' },
        { id: 'java', label: 'Java/Spring', description: 'Enterprise-grade backend' }
      ],
      database: [
        { id: 'mongodb', label: 'MongoDB', description: 'NoSQL document database' },
        { id: 'mysql', label: 'MySQL', description: 'Popular relational database' },
        { id: 'postgresql', label: 'PostgreSQL', description: 'Advanced open source database' },
        { id: 'firebase', label: 'Firebase', description: 'Google\'s app development platform' }
      ]
    },
    mobile: {
      framework: [
        { id: 'react-native', label: 'React Native', description: 'Cross-platform with React' },
        { id: 'flutter', label: 'Flutter', description: 'Google\'s UI toolkit' },
        { id: 'native-ios', label: 'Native iOS', description: 'Swift/Objective-C development' },
        { id: 'native-android', label: 'Native Android', description: 'Kotlin/Java development' }
      ],
      backend: [
        { id: 'nodejs', label: 'Node.js', description: 'JavaScript runtime for servers' },
        { id: 'python', label: 'Python/Django', description: 'High-level programming language' },
        { id: 'firebase', label: 'Firebase', description: 'Google\'s backend-as-a-service' },
        { id: 'supabase', label: 'Supabase', description: 'Open source Firebase alternative' }
      ],
      database: [
        { id: 'sqlite', label: 'SQLite', description: 'Lightweight local database' },
        { id: 'realm', label: 'Realm', description: 'Mobile-first database' },
        { id: 'firebase', label: 'Firestore', description: 'NoSQL cloud database' },
        { id: 'mongodb', label: 'MongoDB', description: 'Document-based database' }
      ]
    },
    api: {
      language: [
        { id: 'nodejs', label: 'Node.js', description: 'JavaScript runtime environment' },
        { id: 'python', label: 'Python', description: 'Versatile programming language' },
        { id: 'java', label: 'Java', description: 'Enterprise-grade language' },
        { id: 'go', label: 'Go', description: 'Fast and efficient language' }
      ],
      framework: [
        { id: 'express', label: 'Express.js', description: 'Minimal Node.js framework' },
        { id: 'fastapi', label: 'FastAPI', description: 'Modern Python web framework' },
        { id: 'spring', label: 'Spring Boot', description: 'Java application framework' },
        { id: 'gin', label: 'Gin', description: 'HTTP web framework for Go' }
      ],
      database: [
        { id: 'postgresql', label: 'PostgreSQL', description: 'Advanced relational database' },
        { id: 'mongodb', label: 'MongoDB', description: 'NoSQL document database' },
        { id: 'redis', label: 'Redis', description: 'In-memory data structure store' },
        { id: 'mysql', label: 'MySQL', description: 'Popular relational database' }
      ]
    }
  };

  const currentOptions = techStackOptions?.[projectType] || techStackOptions?.web;

  const handleTechChange = (category, techId, checked) => {
    const updatedStack = { ...selectedTechStack };
    
    if (!updatedStack?.[category]) {
      updatedStack[category] = [];
    }

    if (checked) {
      if (!updatedStack?.[category]?.includes(techId)) {
        updatedStack[category] = [...updatedStack?.[category], techId];
      }
    } else {
      updatedStack[category] = updatedStack?.[category]?.filter(id => id !== techId);
    }

    onTechStackChange(updatedStack);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Select Your Preferred Tech Stack
        </h3>
        <p className="text-sm text-text-secondary mb-4">
          Choose the technologies you'd like to use or learn. Don't worry if you're unsure - we'll provide guidance for each selection.
        </p>
      </div>
      <div className="space-y-6">
        {Object.entries(currentOptions)?.map(([category, options]) => (
          <div key={category} className="space-y-3">
            <div className="flex items-center space-x-2">
              <Icon 
                name={
                  category === 'frontend' ? 'Layout' :
                  category === 'backend' ? 'Server' :
                  category === 'database' ? 'Database' :
                  category === 'framework' ? 'Code' :
                  category === 'language'? 'FileCode' : 'Settings'
                } 
                size={18} 
                className="text-primary" 
                strokeWidth={2} 
              />
              <h4 className="font-medium text-text-primary capitalize">
                {category === 'frontend' ? 'Frontend' :
                 category === 'backend' ? 'Backend' :
                 category === 'database' ? 'Database' :
                 category === 'framework' ? 'Framework' :
                 category === 'language' ? 'Programming Language' :
                 category}
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-6">
              {options?.map((tech) => (
                <div key={tech?.id} className="flex items-start space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-150">
                  <Checkbox
                    checked={selectedTechStack?.[category]?.includes(tech?.id) || false}
                    onChange={(e) => handleTechChange(category, tech?.id, e?.target?.checked)}
                    className="mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <label className="text-sm font-medium text-text-primary cursor-pointer">
                      {tech?.label}
                    </label>
                    <p className="text-xs text-text-secondary mt-1">
                      {tech?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {error && (
        <div className="flex items-center space-x-2 text-destructive text-sm">
          <Icon name="AlertCircle" size={16} strokeWidth={2} />
          <span>{error}</span>
        </div>
      )}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={18} className="text-accent mt-0.5" strokeWidth={2} />
          <div>
            <h5 className="font-medium text-text-primary mb-1">Pro Tip</h5>
            <p className="text-sm text-text-secondary">
              Don't worry about selecting everything perfectly. Our AI will suggest the best combinations based on your project type and provide learning resources for each technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStackSelector;