import React, { useCallback } from 'react';
import {
  Alert,
  AlertTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Add as AddIcon, Create as CreateIcon, Delete as DeleteIcon } from '@mui/icons-material';
import useApi from '../../hooks/useApi'; // Import custom hook for fetching data
import { Loader } from '../../components/Loader'; // Import Loader component
import { deleteOne } from '../../apis'; // Import API function for deleting user
import { Link } from 'react-router-dom'; // Import Link component for navigation

// Define the UsersList component
export const UsersList = () => {
  const { loading, refetch, error, data } = useApi('/users'); // Fetch user data using the custom hook

  // Callback function for deleting a user
  const onDelete = useCallback(async (id) => {
    await deleteOne('users')(id); // Delete the user using the API function
    refetch(); // Refresh the data after deletion
  }, [refetch]);

  // Render loading indicator while data is being fetched
  if (loading) {
    return <Loader />;
  }

  // Render an error alert if there's an error fetching data
  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    );
  }

  // Render the user table once data is available
  return (
    <TableContainer sx={{ width: '70%', margin: 'auto' }} component={Paper}>
      {/* Button for adding a new user */}
      <IconButton to="/users/create" color="primary" sx={{ float: 'right' }} component={Link}>
        <AddIcon />
        <Typography component="h4"> Add User</Typography>
      </IconButton>
      {/* User table */}
      <Table sx={{ minWidth: 650 }} aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Map through the user data and display each user's information */}
          {data.map((row, index) => (
            <TableRow
              key={row._id} // Use a unique key for each row
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">
                {/* Button for editing a user */}
                <IconButton to={`/users/edit/${row._id}`} color="info" component={Link}>
                  <CreateIcon />
                </IconButton>
                {/* Button for deleting a user */}
                <IconButton onClick={() => onDelete(row._id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};