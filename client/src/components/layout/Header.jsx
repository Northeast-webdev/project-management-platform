import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { APP_ACTIONS } from '../../context/AppContext';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  background-color: transparent;
  transition: all 0.3s ease;
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme === 'dark' ? '#2A2A2A' : '#F1F3F4'};
  border-radius: 24px;
  padding: 4px;
  position: relative;
`;

const SwitchOption = styled.button`
  background: none;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme === 'dark' ? '#B0B0B0' : '#5F6368'};
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
  position: relative;
  
  &:hover {
    color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#1D1D1D'};
  }
  
  ${props => props.isActive && `
    color: ${props.theme === 'dark' ? '#FFFFFF' : '#1D1D1D'};
  `}
`;

const SwitchIndicator = styled.div`
  position: absolute;
  top: 4px;
  left: ${props => props.position === 'left' ? '4px' : 'auto'};
  right: ${props => props.position === 'right' ? '4px' : 'auto'};
  width: calc(50% - 4px);
  height: calc(100% - 8px);
  background-color: ${props => props.theme === 'dark' ? '#4A90E2' : '#4A90E2'};
  border-radius: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.3);
`;

const Header = () => {
  const { state, dispatch } = useAppContext();
  const { currentView, theme } = state;

  const handleViewChange = (viewId) => {
    dispatch({ type: APP_ACTIONS.SET_CURRENT_VIEW, payload: viewId });
  };

  return (
    <HeaderContainer theme={theme}>
      <SwitchContainer theme={theme}>
        <SwitchIndicator
          theme={theme}
          position={currentView === 'chat' ? 'left' : 'right'}
        />
        <SwitchOption
          isActive={currentView === 'chat'}
          onClick={() => handleViewChange('chat')}
          theme={theme}
        >
          Chat
        </SwitchOption>
        <SwitchOption
          isActive={currentView === 'tasks'}
          onClick={() => handleViewChange('tasks')}
          theme={theme}
        >
          Tasks
        </SwitchOption>
      </SwitchContainer>
    </HeaderContainer>
  );
};

export default Header;