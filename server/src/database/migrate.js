const fs = require('fs').promises;
const path = require('path');
const { query } = require('../config/database');
const logger = require('../utils/logger');

const runMigrations = async () => {
  try {
    logger.info('Starting database migrations...');
    
    // Create migrations table if it doesn't exist
    await query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Get executed migrations
    const executedResult = await query('SELECT filename FROM migrations ORDER BY filename');
    const executedMigrations = executedResult.rows.map(row => row.filename);
    
    // Get all migration files
    const migrationsDir = path.join(__dirname, 'migrations');
    const migrationFiles = await fs.readdir(migrationsDir);
    
    // Filter and sort migration files
    const pendingMigrations = migrationFiles
      .filter(file => file.endsWith('.sql'))
      .filter(file => !executedMigrations.includes(file))
      .sort();
    
    if (pendingMigrations.length === 0) {
      logger.info('No pending migrations to run');
      return;
    }
    
    logger.info(`Found ${pendingMigrations.length} pending migrations`);
    
    // Run each migration
    for (const file of pendingMigrations) {
      const filePath = path.join(migrationsDir, file);
      const migrationSQL = await fs.readFile(filePath, 'utf8');
      
      logger.info(`Running migration: ${file}`);
      
      await query('BEGIN');
      
      try {
        await query(migrationSQL);
        await query('INSERT INTO migrations (filename) VALUES ($1)', [file]);
        await query('COMMIT');
        
        logger.info(`Migration completed: ${file}`);
      } catch (error) {
        await query('ROLLBACK');
        logger.error(`Migration failed: ${file}`, error);
        throw error;
      }
    }
    
    logger.info('All migrations completed successfully');
    
  } catch (error) {
    logger.error('Migration failed:', error);
    process.exit(1);
  }
};

// Run migrations if this file is executed directly
if (require.main === module) {
  runMigrations()
    .then(() => {
      logger.info('Migration process completed');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('Migration process failed:', error);
      process.exit(1);
    });
}

module.exports = { runMigrations };