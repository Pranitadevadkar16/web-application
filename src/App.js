import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import AdminPage from './pages/AdminPage/AdminPage';
import Navbar from './components/Shared/Navbar';
import { ProfilesProvider } from './context/ProfilesContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProfilesProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Router>
      </ProfilesProvider>
    </ThemeProvider>
  );
}

export default App;