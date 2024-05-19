'use client';
import { createTheme } from '@mui/material/styles';
import { red, blue, green, orange, grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: red[400],
    },
    secondary: {
      main: blue[200],
    },
    text: {
      // primary: grey[100],
      // secondary: grey[300],
    },
    error: {
      main: red[400],
    },
    warning: {
      main: orange[300],
    },
    info: {
      main: blue[300],
    },
    success: {
      main: green[300],
    },
  },
  typography: {
    fontFamily: '"Courier New", Courier, monospace', // Retro font style
    h1: {
      fontFamily: '"VT323", monospace',
      fontSize: '2.25rem',
    },
    h2: {
      fontFamily: '"VT323", monospace',
      fontSize: '2rem',
    },
    h3: {
      fontFamily: '"VT323", monospace',
      fontSize: '1.75rem',
    },
    h4: {
      fontFamily: '"VT323", monospace',
      fontSize: '1.5rem',
    },
    h5: {
      fontFamily: '"VT323", monospace',
      fontSize: '1.25rem',
    },
    h6: {
      fontFamily: '"VT323", monospace',
      fontSize: '1rem',
    },
    body1: {
      fontFamily: '"Courier New", Courier, monospace',
    },
    body2: {
      fontFamily: '"Courier New", Courier, monospace',
    },
    button: {
      fontFamily: '"Courier New", Courier, monospace',
    },
  },
  zIndex: {
    appBar: 1201, // default is 1100
    drawer: 1200, // default
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Rounded corners for buttons
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Rounded corners for cards
          border: `1px solid ${grey[700]}`, // Border for cards
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light background color
          boxShadow: 'none', // Remove shadow
          color: 'black', // Black text color
          // borderBottom: `1px solid ${grey[700]}`, // Border for app bar
        },
      },
    },
  },
});

export default theme;
