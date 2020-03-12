import React from 'react';
import Link from 'next/link';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import fetch from 'isomorphic-unfetch';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '100%',
      backgroundColor: theme.palette.background.paper
    },
    inline: {
      display: 'inline'
    }
  })
);

const Users = ({ users }) => {
  const classes = useStyles();

  return (
    <Container maxWidth='lg'>
      <Box my={4}>
        <Typography variant='h1' component='h1' gutterBottom>
          Next.js Simple app | Users page
        </Typography>
        <List className={classes.root}>
          {users.map(item => (
            <React.Fragment key={item.id}>
              <Link href={`/user?id=${item.id}`}>
                <ListItem alignItems='flex-start'>
                  <ListItemAvatar>
                    <Avatar
                      alt='Remy Sharp'
                      src={`https://i.pravatar.cc/150?img=${item.id}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`User id: ${item.id}`}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component='span'
                          variant='body2'
                          className={classes.inline}
                          color='textPrimary'
                        >
                          {item.name}. Currently lives in {item.address.city}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </Link>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Container>
  );
};

Users.getInitialProps = async context => {
  const { pathname, query, asPath, req, res, err } = context;

  const host = process.env.HOSTNAME
    ? process.env.HOSTNAME
    : 'http://localhost:3000';

  const response = await fetch(`${host}/api/users`);

  const data = await response.json();

  return { users: data.data };
};

export default Users;
