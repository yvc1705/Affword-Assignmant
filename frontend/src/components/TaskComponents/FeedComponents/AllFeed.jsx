import React from 'react';
import { Container, Typography } from '@mui/material';

function AllFeed() {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h3" gutterBottom>
        Feed
      </Typography>
      <Typography variant="body1">
        Welcome to the Feed section. Here you can see the latest updates!
      </Typography>
    </Container>
  );
}

export default AllFeed;
