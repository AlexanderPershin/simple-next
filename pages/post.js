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

const Post = ({ post, author }) => {
  const classes = useStyles();

  return (
    <Container maxWidth='lg'>
      <Box my={4} className={classes.paperContainer}>
        <Paper
          elevation={3}
          className={clsx(classes.paper, classes.paperPosts)}
        >
          <Typography variant='h1' component='h1' gutterBottom>
            Post #{post.id}: {post.title}
          </Typography>
          <Typography variant='body1' gutterBottom>
            {post.body}
          </Typography>
          <Divider />
          <Link href={`/user?id=${author.id}`}>
            <Chip
              className={classes.author}
              avatar={
                <Avatar
                  alt={author.username}
                  src={`https://i.pravatar.cc/150?img=${author.id}`}
                />
              }
              label={author.name}
            />
          </Link>
        </Paper>
      </Box>
    </Container>
  );
};

Post.getInitialProps = async context => {
  const { pathname, query, asPath, req, res, err } = context;

  const host = process.env.HOSTNAME
    ? process.env.HOSTNAME
    : 'http://localhost:3000';

  const { id } = query;

  const response = await fetch(`${host}/api/posts?id=${id}`);
  const postData = await response.json();

  if (postData.data.userId) {
    const response2 = await fetch(`${host}/api/user/${postData.data.userId}`);
    const userData = await response2.json();
    return { post: postData.data, author: userData.data };
  }

  return { post: postData.data };
};

export default Post;
