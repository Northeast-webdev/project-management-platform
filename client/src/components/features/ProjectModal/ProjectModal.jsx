import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../../context/AppContext';
import { APP_ACTIONS } from '../../../context/AppContext';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${props => props.theme.zIndex.modal};
`;

const ModalContainer = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: ${props => props.theme.shadows.xl};
`;

const ModalHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ModalTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.textPrimary};
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

const Label = styled.label`
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.textPrimary};
`;

const TextArea = styled.textarea`
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.textPrimary};
  font-family: inherit;
  font-size: ${props => props.theme.typography.fontSize.md};
  resize: vertical;
  min-height: 120px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(0, 163, 255, 0.1);
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }
`;

const SystemPromptArea = styled(TextArea)`
  min-height: 200px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${props => props.theme.spacing.lg};
`;

const GenerateButton = styled(Button)`
  background-color: ${props => props.theme.colors.accent};
  color: white;
  
  &:hover {
    background-color: ${props => props.theme.colors.accentHover};
  }
`;

const SaveButton = styled(Button)`
  background-color: ${props => props.theme.colors.success};
  color: white;
  
  &:hover {
    background-color: #00A67A;
  }
`;

const DeleteButton = styled(Button)`
  background-color: ${props => props.theme.colors.error};
  color: white;
  
  &:hover {
    background-color: #E53E3E;
  }
`;

const ArchiveButton = styled(Button)`
  background-color: ${props => props.theme.colors.warning};
  color: white;
  
  &:hover {
    background-color: #DD6B20;
  }
`;

const ProjectModal = () => {
  const { state, dispatch } = useAppContext();
  const { ui, currentProject } = state;
  const [formData, setFormData] = useState({
    name: currentProject?.name || '',
    description: currentProject?.description || '',
    systemPrompt: currentProject?.system_prompt || `# GOAL
Create and manage projects efficiently with AI assistance.

# ROLE
You are an intelligent project management assistant that helps users organize their tasks, generate ideas, and provide insights for project success.

# CAPABILITIES
- Task generation and organization
- Idea brainstorming and expansion
- Project progress analysis
- Resource allocation suggestions
- Timeline optimization
- Risk assessment and mitigation`,
  });

  const isOpen = ui.modals.project;

  const handleClose = () => {
    dispatch({ type: APP_ACTIONS.CLOSE_MODAL, payload: 'project' });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerateSystemPrompt = () => {
    const generatedPrompt = `# GOAL
${formData.description || 'Create and manage projects efficiently with AI assistance.'}

# ROLE
You are an intelligent project management assistant that helps users organize their tasks, generate ideas, and provide insights for project success.

# CAPABILITIES
- Task generation and organization
- Idea brainstorming and expansion
- Project progress analysis
- Resource allocation suggestions
- Timeline optimization
- Risk assessment and mitigation

# PROJECT CONTEXT
Project Name: ${formData.name || 'Untitled Project'}
Description: ${formData.description || 'No description provided'}

# INSTRUCTIONS
Help the user achieve their project goals by providing intelligent suggestions, organizing tasks, and offering actionable insights.`;

    setFormData(prev => ({
      ...prev,
      systemPrompt: generatedPrompt
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: Save project data
    console.log('Saving project:', formData);
    handleClose();
  };

  const handleDelete = () => {
    // TODO: Delete project
    console.log('Deleting project');
    handleClose();
  };

  const handleArchive = () => {
    // TODO: Archive project
    console.log('Archiving project');
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Project Settings</ModalTitle>
        </ModalHeader>

        <Form onSubmit={handleSave}>
          <FieldGroup>
            <Label>Project Name</Label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter project name"
              required
            />
          </FieldGroup>

          <FieldGroup>
            <Label>Description</Label>
            <TextArea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your project..."
              rows={3}
            />
          </FieldGroup>

          <FieldGroup>
            <Label>System Prompt</Label>
            <SystemPromptArea
              value={formData.systemPrompt}
              onChange={(e) => handleInputChange('systemPrompt', e.target.value)}
              placeholder="Define AI behavior and capabilities..."
            />
          </FieldGroup>

          <ButtonGroup>
            <GenerateButton
              type="button"
              onClick={handleGenerateSystemPrompt}
            >
              Generate System Prompt
            </GenerateButton>
            
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
            
            <SaveButton type="submit">
              Save Changes
            </SaveButton>
            
            {currentProject && (
              <>
                <ArchiveButton
                  type="button"
                  onClick={handleArchive}
                >
                  Archive
                </ArchiveButton>
                
                <DeleteButton
                  type="button"
                  onClick={handleDelete}
                >
                  Delete
                </DeleteButton>
              </>
            )}
          </ButtonGroup>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ProjectModal;