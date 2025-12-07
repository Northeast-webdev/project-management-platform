const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Project = require('../models/Project');
const logger = require('../utils/logger');

// GET /api/tasks - Get all tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.findAll();
    res.json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/tasks/:id - Get specific task
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found',
      });
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/tasks - Create new task
router.post('/', async (req, res, next) => {
  try {
    const { project_id, title, description, status = 'todo', position = 0 } = req.body;

    // Basic validation
    if (!project_id) {
      return res.status(400).json({
        success: false,
        error: 'Project ID is required',
      });
    }

    if (!title || title.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Task title is required',
      });
    }

    // Check if project exists
    const project = await Project.findById(project_id);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    const taskData = {
      project_id,
      title: title.trim(),
      description: description?.trim() || null,
      status,
      position,
    };

    const task = await Task.create(taskData);
    
    logger.info(`Task created: ${task.id} - ${task.title}`);
    
    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/tasks/:id - Update task
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status, position } = req.body;

    // Check if task exists
    const existingTask = await Task.findById(id);
    if (!existingTask) {
      return res.status(404).json({
        success: false,
        error: 'Task not found',
      });
    }

    // Basic validation
    if (title && title.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Task title cannot be empty',
      });
    }

    const taskData = {
      title: title?.trim() || existingTask.title,
      description: description?.trim() || existingTask.description,
      status: status || existingTask.status,
      position: position !== undefined ? position : existingTask.position,
    };

    const task = await Task.update(id, taskData);
    
    logger.info(`Task updated: ${task.id} - ${task.title}`);
    
    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/tasks/:id/status - Update task status
router.put('/:id/status', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['todo', 'in-progress', 'review', 'done'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be one of: todo, in-progress, review, done',
      });
    }

    // Check if task exists
    const existingTask = await Task.findById(id);
    if (!existingTask) {
      return res.status(404).json({
        success: false,
        error: 'Task not found',
      });
    }

    const task = await Task.updateStatus(id, status);
    
    logger.info(`Task status updated: ${task.id} - ${task.title} -> ${status}`);
    
    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/tasks/:id/position - Update task position
router.put('/:id/position', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { position } = req.body;

    if (typeof position !== 'number' || position < 0) {
      return res.status(400).json({
        success: false,
        error: 'Position must be a non-negative number',
      });
    }

    // Check if task exists
    const existingTask = await Task.findById(id);
    if (!existingTask) {
      return res.status(404).json({
        success: false,
        error: 'Task not found',
      });
    }

    const task = await Task.updatePosition(id, position);
    
    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if task exists
    const existingTask = await Task.findById(id);
    if (!existingTask) {
      return res.status(404).json({
        success: false,
        error: 'Task not found',
      });
    }

    const task = await Task.delete(id);
    
    logger.info(`Task deleted: ${task.id} - ${task.title}`);
    
    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/tasks/reorder - Reorder tasks (for drag and drop)
router.put('/reorder', async (req, res, next) => {
  try {
    const { project_id, tasks } = req.body;

    if (!project_id || !Array.isArray(tasks)) {
      return res.status(400).json({
        success: false,
        error: 'Project ID and tasks array are required',
      });
    }

    // Check if project exists
    const project = await Project.findById(project_id);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }

    const updatedTasks = await Task.reorderTasks(project_id, tasks);
    
    logger.info(`Tasks reordered for project ${project_id}: ${tasks.length} tasks`);
    
    res.json({
      success: true,
      data: updatedTasks,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/projects/:id/tasks/by-status - Get project tasks grouped by status
router.get('/projects/:id/by-status', async (req, res, next) => {
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

    const tasksByStatus = await Task.getTasksByStatus(id);
    
    res.json({
      success: true,
      data: tasksByStatus,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;