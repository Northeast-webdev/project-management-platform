import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { APP_ACTIONS } from '../../context/AppContext';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import ProjectModal from '../features/ProjectModal/ProjectModal';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${props => props.theme === 'dark' ? '#0F0F0F' : '#F8F9FB'};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: background-color 0.3s ease;
`;

const ToggleButton = styled.button`
  position: absolute;
  left: ${props => props.isOpen ? '280px' : '0'};
  top: 50%;
  transform: translateY(-50%);
  background-color: #FFFFFF;
  border: 1px solid #E8EAED;
  border-left: none;
  border-radius: 0 8px 8px 0;
  padding: 12px 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 20;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #F8F9FB;
    border-color: #D1D5DB;
  }

  &:focus-visible {
    outline: 2px solid #4A90E2;
    outline-offset: 2px;
  }
`;

const Layout = () => {
  const { state, dispatch } = useAppContext();
  const { ui, theme } = state;
  const { sidebarOpen } = ui;

  const handleToggleSidebar = () => {
    dispatch({ type: APP_ACTIONS.TOGGLE_SIDEBAR });
  };

  return (
    <LayoutContainer theme={theme}>
      <Sidebar isOpen={sidebarOpen} />
      
      <ToggleButton
        isOpen={sidebarOpen}
        onClick={handleToggleSidebar}
        title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {sidebarOpen ? '◀' : '▶'}
      </ToggleButton>
      
      <MainContent />
      
      <ProjectModal />
    </LayoutContainer>
  );
};

export default Layout;