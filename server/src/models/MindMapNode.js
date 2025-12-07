const { query, transaction } = require('../config/database');

class MindMapNode {
  static async findAll() {
    const result = await query('SELECT * FROM mind_map_nodes ORDER BY created_at DESC');
    return result.rows;
  }

  static async findById(id) {
    const result = await query('SELECT * FROM mind_map_nodes WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async findByProject(projectId) {
    const result = await query(
      'SELECT * FROM mind_map_nodes WHERE project_id = $1 ORDER BY created_at',
      [projectId]
    );
    return result.rows;
  }

  static async findByParent(parentId) {
    const result = await query(
      'SELECT * FROM mind_map_nodes WHERE parent_id = $1 ORDER BY created_at',
      [parentId]
    );
    return result.rows;
  }

  static async create(nodeData) {
    const { 
      project_id, 
      parent_id = null, 
      title, 
      description, 
      x_position = 0, 
      y_position = 0, 
      color = '#4A5568' 
    } = nodeData;
    
    const result = await query(
      'INSERT INTO mind_map_nodes (project_id, parent_id, title, description, x_position, y_position, color) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [project_id, parent_id, title, description, x_position, y_position, color]
    );
    return result.rows[0];
  }

  static async update(id, nodeData) {
    const { title, description, x_position, y_position, color, parent_id } = nodeData;
    const result = await query(
      'UPDATE mind_map_nodes SET title = $1, description = $2, x_position = $3, y_position = $4, color = $5, parent_id = $6 WHERE id = $7 RETURNING *',
      [title, description, x_position, y_position, color, parent_id, id]
    );
    return result.rows[0];
  }

  static async updatePosition(id, x_position, y_position) {
    const result = await query(
      'UPDATE mind_map_nodes SET x_position = $1, y_position = $2 WHERE id = $3 RETURNING *',
      [x_position, y_position, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    // First, delete all child nodes
    await query('DELETE FROM mind_map_nodes WHERE parent_id = $1', [id]);
    
    // Then delete the node itself
    const result = await query('DELETE FROM mind_map_nodes WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  static async convertToTask(nodeId, taskData) {
    return await transaction(async (client) => {
      // Get the node data
      const nodeResult = await client.query(
        'SELECT * FROM mind_map_nodes WHERE id = $1',
        [nodeId]
      );
      
      if (!nodeResult.rows[0]) {
        throw new Error('Mind map node not found');
      }
      
      const node = nodeResult.rows[0];
      
      // Create a task from the node
      const taskResult = await client.query(
        'INSERT INTO tasks (project_id, title, description, status, position) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [node.project_id, node.title, node.description, 'todo', 0]
      );
      
      // Delete the mind map node
      await client.query('DELETE FROM mind_map_nodes WHERE id = $1', [nodeId]);
      
      return taskResult.rows[0];
    });
  }

  static async getHierarchy(projectId) {
    const result = await query(
      'SELECT * FROM mind_map_nodes WHERE project_id = $1 ORDER BY created_at',
      [projectId]
    );
    
    // Build hierarchy tree
    const nodes = result.rows;
    const nodeMap = {};
    const rootNodes = [];
    
    // Create node map
    nodes.forEach(node => {
      nodeMap[node.id] = { ...node, children: [] };
    });
    
    // Build tree structure
    nodes.forEach(node => {
      if (node.parent_id && nodeMap[node.parent_id]) {
        nodeMap[node.parent_id].children.push(nodeMap[node.id]);
      } else {
        rootNodes.push(nodeMap[node.id]);
      }
    });
    
    return rootNodes;
  }

  static async getProjectNodesWithHierarchy(projectId) {
    const result = await query(
      'SELECT * FROM mind_map_nodes WHERE project_id = $1 ORDER BY created_at',
      [projectId]
    );
    
    // Return both flat list and hierarchy
    const nodes = result.rows;
    const hierarchy = await this.getHierarchy(projectId);
    
    return {
      nodes,
      hierarchy
    };
  }
}

module.exports = MindMapNode;