import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import fetch from 'isomorphic-unfetch';
import Avatar from '@material-ui/core/Avatar';
import theme from '../src/theme';

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      minHeight: '100%',
      padding: theme.spacing(3),
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.secondary.contrastText,
      boxShadow: theme.shadows[5]
    },
    avatar: {
      width: theme.spacing(10),
      height: theme.spacing(10)
    }
  })
);

const User = ({ data }) => {
  const classes = useStyles();

  return (
    <Container maxWidth='lg'>
      <Box my={4}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant='h1' component='h1' gutterBottom>
            User's {data.id} page
          </Typography>
          <Avatar
            className={classes.avatar}
            alt={data.username}
            src={`https://i.pravatar.cc/150?img=${data.id}`}
          />
          <Typography variant='body1' gutterBottom>
            This is {data.name}'s page also known as {data.username}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

User.getInitialProps = async context => {
  const { pathname, query, asPath, req, res, err } = context;

  const host = process.env.HOSTNAME
    ? process.env.HOSTNAME
    : 'http://localhost:3000';

  const { id } = query;

  const response = await fetch(`${host}/api/user/${id}`);

  const userData = await response.json();

  return { data: userData.data };
};

export default User;
