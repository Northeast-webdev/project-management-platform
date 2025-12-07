import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.button`
  background-color: ${props => {
    switch (props.variant) {
      case 'primary':
        return props.theme.colors.accent;
      case 'outline':
        return 'transparent';
      case 'ghost':
        return 'transparent';
      default:
        return props.theme.colors.surface;
    }
  }};
  color: ${props => {
    switch (props.variant) {
      case 'primary':
        return 'white';
      case 'outline':
        return props.theme.colors.accent;
      case 'ghost':
        return props.theme.colors.textSecondary;
      default:
        return props.theme.colors.textPrimary;
    }
  }};
  border: ${props => {
    switch (props.variant) {
      case 'outline':
        return `1px solid ${props.theme.colors.accent}`;
      case 'ghost':
        return 'none';
      default:
        return '1px solid transparent';
    }
  }};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => {
    switch (props.size) {
      case 'sm':
        return `${props.theme.spacing.sm} ${props.theme.spacing.md}`;
      case 'xs':
        return `${props.theme.spacing.xs} ${props.theme.spacing.sm}`;
      default:
        return `${props.theme.spacing.md} ${props.theme.spacing.lg}`;
    }
  }};
  font-size: ${props => {
    switch (props.size) {
      case 'sm':
        return props.theme.typography.fontSize.sm;
      case 'xs':
        return props.theme.typography.fontSize.xs;
      default:
        return props.theme.typography.fontSize.md;
    }
  }};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.xs};
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  &:hover {
    background-color: ${props => {
      switch (props.variant) {
        case 'primary':
          return props.theme.colors.accentHover;
        case 'outline':
          return props.theme.colors.accent;
        case 'ghost':
          return props.theme.colors.surfaceHover;
        default:
          return props.theme.colors.surfaceHover;
      }
    }};
    color: ${props => {
      switch (props.variant) {
        case 'outline':
          return 'white';
        default:
          return props.color;
      }
    }};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.accent};
    outline-offset: 2px;
  }
`;

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  ...props 
}) => {
  return (
    <ButtonContainer
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </ButtonContainer>
  );
};

export default Button;