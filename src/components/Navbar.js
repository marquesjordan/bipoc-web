import React, { useContext, useEffect } from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Context as AuthContext } from '../context/authContext';
import { styled } from '@mui/material/styles';
import { useCookies } from 'react-cookie';
import { Container } from '@mui/system';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'space-between',
}));

function Navbar() {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['token']);
  const { state, verify, logout } = useContext(AuthContext);

  // useEffect(() => {
  //   console.log('ll ', state);
  //   if (!state.token) {
  //     console.log('COOOKY ', cookies['token']);
  //     verify(cookies['token']);
  //   }s
  // }, []);

  const onLogout = () => {
    setCookie('token', null);
    logout(navigateLogin);
  };

  function navigateLogin() {
    navigate('/login');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar component="nav" style={{ backgroundColor: '#5B6BBF' }}>
        <Container>
          <StyledToolbar sx={{ p: 0 }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            {/* <Typography variant="h5" component="div">
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              BIPOC
            </Link>
          </Typography> */}
            {/* <IconButton
            size="large"
            aria-label="display more actions"
            edge="end"
            color="inherit">
            <MoreIcon />
          </IconButton> */}
            <Box alignItems="right" sx={{ flexGrow: 1, textAlign: 'right' }}>
              {state.token ? (
                <Button
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                    marginRight: 10,
                  }}
                  onClick={onLogout}>
                  LOGOUT
                </Button>
              ) : (
                <>
                  <Link
                    to="/login"
                    style={{
                      textDecoration: 'none',
                      color: 'white',
                      marginRight: 10,
                    }}>
                    LOGIN
                  </Link>
                  <Link
                    to="/register"
                    style={{ textDecoration: 'none', color: 'white' }}>
                    REGISTER
                  </Link>
                </>
              )}
            </Box>
          </StyledToolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Navbar;
