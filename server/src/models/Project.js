const { query, transaction } = require('../config/database');

class Project {
  static async findAll() {
    const result = await query('SELECT * FROM projects ORDER BY created_at DESC');
    return result.rows;
  }

  static async findById(id) {
    const result = await query('SELECT * FROM projects WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(projectData) {
    const { name, description, system_prompt } = projectData;
    const result = await query(
      'INSERT INTO projects (name, description, system_prompt) VALUES ($1, $2, $3) RETURNING *',
      [name, description, system_prompt]
    );
    return result.rows[0];
  }

  static async update(id, projectData) {
    const { name, description, system_prompt } = projectData;
    const result = await query(
      'UPDATE projects SET name = $1, description = $2, system_prompt = $3 WHERE id = $4 RETURNING *',
      [name, description, system_prompt, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  static async getTasks(projectId) {
    const result = await query(
      'SELECT * FROM tasks WHERE project_id = $1 ORDER BY position, created_at',
      [projectId]
    );
    return result.rows;
  }

  static async getMindMapNodes(projectId) {
    const result = await query(
      'SELECT * FROM mind_map_nodes WHERE project_id = $1 ORDER BY created_at',
      [projectId]
    );
    return result.rows;
  }

  static async getProjectWithDetails(projectId) {
    return await transaction(async (client) => {
      // Get project
      const projectResult = await client.query(
        'SELECT * FROM projects WHERE id = $1',
        [projectId]
      );
      
      if (!projectResult.rows[0]) {
        return null;
      }

      // Get tasks
      const tasksResult = await client.query(
        'SELECT * FROM tasks WHERE project_id = $1 ORDER BY position, created_at',
        [projectId]
      );

      // Get mind map nodes
      const nodesResult = await client.query(
        'SELECT * FROM mind_map_nodes WHERE project_id = $1 ORDER BY created_at',
        [projectId]
      );

      return {
        ...projectResult.rows[0],
        tasks: tasksResult.rows,
        mindMapNodes: nodesResult.rows,
      };
    });
  }
}

module.exports = Project;