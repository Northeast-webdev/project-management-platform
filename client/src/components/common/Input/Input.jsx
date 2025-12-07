import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const StyledInput = styled.input`
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.textPrimary};
  font-family: inherit;
  font-size: ${props => props.theme.typography.fontSize.md};
  transition: all ${props => props.theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(0, 163, 255, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.typography.fontSize.xs};
`;

const Input = ({ 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  error, 
  disabled, 
  required,
  ...props 
}) => {
  return (
    <InputContainer>
      <StyledInput
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default Input;