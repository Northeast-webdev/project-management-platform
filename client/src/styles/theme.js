export const defaultTheme = {
  colors: {
    // Dark charcoal background
    background: '#0F0F0F',  // Dark charcoal
    surface: '#1A1A1A',     // Slightly lighter grey for sidebar
    surfaceHover: '#252525',
    surfaceLight: '#333333',
    
    // Text colors
    textPrimary: '#FFFFFF',  // Sharp white text
    textSecondary: '#B0B0B0',
    textMuted: '#808080',
    
    // Bright blue accent
    accent: '#00A3FF',      // Bright blue
    accentHover: '#0085DD',
    accentLight: '#4DB8FF',
    
    // Border colors
    border: '#2A2A2A',
    borderLight: '#404040',
    
    // Status colors
    success: '#00C896',
    warning: '#FF6B35',
    error: '#FF4444',       // Red for tags
    info: '#00A3FF',
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  
  borderRadius: {
    sm: '8px',    // Smooth rounded corners
    md: '12px',
    lg: '16px',
    xl: '20px',
    full: '50%',
  },
  
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.3)',
    md: '0 4px 8px rgba(0, 0, 0, 0.4)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.5)',
    xl: '0 16px 32px rgba(0, 0, 0, 0.6)',
  },
  
  transitions: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },
  
  typography: {
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      md: '1rem',       // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  
  zIndex: {
    base: '0',
    overlay: '10',
    modal: '100',
    tooltip: '1000',
  },
};

export const darkTheme = defaultTheme;