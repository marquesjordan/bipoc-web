import './App.css';
import { useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import CreatePostPage from './pages/CreatPostPage';
import Navbar from './components/Navbar';
import { Provider as AuthProvider } from './context/authContext';
import { Provider as PostProvider } from './context/postContext';
import { CookiesProvider } from 'react-cookie';
import Box from '@mui/material/Box';

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <CookiesProvider>
          <Router>
            <Navbar />
            <Box component="main" sx={{ p: 3, mt: 5 }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/new-post" element={<CreatePostPage />} />
              </Routes>
            </Box>
          </Router>
        </CookiesProvider>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;
