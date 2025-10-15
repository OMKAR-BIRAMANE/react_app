import React from 'react';
import Icon from '../../../components/AppIcon';

const MissionSection = () => {
  const missionPoints = [
    {
      icon: "Target",
      title: "Bridge the Gap",
      description: "Connect tutorial learning with real-world project development through structured thinking approaches."
    },
    {
      icon: "Brain",
      title: "Develop Architecture Mindset",
      description: "Help developers understand system design principles and component relationships before coding."
    },
    {
      icon: "Users",
      title: "Community Learning",
      description: "Create a supportive environment where beginners can learn from AI-generated insights and best practices."
    },
    {
      icon: "Lightbulb",
      title: "Practical Education",
      description: "Provide hands-on learning through interactive diagrams, code snippets, and step-by-step breakdowns."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            WebGuide exists to transform how beginner developers approach project planning. We believe that understanding system architecture is the key to building successful applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {missionPoints?.map((point, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-200">
                <Icon name={point?.icon} size={28} className="text-primary" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                {point?.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {point?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;