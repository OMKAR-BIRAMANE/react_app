import React from 'react';
import Icon from '../../../components/AppIcon';

const TechStackSection = () => {
  const techCategories = [
    {
      category: "Frontend",
      icon: "Monitor",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      technologies: [
        {
          name: "React 18",
          description: "Modern functional components with hooks for building interactive user interfaces",
          icon: "Atom"
        },
        {
          name: "Next.js 14",
          description: "Full-stack React framework with TypeScript support and server-side rendering",
          icon: "Zap"
        },
        {
          name: "Tailwind CSS",
          description: "Utility-first CSS framework for rapid UI development and consistent design",
          icon: "Palette"
        },
        {
          name: "Framer Motion",
          description: "Production-ready motion library for smooth animations and page transitions",
          icon: "Move"
        }
      ]
    },
    {
      category: "Backend & AI",
      icon: "Server",
      color: "text-green-600",
      bgColor: "bg-green-50",
      technologies: [
        {
          name: "Gemini API",
          description: "Google's advanced AI model for intelligent project breakdown and analysis",
          icon: "Brain"
        },
        {
          name: "Firebase Auth",
          description: "Secure authentication with email and Google sign-in integration",
          icon: "Shield"
        },
        {
          name: "Firestore",
          description: "NoSQL database for storing project data, breakdowns, and user information",
          icon: "Database"
        },
        {
          name: "Node.js",
          description: "JavaScript runtime for server-side logic and API integrations",
          icon: "Cpu"
        }
      ]
    },
    {
      category: "Visualization",
      icon: "BarChart3",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      technologies: [
        {
          name: "Mermaid.js",
          description: "Diagram generation library for creating interactive ER diagrams and flowcharts",
          icon: "GitBranch"
        },
        {
          name: "D3.js",
          description: "Data visualization library for complex interactive diagrams and charts",
          icon: "TrendingUp"
        },
        {
          name: "React Syntax Highlighter",
          description: "Code highlighting component for displaying formatted code snippets",
          icon: "Code"
        },
        {
          name: "HTML5 Canvas",
          description: "Native web technology for custom diagram rendering and export functionality",
          icon: "Image"
        }
      ]
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
            Modern Tech Stack
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            WebGuide is built with cutting-edge technologies to provide a fast, reliable, and educational experience. Our tech stack demonstrates industry best practices for modern web development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {techCategories?.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-8">
                <div className={`w-12 h-12 ${category?.bgColor} rounded-xl flex items-center justify-center mr-4`}>
                  <Icon name={category?.icon} size={24} className={category?.color} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-text-primary">{category?.category}</h3>
              </div>
              
              <div className="space-y-6">
                {category?.technologies?.map((tech, techIndex) => (
                  <div key={techIndex} className="group">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors duration-200">
                        <Icon name={tech?.icon} size={16} className="text-text-secondary group-hover:text-primary" strokeWidth={2} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors duration-200">
                          {tech?.name}
                        </h4>
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {tech?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Best Practices Highlight */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-border">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Icon name="Award" size={28} className="text-primary" strokeWidth={2} />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Industry Best Practices
            </h3>
            <p className="text-text-secondary leading-relaxed max-w-3xl mx-auto">
              Our technology choices reflect current industry standards and best practices. By using WebGuide, you're not just learning project architecture—you're also seeing how modern development teams build scalable, maintainable applications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;