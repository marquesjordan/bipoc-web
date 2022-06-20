import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { Provider as AuthProvider } from './context/authContext';

function App() {
  return (
    <div style={{ height: '100vh' }}>
      <AuthProvider>
        <Router>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              height: '100%',
            }}>
            <Navbar />
            <div style={{ height: '100%' }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
