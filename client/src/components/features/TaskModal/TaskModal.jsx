import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppContext } from '../../../context/AppContext';
import { FiCalendar, FiPaperclip, FiChevronDown, FiChevronUp, FiCheck } from 'react-icons/fi';

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
  background-color: ${props => props.theme === 'dark' ? '#1A1A1A' : '#FFFFFF'};
  border-radius: 16px;
  width: 90%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3);
  border: 1px solid ${props => props.theme === 'dark' ? '#2A2A2A' : '#E5E7EB'};
`;

const ModalHeader = styled.div`
  padding: 24px 24px 16px;
  border-bottom: 1px solid ${props => props.theme === 'dark' ? '#2A2A2A' : '#E5E7EB'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme === 'dark' ? '#1A1A1A' : '#FFFFFF'};
`;

const ModalTitle = styled.h2`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme === 'dark' ? '#9CA3AF' : '#6B7280'};
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
  background-color: ${props => props.theme === 'dark' ? '#1A1A1A' : '#FFFFFF'};
`;

const LeftColumn = styled.div`
  flex: 8;
  display: flex;
  flex-direction: column;
`;

const RightColumn = styled.div`
  flex: 1;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-left: 24px;
  border-left: 1px solid ${props => props.theme === 'dark' ? '#2A2A2A' : '#E5E7EB'};
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const DescriptionStepsContainer = styled.div`
  border: 1px solid ${props => props.theme === 'dark' ? '#2A2A2A' : '#E5E7EB'};
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  background-color: ${props => props.theme === 'dark' ? '#0F0F0F' : '#F9FAFB'};
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${props => props.theme === 'dark' ? '#2A2A2A' : '#E5E7EB'};
  margin: 24px 0;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme === 'dark' ? '#B0B0B0' : '#374151'};
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${props => props.theme === 'dark' ? '#2A2A2A' : '#D1D5DB'};
  border-radius: 8px;
  background-color: ${props => props.theme === 'dark' ? '#0F0F0F' : '#FFFFFF'};
  color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#1F2937'};
  font-size: 14px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme === 'dark' ? '#808080' : '#9CA3AF'};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  padding-bottom: 30px; /* Extra padding for resize handle */
  border: none;
  border-radius: 0;
  background-color: transparent;
  color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#1F2937'};
  font-size: 14px;
  resize: both;
  min-height: 120px;
  min-width: 100%;
  font-family: inherit;
  transition: all 0.2s ease;
  overflow: auto;
  
  /* Ensure resize handle is visible */
  &::-webkit-resizer {
    background-color: ${props => props.theme === 'dark' ? '#2A2A2A' : '#D1D5DB'};
    border-radius: 0 0 7px 0;
  }

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${props => props.theme === 'dark' ? '#808080' : '#9CA3AF'};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${props => props.theme === 'dark' ? '#2A2A2A' : '#D1D5DB'};
  border-radius: 8px;
  background-color: ${props => props.theme === 'dark' ? '#0F0F0F' : '#FFFFFF'};
  color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#1F2937'};
  font-size: 14px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

// Steps/Checklist Section
const StepsSection = styled.div`
  margin-bottom: 0;
  margin-top: 0;
`;

const StepsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StepItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StepCheckbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #3B82F6;
`;

const StepInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid ${props => props.theme === 'dark' ? '#2A2A2A' : '#D1D5DB'};
  border-radius: 6px;
  background-color: ${props => props.theme === 'dark' ? '#0F0F0F' : '#FFFFFF'};
  color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#1F2937'};
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #3B82F6;
  }

  &::placeholder {
    color: ${props => props.theme === 'dark' ? '#808080' : '#9CA3AF'};
  }
`;

const GenerateStepsButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background-color: ${props => props.theme === 'dark' ? '#2A2A2A' : '#F3F4F6'};
  color: ${props => props.theme === 'dark' ? '#D1D5DB' : '#374151'};
  border: 1px solid ${props => props.theme === 'dark' ? '#404040' : '#D1D5DB'};
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#404040' : '#E5E7EB'};
  }
`;

const AttachFileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: ${props => props.theme === 'dark' ? '#2A2A2A' : '#F3F4F6'};
  color: ${props => props.theme === 'dark' ? '#D1D5DB' : '#374151'};
  border: 1px solid ${props => props.theme === 'dark' ? '#404040' : '#D1D5DB'};
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: fit-content;

  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#404040' : '#E5E7EB'};
  }
`;

// Right Column Fields
const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FieldLabel = styled.label`
  font-size: 12px;
  font-weight: 500;
  color: ${props => props.theme === 'dark' ? '#B0B0B0' : '#6B7280'};
`;

const DateInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const DateIcon = styled(FiCalendar)`
  position: absolute;
  left: 12px;
  color: ${props => props.theme === 'dark' ? '#9CA3AF' : '#6B7280'};
  pointer-events: none;
`;

const DateInput = styled.input`
  width: 100%;
  padding: 10px 12px 10px 40px;
  border: 1px solid ${props => props.theme === 'dark' ? '#2A2A2A' : '#D1D5DB'};
  border-radius: 8px;
  background-color: ${props => props.theme === 'dark' ? '#0F0F0F' : '#FFFFFF'};
  color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#1F2937'};
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #3B82F6;
  }
`;

const ImportanceWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${props => props.theme === 'dark' ? '#2A2A2A' : '#D1D5DB'};
  border-radius: 8px;
  overflow: hidden;
  background-color: ${props => props.theme === 'dark' ? '#0F0F0F' : '#FFFFFF'};
`;

const ImportanceInput = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: none;
  background-color: ${props => props.theme === 'dark' ? '#0F0F0F' : '#FFFFFF'};
  color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#1F2937'};
  font-size: 14px;
  text-align: center;

  &:focus {
    outline: none;
  }
`;

const ImportanceButton = styled.button`
  padding: 10px 8px;
  background-color: ${props => props.theme === 'dark' ? '#2A2A2A' : '#F3F4F6'};
  border: none;
  border-left: 1px solid ${props => props.theme === 'dark' ? '#404040' : '#D1D5DB'};
  color: ${props => props.theme === 'dark' ? '#D1D5DB' : '#374151'};
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#404040' : '#E5E7EB'};
  }

  &:first-of-type {
    border-left: none;
    border-right: 1px solid ${props => props.theme === 'dark' ? '#404040' : '#D1D5DB'};
  }
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + .slider {
    background-color: #3B82F6;
  }

  &:checked + .slider:before {
    transform: translateX(20px);
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme === 'dark' ? '#4B5563' : '#D1D5DB'};
  transition: 0.3s;
  border-radius: 24px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
  }
`;

const AdvancedSection = styled.div`
  margin-top: 8px;
`;

const AdvancedHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 8px 0;
  user-select: none;
`;

const AdvancedTitle = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${props => props.theme === 'dark' ? '#9CA3AF' : '#6B7280'};
`;

const AdvancedContent = styled.div`
  margin-top: 12px;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const KanbanColumnSelect = styled.div`
  position: relative;
  margin-top: 8px;
`;

const KanbanSelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const KanbanSelectDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 12px;
  padding-right: 40px;
  border: 1px solid ${props => props.theme === 'dark' ? '#2A2A2A' : '#D1D5DB'};
  border-radius: 8px;
  background-color: ${props => props.theme === 'dark' ? '#0F0F0F' : '#FFFFFF'};
  color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#1F2937'};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme === 'dark' ? '#404040' : '#9CA3AF'};
  }
`;

const KanbanSelectIcon = styled.span`
  font-size: 16px;
  display: flex;
  align-items: center;
`;

const KanbanSelectText = styled.span`
  flex: 1;
  color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#1F2937'};
`;

const KanbanSelectChevron = styled(FiChevronDown)`
  position: absolute;
  right: 12px;
  color: ${props => props.theme === 'dark' ? '#9CA3AF' : '#6B7280'};
  pointer-events: none;
`;

const KanbanSelectDropdown = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
  
  option {
    padding: 10px 12px;
    background-color: ${props => props.theme === 'dark' ? '#1F2937' : '#FFFFFF'};
    color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#1F2937'};
  }
`;

const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid ${props => props.theme === 'dark' ? '#2A2A2A' : '#E5E7EB'};
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background-color: ${props => props.theme === 'dark' ? '#1A1A1A' : '#FFFFFF'};
`;

const FooterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
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

  ${props => props.variant === 'complete' && `
    background-color: #10B981;
    color: white;

    &:hover {
      background-color: #059669;
    }
  `}
`;

const TaskModal = ({ task, isOpen, onClose, onSave }) => {
  const { state } = useAppContext();
  const { theme, currentProject, projects } = state;
  
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'P3',
    importance: task?.importance || 50,
    projectId: task?.project_id || currentProject?.id || 1,
    recurring: task?.recurring || false,
    kanbanColumn: task?.status || 'todo',
    dueDate: task?.dueDate || '',
    steps: task?.steps || []
  });

  const [newStep, setNewStep] = useState('');
  const [advancedOpen, setAdvancedOpen] = useState(true);

  const kanbanColumns = [
    { id: 'todo', label: 'To Do', icon: '✓' },
    { id: 'in-progress', label: 'In Progress', icon: '⏱' },
    { id: 'review', label: 'Testing', icon: '🔍' },
    { id: 'done', label: 'Completed', icon: '✓' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImportanceChange = (delta) => {
    setFormData(prev => ({
      ...prev,
      importance: Math.max(0, Math.min(100, prev.importance + delta))
    }));
  };

  const handleAddStep = (e) => {
    if (e.key === 'Enter' && newStep.trim()) {
      e.preventDefault();
      setFormData(prev => ({
        ...prev,
        steps: [...prev.steps, { id: Date.now(), text: newStep.trim(), completed: false }]
      }));
      setNewStep('');
    }
  };

  const handleStepToggle = (stepId) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.map(step =>
        step.id === stepId ? { ...step, completed: !step.completed } : step
      )
    }));
  };

  const handleRemoveStep = (stepId) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.filter(step => step.id !== stepId)
    }));
  };

  const handleGenerateSteps = () => {
    // Placeholder for future AI generation
    console.log('Generate steps clicked');
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleComplete = () => {
    const completedData = { ...formData, kanbanColumn: 'done' };
    onSave(completedData);
    onClose();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (!isOpen) return null;

  const projectName = currentProject?.name || 'Inbox';
  const displayProjects = projects.length > 0 ? projects : [currentProject].filter(Boolean);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer theme={theme} onClick={e => e.stopPropagation()}>
        <ModalHeader theme={theme}>
          <ModalTitle theme={theme}>vectal / {projectName}</ModalTitle>
          <CloseButton theme={theme} onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalBody theme={theme}>
          <LeftColumn>
            <FormGroup>
              <Label theme={theme}>Task Name</Label>
              <Input
                theme={theme}
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter task name"
              />
            </FormGroup>

            <DescriptionStepsContainer theme={theme}>
              <FormGroup style={{ marginBottom: 0 }}>
                <Label theme={theme}>Description</Label>
                <Textarea
                  theme={theme}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter task description"
                />
              </FormGroup>

              <Divider theme={theme} />

              <StepsSection>
                <StepsHeader>
                  <Label theme={theme}>Steps</Label>
                  <GenerateStepsButton theme={theme} onClick={handleGenerateSteps}>
                    <span>📄</span>
                    Generate Steps
                  </GenerateStepsButton>
                </StepsHeader>
                <StepsList>
                  {formData.steps.map((step) => (
                    <StepItem key={step.id}>
                      <StepCheckbox
                        type="checkbox"
                        checked={step.completed}
                        onChange={() => handleStepToggle(step.id)}
                      />
                      <StepInput
                        theme={theme}
                        value={step.text}
                        onChange={(e) => {
                          setFormData(prev => ({
                            ...prev,
                            steps: prev.steps.map(s =>
                              s.id === step.id ? { ...s, text: e.target.value } : s
                            )
                          }));
                        }}
                        placeholder="Add checklist item..."
                      />
                    </StepItem>
                  ))}
                  <StepItem>
                    <StepCheckbox type="checkbox" disabled style={{ opacity: 0.3 }} />
                    <StepInput
                      theme={theme}
                      value={newStep}
                      onChange={(e) => setNewStep(e.target.value)}
                      onKeyPress={handleAddStep}
                      placeholder="Add checklist item..."
                    />
                  </StepItem>
                </StepsList>
              </StepsSection>
            </DescriptionStepsContainer>

            <AttachFileButton theme={theme}>
              <FiPaperclip />
              Attach file
            </AttachFileButton>
          </LeftColumn>

          <RightColumn>
            <FieldGroup>
              <FieldLabel theme={theme}>Due Date</FieldLabel>
              <DateInputWrapper>
                <DateIcon theme={theme} />
                <DateInput
                  theme={theme}
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                />
              </DateInputWrapper>
            </FieldGroup>

            <FieldGroup>
              <FieldLabel theme={theme}>Importance</FieldLabel>
              <ImportanceWrapper theme={theme}>
                <ImportanceButton
                  theme={theme}
                  onClick={() => handleImportanceChange(-1)}
                  type="button"
                >
                  <FiChevronDown />
                </ImportanceButton>
                <ImportanceInput
                  theme={theme}
                  type="number"
                  min="0"
                  max="100"
                  name="importance"
                  value={formData.importance}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setFormData(prev => ({
                      ...prev,
                      importance: Math.max(0, Math.min(100, value))
                    }));
                  }}
                />
                <ImportanceButton
                  theme={theme}
                  onClick={() => handleImportanceChange(1)}
                  type="button"
                >
                  <FiChevronUp />
                </ImportanceButton>
              </ImportanceWrapper>
            </FieldGroup>

            <FieldGroup>
              <FieldLabel theme={theme}>Priority</FieldLabel>
              <Select theme={theme} name="priority" value={formData.priority} onChange={handleInputChange}>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
                <option value="P3">P3</option>
              </Select>
            </FieldGroup>

            <FieldGroup>
              <FieldLabel theme={theme}>Project</FieldLabel>
              <Select theme={theme} name="projectId" value={formData.projectId} onChange={handleInputChange}>
                {displayProjects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </Select>
            </FieldGroup>

            <FieldGroup>
              <FieldLabel theme={theme}>Recurring</FieldLabel>
              <ToggleSwitch>
                <ToggleInput
                  type="checkbox"
                  name="recurring"
                  checked={formData.recurring}
                  onChange={handleInputChange}
                />
                <ToggleSlider className="slider" theme={theme} />
              </ToggleSwitch>
            </FieldGroup>

            <AdvancedSection>
              <AdvancedHeader onClick={() => setAdvancedOpen(!advancedOpen)}>
                <AdvancedTitle theme={theme}>Advanced</AdvancedTitle>
                <FiChevronDown
                  style={{
                    transform: advancedOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                    color: theme === 'dark' ? '#9CA3AF' : '#6B7280'
                  }}
                />
              </AdvancedHeader>
              <AdvancedContent isOpen={advancedOpen}>
                <FieldGroup>
                  <FieldLabel theme={theme}>Kanban Column</FieldLabel>
                  <KanbanColumnSelect>
                    <KanbanSelectWrapper>
                      <KanbanSelectDisplay theme={theme}>
                        <KanbanSelectIcon>
                          {kanbanColumns.find(col => col.id === formData.kanbanColumn)?.icon || '✓'}
                        </KanbanSelectIcon>
                        <KanbanSelectText theme={theme}>
                          {kanbanColumns.find(col => col.id === formData.kanbanColumn)?.label || 'To Do'}
                        </KanbanSelectText>
                        <KanbanSelectChevron theme={theme} />
                      </KanbanSelectDisplay>
                      <KanbanSelectDropdown
                        theme={theme}
                        name="kanbanColumn"
                        value={formData.kanbanColumn}
                        onChange={handleInputChange}
                      >
                        {kanbanColumns.map((column) => (
                          <option key={column.id} value={column.id}>
                            {column.icon} {column.label}
                          </option>
                        ))}
                      </KanbanSelectDropdown>
                    </KanbanSelectWrapper>
                  </KanbanColumnSelect>
                </FieldGroup>
              </AdvancedContent>
            </AdvancedSection>
          </RightColumn>
        </ModalBody>

        <ModalFooter theme={theme}>
          <FooterButton variant="complete" onClick={handleComplete}>
            <FiCheck />
            Complete
          </FooterButton>
          <FooterButton variant="primary" onClick={handleSave}>
            Update
          </FooterButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default TaskModal;