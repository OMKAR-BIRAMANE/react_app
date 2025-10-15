import React from 'react';
import Icon from '../../../components/AppIcon';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Bootcamp Graduate",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "WebGuide transformed how I approach project planning. The AI breakdowns helped me understand system architecture in ways my bootcamp never covered. Now I can confidently start any project knowing the structure.",
      rating: 5,
      highlight: "Finally understand system architecture"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Self-Taught Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "As a self-taught developer, I struggled with the 'big picture' thinking. WebGuide's interactive diagrams and educational explanations filled that gap perfectly. The code snippets are production-ready too!",
      rating: 5,
      highlight: "Perfect for self-taught developers"
    },
    {
      id: 3,
      name: "Emily Johnson",
      role: "Junior Developer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "The step-by-step thinking process is incredible. I went from copying tutorials to actually understanding why certain architectural decisions are made. My senior developers are impressed with my project proposals now.",
      rating: 5,
      highlight: "From tutorials to real understanding"
    }
  ];

  const stats = [
    {
      id: 1,
      value: "10,000+",
      label: "Developers Learning",
      icon: "Users"
    },
    {
      id: 2,
      value: "25,000+",
      label: "Projects Created",
      icon: "FolderOpen"
    },
    {
      id: 3,
      value: "4.9/5",
      label: "Average Rating",
      icon: "Star"
    },
    {
      id: 4,
      value: "95%",
      label: "Success Rate",
      icon: "TrendingUp"
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? "text-warning fill-current" : "text-border"}
        strokeWidth={2}
      />
    ));
  };

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Trusted by Developers Worldwide
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Join thousands of developers who have transformed their project planning skills with WebGuide's AI-powered learning platform.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats?.map((stat) => (
            <div key={stat?.id} className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={stat?.icon} size={24} className="text-primary" strokeWidth={2} />
              </div>
              <div className="text-3xl font-bold text-text-primary mb-2">{stat?.value}</div>
              <div className="text-text-secondary">{stat?.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial) => (
            <div
              key={testimonial?.id}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {renderStars(testimonial?.rating)}
              </div>

              {/* Content */}
              <blockquote className="text-text-secondary mb-6 leading-relaxed">
                "{testimonial?.content}"
              </blockquote>

              {/* Highlight */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-6">
                <div className="flex items-center space-x-2">
                  <Icon name="Quote" size={16} className="text-primary" strokeWidth={2} />
                  <span className="text-sm font-medium text-primary">
                    {testimonial?.highlight}
                  </span>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial?.avatar}
                  alt={testimonial?.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-border"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
                <div>
                  <div className="font-semibold text-text-primary">{testimonial?.name}</div>
                  <div className="text-sm text-text-secondary">{testimonial?.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-12">
          <p className="text-text-secondary">
            Ready to join them? Start your learning journey today.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;