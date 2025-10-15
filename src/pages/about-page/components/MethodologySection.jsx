import React from 'react';
import Icon from '../../../components/AppIcon';

const MethodologySection = () => {
  const methodologySteps = [
    {
      step: 1,
      title: "Project Idea Input",
      description: "Users describe their project concept through our guided multi-step form with progress indicators.",
      details: [
        "Project type selection (Web, Mobile, API)",
        "Tech stack preference gathering",
        "Feature requirements collection",
        "Target audience identification"
      ],
      icon: "FileText"
    },
    {
      step: 2,
      title: "AI Analysis & Breakdown",
      description: "Gemini API processes the input to generate comprehensive project architecture and component analysis.",
      details: [
        "System architecture generation",
        "Component relationship mapping",
        "Database schema recommendations",
        "API endpoint planning"
      ],
      icon: "Brain"
    },
    {
      step: 3,
      title: "Visual Representation",
      description: "Interactive diagrams and folder structures help visualize the project architecture and relationships.",
      details: [
        "ER diagram generation with Mermaid.js",
        "VS Code-style folder tree visualization",
        "Component dependency mapping",
        "Data flow illustrations"
      ],
      icon: "GitBranch"
    },
    {
      step: 4,
      title: "Code Generation",
      description: "Ready-to-use code snippets with syntax highlighting and educational explanations for each component.",
      details: [
        "React component boilerplates",
        "Node.js API implementations",
        "Firebase integration code",
        "Best practices documentation"
      ],
      icon: "Code"
    },
    {
      step: 5,
      title: "Educational Insights",
      description: "Step-by-step reasoning explanations help users understand the \'why\' behind each architectural decision.",
      details: [
        "Decision reasoning documentation",
        "Alternative approach discussions",
        "Scalability considerations",
        "Performance optimization tips"
      ],
      icon: "BookOpen"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
            Our Educational Methodology
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            WebGuide follows a structured 5-step approach to transform project ideas into comprehensive learning experiences with AI-powered insights and visual representations.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-border h-full"></div>
          
          <div className="space-y-12">
            {methodologySteps?.map((step, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                {/* Step Number Circle */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary rounded-full items-center justify-center text-white font-bold text-lg z-10">
                  {step?.step}
                </div>
                
                {/* Content Card */}
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16'}`}>
                  <div className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                        <Icon name={step?.icon} size={24} className="text-primary" strokeWidth={2} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-primary mb-1">Step {step?.step}</div>
                        <h3 className="text-xl font-bold text-text-primary">{step?.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-text-secondary mb-6 leading-relaxed">
                      {step?.description}
                    </p>
                    
                    <div className="space-y-2">
                      {step?.details?.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center">
                          <Icon name="ArrowRight" size={16} className="text-primary mr-3 flex-shrink-0" strokeWidth={2} />
                          <span className="text-sm text-text-secondary">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Mobile Step Number */}
                <div className="lg:hidden w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {step?.step}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;