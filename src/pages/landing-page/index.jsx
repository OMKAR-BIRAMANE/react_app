import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FeatureCards from './components/FeatureCards';
import ProjectTypesSection from './components/ProjectTypesSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const LandingPage = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>WebGuide - Learn Structural Thinking for Project Building</title>
        <meta 
          name="description" 
          content="Master project architecture through AI-assisted breakdowns, interactive diagrams, and ready-to-use code snippets designed for beginner developers. Join 10,000+ developers learning structural thinking." 
        />
        <meta name="keywords" content="project architecture, beginner developers, AI-powered learning, code snippets, system design, React, Node.js, Firebase" />
        <meta property="og:title" content="WebGuide - Learn Structural Thinking for Project Building" />
        <meta property="og:description" content="Transform your coding journey from tutorial hell to confident project building with AI-powered architectural breakdowns." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WebGuide - Learn Structural Thinking for Project Building" />
        <meta name="twitter:description" content="Master project architecture through AI-assisted learning designed for beginner developers." />
      </Helmet>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Feature Cards Section */}
        <FeatureCards />

        {/* Project Types Section */}
        <ProjectTypesSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* CTA Section */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;