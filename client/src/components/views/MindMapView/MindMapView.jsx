import React from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';

const MindMapContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.lg};
`;

const MindMapHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const MindMapTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.textPrimary};
  margin: 0;
`;

const MindMapCanvas = styled.div`
  flex: 1;
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.border};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MindMapNode = styled.div`
  position: absolute;
  background-color: ${props => props.theme.colors.background};
  border: 2px solid ${props => props.color || props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.md};
  min-width: 150px;
  max-width: 250px;
  cursor: move;
  transition: all ${props => props.theme.transitions.fast};
  box-shadow: ${props => props.theme.shadows.md};

  &:hover {
    box-shadow: ${props => props.theme.shadows.lg};
    transform: translateY(-2px);
  }

  ${props => props.isCenter && `
    background-color: ${props.theme.colors.accent};
    border-color: ${props.theme.colors.accent};
    color: white;
    font-weight: ${props.theme.typography.fontWeight.semibold};
  `}
`;

const NodeTitle = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.isCenter ? 'white' : props.theme.colors.textPrimary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const NodeDescription = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.isCenter ? 'rgba(255, 255, 255, 0.9)' : props.theme.colors.textSecondary};
  line-height: ${props => props.theme.typography.lineHeight.normal};
`;

const ConnectionLine = styled.div`
  position: absolute;
  background-color: ${props => props.theme.colors.border};
  height: 2px;
  transform-origin: left center;
  pointer-events: none;
`;

const EmptyState = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${props => props.theme.spacing.lg};
  opacity: 0.5;
`;

const EmptyTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  color: ${props => props.theme.colors.textPrimary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const EmptyText = styled.p`
  font-size: ${props => props.theme.typography.fontSize.md};
  max-width: 400px;
  margin: 0 auto ${props => props.theme.spacing.lg};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
`;

const MindMapView = ({ projectId }) => {
  // Mock data for demonstration
  const nodes = [
    {
      id: 1,
      title: 'Project Goal',
      description: 'Main objective',
      x: 400,
      y: 200,
      color: '#4299E1',
      isCenter: true
    },
    {
      id: 2,
      title: 'Research',
      description: 'Gather requirements',
      x: 200,
      y: 100,
      color: '#48BB78'
    },
    {
      id: 3,
      title: 'Design',
      description: 'Create mockups',
      x: 600,
      y: 100,
      color: '#ED8936'
    },
    {
      id: 4,
      title: 'Development',
      description: 'Build features',
      x: 200,
      y: 300,
      color: '#9F7AEA'
    },
    {
      id: 5,
      title: 'Testing',
      description: 'Quality assurance',
      x: 600,
      y: 300,
      color: '#F56565'
    }
  ];

  const connections = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 1, to: 4 },
    { from: 1, to: 5 }
  ];

  const calculateConnection = (fromNode, toNode) => {
    const dx = toNode.x - fromNode.x;
    const dy = toNode.y - fromNode.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    return {
      width: distance,
      left: fromNode.x,
      top: fromNode.y,
      transform: `rotate(${angle}deg)`
    };
  };

  return (
    <MindMapContainer>
      <MindMapHeader>
        <MindMapTitle>🧠 Mind Map</MindMapTitle>
        <Button variant="primary" size="sm">
          + Add Node
        </Button>
      </MindMapHeader>

      <MindMapCanvas>
        {nodes.length === 0 ? (
          <EmptyState>
            <EmptyIcon>🧠</EmptyIcon>
            <EmptyTitle>Start Mind Mapping</EmptyTitle>
            <EmptyText>
              Create a central idea and branch out with related concepts. Build visual connections between your thoughts and ideas.
            </EmptyText>
            <Button variant="primary">
              Create Central Node
            </Button>
          </EmptyState>
        ) : (
          <>
            {/* Render connections */}
            {connections.map((connection, index) => {
              const fromNode = nodes.find(n => n.id === connection.from);
              const toNode = nodes.find(n => n.id === connection.to);
              
              if (!fromNode || !toNode) return null;
              
              const lineStyle = calculateConnection(fromNode, toNode);
              
              return (
                <ConnectionLine
                  key={index}
                  style={lineStyle}
                />
              );
            })}
            
            {/* Render nodes */}
            {nodes.map((node) => (
              <MindMapNode
                key={node.id}
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                }}
                color={node.color}
                isCenter={node.isCenter}
              >
                <NodeTitle isCenter={node.isCenter}>{node.title}</NodeTitle>
                {node.description && (
                  <NodeDescription isCenter={node.isCenter}>
                    {node.description}
                  </NodeDescription>
                )}
              </MindMapNode>
            ))}
          </>
        )}
      </MindMapCanvas>
    </MindMapContainer>
  );
};

export default MindMapView;