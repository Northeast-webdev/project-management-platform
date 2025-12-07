# Technical Context

## Technology Stack

### Frontend
- **React**: 18.2.0
- **React Router**: 6.11.1 (for navigation)
- **Styled Components**: 5.3.10 (CSS-in-JS styling)
- **Axios**: 1.4.0 (HTTP client)
- **react-beautiful-dnd**: 13.1.1 (drag and drop)
- **react-hook-form**: 7.44.3 (form management - available but not used in TaskModal)
- **react-hot-toast**: 2.4.1 (notifications - available but not used)
- **react-icons**: 4.8.0 (icons)

### Backend
- **Node.js**: >=16.0.0
- **Express**: 4.18.2 (web framework)
- **SQLite3**: 5.1.6 (default database)
- **MySQL2**: 3.15.3 (optional database)
- **Winston**: 3.18.3 (logging)
- **Helmet**: 7.0.0 (security)
- **CORS**: 2.8.5 (cross-origin requests)
- **dotenv**: 16.3.1 (environment variables)

### Development Tools
- **concurrently**: 7.6.0 (run client and server together)
- **nodemon**: 3.0.1 (auto-restart server)
- **react-scripts**: 5.0.1 (Create React App)

## Development Setup

### Project Structure
```
project-management-platform/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # State management
│   │   ├── services/    # API services
│   │   └── styles/      # Global styles and themes
│   └── package.json
├── server/              # Express backend
│   ├── src/
│   │   ├── config/      # Database configuration
│   │   ├── models/      # Data models
│   │   ├── routes/      # API routes
│   │   ├── middleware/  # Express middleware
│   │   └── utils/       # Utility functions
│   └── package.json
└── package.json         # Root package.json
```

### Scripts
- `npm run dev`: Run both client and server concurrently
- `npm run dev:client`: Run React dev server (port 3000)
- `npm run dev:server`: Run Express server (port 3001)
- `npm run build`: Build both client and server
- `npm run install:all`: Install dependencies for all packages

### Environment Variables
- `DB_TYPE`: Database type ('sqlite' or 'mysql') - defaults to 'sqlite'
- `DB_PATH`: SQLite database file path
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`: MySQL configuration
- `PORT`: Server port (default: 3001)
- `CORS_ORIGIN`: Allowed CORS origin (default: http://localhost:3000)
- `NODE_ENV`: Environment (development/production)

## Database Configuration

### SQLite (Default)
- File-based database: `./project_management.db`
- Tables created automatically on first connection
- No additional setup required

### MySQL (Optional)
- Requires MySQL server running
- Configure via environment variables
- Tables created automatically on first connection

### Database Abstraction Layer
The `database.js` module provides a unified interface:
- `query(sql, params)`: Universal query function
- Automatically handles SQLite vs MySQL differences
- Supports both parameterized queries

## API Configuration

### Base URL
- Development: `http://localhost:3001/api`
- Configurable via `REACT_APP_API_URL` environment variable

### API Client
- Axios instance with interceptors
- Automatic token handling (if implemented)
- Error handling and response transformation

## Styling Approach

### Theme System
- Centralized theme in `styles/theme.js`
- Dark theme as default
- Theme passed via Context to all components
- Components use theme props for dynamic styling

### Styled Components
- All components use styled-components
- Consistent spacing, colors, and typography
- Responsive design considerations

## Current Technical Gaps

### Frontend-Backend Integration
- **Missing**: Task service layer connecting React to API
- **Missing**: API calls in KanbanView for fetching/updating tasks
- **Missing**: API calls in TaskModal for creating/updating tasks

### Database Schema Mismatch
- **Frontend TaskModal** has fields: title, description, priority, tags, assignee, dueDate
- **Backend Task Model** has fields: title, description, status, position
- **Gap**: Priority, tags, assignee, dueDate not in database schema

### State Management
- Tasks stored in local component state (KanbanView)
- Not synchronized with backend
- Not persisted across page refreshes

## Development Constraints
- Windows environment (PowerShell)
- SQLite database file in server directory
- No authentication system yet
- Single-user application (no multi-tenancy)

