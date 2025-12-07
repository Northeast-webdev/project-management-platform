import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useAppContext } from '../../../context/AppContext';
import TaskModal from '../../features/TaskModal/TaskModal';

const KanbanContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${props => props.theme === 'dark' ? '#0F0F0F' : '#F8F9FB'};
  padding: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  transition: background-color 0.3s ease;
`;

const KanbanHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const KanbanTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#1D1D1D'};
  margin: 0;
  transition: color 0.3s ease;
`;

const KanbanBoard = styled.div`
  display: flex;
  gap: 24px;
  flex: 1;
  overflow-x: auto;
  min-height: 0;
  padding-bottom: 16px;
`;

const KanbanColumn = styled.div`
  flex: 1;
  min-width: 280px;
  max-width: 320px;
  display: flex;
  flex-direction: column;
`;

const ColumnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 12px 16px;
  background-color: ${props => props.headerBg || (props.theme === 'dark' ? '#1A1A1A' : '#FFFFFF')};
  border-radius: 12px;
  border: 1px solid ${props => props.theme === 'dark' ? '#2A2A2A' : '#E5E7EB'};
  transition: all 0.3s ease;
`;

const ColumnTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ColumnIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background-color: ${props => props.iconColor || '#4A90E2'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
`;

const ColumnTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#1F2937'};
  margin: 0;
  transition: color 0.3s ease;
`;

const TaskCount = styled.span`
  background-color: ${props => props.theme === 'dark' ? '#374151' : '#F3F4F6'};
  color: ${props => props.theme === 'dark' ? '#D1D5DB' : '#6B7280'};
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
`;

const TasksContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 400px;
  padding: 12px;
  background-color: ${props => props.theme === 'dark' ? '#0F0F0F' : '#F8F9FB'};
  border-radius: 12px;
  border: 1px solid ${props => props.theme === 'dark' ? '#1F2937' : '#E5E7EB'};
  transition: all 0.3s ease;
  
  &.drag-over {
    background-color: ${props => props.theme === 'dark' ? '#1E3A8A' : '#EBF5FF'};
    border-color: #4A90E2;
  }
`;

const TaskCard = styled.div`
  background-color: ${props => props.theme === 'dark' ? '#1F2937' : '#FFFFFF'};
  border: 1px solid ${props => props.theme === 'dark' ? '#374151' : '#E5E7EB'};
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
    border-color: ${props => props.theme === 'dark' ? '#4B5563' : '#D1D5DB'};
  }
  
  &.dragging {
    opacity: 0.5;
    transform: rotate(5deg);
  }
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const TaskTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme === 'dark' ? '#FFFFFF' : '#1D1D1D'};
  margin: 0;
  line-height: 1.4;
  flex: 1;
  transition: color 0.3s ease;
`;

const TaskPriority = styled.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  
  ${props => props.priority === 'high' && `
    background-color: #FEE2E2;
    color: #DC2626;
  `}
  
  ${props => props.priority === 'medium' && `
    background-color: #FEF3C7;
    color: #D97706;
  `}
  
  ${props => props.priority === 'low' && `
    background-color: #E0E7FF;
    color: #4F46E5;
  `}
`;

const TaskDescription = styled.p`
  font-size: 13px;
  color: ${props => props.theme === 'dark' ? '#B0B0B0' : '#5F6368'};
  margin: 0 0 12px 0;
  line-height: 1.4;
  transition: color 0.3s ease;
`;

const TaskFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskTags = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const TaskTag = styled.span`
  background-color: ${props => props.theme === 'dark' ? '#374151' : '#F3F4F6'};
  color: ${props => props.theme === 'dark' ? '#D1D5DB' : '#6B7280'};
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 500;
  transition: all 0.3s ease;
`;

const TaskMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TaskAvatar = styled.div`
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

const TaskDate = styled.span`
  font-size: 11px;
  color: ${props => props.theme === 'dark' ? '#808080' : '#9CA3AF'};
  transition: color 0.3s ease;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${props => props.theme === 'dark' ? '#808080' : '#9CA3AF'};
  font-size: 14px;
  transition: color 0.3s ease;
`;

const KanbanView = ({ projectId }) => {
  const { state } = useAppContext();
  const { theme } = state;
  
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [columns, setColumns] = React.useState([
    {
      id: 'todo',
      title: 'To Do',
      icon: '📋',
      iconColor: '#3B82F6',
      headerBg: theme === 'dark' ? '#1F2937' : '#FFFFFF',
      tasks: [
        {
          id: 1,
          title: 'Create onboarding task list for new hires',
          description: 'Compile a comprehensive list of tasks for new employee orientation',
          priority: 'high',
          tags: ['HR', 'Onboarding'],
          assignee: 'JD',
          assigneeColor: '#10B981',
          dueDate: 'Due today'
        },
        {
          id: 2,
          title: 'Add payment logs to customer dashboard',
          description: 'Display transaction history and payment status',
          priority: 'medium',
          tags: ['Frontend', 'Dashboard'],
          assignee: 'AS',
          assigneeColor: '#8B5CF6',
          dueDate: 'Due tomorrow'
        },
        {
          id: 3,
          title: 'Design new landing page hero section',
          description: 'Create mockups for the main landing page',
          priority: 'low',
          tags: ['Design', 'Marketing'],
          assignee: 'MK',
          assigneeColor: '#F59E0B',
          dueDate: 'Due in 3 days'
        }
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      icon: '🚀',
      iconColor: '#F59E0B',
      headerBg: theme === 'dark' ? '#1F2937' : '#FFFFFF',
      tasks: [
        {
          id: 4,
          title: 'Implement real-time notifications',
          description: 'Add WebSocket support for live updates',
          priority: 'high',
          tags: ['Backend', 'WebSocket'],
          assignee: 'TW',
          assigneeColor: '#EF4444',
          dueDate: 'Due today'
        },
        {
          id: 5,
          title: 'Optimize database queries',
          description: 'Improve performance of slow-running queries',
          priority: 'medium',
          tags: ['Database', 'Performance'],
          assignee: 'RL',
          assigneeColor: '#3B82F6',
          dueDate: 'Due tomorrow'
        }
      ]
    },
    {
      id: 'review',
      title: 'Review',
      icon: '👁️',
      iconColor: '#8B5CF6',
      headerBg: theme === 'dark' ? '#1F2937' : '#FFFFFF',
      tasks: [
        {
          id: 8,
          title: 'Review API documentation',
          description: 'Check and update API endpoints documentation',
          priority: 'medium',
          tags: ['Documentation', 'API'],
          assignee: 'TM',
          assigneeColor: '#EC4899',
          dueDate: 'Due today'
        },
        {
          id: 9,
          title: 'Code review for payment module',
          description: 'Review and approve the payment processing code',
          priority: 'high',
          tags: ['Code Review', 'Finance'],
          assignee: 'AJ',
          assigneeColor: '#14B8A6',
          dueDate: 'Due tomorrow'
        }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      icon: '✅',
      iconColor: '#10B981',
      headerBg: theme === 'dark' ? '#1F2937' : '#FFFFFF',
      tasks: [
        {
          id: 6,
          title: 'Set up CI/CD pipeline',
          description: 'Configure automated testing and deployment',
          priority: 'high',
          tags: ['DevOps', 'Automation'],
          assignee: 'KP',
          assigneeColor: '#059669',
          dueDate: 'Completed'
        },
        {
          id: 7,
          title: 'Update user documentation',
          description: 'Add new features to user guide',
          priority: 'low',
          tags: ['Documentation'],
          assignee: 'SL',
          assigneeColor: '#7C3AED',
          dueDate: 'Completed'
        }
      ]
    },
    {
      id: 'new-column',
      title: 'New Column',
      icon: '+',
      iconColor: '#9CA3AF',
      headerBg: theme === 'dark' ? '#1F2937' : '#FFFFFF',
      tasks: []
    }
  ]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Dropped outside the board
    if (!destination) {
      return;
    }

    // Dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Create new arrays
    const newColumns = [...columns];
    const sourceColumnIndex = newColumns.findIndex(col => col.id === source.droppableId);
    const destColumnIndex = newColumns.findIndex(col => col.id === destination.droppableId);

    // Remove task from source column
    const [removedTask] = newColumns[sourceColumnIndex].tasks.splice(source.index, 1);

    // Add task to destination column
    newColumns[destColumnIndex].tasks.splice(destination.index, 0, removedTask);

    // Update state
    setColumns(newColumns);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleTaskSave = (updatedTask) => {
    // Update the task in the columns
    const newColumns = [...columns];
    for (let column of newColumns) {
      const taskIndex = column.tasks.findIndex(task => task.id === selectedTask.id);
      if (taskIndex !== -1) {
        column.tasks[taskIndex] = { ...column.tasks[taskIndex], ...updatedTask };
        break;
      }
    }
    setColumns(newColumns);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <KanbanContainer theme={theme}>
        <KanbanHeader>
          <KanbanTitle theme={theme}>Task Board</KanbanTitle>
        </KanbanHeader>

        <KanbanBoard>
          {columns.map((column) => (
            <KanbanColumn key={column.id}>
              <ColumnHeader headerBg={column.headerBg}>
                <ColumnTitleContainer>
                  <ColumnIcon iconColor={column.iconColor}>
                    {column.icon}
                  </ColumnIcon>
                  <ColumnTitle theme={theme}>{column.title}</ColumnTitle>
                </ColumnTitleContainer>
                <TaskCount theme={theme}>{column.tasks.length}</TaskCount>
              </ColumnHeader>
              
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <TasksContainer
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    theme={theme}
                    className={snapshot.isDraggingOver ? 'drag-over' : ''}
                  >
                    {column.tasks.length === 0 ? (
                      <EmptyState theme={theme}>No tasks yet</EmptyState>
                    ) : (
                      column.tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                          {(provided, snapshot) => (
                            <TaskCard
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              theme={theme}
                              className={snapshot.isDragging ? 'dragging' : ''}
                              onClick={() => handleTaskClick(task)}
                            >
                              <TaskHeader>
                                <TaskTitle theme={theme}>{task.title}</TaskTitle>
                                <TaskPriority priority={task.priority}>
                                  {task.priority}
                                </TaskPriority>
                              </TaskHeader>
                               
                              {task.description && (
                                <TaskDescription theme={theme}>{task.description}</TaskDescription>
                              )}
                               
                              <TaskFooter>
                                <TaskTags>
                                  {task.tags.map((tag, tagIndex) => (
                                    <TaskTag key={tagIndex} theme={theme}>{tag}</TaskTag>
                                  ))}
                                </TaskTags>
                                
                                <TaskMeta>
                                  {task.assignee && (
                                    <TaskAvatar avatarColor={task.assigneeColor}>
                                      {task.assignee}
                                    </TaskAvatar>
                                  )}
                                  <TaskDate theme={theme}>{task.dueDate}</TaskDate>
                                </TaskMeta>
                              </TaskFooter>
                            </TaskCard>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </TasksContainer>
                )}
              </Droppable>
            </KanbanColumn>
          ))}
        </KanbanBoard>
      </KanbanContainer>
      
      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleTaskSave}
      />
    </DragDropContext>
  );
};

export default KanbanView;