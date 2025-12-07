import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.md};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  position: relative;

  &:hover {
    background-color: ${props => props.theme.colors.surfaceHover};
    border-color: ${props => props.theme.colors.borderLight};
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.md};
  }

  ${props => props.isActive && `
    background-color: ${props.theme.colors.surfaceHover};
    border-color: ${props.theme.colors.accent};
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
  `}
`;

const ProjectName = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.textPrimary};
  margin: 0 0 ${props => props.theme.spacing.xs} 0;
  line-height: ${props => props.theme.typography.lineHeight.tight};
`;

const ProjectDescription = styled.p`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  margin: 0;
  line-height: ${props => props.theme.typography.lineHeight.normal};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProjectMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing.sm};
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.textMuted};
`;

const ProjectDate = styled.span`
  color: ${props => props.theme.colors.textMuted};
`;

const ProjectStatus = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: 2px 6px;
  border-radius: ${props => props.theme.borderRadius.sm};
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.textMuted};
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
`;

const ActiveIndicator = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background-color: ${props => props.theme.colors.accent};
  border-radius: ${props => props.theme.borderRadius.sm} 0 0 ${props => props.theme.borderRadius.sm};
  opacity: ${props => props.isActive ? 1 : 0};
  transition: opacity ${props => props.theme.transitions.fast};
`;

const ProjectCard = ({ project, isActive, onSelect }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  return (
    <CardContainer isActive={isActive} onClick={onSelect}>
      <ActiveIndicator isActive={isActive} />
      
      <ProjectName>{project.name}</ProjectName>
      
      {project.description && (
        <ProjectDescription>{project.description}</ProjectDescription>
      )}
      
      <ProjectMeta>
        <ProjectDate>{formatDate(project.updated_at)}</ProjectDate>
        <ProjectStatus>
          <span>📋</span>
          Active
        </ProjectStatus>
      </ProjectMeta>
    </CardContainer>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    updated_at: PropTypes.string,
  }).isRequired,
  isActive: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
};

ProjectCard.defaultProps = {
  isActive: false,
};

export default ProjectCard;