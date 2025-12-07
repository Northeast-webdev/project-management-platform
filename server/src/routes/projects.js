const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const logger = require('../utils/logger');

// GET /api/projects - Get all projects
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.findAll();
    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/projects/:id - Get specific project
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/projects/:id/details - Get project with tasks and mind map nodes
router.get('/:id/details', async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.getProjectWithDetails(id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/projects - Create new project
router.post('/', async (req, res, next) => {
  try {
    const { name, description, system_prompt } = req.body;

    // Basic validation
    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Project name is required',
      });
    }

    const projectData = {
      name: name.trim(),
      description: description?.trim() || null,
      system_prompt: system_prompt?.trim() || null,
    };

    const project = await Project.create(projectData);
    
    logger.info(`Project created: ${project.id} - ${project.name}`);
    
    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/projects/:id - Update project
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, system_prompt } = req.body;

    // Check if project exists
    const existingProject = await Project.findById(id);
    if (!existingProject) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    // Basic validation
    if (!name || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Project name is required',
      });
    }

    const projectData = {
      name: name.trim(),
      description: description?.trim() || null,
      system_prompt: system_prompt?.trim() || null,
    };

    const project = await Project.update(id, projectData);
    
    logger.info(`Project updated: ${project.id} - ${project.name}`);
    
    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/projects/:id - Delete project
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if project exists
    const existingProject = await Project.findById(id);
    if (!existingProject) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    const project = await Project.delete(id);
    
    logger.info(`Project deleted: ${project.id} - ${project.name}`);
    
    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/projects/:id/tasks - Get project tasks
router.get('/:id/tasks', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if project exists
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    const tasks = await Project.getTasks(id);
    
    res.json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/projects/:id/nodes - Get project mind map nodes
router.get('/:id/nodes', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if project exists
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    const nodes = await Project.getMindMapNodes(id);
    
    res.json({
      success: true,
      data: nodes,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;