import api from './api';

export const projectService = {
  // Get all projects
  getAll: async () => {
    return await api.get('/projects');
  },

  // Get single project
  getById: async (id) => {
    return await api.get(`/projects/${id}`);
  },

  // Get project with all details (tasks and mind map nodes)
  getWithDetails: async (id) => {
    return await api.get(`/projects/${id}/details`);
  },

  // Create new project
  create: async (projectData) => {
    return await api.post('/projects', projectData);
  },

  // Update project
  update: async (id, projectData) => {
    return await api.put(`/projects/${id}`, projectData);
  },

  // Delete project
  delete: async (id) => {
    return await api.delete(`/projects/${id}`);
  },

  // Get project tasks
  getTasks: async (projectId) => {
    return await api.get(`/projects/${projectId}/tasks`);
  },

  // Get project mind map nodes
  getMindMapNodes: async (projectId) => {
    return await api.get(`/projects/${projectId}/nodes`);
  },

  // Helper method to validate project data
  validateProject: (projectData) => {
    const errors = [];
    
    if (!projectData.name || projectData.name.trim().length === 0) {
      errors.push('Project name is required');
    }
    
    if (projectData.name && projectData.name.length > 255) {
      errors.push('Project name must be less than 255 characters');
    }
    
    if (projectData.description && projectData.description.length > 1000) {
      errors.push('Description must be less than 1000 characters');
    }
    
    if (projectData.system_prompt && projectData.system_prompt.length > 2000) {
      errors.push('System prompt must be less than 2000 characters');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  // Helper method to format project data for API
  formatProjectData: (projectData) => {
    return {
      name: projectData.name?.trim() || '',
      description: projectData.description?.trim() || null,
      system_prompt: projectData.system_prompt?.trim() || null,
    };
  },

  // Helper method to create a default project
  createDefaultProject: () => {
    return {
      name: '',
      description: '',
      system_prompt: 'You are a helpful project management assistant. Help users organize their tasks, provide suggestions, and improve productivity.',
    };
  },

  // Helper method to get project statistics
  getProjectStats: async (projectId) => {
    try {
      const project = await projectService.getWithDetails(projectId);
      
      if (!project.data) {
        return null;
      }

      const { tasks, mindMapNodes } = project.data;
      
      const stats = {
        totalTasks: tasks?.length || 0,
        completedTasks: tasks?.filter(task => task.status === 'done').length || 0,
        inProgressTasks: tasks?.filter(task => task.status === 'in-progress').length || 0,
        todoTasks: tasks?.filter(task => task.status === 'todo').length || 0,
        reviewTasks: tasks?.filter(task => task.status === 'review').length || 0,
        totalMindMapNodes: mindMapNodes?.length || 0,
        completionRate: 0,
      };

      if (stats.totalTasks > 0) {
        stats.completionRate = Math.round((stats.completedTasks / stats.totalTasks) * 100);
      }

      return stats;
    } catch (error) {
      console.error('Error fetching project stats:', error);
      return null;
    }
  },

  // Helper method to search projects
  searchProjects: async (searchTerm) => {
    try {
      const projects = await projectService.getAll();
      
      if (!projects.data) {
        return [];
      }

      const filteredProjects = projects.data.filter(project => {
        const searchLower = searchTerm.toLowerCase();
        return (
          project.name.toLowerCase().includes(searchLower) ||
          (project.description && project.description.toLowerCase().includes(searchLower)) ||
          (project.system_prompt && project.system_prompt.toLowerCase().includes(searchLower))
        );
      });

      return filteredProjects;
    } catch (error) {
      console.error('Error searching projects:', error);
      return [];
    }
  },

  // Helper method to export project data
  exportProject: async (projectId) => {
    try {
      const project = await projectService.getWithDetails(projectId);
      
      if (!project.data) {
        throw new Error('Project not found');
      }

      const exportData = {
        project: {
          name: project.data.name,
          description: project.data.description,
          system_prompt: project.data.system_prompt,
          created_at: project.data.created_at,
          updated_at: project.data.updated_at,
        },
        tasks: project.data.tasks || [],
        mindMapNodes: project.data.mindMapNodes || [],
        exported_at: new Date().toISOString(),
      };

      return exportData;
    } catch (error) {
      console.error('Error exporting project:', error);
      throw error;
    }
  },
};