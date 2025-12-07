import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  currentProject: {
    id: 1,
    name: 'Inbox',
    description: '',
    taskCount: 0,
    assignee: null,
    assigneeColor: null
  },
  projects: [],
  tasks: [],
  mindMapNodes: [],
  currentView: 'kanban',
  theme: 'light', // Add theme to initial state
  ui: {
    sidebarOpen: true,
    modals: {
      project: false,
      task: false,
    },
  },
};

// Action types
export const APP_ACTIONS = {
  SET_CURRENT_PROJECT: 'SET_CURRENT_PROJECT',
  SET_PROJECTS: 'SET_PROJECTS',
  ADD_PROJECT: 'ADD_PROJECT',
  UPDATE_PROJECT: 'UPDATE_PROJECT',
  DELETE_PROJECT: 'DELETE_PROJECT',
  
  SET_TASKS: 'SET_TASKS',
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  
  SET_MIND_MAP_NODES: 'SET_MIND_MAP_NODES',
  ADD_MIND_MAP_NODE: 'ADD_MIND_MAP_NODE',
  UPDATE_MIND_MAP_NODE: 'UPDATE_MIND_MAP_NODE',
  DELETE_MIND_MAP_NODE: 'DELETE_MIND_MAP_NODE',
  
  SET_CURRENT_VIEW: 'SET_CURRENT_VIEW',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  TOGGLE_THEME: 'TOGGLE_THEME', // Add theme toggle action
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case APP_ACTIONS.SET_CURRENT_PROJECT:
      return {
        ...state,
        currentProject: action.payload,
      };
      
    case APP_ACTIONS.SET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
      
    case APP_ACTIONS.ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
      
    case APP_ACTIONS.UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.id ? action.payload : project
        ),
        currentProject: state.currentProject?.id === action.payload.id 
          ? action.payload 
          : state.currentProject,
      };
      
    case APP_ACTIONS.DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(project => project.id !== action.payload),
        currentProject: state.currentProject?.id === action.payload ? null : state.currentProject,
      };
      
    case APP_ACTIONS.SET_CURRENT_VIEW:
      return {
        ...state,
        currentView: action.payload,
      };
    
      
    case APP_ACTIONS.TOGGLE_SIDEBAR:
      return {
        ...state,
        ui: {
          ...state.ui,
          sidebarOpen: !state.ui.sidebarOpen,
        },
      };
      
    case APP_ACTIONS.TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
      
    case APP_ACTIONS.OPEN_MODAL:
      return {
        ...state,
        ui: {
          ...state.ui,
          modals: {
            ...state.ui.modals,
            [action.payload]: true,
          },
        },
      };
      
    case APP_ACTIONS.CLOSE_MODAL:
      return {
        ...state,
        ui: {
          ...state.ui,
          modals: {
            ...state.ui.modals,
            [action.payload]: false,
          },
        },
      };
      
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppContext;