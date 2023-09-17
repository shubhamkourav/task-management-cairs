import React, { useEffect, useState } from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { create, getOne, update } from '../../apis';
import { Loader } from '../../components/Loader';

// Define validation schema using Yup
const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  name: yup.string('Enter your name').min(3, 'Name should be at least 3 characters long').required('Name is required'),
});

export const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create a Formik form instance
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        // Perform an update or create operation based on the presence of an ID
        const res = id ? await update('users')(id, values) : await create('users')(values);
        setLoading(false);
        // Redirect to the users' page after successful submission
        if ((id && res.status === 200) || (!id && res.status === 201)) {
          navigate('/users');
        }
      } catch (error) {
        setError(error.response?.data?.error || error.message);
        setLoading(false);
      }
    },
  });

  // Fetch user data if editing an existing user
  useEffect(() => {
    if (id) {
      (async function () {
        try {
          // Fetch user data by ID and populate the form
          const { data } = await getOne('users')(id);
          formik.setValues({
            name: data.name,
            email: data.email,
          });
        } catch (error) {
          setError(error.response?.data?.error || error.message);
        }
      })();
    }
  }, [id]);

  // If loading, display a loader
  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      <Box as={Paper} sx={{ width: '30%', padding: 10, margin: 'auto' }}>
        <Typography variant="h5" sx={{ my: 2 }} component="h5">
          {id ? 'Update' : 'Add'} User
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            sx={{ marginBottom: 2 }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            readOnly={!!id} // Make the email field read-only when editing
            value={formik.values.email}
            disabled={!!id} // Disable the email field when editing
            onChange={!id && formik.handleChange} // Allow changing the email only when creating
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
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
    </Container>
  );
};
