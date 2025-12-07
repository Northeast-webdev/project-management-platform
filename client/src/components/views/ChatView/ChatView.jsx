import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../../context/AppContext';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${props => props.theme === 'dark' ? '#0F0F0F' : '#F8F9FB'};
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Message = styled.div`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 16px;
  background-color: ${props => props.isUser
    ? '#4A90E2'
    : props.theme === 'dark' ? '#1A1A1A' : '#FFFFFF'
  };
  color: ${props => props.isUser
    ? 'white'
    : props.theme === 'dark' ? '#FFFFFF' : '#1D1D1D'
  };
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const MessageAuthor = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 4px;
  opacity: 0.8;
`;

const MessageContent = styled.div`
  line-height: 1.5;
  white-space: pre-wrap;
`;

const MessageTime = styled.div`
  font-size: 11px;
  margin-top: 4px;
  opacity: 0.6;
`;

const InputContainer = styled.div`
  padding: 20px 24px;
  border-top: 1px solid ${props => props.theme === 'dark' ? '#2A2A2A' : '#E8EAED'};
  display: flex;
  gap: 12px;
  background-color: ${props => props.theme === 'dark' ? '#0F0F0F' : '#F8F9FB'};
`;

const MessageInput = styled.textarea`
  flex: 1;
  background-color: ${props => props.theme === 'dark' ? '#1A1A1A' : '#FFFFFF'};
  border: 1px solid ${props => props.theme === 'dark' ? '#2A2A2A' : '#E8EAED'};
  border-radius: 24px;
  padding: 12px 20px;
  color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#1D1D1D'};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 14px;
  resize: none;
  min-height: 44px;
  max-height: 120px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4A90E2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme === 'dark' ? '#808080' : '#9CA3AF'};
  }
`;

const SendButton = styled.button`
  background-color: #4A90E2;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #357ABD;
  }
  
  &:disabled {
    background-color: #B0B0B0;
    cursor: not-allowed;
  }
`;

const WelcomeMessage = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  color: ${props => props.theme === 'dark' ? '#B0B0B0' : '#5F6368'};
  text-align: center;
`;

const WelcomeIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 24px;
  opacity: 0.6;
`;

const WelcomeTitle = styled.h2`
  font-size: 28px;
  color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#1D1D1D'};
  margin-bottom: 16px;
  font-weight: 600;
`;

const WelcomeText = styled.p`
  font-size: 16px;
  max-width: 500px;
  margin: 0 auto 32px;
  line-height: 1.6;
  color: ${props => props.theme === 'dark' ? '#B0B0B0' : '#5F6368'};
`;

const QuickStartButton = styled.button`
  background-color: #4A90E2;
  color: white;
  border: none;
  border-radius: 24px;
  padding: 12px 24px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #357ABD;
    transform: translateY(-1px);
  }
`;

const ChatView = ({ projectId, systemPrompt }) => {
  const { state } = useAppContext();
  const { theme } = state;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Auto-focus the input when component mounts
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      content: inputText,
      isUser: true,
      timestamp: new Date(),
      author: 'You'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response (replace with actual AI call later)
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        content: `I understand you want to: "${inputText}". As your project assistant, I'll help you organize this into actionable tasks. Would you like me to create some initial tasks based on this?`,
        isUser: false,
        timestamp: new Date(),
        author: 'AI Assistant'
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickStart = (message) => {
    setInputText(message);
    inputRef.current?.focus();
  };

  return (
    <ChatContainer theme={theme}>
      {messages.length === 0 ? (
        <WelcomeMessage theme={theme}>
          <WelcomeIcon>💬</WelcomeIcon>
          <WelcomeTitle theme={theme}>Project Chat</WelcomeTitle>
          <WelcomeText theme={theme}>
            Start a conversation with your AI project assistant. Discuss ideas, ask for task suggestions, or get help organizing your project.
          </WelcomeText>
          <QuickStartButton onClick={() => handleQuickStart("Help me organize this project")}>
            Start Conversation
          </QuickStartButton>
        </WelcomeMessage>
      ) : (
        <MessagesContainer theme={theme}>
          {messages.map(message => (
            <Message key={message.id} isUser={message.isUser} theme={theme}>
              <MessageAuthor>{message.author}</MessageAuthor>
              <MessageContent>{message.content}</MessageContent>
              <MessageTime>
                {message.timestamp.toLocaleTimeString()}
              </MessageTime>
            </Message>
          ))}
          
          {isTyping && (
            <Message isUser={false} theme={theme}>
              <MessageAuthor>AI Assistant</MessageAuthor>
              <MessageContent>Typing...</MessageContent>
            </Message>
          )}
          
          <div ref={messagesEndRef} />
        </MessagesContainer>
      )}

      <InputContainer theme={theme}>
        <MessageInput
          ref={inputRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
          theme={theme}
        />
        <SendButton
          onClick={handleSendMessage}
          disabled={!inputText.trim() || isTyping}
        >
          Send
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatView;