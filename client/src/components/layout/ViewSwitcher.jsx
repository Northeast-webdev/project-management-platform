import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import { APP_ACTIONS } from '../../context/AppContext';

const SwitcherContainer = styled.div`
  display: flex;
  background-color: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding: 0 ${props => props.theme.spacing.lg};
  justify-content: center;
`;

const TabButton = styled.button`
  background: none;
  border: none;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  border-bottom: 2px solid transparent;
  margin: 0 ${props => props.theme.spacing.md};
  position: relative;

  &:hover {
    color: ${props => props.theme.colors.textPrimary};
    background-color: ${props => props.theme.colors.surfaceHover};
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.accent};
    outline-offset: -2px;
  }

  ${props => props.isActive && `
    color: ${props.theme.colors.accent};
    border-bottom-color: ${props.theme.colors.accent};
    
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: ${props.theme.colors.accent};
    }
  `}
`;

const TabIcon = styled.span`
  margin-right: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.typography.fontSize.lg};
`;

const ViewSwitcher = () => {
  const { state, dispatch } = useAppContext();
  const { currentView } = state;

  const views = [
    { id: 'chat', label: 'Chat', icon: '💬' },
    { id: 'tasks', label: 'Tasks', icon: '📋' },
  ];

  const handleViewChange = (viewId) => {
    dispatch({ type: APP_ACTIONS.SET_CURRENT_VIEW, payload: viewId });
  };

  return (
    <SwitcherContainer>
      {views.map((view) => (
        <TabButton
          key={view.id}
          isActive={currentView === view.id}
          onClick={() => handleViewChange(view.id)}
          title={`Switch to ${view.label} view`}
        >
          <TabIcon>{view.icon}</TabIcon>
          {view.label}
        </TabButton>
      ))}
    </SwitcherContainer>
  );
};

export default ViewSwitcher;