import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    product: [
      { label: "Features", path: "/about-page" },
      { label: "Create Project", path: "/project-creation-form" },
      { label: "My Projects", path: "/my-projects-dashboard" },
      { label: "Pricing", path: "#" }
    ],
    resources: [
      { label: "Documentation", path: "#" },
      { label: "Tutorials", path: "#" },
      { label: "Blog", path: "#" },
      { label: "Community", path: "#" }
    ],
    company: [
      { label: "About Us", path: "/about-page" },
      { label: "Contact", path: "#" },
      { label: "Privacy Policy", path: "#" },
      { label: "Terms of Service", path: "#" }
    ]
  };

  const socialLinks = [
    { name: "Twitter", icon: "Twitter", url: "#" },
    { name: "GitHub", icon: "Github", url: "#" },
    { name: "LinkedIn", icon: "Linkedin", url: "#" },
    { name: "Discord", icon: "MessageCircle", url: "#" }
  ];

  const handleNavigation = (path) => {
    if (path && path !== "#") {
      navigate(path);
    }
  };

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <Icon name="Code" size={20} color="white" strokeWidth={2} />
      </div>
      <span className="text-xl font-semibold text-text-primary">WebGuide</span>
    </div>
  );

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div 
              className="cursor-pointer mb-4"
              onClick={() => handleNavigation('/landing-page')}
            >
              <Logo />
            </div>
            <p className="text-text-secondary mb-6 max-w-md leading-relaxed">
              Empowering beginner developers to master project architecture through AI-assisted learning, interactive diagrams, and hands-on code examples.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.url}
                  className="w-10 h-10 bg-muted hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-all duration-200"
                  aria-label={social?.name}
                >
                  <Icon name={social?.icon} size={18} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks?.product?.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(link?.path)}
                    className="text-text-secondary hover:text-primary transition-colors duration-150 text-left"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks?.resources?.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(link?.path)}
                    className="text-text-secondary hover:text-primary transition-colors duration-150 text-left"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks?.company?.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(link?.path)}
                    className="text-text-secondary hover:text-primary transition-colors duration-150 text-left"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-border pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="font-semibold text-text-primary mb-2">Stay Updated</h3>
            <p className="text-text-secondary text-sm mb-4">
              Get the latest updates on new features and learning resources.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              />
              <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-150 text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="text-text-secondary text-sm">
            © {currentYear} WebGuide. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-text-secondary">
            <button
              onClick={() => handleNavigation("#")}
              className="hover:text-primary transition-colors duration-150"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => handleNavigation("#")}
              className="hover:text-primary transition-colors duration-150"
            >
              Terms of Service
            </button>
            <button
              onClick={() => handleNavigation("#")}
              className="hover:text-primary transition-colors duration-150"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;