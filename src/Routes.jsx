import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Authentication from './pages/authentication';
import MyProjectsDashboard from './pages/my-projects-dashboard';
import ProjectCreationForm from './pages/project-creation-form';
import LandingPage from './pages/landing-page';
import AIProjectBreakdown from './pages/ai-project-breakdown';
import AboutPage from './pages/about-page';
import GeminiDemo from './pages/gemini-demo';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Authentication />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/my-projects-dashboard" element={<MyProjectsDashboard />} />
        <Route path="/project-creation-form" element={<ProjectCreationForm />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/ai-project-breakdown" element={<AIProjectBreakdown />} />
        <Route path="/about-page" element={<AboutPage />} />
        <Route path="/gemini-demo" element={<GeminiDemo />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
