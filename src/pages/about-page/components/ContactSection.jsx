import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { useNavigate } from 'react-router-dom';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const contactMethods = [
    {
      icon: "Mail",
      title: "Email Support",
      description: "Get help with technical questions and feature requests",
      contact: "support@webguide.dev",
      action: "Send Email"
    },
    {
      icon: "MessageCircle",
      title: "Community Discord",
      description: "Join our developer community for discussions and tips",
      contact: "discord.gg/webguide",
      action: "Join Discord"
    },
    {
      icon: "Github",
      title: "Open Source",
      description: "Contribute to the project or report issues on GitHub",
      contact: "github.com/webguide/platform",
      action: "View Repository"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
    
    // Show success message (in real app, you'd show a toast or modal)
    alert('Thank you for your message! We\'ll get back to you soon.');
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
            Get in Touch
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Have questions, feedback, or want to contribute? We'd love to hear from you. Our community is here to help you succeed in your development journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-text-primary mb-8">
              Connect With Us
            </h3>
            
            {contactMethods?.map((method, index) => (
              <div key={index} className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow duration-300 group">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-200">
                    <Icon name={method?.icon} size={24} className="text-primary" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-text-primary mb-2">
                      {method?.title}
                    </h4>
                    <p className="text-text-secondary mb-4 leading-relaxed">
                      {method?.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-primary font-medium">
                        {method?.contact}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="ExternalLink"
                        iconPosition="right"
                        iconSize={16}
                      >
                        {method?.action}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 border border-border">
              <h4 className="text-lg font-semibold text-text-primary mb-4">
                Quick Actions
              </h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => navigate('/project-creation-form')}
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                  fullWidth
                >
                  Create Project
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/my-projects-dashboard')}
                  iconName="FolderOpen"
                  iconPosition="left"
                  iconSize={16}
                  fullWidth
                >
                  View Projects
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 border border-border">
            <h3 className="text-2xl font-bold text-text-primary mb-8">
              Send us a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData?.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData?.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <Input
                label="Subject"
                type="text"
                name="subject"
                placeholder="What's this about?"
                value={formData?.subject}
                onChange={handleInputChange}
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  rows={6}
                  placeholder="Tell us more about your question or feedback..."
                  value={formData?.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>
              
              <Button
                type="submit"
                variant="default"
                size="lg"
                loading={isSubmitting}
                iconName="Send"
                iconPosition="right"
                iconSize={16}
                fullWidth
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;