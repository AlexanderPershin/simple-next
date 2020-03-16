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
import theme from '../../src/theme';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
    },
    commentItem: {
      boxShadow: theme.shadows[3],
      marginBottom: theme.spacing(1),
      minHeight: theme.spacing(10),
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.shape.borderRadius
    }
  })
);

const Post = ({ post, author, comments }) => {
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
          <Link href={`/user/${author.id}`}>
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
        <Paper
          elevation={3}
          className={clsx(classes.paper, classes.paperPosts)}
        >
          <Typography variant='h3' gutterBottom>
            Comments:
          </Typography>
          <List className={classes.root}>
            {comments.map(item => (
              <ListItem
                key={item.id}
                alignItems='flex-start'
                className={classes.commentItem}
              >
                <ListItemText
                  primary={item.body}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component='span'
                        variant='body2'
                        className={classes.inline}
                        color='textPrimary'
                      >
                        {item.email}
                      </Typography>
                      {` — ${item.name}`}
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const postData = await response.json();

  // Get the paths we want to pre-render based on posts
  const paths = postData.map(post => `/post/${post.id}`);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?id=${id}`
  );
  const postData = await response.json();
  const postItself = postData[0];

  if (postItself.userId) {
    const response2 = await fetch(
      `https://jsonplaceholder.typicode.com/users?id=${postItself.userId}`
    );
    const userData = await response2.json();
    const userHimself = userData[0];

    const response3 = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postItself.id}`
    );
    const commentsData = await response3.json();

    return {
      props: { post: postItself, author: userHimself, comments: commentsData }
    };
  }

  return { post: postItself };
}

export default Post;
