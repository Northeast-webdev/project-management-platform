import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AppProvider } from './context/AppContext';
import { GlobalStyles } from './styles/globalStyles';
import { darkTheme } from './styles/theme';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppProvider>
        <GlobalStyles />
        <ErrorBoundary>
          <Layout />
        </ErrorBoundary>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;