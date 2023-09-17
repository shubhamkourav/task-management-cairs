import React, { useCallback } from 'react'
import { Alert, AlertTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Add as AddIcon, Create as CreateIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import useApi from '../../hooks/useApi'
import { deleteOne } from '../../apis';

export const TasksList = () => {
  const { loading, refetch, error, data } = useApi('/tasks')

  const onDelete = useCallback(async (id) => {
    await deleteOne('tasks')(id)
    refetch()
  }, [refetch])

  if (loading) {
    return <Loader />
  }
  if (error) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    )
  }
  return (
    <TableContainer sx={{ width: '70%', margin: 'auto' }} component={Paper}>
      <IconButton to={'/tasks/create'} color='primary' sx={{ float: 'right' }} LinkComponent={Link}>
        <AddIcon />
        <Typography component={'h4'}> Add Task</Typography>
      </IconButton>
      <Table sx={{ minWidth: 650 }} aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">User</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => {
            return <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="left">{row.title}</TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="left">{row.user.name}</TableCell>
              <TableCell align="left">
                <IconButton to={`/tasks/edit/${row._id}`} color='info' LinkComponent={Link}>
                  <CreateIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(row._id)} color='error'>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

