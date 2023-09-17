import React from 'react';
import { Box } from '@mui/material';
import { Header } from './Header'; // Import the Header component
import { Outlet } from 'react-router-dom'; // Import the Outlet component for nested routes

// Define the Layout component, which serves as the overall layout for your application
export const Layout = () => (
  <Box>
    <Header /> {/* Render the Header component for the application's header */}
    <Box margin={2}>
      <Outlet /> {/* Render the Outlet component for rendering nested routes */}
    </Box>
  </Box>
);
