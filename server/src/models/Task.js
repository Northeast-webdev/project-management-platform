const { query, transaction } = require('../config/database');

class Task {
  static async findAll() {
    const result = await query('SELECT * FROM tasks ORDER BY created_at DESC');
    return result.rows;
  }

  static async findById(id) {
    const result = await query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async findByProject(projectId) {
    const result = await query(
      'SELECT * FROM tasks WHERE project_id = $1 ORDER BY position, created_at',
      [projectId]
    );
    return result.rows;
  }

  static async findByStatus(status) {
    const result = await query(
      'SELECT * FROM tasks WHERE status = $1 ORDER BY position, created_at',
      [status]
    );
    return result.rows;
  }

  static async create(taskData) {
    const { project_id, title, description, status = 'todo', position = 0 } = taskData;
    const result = await query(
      'INSERT INTO tasks (project_id, title, description, status, position) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [project_id, title, description, status, position]
    );
    return result.rows[0];
  }

  static async update(id, taskData) {
    const { title, description, status, position } = taskData;
    const result = await query(
      'UPDATE tasks SET title = $1, description = $2, status = $3, position = $4 WHERE id = $5 RETURNING *',
      [title, description, status, position, id]
    );
    return result.rows[0];
  }

  static async updateStatus(id, status) {
    const result = await query(
      'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    return result.rows[0];
  }

  static async updatePosition(id, position) {
    const result = await query(
      'UPDATE tasks SET position = $1 WHERE id = $2 RETURNING *',
      [position, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }

  static async reorderTasks(projectId, tasks) {
    return await transaction(async (client) => {
      const updatedTasks = [];
      
      for (const task of tasks) {
        const result = await client.query(
          'UPDATE tasks SET status = $1, position = $2 WHERE id = $3 AND project_id = $4 RETURNING *',
          [task.status, task.position, task.id, projectId]
        );
        
        if (result.rows[0]) {
          updatedTasks.push(result.rows[0]);
        }
      }
      
      return updatedTasks;
    });
  }

  static async getTasksByStatus(projectId) {
    const result = await query(
      'SELECT * FROM tasks WHERE project_id = $1 ORDER BY status, position, created_at',
      [projectId]
    );
    
    // Group tasks by status
    const tasksByStatus = {
      'todo': [],
      'in-progress': [],
      'review': [],
      'done': []
    };
    
    result.rows.forEach(task => {
      if (tasksByStatus[task.status]) {
        tasksByStatus[task.status].push(task);
      }
    });
    
    return tasksByStatus;
  }
}

module.exports = Task;