import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';
import Header from './Header';
import ChatView from '../views/ChatView/ChatView';
import KanbanView from '../views/KanbanView/KanbanView';
import MindMapView from '../views/MindMapView/MindMapView';

const MainContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme === 'dark' ? '#0F0F0F' : '#F8F9FB'};
  overflow: hidden;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: background-color 0.3s ease;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ViewContainer = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${props => props.theme === 'dark' ? '#B0B0B0' : '#5F6368'};
  text-align: center;
  padding: 48px;
  transition: color 0.3s ease;
`;

const LogoContainer = styled.div`
  width: 120px;
  height: 120px;
  background-color: #4A90E2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  box-shadow: 0 8px 24px rgba(74, 144, 226, 0.3);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(45deg, #4A90E2, #357ABD);
    opacity: 0.8;
    animation: pulse 2s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.6;
    }
  }
`;

const LogoIcon = styled.div`
  font-size: 3rem;
  color: white;
  z-index: 1;
`;

const EmptyStateTitle = styled.h2`
  font-size: 24px;
  color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#1D1D1D'};
  margin-bottom: 16px;
  font-weight: 600;
  transition: color 0.3s ease;
`;

const EmptyStateText = styled.p`
  font-size: 16px;
  max-width: 400px;
  line-height: 1.6;
  margin-bottom: 32px;
  color: ${props => props.theme === 'dark' ? '#B0B0B0' : '#5F6368'};
  transition: color 0.3s ease;
`;

const ChatInputBar = styled.div`
  position: absolute;
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  max-width: 600px;
  background-color: ${props => props.theme === 'dark' ? '#1A1A1A' : '#FFFFFF'};
  border: 1px solid ${props => props.theme === 'dark' ? '#2A2A2A' : '#E8EAED'};
  border-radius: 24px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, border-color 0.3s ease;
`;

const ChatInput = styled.input`
  flex: 1;
  background: none;
  border: none;
  color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#1D1D1D'};
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  &::placeholder {
    color: ${props => props.theme === 'dark' ? '#808080' : '#9CA3AF'};
  }
  
  &:focus {
    outline: none;
  }
  transition: color 0.3s ease;
`;

const SendButton = styled.button`
  background-color: #4A90E2;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #357ABD;
  }
`;

const MainContent = () => {
  const { state } = useAppContext();
  const { currentProject, currentView, theme } = state;

  const renderCurrentView = () => {
    if (!currentProject) {
      return (
        <EmptyState theme={theme}>
          <LogoContainer>
            <LogoIcon>🚀</LogoIcon>
          </LogoContainer>
          <EmptyStateTitle theme={theme}>No Project Selected</EmptyStateTitle>
          <EmptyStateText theme={theme}>
            Select a project from the sidebar or create a new one to get started with managing your tasks, ideas, and mind maps.
          </EmptyStateText>
          <ChatInputBar theme={theme}>
            <ChatInput theme={theme} placeholder="Start a conversation..." />
            <SendButton>Send</SendButton>
          </ChatInputBar>
        </EmptyState>
      );
    }

    switch (currentView) {
      case 'chat':
        return <ChatView projectId={currentProject.id} systemPrompt={currentProject.system_prompt} />;
      case 'tasks':
        return <KanbanView projectId={currentProject.id} />;
      case 'mindmap':
        return <MindMapView projectId={currentProject.id} />;
      default:
        return <ChatView projectId={currentProject.id} systemPrompt={currentProject.system_prompt} />;
    }
  };

  return (
    <MainContentContainer theme={theme}>
      <ContentArea>
        {currentProject && <Header />}
        <ViewContainer>
          {renderCurrentView()}
        </ViewContainer>
      </ContentArea>
    </MainContentContainer>
  );
};

export default MainContent;