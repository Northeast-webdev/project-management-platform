import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../../context/AppContext';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContainer = styled.div`
  background-color: ${props => props.theme === 'dark' ? '#1F2937' : '#FFFFFF'};
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid ${props => props.theme === 'dark' ? '#374151' : '#E5E7EB'};
`;

const ModalHeader = styled.div`
  padding: 24px 24px 16px;
  border-bottom: 1px solid ${props => props.theme === 'dark' ? '#374151' : '#E5E7EB'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#1F2937'};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: ${props => props.theme === 'dark' ? '#9CA3AF' : '#6B7280'};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#374151' : '#F3F4F6'};
    color: ${props => props.theme === 'dark' ? '#D1D5DB' : '#4B5563'};
  }
`;

const ModalBody = styled.div`
  padding: 24px;
  display: flex;
  gap: 24px;
`;

const LeftColumn = styled.div`
  flex: 8;
  display: flex;
  flex-direction: column;
`;

const RightColumn = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme === 'dark' ? '#D1D5DB' : '#374151'};
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${props => props.theme === 'dark' ? '#374151' : '#D1D5DB'};
  border-radius: 8px;
  background-color: ${props => props.theme === 'dark' ? '#111827' : '#FFFFFF'};
  color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#1F2937'};
  font-size: 14px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme === 'dark' ? '#6B7280' : '#9CA3AF'};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${props => props.theme === 'dark' ? '#374151' : '#D1D5DB'};
  border-radius: 8px;
  background-color: ${props => props.theme === 'dark' ? '#111827' : '#FFFFFF'};
  color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#1F2937'};
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme === 'dark' ? '#6B7280' : '#9CA3AF'};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${props => props.theme === 'dark' ? '#374151' : '#D1D5DB'};
  border-radius: 8px;
  background-color: ${props => props.theme === 'dark' ? '#111827' : '#FFFFFF'};
  color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#1F2937'};
  font-size: 14px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const TagInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
  border: 1px solid ${props => props.theme === 'dark' ? '#374151' : '#D1D5DB'};
  border-radius: 8px;
  background-color: ${props => props.theme === 'dark' ? '#111827' : '#FFFFFF'};
  min-height: 44px;
`;

const Tag = styled.span`
  background-color: ${props => props.theme === 'dark' ? '#374151' : '#F3F4F6'};
  color: ${props => props.theme === 'dark' ? '#D1D5DB' : '#6B7280'};
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TagRemove = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme === 'dark' ? '#9CA3AF' : '#6B7280'};
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  line-height: 1;

  &:hover {
    color: ${props => props.theme === 'dark' ? '#D1D5DB' : '#4B5563'};
  }
`;

const TagInputField = styled.input`
  border: none;
  outline: none;
  background: none;
  color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#1F2937'};
  font-size: 14px;
  flex: 1;
  min-width: 100px;

  &::placeholder {
    color: ${props => props.theme === 'dark' ? '#6B7280' : '#9CA3AF'};
  }
`;

const StatusSection = styled.div`
  background-color: ${props => props.theme === 'dark' ? '#374151' : '#F3F4F6'};
  border-radius: 8px;
  padding: 16px;
`;

const StatusTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#D1D5DB' : '#374151'};
  margin: 0 0 12px 0;
`;

const StatusItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 12px;
`;

const StatusLabel = styled.span`
  color: ${props => props.theme === 'dark' ? '#9CA3AF' : '#6B7280'};
`;

const StatusValue = styled.span`
  color: ${props => props.theme === 'dark' ? '#D1D5DB' : '#374151'};
  font-weight: 500;
`;

const ProgressSection = styled.div`
  background-color: ${props => props.theme === 'dark' ? '#374151' : '#F3F4F6'};
  border-radius: 8px;
  padding: 16px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${props => props.theme === 'dark' ? '#4B5563' : '#D1D5DB'};
  border-radius: 4px;
  overflow: hidden;
  margin-top: 8px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: #3B82F6;
  width: ${props => props.progress || '0%'};
  transition: width 0.3s ease;
`;

const ActionsSection = styled.div`
  background-color: ${props => props.theme === 'dark' ? '#374151' : '#F3F4F6'};
  border-radius: 8px;
  padding: 16px;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => props.theme === 'dark' ? '#4B5563' : '#FFFFFF'};
  color: ${props => props.theme === 'dark' ? '#D1D5DB' : '#374151'};
  border: 1px solid ${props => props.theme === 'dark' ? '#6B7280' : '#D1D5DB'};
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#6B7280' : '#F9FAFB'};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid ${props => props.theme === 'dark' ? '#374151' : '#E5E7EB'};
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  ${props => props.variant === 'primary' && `
    background-color: #3B82F6;
    color: white;

    &:hover {
      background-color: #2563EB;
    }
  `}

  ${props => props.variant === 'secondary' && `
    background-color: ${props.theme === 'dark' ? '#374151' : '#F3F4F6'};
    color: ${props.theme === 'dark' ? '#D1D5DB' : '#6B7280'};

    &:hover {
      background-color: ${props.theme === 'dark' ? '#4B5563' : '#E5E7EB'};
    }
  `}
`;

const TaskModal = ({ task, isOpen, onClose, onSave }) => {
  const { state } = useAppContext();
  const { theme } = state;
  
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'medium',
    tags: task?.tags || [],
    assignee: task?.assignee || '',
    dueDate: task?.dueDate || ''
  });

  const [newTag, setNewTag] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer theme={theme} onClick={e => e.stopPropagation()}>
        <ModalHeader theme={theme}>
          <ModalTitle theme={theme}>Task Details</ModalTitle>
          <CloseButton theme={theme} onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalBody theme={theme}>
          <LeftColumn>
            <FormGroup>
              <Label theme={theme}>Title</Label>
              <Input
                theme={theme}
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter task title"
              />
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>Description</Label>
              <Textarea
                theme={theme}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter task description"
              />
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>Priority</Label>
              <Select theme={theme} name="priority" value={formData.priority} onChange={handleInputChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label theme={theme}>Tags</Label>
              <TagInput theme={theme}>
                {formData.tags.map((tag, index) => (
                  <Tag key={index} theme={theme}>
                    {tag}
                    <TagRemove theme={theme} onClick={() => handleRemoveTag(tag)}>×</TagRemove>
                  </Tag>
                ))}
                <TagInputField
                  theme={theme}
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleAddTag}
                  placeholder="Add tag..."
                />
              </TagInput>
            </FormGroup>
          </LeftColumn>

          <RightColumn>
            <StatusSection theme={theme}>
              <StatusTitle theme={theme}>Status</StatusTitle>
              <StatusItem>
                <StatusLabel theme={theme}>Created</StatusLabel>
                <StatusValue theme={theme}>Today</StatusValue>
              </StatusItem>
              <StatusItem>
                <StatusLabel theme={theme}>Updated</StatusLabel>
                <StatusValue theme={theme}>2h ago</StatusValue>
              </StatusItem>
              <StatusItem>
                <StatusLabel theme={theme}>Assignee</StatusLabel>
                <StatusValue theme={theme}>{formData.assignee || 'Unassigned'}</StatusValue>
              </StatusItem>
            </StatusSection>

            <ProgressSection theme={theme}>
              <StatusTitle theme={theme}>Progress</StatusTitle>
              <StatusItem>
                <StatusLabel theme={theme}>Completion</StatusLabel>
                <StatusValue theme={theme}>75%</StatusValue>
              </StatusItem>
              <ProgressBar>
                <ProgressFill progress="75%" />
              </ProgressBar>
            </ProgressSection>

            <ActionsSection theme={theme}>
              <StatusTitle theme={theme}>Actions</StatusTitle>
              <ActionButton theme={theme}>Add Comment</ActionButton>
              <ActionButton theme={theme}>Add Attachment</ActionButton>
              <ActionButton theme={theme}>Duplicate Task</ActionButton>
              <ActionButton theme={theme}>Archive</ActionButton>
            </ActionsSection>
          </RightColumn>
        </ModalBody>

        <ModalFooter theme={theme}>
          <Button variant="secondary" theme={theme} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default TaskModal;