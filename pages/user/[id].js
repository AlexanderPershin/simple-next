import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import fetch from 'isomorphic-unfetch';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import theme from '../../src/theme';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import clsx from 'clsx';
import Link from 'next/link';

const useStyles = makeStyles(() =>
  createStyles({
    paperContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      flexWrap: 'wrap'
    },
    paper: {
      margin: theme.spacing(1),
      flexGrow: 1,
      minHeight: '100%',
      padding: theme.spacing(3),
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.secondary.contrastText,
      boxShadow: theme.shadows[5]
    },
    paperPosts: { flexGrow: 3 },
    chip: {
      height: 'auto',
      padding: theme.spacing(1),
      borderRadius: '100500px',
      fontSize: '2rem',
      marginBottom: theme.spacing(1),
      boxShadow: theme.shadows[3]
    },
    avatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      boxShadow: theme.shadows[3]
    },
    link: {
      color: 'inherit',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  })
);

const User = ({ data, posts }) => {
  const classes = useStyles();

  return (
    <Container maxWidth='lg'>
      <Box my={4} className={classes.paperContainer}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant='h1' component='h1' gutterBottom>
            User's #{data.id} page
          </Typography>
          <Chip
            className={classes.chip}
            avatar={
              <Avatar
                className={classes.avatar}
                alt={data.username}
                src={`https://i.pravatar.cc/150?img=${data.id}`}
              />
            }
            label={data.name}
          />

          <Typography variant='body1' gutterBottom>
            This is {data.name}'s page also known as {data.username}
          </Typography>
          <List component='nav' aria-label='main mailbox folders'>
            <ListItem button>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={data.email} />
            </ListItem>
            <a
              className={classes.link}
              target='_blank'
              href={`http://${data.website}`}
            >
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={data.website} />
              </ListItem>
            </a>
          </List>
          <ListItem button>
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <ListItemText primary={data.phone} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary={data.company.name} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <LocationCityIcon />
            </ListItemIcon>
            <ListItemText primary={data.address.city} />
          </ListItem>
        </Paper>
        <Paper
          elevation={3}
          className={clsx(classes.paper, classes.paperPosts)}
        >
          <Typography variant='h2' component='h2' gutterBottom>
            User's Posts
          </Typography>
          <List component='nav' aria-label='main mailbox folders'>
            {posts.map(item => (
              <Link key={item.title} href={`/post/${item.id}`}>
                <ListItem button>
                  <ListItemIcon>
                    <ArrowForwardIosIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  const usersData = await response.json();

  // Get the paths we want to pre-render based on posts
  const paths = usersData.map(user => `/user/${user.id}`);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users?id=${id}`
  );
  const userData = await response.json();
  const userHimself = userData[0];

  if (userHimself.id) {
    const response2 = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userHimself.id}`
    );
    const postsData = await response2.json();

    return { props: { data: userHimself, posts: postsData } };
  }

  return { data: userHimself };
}

export default User;
