import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import ProjectDetailsForm from './components/ProjectDetailsForm';
import ProjectTypeSelector from './components/ProjectTypeSelector';
import TechStackSelector from './components/TechStackSelector';
import ProjectSummary from './components/ProjectSummary';
import EducationalSidebar from './components/EducationalSidebar';
import Icon from '../../components/AppIcon';

const ProjectCreationForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [errors, setErrors] = useState({});
  const [lastSaved, setLastSaved] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    projectType: '',
    techStack: {}
  });

  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/authentication');
      return;
    }
  }, [navigate]);

  // Auto-save functionality
  useEffect(() => {
    const autoSave = () => {
      if (formData?.projectName || formData?.projectDescription) {
        localStorage.setItem('projectFormDraft', JSON.stringify(formData));
        setLastSaved(new Date());
      }
    };

    const timer = setTimeout(autoSave, 2000);
    return () => clearTimeout(timer);
  }, [formData]);

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem('projectFormDraft');
    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft);
        setFormData(parsedDraft);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  const steps = [
    {
      label: 'Project Details',
      description: 'Name and description'
    },
    {
      label: 'Project Type',
      description: 'Platform selection'
    },
    {
      label: 'Tech Stack',
      description: 'Technology preferences'
    },
    {
      label: 'Review',
      description: 'Final confirmation'
    }
  ];

  const breadcrumbItems = [
    { label: 'Home', path: '/landing-page' },
    { label: 'Create Project', path: '/project-creation-form' }
  ];

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0:
        if (!formData?.projectName?.trim()) {
          newErrors.projectName = 'Project name is required';
        } else if (formData?.projectName?.length < 3) {
          newErrors.projectName = 'Project name must be at least 3 characters';
        }

        if (!formData?.projectDescription?.trim()) {
          newErrors.projectDescription = 'Project description is required';
        } else if (formData?.projectDescription?.length < 50) {
          newErrors.projectDescription = 'Description should be at least 50 characters for better analysis';
        }
        break;

      case 1:
        if (!formData?.projectType) {
          newErrors.projectType = 'Please select a project type';
        }
        break;

      case 2:
        const hasSelectedTech = Object.values(formData?.techStack)?.some(
          category => category && category?.length > 0
        );
        if (!hasSelectedTech) {
          newErrors.techStack = 'Please select at least one technology';
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps?.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
    setErrors({});
  };

  const handleEditStep = (step) => {
    setCurrentStep(step);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call to Gemini
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Save project data
      const projectId = Date.now()?.toString();
      const projectData = {
        id: projectId,
        ...formData,
        createdAt: new Date()?.toISOString(),
        status: 'completed'
      };

      // Save to localStorage (in real app, this would be Firestore)
      const existingProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
      existingProjects?.push(projectData);
      localStorage.setItem('userProjects', JSON.stringify(existingProjects));

      // Clear draft
      localStorage.removeItem('projectFormDraft');

      // Navigate to AI breakdown page
      navigate(`/ai-project-breakdown?id=${projectId}`);
    } catch (error) {
      console.error('Error submitting project:', error);
      setErrors({ submit: 'Failed to generate project breakdown. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <ProjectDetailsForm
            projectName={formData?.projectName}
            projectDescription={formData?.projectDescription}
            onProjectNameChange={(value) => updateFormData('projectName', value)}
            onProjectDescriptionChange={(value) => updateFormData('projectDescription', value)}
            errors={errors}
          />
        );

      case 1:
        return (
          <ProjectTypeSelector
            selectedType={formData?.projectType}
            onTypeSelect={(type) => updateFormData('projectType', type)}
            error={errors?.projectType}
          />
        );

      case 2:
        return (
          <TechStackSelector
            selectedTechStack={formData?.techStack}
            onTechStackChange={(stack) => updateFormData('techStack', stack)}
            projectType={formData?.projectType}
            error={errors?.techStack}
          />
        );

      case 3:
        return (
          <ProjectSummary
            projectData={formData}
            onEdit={handleEditStep}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgressIndicator 
        steps={steps} 
        currentStep={currentStep} 
      />
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} className="mb-6" />

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Create New Project
            </h1>
            <p className="text-text-secondary">
              Let's break down your project idea into a structured development plan with AI assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className={`transition-all duration-300 ${
              isSidebarCollapsed ? 'lg:col-span-4' : 'lg:col-span-3'
            }`}>
              <div className="bg-card border border-border rounded-lg p-6 lg:p-8">
                {/* Auto-save indicator */}
                {lastSaved && (
                  <div className="flex items-center space-x-2 text-xs text-text-secondary mb-6">
                    <Icon name="Save" size={14} strokeWidth={2} />
                    <span>Last saved: {lastSaved?.toLocaleTimeString()}</span>
                  </div>
                )}

                {/* Step Content */}
                <div className="mb-8">
                  {renderStepContent()}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <div>
                    {currentStep > 0 && (
                      <Button
                        variant="outline"
                        onClick={handlePrevious}
                        iconName="ChevronLeft"
                        iconPosition="left"
                        iconSize={16}
                      >
                        Previous
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    {currentStep < steps?.length - 1 ? (
                      <Button
                        variant="default"
                        onClick={handleNext}
                        iconName="ChevronRight"
                        iconPosition="right"
                        iconSize={16}
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        onClick={handleSubmit}
                        loading={isSubmitting}
                        iconName="Sparkles"
                        iconPosition="left"
                        iconSize={16}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Generating...' : 'Generate Breakdown'}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Error Display */}
                {errors?.submit && (
                  <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <div className="flex items-center space-x-2 text-destructive">
                      <Icon name="AlertCircle" size={16} strokeWidth={2} />
                      <span className="text-sm">{errors?.submit}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Educational Sidebar */}
            {!isSidebarCollapsed && (
              <div className="lg:col-span-1">
                <EducationalSidebar
                  currentStep={currentStep}
                  isCollapsed={isSidebarCollapsed}
                  onToggleCollapse={() => setIsSidebarCollapsed(true)}
                />
              </div>
            )}
          </div>

          {/* Collapsed Sidebar Toggle */}
          {isSidebarCollapsed && (
            <EducationalSidebar
              currentStep={currentStep}
              isCollapsed={isSidebarCollapsed}
              onToggleCollapse={() => setIsSidebarCollapsed(false)}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default ProjectCreationForm;