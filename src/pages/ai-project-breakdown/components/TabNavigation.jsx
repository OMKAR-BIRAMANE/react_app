import React from 'react';
import Icon from '../../../components/AppIcon';

const TabNavigation = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="border-b border-border bg-card">
      <div className="flex space-x-8 px-6">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-all duration-200 ${
              activeTab === tab?.id
                ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
            {tab?.count !== undefined && (
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab?.id
                  ? 'bg-primary/10 text-primary' :'bg-muted text-text-secondary'
              }`}>
                {tab?.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;