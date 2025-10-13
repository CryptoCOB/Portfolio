import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#3B82F6' }, // blue-500
    secondary: { main: '#8B5CF6' }, // violet-500
    background: { default: '#f8fafc' },
  },
  typography: {
    fontFamily: ['Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'].join(','),
    h1: { fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontWeight: 600 },
    body1: { lineHeight: 1.7 },
  },
  components: {
    MuiButton: {
      defaultProps: { variant: 'contained' },
      styleOverrides: { root: { borderRadius: 10, textTransform: 'none' } },
    },
    MuiCard: {
      styleOverrides: { root: { borderRadius: 16 } },
    },
    MuiTextField: {
      defaultProps: { size: 'medium', fullWidth: true },
    },
  },
});

export default theme;
