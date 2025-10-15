import React from 'react';
import Icon from '../../../components/AppIcon';

const TargetAudienceSection = () => {
  const audiences = [
    {
      icon: "GraduationCap",
      title: "Coding Bootcamp Students",
      description: "Bridge the gap between structured curriculum and independent project development.",
      challenges: [
        "Moving from guided tutorials to self-directed projects",
        "Understanding how components work together",
        "Planning before coding"
      ],
      solutions: [
        "AI-generated project breakdowns",
        "Visual system architecture diagrams",
        "Step-by-step implementation guidance"
      ]
    },
    {
      icon: "User",
      title: "Self-Taught Programmers",
      description: "Gain structured thinking skills often missed in independent learning paths.",
      challenges: [
        "Lack of systematic project planning approach",
        "Difficulty understanding system design",
        "Missing best practices knowledge"
      ],
      solutions: [
        "Educational explanations for each decision",
        "Industry-standard project structures",
        "Best practices implementation examples"
      ]
    },
    {
      icon: "Briefcase",
      title: "Junior Developers",
      description: "Develop architectural thinking skills for career advancement and better code quality.",
      challenges: [
        "Understanding large-scale system design",
        "Planning complex feature implementations",
        "Communicating technical decisions"
      ],
      solutions: [
        "Interactive ER diagrams for visualization",
        "Technical reasoning documentation",
        "Scalable architecture patterns"
      ]
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
            Who We Help
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            WebGuide is designed for beginner developers aged 18-35 who want to transition from following tutorials to building independent projects with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {audiences?.map((audience, index) => (
            <div key={index} className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Icon name={audience?.icon} size={28} className="text-primary" strokeWidth={2} />
              </div>
              
              <h3 className="text-xl font-bold text-text-primary mb-4">
                {audience?.title}
              </h3>
              
              <p className="text-text-secondary mb-8 leading-relaxed">
                {audience?.description}
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-text-primary mb-3 flex items-center">
                    <Icon name="AlertCircle" size={16} className="text-warning mr-2" strokeWidth={2} />
                    Common Challenges
                  </h4>
                  <ul className="space-y-2">
                    {audience?.challenges?.map((challenge, challengeIndex) => (
                      <li key={challengeIndex} className="text-sm text-text-secondary flex items-start">
                        <Icon name="Minus" size={16} className="text-text-secondary mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-text-primary mb-3 flex items-center">
                    <Icon name="CheckCircle" size={16} className="text-success mr-2" strokeWidth={2} />
                    Our Solutions
                  </h4>
                  <ul className="space-y-2">
                    {audience?.solutions?.map((solution, solutionIndex) => (
                      <li key={solutionIndex} className="text-sm text-text-secondary flex items-start">
                        <Icon name="Plus" size={16} className="text-success mr-2 mt-0.5 flex-shrink-0" strokeWidth={2} />
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;