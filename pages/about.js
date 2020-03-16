import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

const About = props => {
  return (
    <Container maxWidth='lg'>
      <Box my={4}>
        <Typography variant='h1' component='h1' gutterBottom>
          About this website
        </Typography>
        <Typography variant='body1' gutterBottom>
          This demo website was made using Next.js | Material-UI
        </Typography>{' '}
        <Link
          href='https://alexanderpershin.github.io/portfolio'
          target='_blank'
        >
          <Button
            variant='contained'
            color='primary'
            endIcon={<AssignmentIndIcon />}
          >
            My Portfolio
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default About;
