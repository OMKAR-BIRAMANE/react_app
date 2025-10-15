import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import FilterToolbar from './components/FilterToolbar';
import ProjectGrid from './components/ProjectGrid';
import EmptyState from './components/EmptyState';
import BulkDeleteModal from './components/BulkDeleteModal';

const MyProjectsDashboard = () => {
  const navigate = useNavigate();
  
  // State management
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [dateRange, setDateRange] = useState('all');
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);

  // Mock projects data
  const mockProjects = [
    {
      id: 'proj_001',
      name: 'E-commerce Platform',
      description: 'A full-stack e-commerce solution with React frontend, Node.js backend, and MongoDB database. Features include user authentication, product catalog, shopping cart, and payment integration.',
      type: 'web',
      techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
      createdAt: '2024-10-08T10:30:00Z',
      lastModified: '2024-10-10T15:45:00Z',
      diagramPreview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop'
    },
    {
      id: 'proj_002',
      name: 'Task Management Mobile App',
      description: 'Cross-platform mobile application for task and project management with real-time collaboration features.',
      type: 'mobile',
      techStack: ['React Native', 'Firebase', 'Redux', 'Expo'],
      createdAt: '2024-10-05T14:20:00Z',
      lastModified: '2024-10-09T09:15:00Z',
      diagramPreview: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?w=400&h=200&fit=crop'
    },
    {
      id: 'proj_003',
      name: 'Weather API Service',
      description: 'RESTful API service providing weather data with caching, rate limiting, and comprehensive documentation.',
      type: 'api',
      techStack: ['Node.js', 'Express', 'Redis', 'PostgreSQL', 'Docker'],
      createdAt: '2024-10-03T11:45:00Z',
      lastModified: '2024-10-07T16:30:00Z',
      diagramPreview: 'https://images.pixabay.com/photo/2016/11/29/06/15/clouds-1867908_1280.jpg?w=400&h=200&fit=crop'
    },
    {
      id: 'proj_004',
      name: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media management with data visualization and automated reporting features.',
      type: 'web',
      techStack: ['Vue.js', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL'],
      createdAt: '2024-09-28T08:15:00Z',
      lastModified: '2024-10-06T12:20:00Z',
      diagramPreview: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop'
    },
    {
      id: 'proj_005',
      name: 'Inventory Management System',
      description: 'Enterprise inventory management system with barcode scanning, automated reordering, and comprehensive reporting.',
      type: 'web',
      techStack: ['Angular', 'Spring Boot', 'MySQL', 'Apache Kafka'],
      createdAt: '2024-09-25T13:30:00Z',
      lastModified: '2024-10-04T10:45:00Z',
      diagramPreview: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?w=400&h=200&fit=crop'
    },
    {
      id: 'proj_006',
      name: 'Learning Management System',
      description: 'Educational platform with course management, video streaming, assessments, and progress tracking.',
      type: 'web',
      techStack: ['React', 'Django', 'PostgreSQL', 'AWS S3', 'WebRTC'],
      createdAt: '2024-09-20T16:45:00Z',
      lastModified: '2024-10-02T14:15:00Z',
      diagramPreview: 'https://images.pixabay.com/photo/2016/03/02/20/13/book-1232428_1280.jpg?w=400&h=200&fit=crop'
    }
  ];

  // Initialize projects
  useEffect(() => {
    const initializeProjects = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProjects(mockProjects);
      setLoading(false);
    };

    initializeProjects();
  }, []);

  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/authentication');
    }
  }, [navigate]);

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = [...projects];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(project =>
        project?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        project?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        project?.techStack?.some(tech => tech?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Apply type filter
    if (selectedType !== 'all') {
      filtered = filtered?.filter(project => project?.type === selectedType);
    }

    // Apply date range filter
    if (dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateRange) {
        case 'today':
          filterDate?.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate?.setDate(now?.getDate() - 7);
          break;
        case 'month':
          filterDate?.setMonth(now?.getMonth() - 1);
          break;
        case 'quarter':
          filterDate?.setMonth(now?.getMonth() - 3);
          break;
        case 'year':
          filterDate?.setFullYear(now?.getFullYear() - 1);
          break;
        default:
          break;
      }
      
      if (dateRange !== 'all') {
        filtered = filtered?.filter(project => new Date(project.createdAt) >= filterDate);
      }
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a?.name?.toLowerCase();
          bValue = b?.name?.toLowerCase();
          break;
        case 'type':
          aValue = a?.type;
          bValue = b?.type;
          break;
        case 'lastModified':
          aValue = new Date(a.lastModified);
          bValue = new Date(b.lastModified);
          break;
        default: // createdAt
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [projects, searchQuery, selectedType, dateRange, sortBy, sortOrder]);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/landing-page' },
    { label: 'My Projects' }
  ];

  // Event handlers
  const handleCreateNew = () => {
    navigate('/project-creation-form');
  };

  const handleDeleteProject = (projectId) => {
    setProjects(prev => prev?.filter(p => p?.id !== projectId));
    setSelectedProjects(prev => prev?.filter(id => id !== projectId));
  };

  const handleEditProject = (projectId) => {
    navigate(`/project-creation-form?edit=${projectId}`);
  };

  const handleSelectProject = (projectId) => {
    setSelectedProjects(prev => {
      if (prev?.includes(projectId)) {
        return prev?.filter(id => id !== projectId);
      } else {
        return [...prev, projectId];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedProjects(filteredAndSortedProjects?.map(p => p?.id));
  };

  const handleClearSelection = () => {
    setSelectedProjects([]);
  };

  const handleBulkDelete = () => {
    setIsBulkDeleteModalOpen(true);
  };

  const confirmBulkDelete = () => {
    setProjects(prev => prev?.filter(p => !selectedProjects?.includes(p?.id)));
    setSelectedProjects([]);
    setIsBulkDeleteModalOpen(false);
    setShowBulkActions(false);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setDateRange('all');
    setSortBy('createdAt');
    setSortOrder('desc');
  };

  const toggleBulkActions = () => {
    setShowBulkActions(!showBulkActions);
    if (showBulkActions) {
      setSelectedProjects([]);
    }
  };

  const getSelectedProjectNames = () => {
    return projects?.filter(p => selectedProjects?.includes(p?.id))?.map(p => p?.name);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-text-secondary">Loading your projects...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Breadcrumb items={breadcrumbItems} className="mb-4" />
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">My Projects</h1>
                <p className="text-text-secondary">
                  Manage your AI-generated project breakdowns and architectural designs
                </p>
              </div>
              
              {projects?.length > 0 && (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={toggleBulkActions}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                      showBulkActions
                        ? 'bg-primary text-white border-primary' :'bg-surface text-text-secondary border-border hover:bg-muted'
                    }`}
                  >
                    {showBulkActions ? 'Cancel Selection' : 'Select Multiple'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Filter Toolbar */}
          {projects?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <FilterToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedType={selectedType}
                onTypeChange={setSelectedType}
                sortBy={sortBy}
                onSortChange={setSortBy}
                sortOrder={sortOrder}
                onSortOrderChange={setSortOrder}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                totalCount={projects?.length}
                filteredCount={filteredAndSortedProjects?.length}
                onCreateNew={handleCreateNew}
                showBulkActions={showBulkActions}
                selectedCount={selectedProjects?.length}
                onBulkDelete={handleBulkDelete}
                onSelectAll={handleSelectAll}
                onClearSelection={handleClearSelection}
              />
            </motion.div>
          )}

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {projects?.length === 0 ? (
              <EmptyState
                type="no-projects"
                onCreateNew={handleCreateNew}
              />
            ) : filteredAndSortedProjects?.length === 0 ? (
              <EmptyState
                type="no-results"
                searchQuery={searchQuery}
                onCreateNew={handleCreateNew}
                onClearFilters={handleClearFilters}
              />
            ) : (
              <ProjectGrid
                projects={filteredAndSortedProjects}
                onDelete={handleDeleteProject}
                onEdit={handleEditProject}
                selectedProjects={selectedProjects}
                onSelectProject={handleSelectProject}
                showSelection={showBulkActions}
              />
            )}
          </motion.div>
        </div>
      </div>
      {/* Bulk Delete Modal */}
      <BulkDeleteModal
        isOpen={isBulkDeleteModalOpen}
        onClose={() => setIsBulkDeleteModalOpen(false)}
        onConfirm={confirmBulkDelete}
        selectedCount={selectedProjects?.length}
        projectNames={getSelectedProjectNames()}
      />
    </div>
  );
};

export default MyProjectsDashboard;