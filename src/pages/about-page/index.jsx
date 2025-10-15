import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import MissionSection from './components/MissionSection';
import FeaturesSection from './components/FeaturesSection';
import TargetAudienceSection from './components/TargetAudienceSection';
import MethodologySection from './components/MethodologySection';
import TechStackSection from './components/TechStackSection';
import ContactSection from './components/ContactSection';
import CallToActionSection from './components/CallToActionSection';
import Icon from '../../components/AppIcon';


const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>About WebGuide - Educational Project Planning Platform</title>
        <meta 
          name="description" 
          content="Learn about WebGuide's mission to help beginner developers master structural project thinking through AI-powered architecture breakdown, visual diagrams, and educational code snippets." 
        />
        <meta name="keywords" content="project planning, developer education, AI architecture, React learning, system design" />
        <meta property="og:title" content="About WebGuide - Educational Project Planning Platform" />
        <meta property="og:description" content="Discover how WebGuide transforms project ideas into comprehensive learning experiences with AI insights and visual representations." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/about-page" />
      </Helmet>
      <Header />
      <main className="pt-16">
        <HeroSection />
        <MissionSection />
        <FeaturesSection />
        <TargetAudienceSection />
        <MethodologySection />
        <TechStackSection />
        <ContactSection />
        <CallToActionSection />
      </main>
      {/* Footer */}
      <footer className="bg-surface border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Code" size={20} color="white" strokeWidth={2} />
                </div>
                <span className="text-xl font-semibold text-text-primary">WebGuide</span>
              </div>
              <p className="text-text-secondary leading-relaxed mb-4">
                Empowering beginner developers to think structurally about project building through AI-assisted architecture breakdown and visual learning.
              </p>
              <p className="text-sm text-text-secondary">
                © {new Date()?.getFullYear()} WebGuide. All rights reserved.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-text-primary mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="/landing-page" className="hover:text-primary transition-colors">Home</a></li>
                <li><a href="/project-creation-form" className="hover:text-primary transition-colors">Create Project</a></li>
                <li><a href="/my-projects-dashboard" className="hover:text-primary transition-colors">My Projects</a></li>
                <li><a href="/about-page" className="hover:text-primary transition-colors">About</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-text-primary mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;