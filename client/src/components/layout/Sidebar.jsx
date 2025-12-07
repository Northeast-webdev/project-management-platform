import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { APP_ACTIONS } from '../../context/AppContext';
import Button from '../common/Button/Button';

const SidebarContainer = styled.div`
  width: ${props => props.isOpen ? '280px' : '0'};
  background-color: ${props => props.theme === 'dark' ? '#1A1A1A' : '#FFFFFF'};
  border-right: 1px solid ${props => props.theme === 'dark' ? '#2A2A2A' : '#E8EAED'};
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const SidebarHeader = styled.div`
  padding: 24px 20px;
  border-bottom: 1px solid ${props => props.theme === 'dark' ? '#2A2A2A' : '#E8EAED'};
  background-color: ${props => props.theme === 'dark' ? '#1A1A1A' : '#FFFFFF'};
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

const SidebarTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#1D1D1D'};
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s ease;
`;

const SidebarSubtitle = styled.p`
  font-size: 14px;
  color: ${props => props.theme === 'dark' ? '#B0B0B0' : '#5F6368'};
  margin: 0;
  transition: color 0.3s ease;
`;

const ProjectsSection = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 16px;
`;


const SectionTitle = styled.h2`
  font-size: 12px;
  font-weight: 600;
  color: #5F6368;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 16px 0;
  padding: 0 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AddProjectIcon = styled.button`
  background-color: transparent;
  border: none;
  color: #5F6368;
  cursor: pointer;
  padding: 2px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#2A2A2A' : '#E8EAED'};
    color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#1D1D1D'};
  }
`;

const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const EmptyProjects = styled.div`
  text-align: center;
  padding: 32px 16px;
  color: #9CA3AF;
`;

const EmptyIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 16px;
  opacity: 0.5;
`;

const EmptyText = styled.p`
  font-size: 14px;
  margin-bottom: 16px;
`;

const ThemeToggle = styled.button`
  background-color: transparent;
  border: 1px solid ${props => props.theme === 'dark' ? '#2A2A2A' : '#E8EAED'};
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  
  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#252525' : '#F8F9FB'};
    border-color: ${props => props.theme === 'dark' ? '#404040' : '#D1D5DB'};
  }
`;


const ProjectListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: ${props => {
    if (props.isActive) {
      return props.theme === 'dark' ? '#1E3A8A' : '#EBF5FF';
    }
    return 'transparent';
  }};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 4px;

  &:hover {
    background-color: ${props => {
      if (props.isActive) {
        return props.theme === 'dark' ? '#1E3A8A' : '#EBF5FF';
      }
      return props.theme === 'dark' ? '#252525' : '#F8F9FB';
    }};
  }
`;

const ProjectDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.color || '#4A90E2'};
  margin-right: 12px;
  flex-shrink: 0;
`;

const ProjectContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ProjectName = styled.span`
  color: ${props => {
    if (props.isActive) {
      return props.theme === 'dark' ? '#FFFFFF' : '#1D1D1D';
    }
    return props.theme === 'dark' ? '#B0B0B0' : '#5F6368';
  }};
  font-size: 14px;
  font-weight: ${props => props.isActive ? '600' : '500'};
  transition: color 0.3s ease;
`;


const ProjectMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
`;

const TaskCount = styled.span`
  background-color: ${props => props.theme === 'dark' ? '#2A2A2A' : '#E8EAED'};
  color: ${props => props.theme === 'dark' ? '#B0B0B0' : '#5F6368'};
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 500;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const ProjectAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.avatarColor || '#4A90E2'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
`;

const NewProjectButton = styled(Button)`
  background-color: transparent;
  color: #4A90E2;
  border: 1px solid #4A90E2;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    background-color: #EBF5FF;
    border-color: #357ABD;
  }
`;

const Sidebar = ({ isOpen }) => {
  const { state, dispatch } = useAppContext();
  const { projects, currentProject, theme } = state;

  const handleProjectSelect = (project) => {
    dispatch({ type: APP_ACTIONS.SET_CURRENT_PROJECT, payload: project });
  };

  const handleCreateProject = () => {
    dispatch({ type: APP_ACTIONS.OPEN_MODAL, payload: 'project' });
  };


  const handleToggleTheme = () => {
    dispatch({ type: APP_ACTIONS.TOGGLE_THEME });
  };

  // Generate random colors for project dots
  const getProjectColor = (index) => {
    const colors = ['#4A90E2', '#00C896', '#FF6B35', '#FF4444', '#8B5CF6', '#F59E0B'];
    return colors[index % colors.length];
  };

  // Default Inbox project
  const mockProjects = [
    {
      id: 1,
      name: 'Inbox',
      description: '',
      taskCount: 0,
      assignee: null,
      assigneeColor: null
    }
  ];

  const displayProjects = projects.length > 0 ? projects : mockProjects;

  if (!isOpen) {
    return null;
  }

  return (
    <SidebarContainer isOpen={isOpen} theme={theme}>
      <SidebarHeader theme={theme}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div>
            <SidebarTitle>
              <span>🚀</span>
              Project Hub
            </SidebarTitle>
            <SidebarSubtitle>Manage your projects and ideas</SidebarSubtitle>
          </div>
          <ThemeToggle onClick={handleToggleTheme} theme={theme} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? '🌙' : '☀️'}
          </ThemeToggle>
        </div>
      </SidebarHeader>

      <ProjectsSection>
        <SectionTitle theme={theme}>
          Projects
          <AddProjectIcon onClick={handleCreateProject} theme={theme} title="Create new project">
            +
          </AddProjectIcon>
        </SectionTitle>
        
        <ProjectsList>
          {displayProjects.length === 0 ? (
            <EmptyProjects>
              <EmptyIcon>📁</EmptyIcon>
              <EmptyText>No projects yet</EmptyText>
              <NewProjectButton onClick={handleCreateProject}>
                + Create Project
              </NewProjectButton>
            </EmptyProjects>
          ) : (
            displayProjects.map((project, index) => (
              <ProjectListItem
                key={project.id}
                isActive={currentProject?.id === project.id}
                onClick={() => handleProjectSelect(project)}
              >
                <ProjectDot color={getProjectColor(index)} />
                <ProjectContent>
                  <ProjectName isActive={currentProject?.id === project.id}>
                    {project.name}
                  </ProjectName>
                </ProjectContent>
                <ProjectMeta>
                  {project.taskCount && (
                    <TaskCount>{project.taskCount}</TaskCount>
                  )}
                  {project.assignee && (
                    <ProjectAvatar avatarColor={project.assigneeColor}>
                      {project.assignee}
                    </ProjectAvatar>
                  )}
                </ProjectMeta>
              </ProjectListItem>
            ))
          )}
        </ProjectsList>

      </ProjectsSection>


    </SidebarContainer>
  );
};

export default Sidebar;