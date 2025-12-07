-- Create mind map nodes table
CREATE TABLE IF NOT EXISTS mind_map_nodes (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    parent_id INTEGER REFERENCES mind_map_nodes(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    x_position FLOAT DEFAULT 0,
    y_position FLOAT DEFAULT 0,
    color VARCHAR(7) DEFAULT '#4A5568',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_mind_map_nodes_project_id ON mind_map_nodes(project_id);
CREATE INDEX IF NOT EXISTS idx_mind_map_nodes_parent_id ON mind_map_nodes(parent_id);
CREATE INDEX IF NOT EXISTS idx_mind_map_nodes_position ON mind_map_nodes(x_position, y_position);
CREATE INDEX IF NOT EXISTS idx_mind_map_nodes_created_at ON mind_map_nodes(created_at);

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_mind_map_nodes_updated_at 
    BEFORE UPDATE ON mind_map_nodes 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();