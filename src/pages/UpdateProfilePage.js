import { useEffect, useContext, useCallback } from 'react';
import styled from 'styled-components';
import ProfileForm from '../components/ProfileForm';
import { Context as AuthContext } from '../context/authContext';
import { Context as ProfileContext } from '../context/profileContext';
import { Container } from '@mui/system';

const UpdateProfilePage = () => {
  const { state: auth } = useContext(AuthContext);
  const { state, getProfile } = useContext(ProfileContext);

  const onLoad = useCallback(() => {
    getProfile();
  });

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <Container>
      <ProfileForm />
    </Container>
  );
};

export default UpdateProfilePage;

const Header = styled.h1``;
