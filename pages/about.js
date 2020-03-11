import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

export default function About() {
  return (
    <Container maxWidth='lg'>
      <Box my={4}>
        <Typography variant='h1' component='h1' gutterBottom>
          Next.js Simple app | About page
        </Typography>
      </Box>
    </Container>
  );
}
