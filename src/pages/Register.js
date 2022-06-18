import React, { useContext, useState } from 'react';
import { Context as AuthContext } from '../context/authContext';
import { useForm } from '../hooks/form';
import { useNavigate } from 'react-router-dom';

import { TextField, Button, Container, Stack, Alert } from '@mui/material';

function Register(props) {
  const { state, registerUser } = useContext(AuthContext);
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  function registerUserCallback(values) {
    registerUser(values);
  }

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  return (
    <Container spacing={2} maxWidth="sm">
      <h3>Register</h3>
      <p>This is the register page, register below to create an account!</p>
      <Stack spacing={2} paddingBottom={2}>
        <TextField label="name" name="name" onChange={onChange} />
        <TextField label="Email" name="email" onChange={onChange} />
        <TextField
          label="Password"
          name="password"
          type="password"
          onChange={onChange}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          onChange={onChange}
        />
      </Stack>
      {errors.map(function (error) {
        return <Alert severity="error">{error.message}</Alert>;
      })}
      <Button variant="contained" onClick={onSubmit}>
        Register
      </Button>
    </Container>
  );
}

export default Register;
