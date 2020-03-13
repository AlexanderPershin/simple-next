import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import fetch from 'isomorphic-unfetch';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Link from 'next/link';
import theme from '../src/theme';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

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
    author: {
      marginTop: theme.spacing(2),
      cursor: 'pointer',
      borderRadius: '100500px',
      padding: '5px'
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

const Posts = ({ posts }) => {
  const classes = useStyles();

  return (
    <Container maxWidth='lg'>
      <Box my={4} className={classes.paperContainer}>
        <Paper
          elevation={3}
          className={clsx(classes.paper, classes.paperPosts)}
        >
          <List component='nav' aria-label='main mailbox folders'>
            {posts.map(item => (
              <Link key={item.title} href={`/post?id=${item.id}`}>
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

Posts.getInitialProps = async context => {
  const { pathname, query, asPath, req, res, err } = context;

  const host = process.env.HOSTNAME
    ? process.env.HOSTNAME
    : 'http://localhost:3000';

  const response = await fetch(`${host}/api/posts`);
  const postData = await response.json();

  return { posts: postData.data };
};

export default Posts;
