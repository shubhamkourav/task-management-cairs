import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Link } from 'react-router-dom';

// Define a function for creating the reusable icon box
const IconBox = ({ icon, text, to }) => (
  <Box
    sx={{
      width: '25%',
      height: '25%',
      textAlign: 'center',
      textDecoration: 'none',
    }}
    to={to}
    component={Link}
  >
    <Paper elevation={2}>
      {icon}
      <Typography variant="h3" component="h4">
        {text}
      </Typography>
    </Paper>
  </Box>
);

// Define the Home component
export const Home = () => (
  <Box spacing={2} display="flex" justifyContent="space-around" alignItems="center">
    {/* Render the User icon box */}
    <IconBox
      icon={<GroupIcon color="inherit" fontSize="large" sx={{ width: '100%', height: '50%' }} />}
      text="Users"
      to="/users"
    />

    {/* Render the Tasks icon box */}
    <IconBox
      icon={<FormatListBulletedIcon fontSize="large" sx={{ width: '100%', height: '50%' }} />}
      text="Tasks"
      to="/tasks"
    />
  </Box>
);
