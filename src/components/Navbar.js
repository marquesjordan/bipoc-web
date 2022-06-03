import React, { useContext } from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../context/authContext';

function Navbar() {
  let navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const onLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: '#5B6BBF' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="div">
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              BIPOC
            </Link>
          </Typography>
          <Box alignItems="right" sx={{ flexGrow: 1, textAlign: 'right' }}>
            {user ? (
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
