import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import ERDiagram from './components/ERDiagram';
import ModuleCard from './components/ModuleCard';
import ThinkingProcess from './components/ThinkingProcess';
import FolderStructure from './components/FolderStructure';
import ActionPanel from './components/ActionPanel';
import TabNavigation from './components/TabNavigation';

const AIProjectBreakdown = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isThinkingCollapsed, setIsThinkingCollapsed] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Mock project data - in real app, this would come from API/props
  const mockProjectData = {
    id: 'proj_001',
    title: 'Task Management Web Application',
    description: 'A comprehensive task management system with user authentication, project organization, and team collaboration features.',
    type: 'Web Application',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
    complexity: 'Medium',
    estimatedTime: '6-8 weeks',
    createdAt: new Date()?.toISOString(),
    modules: [
      {
        id: 'auth',
        name: 'Authentication System',
        type: 'Core Module',
        icon: 'Shield',
        priority: 'high',
        description: 'Secure user authentication with JWT tokens, password hashing, and session management.',
        purpose: 'Provides secure access control and user identity management across the application. Essential for protecting user data and enabling personalized experiences.',
        reasoning: `Authentication is the foundation of any user-centric application. We chose JWT tokens for stateless authentication, which scales better than session-based auth. BCrypt for password hashing provides industry-standard security. This approach allows for easy integration with third-party services and mobile apps in the future.`,
        dependencies: ['bcryptjs', 'jsonwebtoken', 'express-validator'],
        estimatedTime: '1-2 weeks',
        difficulty: 'Intermediate',
        codeSnippets: [
          {
            filename: 'auth.js',
            language: 'javascript',
            code: `const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};`,
            explanation: 'This code handles JWT token generation and password hashing using industry-standard libraries.'
          }
        ]
      },
      {
        id: 'dashboard',
        name: 'User Dashboard',
        type: 'UI Component',
        icon: 'LayoutDashboard',
        priority: 'high',
        description: 'Main dashboard interface showing project overview, recent tasks, and quick actions.',
        purpose: 'Provides users with a centralized view of their work, enabling quick navigation and status monitoring.',
        reasoning: `The dashboard serves as the application's home base. We designed it with cards for easy scanning and quick actions for efficiency. The layout is responsive and prioritizes the most important information above the fold.`,
        dependencies: ['react', 'react-router-dom', 'recharts'],
        estimatedTime: '1 week',
        difficulty: 'Beginner',
        codeSnippets: [
          {
            filename: 'Dashboard.jsx',
            language: 'jsx',
            code: `import React from 'react';
import { Card, CardHeader, CardContent } from './ui/Card';

const Dashboard = ({ user, projects, tasks }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <h3>Active Projects</h3>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{projects.length}</p>
        </CardContent>
      </Card>
    </div>
  );
};`,
            explanation: 'A responsive dashboard component using a grid layout for optimal information display.'
          }
        ]
      },
      {
        id: 'tasks',
        name: 'Task Management',
        type: 'Feature Module',
        icon: 'CheckSquare',
        priority: 'high',
        description: 'Complete task lifecycle management with creation, assignment, tracking, and completion.',
        purpose: 'Core functionality for creating, organizing, and tracking work items with status updates and deadlines.',
        reasoning: `Task management is the heart of the application. We implemented a flexible status system (todo, in-progress, done) with drag-and-drop functionality for intuitive interaction. Priority levels help users focus on important work.`,
        dependencies: ['react-beautiful-dnd', 'date-fns'],
        estimatedTime: '2-3 weeks',
        difficulty: 'Intermediate',
        codeSnippets: [
          {
            filename: 'TaskCard.jsx',
            language: 'jsx',
            code: `import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TaskCard = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-4 rounded-lg shadow-sm border"
        >
          <h4 className="font-medium">{task.title}</h4>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>
      )}
    </Draggable>
  );
};`,
            explanation: 'A draggable task card component that integrates with react-beautiful-dnd for smooth interactions.'
          }
        ]
      },
      {
        id: 'projects',
        name: 'Project Organization',
        type: 'Feature Module',
        icon: 'FolderOpen',
        priority: 'medium',
        description: 'Project creation, management, and organization with team member assignment.',
        purpose: 'Enables users to group related tasks into projects for better organization and team collaboration.',
        reasoning: `Projects provide context and organization for tasks. We included team member management and project templates to speed up setup. The hierarchical structure (projects > tasks) matches how teams naturally think about work.`,
        dependencies: ['react-hook-form', 'yup'],
        estimatedTime: '1-2 weeks',
        difficulty: 'Beginner',
        codeSnippets: [
          {
            filename: 'ProjectForm.jsx',
            language: 'jsx',
            code: `import React from 'react';
import { useForm } from 'react-hook-form';

const ProjectForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Project Name</label>
        <input
          {...register('name', { required: 'Project name is required' })}
          className="mt-1 block w-full rounded-md border-gray-300"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
    </form>
  );
};`,
            explanation: 'A form component using react-hook-form for efficient form handling and validation.'
          }
        ]
      },
      {
        id: 'notifications',
        name: 'Notification System',
        type: 'Utility Module',
        icon: 'Bell',
        priority: 'low',
        description: 'Real-time notifications for task updates, deadlines, and team activities.',
        purpose: 'Keeps users informed about important events and changes in their projects and tasks.',
        reasoning: `Notifications improve user engagement and ensure important updates aren't missed. We implemented both in-app and email notifications with user preferences for customization. Real-time updates use WebSocket connections.`,
        dependencies: ['socket.io-client', 'react-toastify'],
        estimatedTime: '1 week',
        difficulty: 'Advanced',
        codeSnippets: [
          {
            filename: 'NotificationService.js',
            language: 'javascript',
            code: `import io from 'socket.io-client';
import { toast } from 'react-toastify';

class NotificationService {
  constructor() {
    this.socket = io(process.env.REACT_APP_SERVER_URL);
    this.setupListeners();
  }

  setupListeners() {
    this.socket.on('task_updated', (data) => {
      toast.info(\`Task "\${data.taskName}" was updated\`);
    });
  }
}`,
            explanation: 'A service class that manages real-time notifications using Socket.IO and toast notifications.'
          }
        ]
      }
    ],
    thinkingSteps: [
      {
        title: 'Project Analysis',
        subtitle: 'Understanding requirements and scope',
        status: 'completed',
        duration: '3 seconds',
        confidence: 'high',
        description: 'Analyzed the project requirements to understand the core functionality needed for a task management application.',
        considerations: [
          'User authentication requirements',
          'Task lifecycle management needs',
          'Team collaboration features',
          'Data persistence requirements'
        ],
        decisions: [
          {
            choice: 'Web-first approach with responsive design',
            reasoning: 'Provides maximum accessibility across devices while keeping development focused'
          }
        ],
        output: 'Identified 5 core modules needed for MVP functionality'
      },
      {
        title: 'Architecture Planning',
        subtitle: 'Designing system structure',
        status: 'completed',
        duration: '4 seconds',
        confidence: 'high',
        description: 'Planned the overall system architecture considering scalability, maintainability, and development efficiency.',
        considerations: [
          'Frontend-backend separation',
          'Database schema design',
          'API structure planning',
          'Authentication strategy'
        ],
        decisions: [
          {
            choice: 'JWT-based authentication',
            reasoning: 'Stateless authentication scales better and works well with modern frontend frameworks'
          },
          {
            choice: 'MongoDB for data storage',
            reasoning: 'Flexible schema works well for evolving task and project structures'
          }
        ],
        output: 'Defined clear separation of concerns with modular architecture'
      },
      {
        title: 'Technology Selection',
        subtitle: 'Choosing optimal tech stack',
        status: 'completed',
        duration: '2 seconds',
        confidence: 'high',
        description: 'Selected technologies based on project requirements, team expertise, and long-term maintainability.',
        considerations: [
          'Learning curve for development team',
          'Community support and documentation',
          'Performance requirements',
          'Integration capabilities'
        ],
        decisions: [
          {
            choice: 'React for frontend',
            reasoning: 'Component-based architecture matches the modular nature of the application'
          },
          {
            choice: 'Node.js + Express for backend',
            reasoning: 'JavaScript across the stack reduces context switching and leverages team skills'
          }
        ],
        output: 'Finalized tech stack optimized for development velocity and maintainability'
      },
      {
        title: 'Module Breakdown',
        subtitle: 'Defining component structure',
        status: 'completed',
        duration: '5 seconds',
        confidence: 'high',
        description: 'Broke down the application into logical modules with clear responsibilities and dependencies.',
        considerations: [
          'Single responsibility principle',
          'Module interdependencies',
          'Development priority order',
          'Testing strategy'
        ],
        decisions: [
          {
            choice: 'Authentication-first development',
            reasoning: 'Security foundation enables all other features to be built securely from the start'
          }
        ],
        output: 'Created 5 distinct modules with clear interfaces and responsibilities'
      },
      {
        title: 'Code Generation',
        subtitle: 'Creating implementation examples',
        status: 'completed',
        duration: '6 seconds',
        confidence: 'high',
        description: 'Generated practical code examples with educational explanations to help developers understand implementation patterns.',
        considerations: [
          'Code readability and best practices',
          'Educational value for beginners',
          'Real-world applicability',
          'Error handling patterns'
        ],
        decisions: [
          {
            choice: 'Include explanatory comments',
            reasoning: 'Helps developers understand not just what the code does, but why it works that way'
          }
        ],
        output: 'Generated production-ready code snippets with educational context'
      }
    ],
    projectStructure: [
      {
        name: 'task-management-app',
        type: 'folder',
        path: 'root',
        description: 'Root project directory',
        children: [
          {
            name: 'public',
            type: 'folder',
            path: 'public',
            description: 'Static assets and HTML template',
            children: [
              { name: 'index.html', type: 'file', path: 'public/index.html', description: 'Main HTML template' },
              { name: 'favicon.ico', type: 'file', path: 'public/favicon.ico', description: 'Website favicon' }
            ]
          },
          {
            name: 'src',
            type: 'folder',
            path: 'src',
            description: 'Source code directory',
            children: [
              {
                name: 'components',
                type: 'folder',
                path: 'src/components',
                description: 'Reusable UI components',
                children: [
                  { name: 'TaskCard.jsx', type: 'file', path: 'src/components/TaskCard.jsx', description: 'Individual task display component' },
                  { name: 'ProjectCard.jsx', type: 'file', path: 'src/components/ProjectCard.jsx', description: 'Project overview component' },
                  { name: 'Dashboard.jsx', type: 'file', path: 'src/components/Dashboard.jsx', description: 'Main dashboard layout' }
                ]
              },
              {
                name: 'pages',
                type: 'folder',
                path: 'src/pages',
                description: 'Page-level components',
                children: [
                  { name: 'Login.jsx', type: 'file', path: 'src/pages/Login.jsx', description: 'User authentication page' },
                  { name: 'Projects.jsx', type: 'file', path: 'src/pages/Projects.jsx', description: 'Project management page' },
                  { name: 'Tasks.jsx', type: 'file', path: 'src/pages/Tasks.jsx', description: 'Task management interface' }
                ]
              },
              {
                name: 'services',
                type: 'folder',
                path: 'src/services',
                description: 'API and external service integrations',
                children: [
                  { name: 'api.js', type: 'file', path: 'src/services/api.js', description: 'HTTP client configuration' },
                  { name: 'auth.js', type: 'file', path: 'src/services/auth.js', description: 'Authentication service' },
                  { name: 'notifications.js', type: 'file', path: 'src/services/notifications.js', description: 'Notification management' }
                ]
              },
              {
                name: 'utils',
                type: 'folder',
                path: 'src/utils',
                description: 'Utility functions and helpers',
                children: [
                  { name: 'helpers.js', type: 'file', path: 'src/utils/helpers.js', description: 'Common utility functions' },
                  { name: 'constants.js', type: 'file', path: 'src/utils/constants.js', description: 'Application constants' }
                ]
              },
              { name: 'App.jsx', type: 'file', path: 'src/App.jsx', description: 'Main application component' },
              { name: 'index.js', type: 'file', path: 'src/index.js', description: 'Application entry point' }
            ]
          },
          { name: 'package.json', type: 'file', path: 'package.json', description: 'Project dependencies and scripts' },
          { name: '.env', type: 'file', path: '.env', description: 'Environment variables' },
          { name: 'README.md', type: 'file', path: 'README.md', description: 'Project documentation' }
        ]
      }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye', count: mockProjectData?.modules?.length },
    { id: 'diagram', label: 'ER Diagram', icon: 'GitBranch' },
    { id: 'modules', label: 'Modules', icon: 'Package', count: mockProjectData?.modules?.length },
    { id: 'structure', label: 'Structure', icon: 'FolderTree' }
  ];

  const breadcrumbItems = [
    { label: 'Home', path: '/landing-page' },
    { label: 'Create Project', path: '/project-creation-form' },
    { label: 'AI Breakdown' }
  ];

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/authentication');
      return;
    }

    // Auto-save project data periodically
    const autoSaveInterval = setInterval(() => {
      handleSaveProject(mockProjectData);
    }, 30000); // Save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [navigate]);

  const handleSaveProject = async (projectData) => {
    // Mock save to localStorage (in real app, would save to Firestore)
    try {
      const savedProjects = JSON.parse(localStorage.getItem('savedProjects') || '[]');
      const existingIndex = savedProjects?.findIndex(p => p?.id === projectData?.id);
      
      if (existingIndex >= 0) {
        savedProjects[existingIndex] = { ...projectData, updatedAt: new Date()?.toISOString() };
      } else {
        savedProjects?.push({ ...projectData, savedAt: new Date()?.toISOString() });
      }
      
      localStorage.setItem('savedProjects', JSON.stringify(savedProjects));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleDownloadDiagram = async () => {
    // Mock download functionality
    const canvas = document.createElement('canvas');
    const ctx = canvas?.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;
    
    // Simple diagram representation
    ctx.fillStyle = '#ffffff';
    ctx?.fillRect(0, 0, canvas?.width, canvas?.height);
    ctx.fillStyle = '#000000';
    ctx.font = '16px Arial';
    ctx?.fillText('ER Diagram - ' + mockProjectData?.title, 20, 30);
    
    // Create download link
    const link = document.createElement('a');
    link.download = `${mockProjectData?.title?.replace(/\s+/g, '_')}_diagram.png`;
    link.href = canvas?.toDataURL();
    link?.click();
  };

  const handleEditProject = () => {
    navigate('/project-creation-form', { state: { editData: mockProjectData } });
  };

  const handleViewModule = (module) => {
    setSelectedModule(module);
  };

  const handleCopyStructure = async () => {
    const structureText = JSON.stringify(mockProjectData?.projectStructure, null, 2);
    try {
      await navigator.clipboard?.writeText(structureText);
    } catch (err) {
      console.error('Failed to copy structure:', err);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-text-primary mb-2">{mockProjectData?.title}</h2>
                  <p className="text-text-secondary leading-relaxed">{mockProjectData?.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {mockProjectData?.type}
                  </span>
                  <span className="px-3 py-1 bg-warning/10 text-warning rounded-full text-sm font-medium">
                    {mockProjectData?.complexity}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
                  <Icon name="Clock" size={20} className="text-primary" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">Estimated Time</p>
                    <p className="text-xs text-text-secondary">{mockProjectData?.estimatedTime}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
                  <Icon name="Package" size={20} className="text-success" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">Modules</p>
                    <p className="text-xs text-text-secondary">{mockProjectData?.modules?.length} components</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-muted/30 rounded-lg">
                  <Icon name="Code" size={20} className="text-accent" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">Tech Stack</p>
                    <p className="text-xs text-text-secondary">{mockProjectData?.techStack?.join(', ')}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {mockProjectData?.techStack?.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <ActionPanel
              projectData={mockProjectData}
              onSaveProject={handleSaveProject}
              onDownloadDiagram={handleDownloadDiagram}
              onEditProject={handleEditProject}
            />
          </div>
        );

      case 'diagram':
        return (
          <ERDiagram
            projectData={mockProjectData}
            onDownloadPNG={handleDownloadDiagram}
          />
        );

      case 'modules':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockProjectData?.modules?.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                onViewCode={handleViewModule}
              />
            ))}
          </div>
        );

      case 'structure':
        return (
          <FolderStructure
            projectStructure={mockProjectData?.projectStructure}
            onCopyStructure={handleCopyStructure}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb items={breadcrumbItems} className="mb-6" />
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">AI Project Breakdown</h1>
              <p className="text-text-secondary mt-2">
                Comprehensive analysis and architecture for your project
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => navigate('/project-creation-form')}
                iconName="ArrowLeft"
                iconPosition="left"
                iconSize={16}
              >
                Back to Form
              </Button>
              <Button
                variant="default"
                onClick={() => navigate('/my-projects-dashboard')}
                iconName="FolderOpen"
                iconPosition="left"
                iconSize={16}
              >
                My Projects
              </Button>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${isThinkingCollapsed ? 'mr-0' : 'mr-0'}`}>
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <TabNavigation
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  tabs={tabs}
                />
                
                <div className="p-6">
                  {renderTabContent()}
                </div>
              </div>
            </div>

            {/* Thinking Process Sidebar */}
            <ThinkingProcess
              thinkingSteps={mockProjectData?.thinkingSteps}
              isCollapsed={isThinkingCollapsed}
              onToggleCollapse={() => setIsThinkingCollapsed(!isThinkingCollapsed)}
            />
          </div>
        </div>
      </div>
      {/* Module Detail Modal */}
      {selectedModule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div>
                <h3 className="text-xl font-semibold text-text-primary">{selectedModule?.name}</h3>
                <p className="text-text-secondary">{selectedModule?.type}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedModule(null)}
                iconName="X"
                iconSize={20}
              />
            </div>
            <div className="p-6">
              <ModuleCard module={selectedModule} onViewCode={() => {}} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIProjectBreakdown;