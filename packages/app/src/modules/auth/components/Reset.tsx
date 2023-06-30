import styled from '@emotion/styled';
import {
  Alert as MuiAlert,
  Button as MuiButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField as MuiTextField,
} from '@mui/material';
import { spacing } from '@mui/system';
import { useAuthContext } from 'contexts/AuthContext';
import { Formik } from 'formik';
import Link from 'next/link';
import React from 'react';
import * as Yup from 'yup';

const Alert = styled(MuiAlert)`
  margin-top: 15px;
  margin-bottom: 15px;
`;

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

const Button = styled(MuiButton)<{ mt?: number }>(spacing);

function Reset() {
  const { resetPassword, loading, error } = useAuthContext();

  return (
    <Formik
      initialValues={{
        email: '',
        tenant: 'ras2023',
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      })}
      onSubmit={async (values) => {
        resetPassword({ email: values.email, tenant: values.tenant });
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue }) => (
        <form noValidate onSubmit={handleSubmit}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            type="email"
            name="email"
            label="Email Address"
            value={values.email}
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            onBlur={handleBlur}
            onChange={handleChange}
            my={2}
          />

          <FormControl id="tenant" fullWidth sx={{ margin: '1rem 0' }}>
            <InputLabel id="tenant">Tenant</InputLabel>
            <Select
              value={values.tenant}
              label="Tenant"
              id="tenant"
              labelId="tenant"
              onChange={(event) => setFieldValue('tenant', event.target.value as string)}
            >
              <MenuItem value={'senduku'}>senduku</MenuItem>
              <MenuItem value={'ras2023'}>ras2023</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            mt={2}
          >
            Reset
          </Button>
          <Link href="/login">
            <Button type="button" variant="text" fullWidth color="primary" mt={2}>
              Back to Login
            </Button>
          </Link>
        </form>
      )}
    </Formik>
  );
}

export default Reset;
