import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { create, getOne, update } from '../../apis';
import { Loader } from '../../components/Loader';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import useApi from '../../hooks/useApi';

// Define validation schema using Yup
const validationSchema = yup.object({
  title: yup.string('Enter your name').required('Name is required'),
  description: yup
    .string('Enter your description')
    .min(10, 'Description should be at least 10 characters long')
    .required('Description is required'),
  user: yup.string('Select a user').required('User is required'),
});

export const TasksForm = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);
  const { data: users } = useApi('/users');

  // Create a Formik form instance
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      user: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        // Perform an update or create operation based on the presence of an ID
        const res = id ? await update('tasks')(id, values) : await create('tasks')(values);
        setLoading(false);
        // Redirect to the tasks page after successful submission
        if ((id && res.status === 200) || (!id && res.status === 201)) {
          navigate('/tasks');
        }
      } catch (error) {
        setError(error.response?.data?.error || error.message);
        setLoading(false);
      }
    },
  });

  // Fetch task data if editing an existing task
  useEffect(() => {
    if (id) {
      (async function () {
        try {
          setFormLoading(true);
          // Fetch task data by ID and populate the form
          const { data } = await getOne('tasks')(id);
          formik.setValues({
            title: data.title,
            description: data.description,
            user: data.user._id,
          });
          setFormLoading(false);
        } catch (error) {
          setError(error.response?.data?.error || error.message);
          setFormLoading(false);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // If form is still loading, display a loader
  if (formLoading) {
    return <Loader />;
  }

  // If there's an error and an ID (edit mode), display an error alert
  if (error && id) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    );
  }

  return (
    <Box as={Paper} sx={{ width: '30%', padding: 10, margin: 'auto' }}>
      <Typography variant="h5" sx={{ my: 2 }} component={'h5'}>
        {id ? 'Update' : 'Add'} Task
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Title"
          value={formik.values.title}
          sx={{ marginBottom: 2 }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          fullWidth
          id="description"
          name="description"
          label="Description"
          rows={3}
          sx={{ marginBottom: 2 }}
          readOnly={true}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <FormControl fullWidth>
          <InputLabel id="user-select-label">User</InputLabel>
          <Select
            labelId="user-select-label"
            id="user-select"
            name="user"
            label="User"
            value={formik.values.user}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.user && Boolean(formik.errors.user)}
          >
            {users?.map(({ _id, name }) => (
              <MenuItem key={_id} value={_id}>
                {name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error>{formik.touched.user && formik.errors.user}</FormHelperText>
        </FormControl>
        <Button
          disabled={loading || (error && id)}
          sx={{ marginTop: 3, marginLeft: '40%' }}
          color="primary"
          variant="outlined"
          type="submit"
        >
          {loading ? <CircularProgress /> : 'Submit'}
        </Button>
      </form>
    </Box>
  );
};
