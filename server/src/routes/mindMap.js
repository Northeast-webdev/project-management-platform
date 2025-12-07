const express = require('express');
const router = express.Router();
const MindMapNode = require('../models/MindMapNode');
const Project = require('../models/Project');
const logger = require('../utils/logger');

// GET /api/mind-map - Get all mind map nodes
router.get('/', async (req, res, next) => {
  try {
    const nodes = await MindMapNode.findAll();
    res.json({
      success: true,
      data: nodes,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/mind-map/:id - Get specific mind map node
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const node = await MindMapNode.findById(id);
    
    if (!node) {
      return res.status(404).json({
        success: false,
        error: 'Mind map node not found',
      });
    }

    res.json({
      success: true,
      data: node,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/mind-map - Create new mind map node
router.post('/', async (req, res, next) => {
  try {
    const { 
      project_id, 
      parent_id, 
      title, 
      description, 
      x_position = 0, 
      y_position = 0, 
      color = '#4A5568' 
    } = req.body;

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
        error: 'Node title is required',
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

    // If parent_id is provided, check if parent node exists
    if (parent_id) {
      const parentNode = await MindMapNode.findById(parent_id);
      if (!parentNode) {
        return res.status(404).json({
          success: false,
          error: 'Parent node not found',
        });
      }
    }

    const nodeData = {
      project_id,
      parent_id: parent_id || null,
      title: title.trim(),
      description: description?.trim() || null,
      x_position,
      y_position,
      color,
    };

    const node = await MindMapNode.create(nodeData);
    
    logger.info(`Mind map node created: ${node.id} - ${node.title}`);
    
    res.status(201).json({
      success: true,
      data: node,
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/mind-map/:id - Update mind map node
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, x_position, y_position, color, parent_id } = req.body;

    // Check if node exists
    const existingNode = await MindMapNode.findById(id);
    if (!existingNode) {
      return res.status(404).json({
        success: false,
        error: 'Mind map node not found',
      });
    }

    // Basic validation
    if (title && title.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Node title cannot be empty',
      });
    }

    // If parent_id is provided, check if parent node exists
    if (parent_id && parent_id !== existingNode.parent_id) {
      const parentNode = await MindMapNode.findById(parent_id);
      if (!parentNode) {
        return res.status(404).json({
          success: false,
          error: 'Parent node not found',
        });
      }

      // Prevent circular references
      if (parent_id === parseInt(id)) {
        return res.status(400).json({
          success: false,
          error: 'Node cannot be its own parent',
        });
      }
    }

    const nodeData = {
      title: title?.trim() || existingNode.title,
      description: description?.trim() || existingNode.description,
      x_position: x_position !== undefined ? x_position : existingNode.x_position,
      y_position: y_position !== undefined ? y_position : existingNode.y_position,
      color: color || existingNode.color,
      parent_id: parent_id !== undefined ? parent_id : existingNode.parent_id,
    };

    const node = await MindMapNode.update(id, nodeData);
    
    logger.info(`Mind map node updated: ${node.id} - ${node.title}`);
    
    res.json({
      success: true,
      data: node,
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/mind-map/:id/position - Update node position
router.put('/:id/position', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { x_position, y_position } = req.body;

    if (typeof x_position !== 'number' || typeof y_position !== 'number') {
      return res.status(400).json({
        success: false,
        error: 'Position coordinates must be numbers',
      });
    }

    // Check if node exists
    const existingNode = await MindMapNode.findById(id);
    if (!existingNode) {
      return res.status(404).json({
        success: false,
        error: 'Mind map node not found',
      });
    }

    const node = await MindMapNode.updatePosition(id, x_position, y_position);
    
    res.json({
      success: true,
      data: node,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/mind-map/:id - Delete mind map node
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if node exists
    const existingNode = await MindMapNode.findById(id);
    if (!existingNode) {
      return res.status(404).json({
        success: false,
        error: 'Mind map node not found',
      });
    }

    const node = await MindMapNode.delete(id);
    
    logger.info(`Mind map node deleted: ${node.id} - ${node.title}`);
    
    res.json({
      success: true,
      data: node,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/mind-map/:id/convert-to-task - Convert mind map node to task
router.post('/:id/convert-to-task', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status = 'todo', position = 0 } = req.body;

    // Check if node exists
    const existingNode = await MindMapNode.findById(id);
    if (!existingNode) {
      return res.status(404).json({
        success: false,
        error: 'Mind map node not found',
      });
    }

    const taskData = {
      status,
      position,
    };

    const task = await MindMapNode.convertToTask(id, taskData);
    
    logger.info(`Mind map node converted to task: ${existingNode.id} -> ${task.id}`);
    
    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/mind-map/projects/:id/hierarchy - Get project mind map nodes with hierarchy
router.get('/projects/:id/hierarchy', async (req, res, next) => {
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

    const result = await MindMapNode.getProjectNodesWithHierarchy(id);
    
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/mind-map/nodes/:id/children - Get child nodes of a specific node
router.get('/nodes/:id/children', async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if parent node exists
    const parentNode = await MindMapNode.findById(id);
    if (!parentNode) {
      return res.status(404).json({
        success: false,
        error: 'Parent node not found',
      });
    }

    const children = await MindMapNode.findByParent(id);
    
    res.json({
      success: true,
      data: children,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;