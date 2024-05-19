'use client';
import { createTheme } from '@mui/material/styles';
import { red, blue, green, orange, grey, deepOrange, yellow, amber } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[400],
    },
    secondary: {
      main: red[500],
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
          // borderRadius: '8px', // Rounded corners for buttons
          // backgroundColor: grey[800], // Background color for buttons
          color: grey[100], // Text color for buttons
          border: `1px solid ${blue[400]}`, // Border color for buttons
          fontFamily: '"VT323", monospace', // Match the font family of h6
          fontSize: '1rem', // Match the font size of h6
          textTransform: 'none', // Ensure text is not all caps
          // fontWeight: 'bold', // Thicker text for buttons
          // '&:hover': {
          //   // backgroundColor: grey[700], // Background color on hover
          //   color: grey[400], // Text color on hover
          //   border: `1px solid ${grey[100]}`, // Border color on hover
          // },
          // '&:active': {
          //   backgroundColor: grey[600], // Background color on active
          //   color: grey[300], // Text color on active
          //   border: `1px solid ${grey[300]}`, // Border color on active
          // },
          // '&:disabled': {
          //   // backgroundColor: grey[900], // Background color for disabled state
          //   color: grey[500], // Text color for disabled state
          //   border: `1px solid ${grey[500]}`, // Border color for disabled state
          // },
        },
        containedPrimary: {
          backgroundColor: '#f5f5f5', // Primary contained button background color
          color: grey[800], // Primary contained button text color
          boxShadow: 'none', // Disable shadow
          '&:hover': {
            backgroundColor: '#f5f5f5', // Primary contained button background color on hover
            boxShadow: 'none', // Disable shadow
          },
          '&:active': {
            backgroundColor: '#f5f5f5', // Primary contained button background color on active
            boxShadow: 'none', // Disable shadow
          },
        },
        outlinedPrimary: {
          borderColor: grey[700], // Primary outlined button border color
          color: grey[800], // Primary outlined button text color
          '&:hover': {
            borderColor: red[600], // Primary outlined button border color on hover
            color: red[600], // Primary outlined button text color on hover
            backgroundColor: 'rgb(245, 245, 245)', // Light grey background color on hover
          },
          '&:active': {
            borderColor: red[700], // Primary outlined button border color on active
            color: red[700], // Primary outlined button text color on active
            backgroundColor: 'rgb(245, 245, 245)', // Light grey background color on active
          },
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
    MuiTab: {
      styleOverrides: {
        root: {
          // color: grey[100], // Text color for tabs
          '&.Mui-selected': {
            color: grey[900], // Selected tab color
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontFamily: '"Courier New", Courier, monospace', // Retro font style for tooltip
          backgroundColor: grey[700], // Tooltip background color
          color: grey[100], // Tooltip text color
          fontSize: '0.8rem', // Slightly smaller font size
        },
        arrow: {
          color: grey[700], // Tooltip arrow color
        },
      },
    },

  },
});

export default theme;
