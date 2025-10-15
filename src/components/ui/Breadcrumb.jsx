import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ 
  items = [], 
  className = "" 
}) => {
  const navigate = useNavigate();

  if (!items?.length) return null;

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <div className="flex items-center space-x-2 overflow-x-auto">
        {items?.map((item, index) => (
          <div key={index} className="flex items-center space-x-2 flex-shrink-0">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-text-secondary flex-shrink-0" 
                strokeWidth={2}
              />
            )}
            
            {item?.path && index < items?.length - 1 ? (
              <button
                onClick={() => handleNavigation(item?.path)}
                className="text-text-secondary hover:text-primary transition-colors duration-150 hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-1 py-0.5"
              >
                {item?.label}
              </button>
            ) : (
              <span className={`${
                index === items?.length - 1 
                  ? 'text-text-primary font-medium' :'text-text-secondary'
              }`}>
                {item?.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Breadcrumb;