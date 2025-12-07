const mysql = require('mysql2/promise');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

let dbConnection = null;

// Database configuration
const dbConfig = {
  mysql: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'project_management',
  },
  sqlite: {
    filename: process.env.DB_PATH || './project_management.db',
  }
};

// Initialize database connection
const connectDatabase = async () => {
  const dbType = process.env.DB_TYPE || 'sqlite';
  
  try {
    if (dbType === 'mysql') {
      // MySQL connection for XAMPP
      dbConnection = await mysql.createConnection({
        host: dbConfig.mysql.host,
        port: dbConfig.mysql.port,
        user: dbConfig.mysql.user,
        password: dbConfig.mysql.password,
        database: dbConfig.mysql.database,
      });
      
      console.log('✅ Connected to MySQL database (XAMPP)');
      
      // Create tables if they don't exist
      await createMySQLTables();
      
    } else {
      // SQLite connection (default)
      dbConnection = await open({
        filename: dbConfig.sqlite.filename,
        driver: sqlite3.Database
      });
      
      console.log('✅ Connected to SQLite database');
      
      // Create tables if they don't exist
      await createSQLiteTables();
    }
    
    return dbConnection;
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('💡 Please check your database configuration');
    throw error;
  }
};

// Create MySQL tables
const createMySQLTables = async () => {
  try {
    // Create projects table
    await dbConnection.execute(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        system_prompt TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create tasks table
    await dbConnection.execute(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        project_id INT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'todo',
        position INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
      )
    `);

    // Create mind_map_nodes table
    await dbConnection.execute(`
      CREATE TABLE IF NOT EXISTS mind_map_nodes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        project_id INT,
        parent_id INT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        x_position FLOAT,
        y_position FLOAT,
        color VARCHAR(7) DEFAULT '#4A5568',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
        FOREIGN KEY (parent_id) REFERENCES mind_map_nodes(id) ON DELETE CASCADE
      )
    `);

    console.log('✅ MySQL tables created/verified');
    
  } catch (error) {
    console.error('❌ Error creating MySQL tables:', error.message);
    throw error;
  }
};

// Create SQLite tables
const createSQLiteTables = async () => {
  try {
    // Create projects table
    await dbConnection.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        system_prompt TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create tasks table
    await dbConnection.exec(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'todo',
        position INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
      )
    `);

    // Create mind_map_nodes table
    await dbConnection.exec(`
      CREATE TABLE IF NOT EXISTS mind_map_nodes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER,
        parent_id INTEGER,
        title TEXT NOT NULL,
        description TEXT,
        x_position REAL,
        y_position REAL,
        color TEXT DEFAULT '#4A5568',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
        FOREIGN KEY (parent_id) REFERENCES mind_map_nodes(id) ON DELETE CASCADE
      )
    `);

    console.log('✅ SQLite tables created/verified');
    
  } catch (error) {
    console.error('❌ Error creating SQLite tables:', error.message);
    throw error;
  }
};

// Get database connection
const getDatabase = () => {
  if (!dbConnection) {
    throw new Error('Database not connected. Call connectDatabase() first.');
  }
  return dbConnection;
};

// Close database connection
const closeDatabase = async () => {
  if (dbConnection) {
    if (process.env.DB_TYPE === 'mysql') {
      await dbConnection.end();
    } else {
      await dbConnection.close();
    }
    dbConnection = null;
    console.log('✅ Database connection closed');
  }
};

// Query helper for MySQL
const mysqlQuery = async (sql, params = []) => {
  const db = getDatabase();
  try {
    const [rows] = await db.execute(sql, params);
    return rows;
  } catch (error) {
    console.error('❌ MySQL query error:', error.message);
    throw error;
  }
};

// Query helper for SQLite
const sqliteQuery = async (sql, params = []) => {
  const db = getDatabase();
  try {
    if (sql.trim().toLowerCase().startsWith('select')) {
      return await db.all(sql, params);
    } else {
      const result = await db.run(sql, params);
      return { 
        insertId: result.lastID, 
        affectedRows: result.changes,
        rows: [] 
      };
    }
  } catch (error) {
    console.error('❌ SQLite query error:', error.message);
    throw error;
  }
};

// Universal query function
const query = async (sql, params = []) => {
  const dbType = process.env.DB_TYPE || 'sqlite';
  
  if (dbType === 'mysql') {
    return await mysqlQuery(sql, params);
  } else {
    return await sqliteQuery(sql, params);
  }
};

module.exports = {
  connectDatabase,
  getDatabase,
  closeDatabase,
  query,
  mysqlQuery,
  sqliteQuery,
};