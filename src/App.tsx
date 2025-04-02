import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <AuthProvider>
          <ProfileProvider>
            <Router>
              <NavBar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/admin" element={<AdminPage />} />
                </Route>
              </Routes>
            </Router>
          </ProfileProvider>
        </AuthProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;