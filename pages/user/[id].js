import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import fetch from 'isomorphic-unfetch';

const User = ({ data }) => {
  return (
    <Container maxWidth='lg'>
      <Box my={4}>
        <Typography variant='h1' component='h1' gutterBottom>
          Next.js Simple app | User {data.id} page
        </Typography>
        <Typography variant='h2' component='h2' gutterBottom>
          This is {data.name}'s page also known as {data.username}
        </Typography>
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

  const data = await response.json();
  return { data };
};

export default User;
