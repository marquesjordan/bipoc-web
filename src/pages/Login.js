import React, { useContext, useState } from 'react';
import { Context as AuthContext } from '../context/authContext';
import { useForm } from '../hooks/form';
import { useNavigate } from 'react-router-dom';

import { TextField, Button, Container, Stack, Alert } from '@mui/material';

function Login(props) {
  let navigate = useNavigate();
  const { state, loginUser } = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  function loginUserCallBack(values) {
    console.log('login Called');
    loginUser(values);
  }

  const { onChange, onSubmit, values } = useForm(loginUserCallBack, {
    email: '',
    password: '',
  });

  return (
    <Container spacing={2} maxWidth="sm">
      <h3>Login</h3>
      <p>This is the login page, login below</p>
      <Stack spacing={2} paddingBottom={2}>
        <TextField label="Email" name="email" onChange={onChange} />
        <TextField
          label="Password"
          name="password"
          type="password"
          onChange={onChange}
        />
      </Stack>
      {errors.map(function (error) {
        return <Alert severity="error">{error.message}</Alert>;
      })}
      <Button variant="contained" onClick={onSubmit}>
        Login
      </Button>
    </Container>
  );
}

export default Login;
