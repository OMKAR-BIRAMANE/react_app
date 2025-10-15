import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ 
  steps = [], 
  currentStep = 0, 
  className = "" 
}) => {
  if (!steps?.length) return null;

  const progressPercentage = ((currentStep + 1) / steps?.length) * 100;

  return (
    <div className={`sticky top-16 z-40 bg-surface border-b border-border py-4 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-text-primary">
              Step {currentStep + 1} of {steps?.length}
            </span>
            <span className="text-sm text-text-secondary">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out-custom"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Steps - Desktop */}
        <div className="hidden md:flex items-center justify-between">
          {steps?.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                  index < currentStep 
                    ? 'bg-success border-success text-white' 
                    : index === currentStep
                    ? 'bg-primary border-primary text-white' :'bg-surface border-border text-text-secondary'
                }`}>
                  {index < currentStep ? (
                    <Icon name="Check" size={16} strokeWidth={2} />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <div className={`text-sm font-medium ${
                    index <= currentStep ? 'text-text-primary' : 'text-text-secondary'
                  }`}>
                    {step?.label}
                  </div>
                  {step?.description && (
                    <div className="text-xs text-text-secondary mt-1 max-w-24">
                      {step?.description}
                    </div>
                  )}
                </div>
              </div>
              {index < steps?.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  index < currentStep ? 'bg-success' : 'bg-border'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Steps - Mobile (Current Step Only) */}
        <div className="md:hidden">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 bg-primary border-primary text-white`}>
              <span className="text-sm font-medium">{currentStep + 1}</span>
            </div>
            <div>
              <div className="text-sm font-medium text-text-primary">
                {steps?.[currentStep]?.label}
              </div>
              {steps?.[currentStep]?.description && (
                <div className="text-xs text-text-secondary">
                  {steps?.[currentStep]?.description}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;