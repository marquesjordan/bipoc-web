import React, { useContext, useState, useEffect } from 'react';
import { Context as AuthContext } from '../context/authContext';
import { useForm } from '../hooks/form';
import { useNavigate } from 'react-router-dom';
import AuthContainer from '../components/AuthContainer';

import {
  TextField,
  Button,
  Container,
  Stack,
  Alert,
  Link,
} from '@mui/material';
import styled from 'styled-components';

function Register(props) {
  let navigate = useNavigate();
  const { state, registerUser } = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (state.token) {
      navigate('/', { replace: true });
    }
  }, [state, navigate]);

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
    <AuthContainer background="https://cdn.cybersn.com/images/christina-wocintechchat-com-ioGkluYGy38-unsplash-1-1024x684.jpg">
      <Container spacing={2} maxWidth="sm" style={{ textAlign: 'center' }}>
        <img src="bipoclogo.png" alt="logo" />
        <HeadingContainer>
          <Title>BIPOC APP ORGANIZATION</Title>
          <Welcome>Thank you for joining our community!</Welcome>
        </HeadingContainer>

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
        <Button
          variant="contained"
          onClick={onSubmit}
          size="large"
          style={{
            width: '100%',
            background: '#9A52F7',
            paddingTop: 12,
            paddingBottom: 12,
          }}>
          Register
        </Button>
        <Spacer />
        <Link href="/login">Already a member? Sign in here.</Link>
      </Container>
    </AuthContainer>
  );
}

export default Register;

const HeadingContainer = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  color: #ad47d6;
  font-size: 40px;
`;

const Welcome = styled.p`
  font-weight: 600;
  font-size: 24px;
`;

const Spacer = styled.div`
  padding: 5px;
`;
