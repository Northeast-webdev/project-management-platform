# System Patterns

## Architecture Overview
The application follows a client-server architecture with clear separation between frontend and backend.

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   React     │  HTTP   │   Express   │  SQL    │  SQLite/    │
│  Frontend   │ ◄─────► │   Backend   │ ◄─────► │   MySQL     │
└─────────────┘         └─────────────┘         └─────────────┘
```

## Frontend Architecture

### Component Structure
```
src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── features/        # Feature-specific components
│   │   ├── TaskModal/   # Task creation/editing modal
│   │   └── ProjectCard/ # Project display card
│   ├── layout/          # Layout components (Header, Sidebar, etc.)
│   └── views/           # Main view components
│       └── KanbanView/  # Kanban board view
├── context/
│   └── AppContext.jsx   # Global state management
└── services/
    └── api.js           # API client configuration
```

### State Management Pattern
- **Global State**: React Context API with useReducer
- **Local State**: useState for component-specific state
- **State Structure**:
  - `currentProject`: Currently selected project
  - `projects`: List of all projects
  - `tasks`: List of tasks (not yet integrated)
  - `currentView`: Active view (kanban, chat, mindmap)
  - `theme`: UI theme (light/dark)
  - `ui`: UI state (modals, sidebar)

### Component Patterns
1. **Styled Components**: All styling uses styled-components
2. **Theme Props**: Components receive theme via props for dark/light mode
3. **Modal Pattern**: TaskModal uses overlay pattern with click-outside-to-close
4. **Drag & Drop**: react-beautiful-dnd for Kanban drag functionality

## Backend Architecture

### API Structure
```
/api
├── /projects           # Project CRUD operations
├── /tasks              # Task CRUD operations
└── /mind-map           # Mind map operations
```

### Model Pattern
- **Models**: Class-based models with static methods
- **Database Abstraction**: Universal query function supporting SQLite and MySQL
- **Error Handling**: Centralized error handler middleware

### Route Pattern
- RESTful endpoints
- Consistent response format: `{ success: boolean, data: any, error?: string }`
- Validation at route level
- Logger integration for operations

## Database Schema

### Tasks Table
```sql
CREATE TABLE tasks (
    id INTEGER PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id),
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'todo',
    position INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Status Values
- `todo`: Initial state
- `in-progress`: Work in progress
- `review`: Under review
- `done`: Completed

## Data Flow Patterns

### Task Creation Flow (Current - Not Fully Integrated)
1. User fills TaskModal form
2. Form data stored in local state
3. onSave callback updates local columns state
4. **TODO**: API call to persist to database

### Task Update Flow (Current - Not Fully Integrated)
1. User drags task to new column
2. onDragEnd updates local columns state
3. **TODO**: API call to update task status and position

### Current Gap
- Frontend uses hardcoded mock data
- Backend has full CRUD API ready
- **Missing**: Integration layer connecting frontend to backend

## Key Design Decisions
1. **Database Flexibility**: Support both SQLite and MySQL for different deployment scenarios
2. **Component-Based UI**: Modular components for maintainability
3. **Theme Support**: Built-in dark/light theme from start
4. **Drag & Drop**: react-beautiful-dnd for native-feeling interactions

