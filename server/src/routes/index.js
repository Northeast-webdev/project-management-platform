const express = require('express');
const router = express.Router();

// Import route modules
const projectsRouter = require('./projects');
const tasksRouter = require('./tasks');
const mindMapRouter = require('./mindMap');

// Mount routes
router.use('/projects', projectsRouter);
router.use('/tasks', tasksRouter);
router.use('/mind-map', mindMapRouter);

// API documentation endpoint
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Project Management API',
    version: '1.0.0',
    endpoints: {
      projects: {
        'GET /api/projects': 'Get all projects',
        'GET /api/projects/:id': 'Get specific project',
        'GET /api/projects/:id/details': 'Get project with tasks and mind map nodes',
        'POST /api/projects': 'Create new project',
        'PUT /api/projects/:id': 'Update project',
        'DELETE /api/projects/:id': 'Delete project',
        'GET /api/projects/:id/tasks': 'Get project tasks',
        'GET /api/projects/:id/nodes': 'Get project mind map nodes',
      },
      tasks: {
        'GET /api/tasks': 'Get all tasks',
        'GET /api/tasks/:id': 'Get specific task',
        'POST /api/tasks': 'Create new task',
        'PUT /api/tasks/:id': 'Update task',
        'PUT /api/tasks/:id/status': 'Update task status',
        'PUT /api/tasks/:id/position': 'Update task position',
        'DELETE /api/tasks/:id': 'Delete task',
        'PUT /api/tasks/reorder': 'Reorder tasks (drag and drop)',
        'GET /api/tasks/projects/:id/by-status': 'Get project tasks grouped by status',
      },
      mindMap: {
        'GET /api/mind-map': 'Get all mind map nodes',
        'GET /api/mind-map/:id': 'Get specific mind map node',
        'POST /api/mind-map': 'Create new mind map node',
        'PUT /api/mind-map/:id': 'Update mind map node',
        'PUT /api/mind-map/:id/position': 'Update node position',
        'DELETE /api/mind-map/:id': 'Delete mind map node',
        'POST /api/mind-map/:id/convert-to-task': 'Convert mind map node to task',
        'GET /api/mind-map/projects/:id/hierarchy': 'Get project mind map nodes with hierarchy',
        'GET /api/mind-map/nodes/:id/children': 'Get child nodes of a specific node',
      },
    },
  });
});

module.exports = router;