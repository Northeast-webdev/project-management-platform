import { createGlobalStyle } from 'styled-components';
import { defaultTheme } from './theme';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${defaultTheme.colors.background};
    color: ${defaultTheme.colors.textPrimary};
    line-height: ${defaultTheme.typography.lineHeight.normal};
    font-size: ${defaultTheme.typography.fontSize.md};
    overflow: hidden;
  }

  #root {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${defaultTheme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${defaultTheme.colors.border};
    border-radius: 4px;
    
    &:hover {
      background: ${defaultTheme.colors.borderLight};
    }
  }

  /* Firefox scrollbar */
  * {
    scrollbar-width: thin;
    scrollbar-color: ${defaultTheme.colors.border} ${defaultTheme.colors.surface};
  }

  /* Selection styling */
  ::selection {
    background-color: ${defaultTheme.colors.accent};
    color: white;
  }

  ::-moz-selection {
    background-color: ${defaultTheme.colors.accent};
    color: white;
  }

  /* Focus styles */
  button:focus-visible,
  input:focus-visible,
  textarea:focus-visible,
  select:focus-visible {
    outline: 2px solid ${defaultTheme.colors.accent};
    outline-offset: 2px;
  }

  /* Link styles */
  a {
    color: ${defaultTheme.colors.accent};
    text-decoration: none;
    transition: color ${defaultTheme.transitions.fast};

    &:hover {
      color: ${defaultTheme.colors.accentHover};
    }
  }

  /* Button reset */
  button {
    border: none;
    background: none;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    transition: all ${defaultTheme.transitions.fast};
  }

  /* Input reset */
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    border: none;
    outline: none;
  }

  /* Table styles */
  table {
    border-collapse: collapse;
    width: 100%;
  }

  th,
  td {
    text-align: left;
    padding: ${defaultTheme.spacing.sm};
  }

  /* Code styles */
  code {
    font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
    background-color: ${defaultTheme.colors.surface};
    padding: 2px 4px;
    border-radius: ${defaultTheme.borderRadius.sm};
    font-size: 0.875em;
  }

  pre {
    background-color: ${defaultTheme.colors.surface};
    padding: ${defaultTheme.spacing.md};
    border-radius: ${defaultTheme.borderRadius.md};
    overflow-x: auto;
    font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
    font-size: 0.875em;
    line-height: ${defaultTheme.typography.lineHeight.relaxed};
  }

  /* Utility classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  /* Disable drag and drop on images */
  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }

  /* Smooth transitions for all interactive elements */
  * {
    transition: inherit;
  }

  button,
  a,
  input,
  textarea,
  select {
    transition: all ${defaultTheme.transitions.fast};
  }
`;