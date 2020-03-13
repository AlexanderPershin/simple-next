import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import fetch from 'isomorphic-unfetch';

const About = props => {
  return (
    <Container maxWidth='lg'>
      <Box my={4}>
        <Typography variant='h1' component='h1' gutterBottom>
          About page
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
