import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterToolbar = ({
  searchQuery = '',
  onSearchChange,
  selectedType = 'all',
  onTypeChange,
  sortBy = 'createdAt',
  onSortChange,
  sortOrder = 'desc',
  onSortOrderChange,
  dateRange = 'all',
  onDateRangeChange,
  totalCount = 0,
  filteredCount = 0,
  onCreateNew,
  showBulkActions = false,
  selectedCount = 0,
  onBulkDelete = null,
  onSelectAll = null,
  onClearSelection = null
}) => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  const projectTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'web', label: 'Web Application' },
    { value: 'mobile', label: 'Mobile App' },
    { value: 'api', label: 'API Service' }
  ];

  const sortOptions = [
    { value: 'createdAt', label: 'Creation Date' },
    { value: 'name', label: 'Project Name' },
    { value: 'lastModified', label: 'Last Modified' },
    { value: 'type', label: 'Project Type' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const handleClearFilters = () => {
    onSearchChange('');
    onTypeChange('all');
    onDateRangeChange('all');
    onSortChange('createdAt');
    onSortOrderChange('desc');
  };

  const hasActiveFilters = searchQuery || selectedType !== 'all' || dateRange !== 'all';

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Top Row - Search, Create Button, and Mobile Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-10"
            />
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
          </div>

          {/* Results Count */}
          <div className="text-sm text-text-secondary whitespace-nowrap">
            {filteredCount === totalCount ? (
              <span>{totalCount} project{totalCount !== 1 ? 's' : ''}</span>
            ) : (
              <span>{filteredCount} of {totalCount} project{totalCount !== 1 ? 's' : ''}</span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Mobile Filter Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            iconName="Filter"
            iconPosition="left"
            iconSize={16}
            className="md:hidden"
          >
            Filters
          </Button>

          {/* Create New Project Button */}
          <Button
            variant="default"
            onClick={onCreateNew}
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            <span className="hidden sm:inline">Create New Project</span>
            <span className="sm:hidden">Create</span>
          </Button>
        </div>
      </div>
      {/* Bulk Actions */}
      {showBulkActions && selectedCount > 0 && (
        <div className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-lg mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-text-primary">
              {selectedCount} project{selectedCount !== 1 ? 's' : ''} selected
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              className="text-text-secondary hover:text-text-primary"
            >
              Clear selection
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onSelectAll}
              iconName="CheckSquare"
              iconPosition="left"
              iconSize={14}
            >
              Select All
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={onBulkDelete}
              iconName="Trash2"
              iconPosition="left"
              iconSize={14}
            >
              Delete Selected
            </Button>
          </div>
        </div>
      )}
      {/* Filter Controls - Desktop Always Visible, Mobile Collapsible */}
      <div className={`${isFilterPanelOpen ? 'block' : 'hidden'} md:block`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Project Type Filter */}
          <Select
            label="Project Type"
            options={projectTypeOptions}
            value={selectedType}
            onChange={onTypeChange}
          />

          {/* Date Range Filter */}
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={dateRange}
            onChange={onDateRangeChange}
          />

          {/* Sort By */}
          <Select
            label="Sort By"
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
          />

          {/* Sort Order */}
          <div className="flex items-end space-x-2">
            <Button
              variant={sortOrder === 'desc' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onSortOrderChange('desc')}
              iconName="ArrowDown"
              iconPosition="left"
              iconSize={14}
              className="flex-1"
            >
              Newest
            </Button>
            <Button
              variant={sortOrder === 'asc' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onSortOrderChange('asc')}
              iconName="ArrowUp"
              iconPosition="left"
              iconSize={14}
              className="flex-1"
            >
              Oldest
            </Button>
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="flex justify-end mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={14}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterToolbar;