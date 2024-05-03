'use client';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// TODO: Just a placeholder theme for now
const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
  zIndex: {
    appBar: 1201, // default is 1100
    drawer: 1200, // default
  }
});

export default theme;