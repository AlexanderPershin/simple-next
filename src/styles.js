import { makeStyles } from '@material-ui/core/styles';
import theme from './theme';

const drawerWidth = 240;

export default makeStyles(() => ({
  '@global': {
    'html, body, #__next': {
      height: '100%'
    },
    'body::-webkit-scrollbar': {
      width: theme.spacing(2)
    },
    'body::-webkit-scrollbar-track': {
      backgroundColor: theme.palette.primary.main,
      borderLeft: `1px solid ${theme.palette.primary.light}`
    },
    'body::-webkit-scrollbar-thumb': {
      backgroundColor: `rgba(255,255,255,0)`,
      borderTop: `3px solid ${theme.palette.background.default}`,
      borderBottom: `3px solid ${theme.palette.background.default}`,
      transition: theme.transitions.create(),
      '&:hover': {
        backgroundColor: `rgba(255,255,255,0.1)`
      },
      '&:active': {
        backgroundColor: `rgba(255,255,255,0.2)`
      }
    }
  },
  logo: { color: theme.palette.primary.contrastText },
  githubIcon: {
    justifySelf: 'flex-end'
  },
  root: {
    display: 'flex',
    height: '100%'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    boxShadow: theme.shadows[10]
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[10]
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  menuLink: {
    color: theme.palette.text.primary
  },
  activeLink: {
    color: theme.palette.primary.main,
    textDecoration: 'line-through',
    '&:hover': {
      textDecoration: 'line-through'
    }
  },
  toTop: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));
