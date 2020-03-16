import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6f84a0',
      main: '#305985',
      dark: '#576b85'
    },
    secondary: {
      light: '#5eb37a',
      main: '#14614b',
      dark: '#11484c',
      contrastText: '#f8f0bb'
    },
    error: {
      main: '#eba557'
    },
    background: {
      default: '#f8f0bb',
      dark: '#dbd293',
      paper: '#f8f0bb'
    }
  },
  typography: {
    h1: {
      fontSize: '3.5rem'
    },
    h2: {
      fontSize: '3rem'
    },
    h3: {
      fontSize: '2.5rem'
    },
    h4: {
      fontSize: '2rem'
    },
    h5: {
      fontSize: '1.8rem'
    }
  }
});

export default theme;
