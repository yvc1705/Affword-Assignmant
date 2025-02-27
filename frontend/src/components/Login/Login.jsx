import React from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';

function Login() {
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField label="Username" fullWidth margin="normal" />
      <TextField label="Password" type="password" fullWidth margin="normal" />
      <Button variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </Container>
  );
}

export default Login;
