import styled, { css } from 'styled-components';

const getVariantStyles = (variant, theme) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${theme.colors.accent};
        color: white;
        border: 1px solid ${theme.colors.accent};

        &:hover:not(:disabled) {
          background-color: ${theme.colors.accentHover};
          border-color: ${theme.colors.accentHover};
        }

        &:active:not(:disabled) {
          background-color: ${theme.colors.accentDark};
          border-color: ${theme.colors.accentDark};
        }
      `;

    case 'secondary':
      return css`
        background-color: ${theme.colors.surface};
        color: ${theme.colors.textPrimary};
        border: 1px solid ${theme.colors.border};

        &:hover:not(:disabled) {
          background-color: ${theme.colors.surfaceHover};
          border-color: ${theme.colors.borderLight};
        }

        &:active:not(:disabled) {
          background-color: ${theme.colors.surfaceLight};
        }
      `;

    case 'outline':
      return css`
        background-color: transparent;
        color: ${theme.colors.accent};
        border: 1px solid ${theme.colors.accent};

        &:hover:not(:disabled) {
          background-color: ${theme.colors.accent};
          color: white;
        }

        &:active:not(:disabled) {
          background-color: ${theme.colors.accentHover};
          border-color: ${theme.colors.accentHover};
        }
      `;

    case 'ghost':
      return css`
        background-color: transparent;
        color: ${theme.colors.textSecondary};
        border: 1px solid transparent;

        &:hover:not(:disabled) {
          background-color: ${theme.colors.surfaceHover};
          color: ${theme.colors.textPrimary};
        }

        &:active:not(:disabled) {
          background-color: ${theme.colors.surfaceLight};
        }
      `;

    case 'danger':
      return css`
        background-color: ${theme.colors.error};
        color: white;
        border: 1px solid ${theme.colors.error};

        &:hover:not(:disabled) {
          background-color: ${theme.colors.errorHover};
          border-color: ${theme.colors.errorHover};
        }

        &:active:not(:disabled) {
          background-color: #C53030;
          border-color: #C53030;
        }
      `;

    default:
      return css`
        background-color: ${theme.colors.accent};
        color: white;
        border: 1px solid ${theme.colors.accent};
      `;
  }
};

const getSizeStyles = (size, theme) => {
  switch (size) {
    case 'xs':
      return css`
        padding: ${theme.spacing.xs} ${theme.spacing.sm};
        font-size: ${theme.typography.fontSize.xs};
        border-radius: ${theme.borderRadius.sm};
        min-height: 24px;
      `;

    case 'sm':
      return css`
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        font-size: ${theme.typography.fontSize.sm};
        border-radius: ${theme.borderRadius.sm};
        min-height: 32px;
      `;

    case 'md':
      return css`
        padding: ${theme.spacing.sm} ${theme.spacing.lg};
        font-size: ${theme.typography.fontSize.md};
        border-radius: ${theme.borderRadius.md};
        min-height: 40px;
      `;

    case 'lg':
      return css`
        padding: ${theme.spacing.md} ${theme.spacing.xl};
        font-size: ${theme.typography.fontSize.lg};
        border-radius: ${theme.borderRadius.md};
        min-height: 48px;
      `;

    case 'xl':
      return css`
        padding: ${theme.spacing.lg} ${theme.spacing.xxl};
        font-size: ${theme.typography.fontSize.xl};
        border-radius: ${theme.borderRadius.lg};
        min-height: 56px;
      `;

    default:
      return css`
        padding: ${theme.spacing.sm} ${theme.spacing.lg};
        font-size: ${theme.typography.fontSize.md};
        border-radius: ${theme.borderRadius.md};
        min-height: 40px;
      `;
  }
};

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.xs};
  font-family: ${props => props.theme.typography.fontFamily};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  white-space: nowrap;
  user-select: none;
  position: relative;
  overflow: hidden;

  ${props => getVariantStyles(props.variant, props.theme)}
  ${props => getSizeStyles(props.size, props.theme)}

  ${props => props.fullWidth && css`
    width: 100%;
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.accent};
    outline-offset: 2px;
  }

  .button-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .button-spinner {
    display: inline-block;
    animation: spin 1s linear infinite;
    margin-right: ${props => props.theme.spacing.xs};
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* Loading state */
  ${props => props.loading && css`
    pointer-events: none;
    
    .button-spinner {
      display: inline-block;
    }
  `}

  /* Icon positioning */
  ${props => props.iconPosition === 'right' && css`
    flex-direction: row-reverse;
    
    .button-icon {
      margin-right: 0;
      margin-left: ${props.theme.spacing.xs};
    }
    
    .button-spinner {
      margin-right: 0;
      margin-left: ${props.theme.spacing.xs};
    }
  `}
`;