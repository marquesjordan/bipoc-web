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

function Login(props) {
  let navigate = useNavigate();
  const { state, loginUser } = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (state.token) {
      navigate('/', { replace: true });
    }
  }, [state, navigate]);

  function loginUserCallBack(values) {
    console.log('login Called');
    loginUser(values);
  }

  const { onChange, onSubmit, values } = useForm(loginUserCallBack, {
    email: '',
    password: '',
  });

  return (
    <AuthContainer background="https://www.betterteam.com/images/betterteam-diversity-vs-inclusion-in-the-workplace-4000x2667-20201117.jpeg?crop=1:1,smart&width=1200&dpr=2">
      <Container spacing={2} maxWidth="sm" style={{ textAlign: 'center' }}>
        <img src="bipoclogo.png" alt="logo" />
        <HeadingContainer>
          <Title>BIPOC APP ORGANIZATION</Title>
          <Welcome>Welcome Back! Please sign in.</Welcome>
        </HeadingContainer>

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
        <Spacer />

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
          Login
        </Button>
        <Spacer />
        <Link href="#">Forgot Password?</Link>
        <Spacer />
        <Link href="/register">Brand new? Sign up here.</Link>
      </Container>
    </AuthContainer>
  );
}

export default Login;

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
