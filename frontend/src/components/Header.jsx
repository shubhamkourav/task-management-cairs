import React from 'react';
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link, useHref } from 'react-router-dom';

// Define an array of navigation items with their associated paths
const navigationItems = [
  { navItem: 'home', navPath: '/' },
  { navItem: 'users', navPath: '/users' },
  { navItem: 'tasks', navPath: '/tasks' },
];

// NavButton is a reusable component for rendering navigation buttons
const NavButton = ({ navPath, navItem, activeNav }) => (
  <Button
    to={navPath}
    sx={{
      // Adjust brightness for active navigation items
      backdropFilter: `brightness(${(activeNav.includes(navItem)) ? 1.1 : 1})`,
      textTransform: 'capitalize', // Capitalize the button text
      marginInline: 0.5, // Add some margin to the button
    }}
    color="inherit" // Inherit text color from the parent element
    LinkComponent={Link} // Use the Link component from react-router-dom for navigation
  >
    {navItem} {/* Display the navigation item text */}
  </Button>
);

// Header component that includes the navigation bar
export const Header = () => {
  const activeNav = useHref(); // Get the currently active navigation link

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <AssignmentIcon /> {/* Display an icon */}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Management {/* Display the title */}
          </Typography>
          {/* Render navigation buttons using the NavButton component */}
          {navigationItems.map(({ navItem, navPath }) => (
            <NavButton key={navItem} navItem={navItem} navPath={navPath} activeNav={activeNav} />
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
