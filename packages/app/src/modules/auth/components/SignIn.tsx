import styled from '@emotion/styled';
import {
  Alert as MuiAlert,
  Button as MuiButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField as MuiTextField,
  Typography,
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

const SecondaryText = styled(Typography)`
  margin-top: 1rem;

  a {
    color: grey;
    text-decoration: underline;
  }
`;

function SignIn() {
  const { login, loading, error, setError } = useAuthContext();

  const closeAlert = () => setError(null);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        tenant: 'ras2023',
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required'),
      })}
      onSubmit={(values) => {
        login({
          username: values.email,
          password: values.password,
          tenant: values.tenant,
        });
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue }) => (
        <form noValidate onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" onClose={closeAlert}>
              {error}
            </Alert>
          )}
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
          <TextField
            type="password"
            name="password"
            label="Password"
            value={values.password}
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
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

          <ResetText variant="body1">
            Forgot password? <Link href="/reset-password">Click here</Link>
          </ResetText>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            mt={2}
          >
            Sign in
          </Button>

          <SecondaryText variant="body2" color="grey">
            By continuing, you agree and accept our <Link href={'#'}>Terms and Conditions</Link> and{' '}
            <Link href={'#'}>Privacy Policy</Link>.
          </SecondaryText>
        </form>
      )}
    </Formik>
  );
}

const ResetText = styled(Typography)`
  margin-bottom: 1rem;
`;

export default SignIn;
