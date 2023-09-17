import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

// Define the PageNotFound component, which displays a "Page not found" message
export const PageNotFound = () => (
  <Container>
    <Box
      display="grid"
      justifyContent="center"
      alignItems="center"
      marginTop="25%" 
      textAlign="center" 
    >
      <Typography variant="h1" component="h1">
        Oops....... 
      </Typography>
      <Typography variant="h2" component="h2">
        Page not found
      </Typography>
      <Button
        to="/" // Define the target URL for the "Back to Home" button
        size="medium"
        sx={{
          margin: '20px auto', 
        }}
        component={Link} // Use the "Link" component from react-router-dom
        variant="outlined"
        startIcon={<ArrowBackIcon />}
      >
        Back to Home 
      </Button>
    </Box>
  </Container>
);
