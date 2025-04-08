import React from 'react';
import ReactDOM from 'react-dom/client';
// import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import theme from './styles/theme';
import { ProfilesProvider } from './context/ProfilesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ProfilesProvider>
          <App />
        </ProfilesProvider>
      </ThemeProvider>
    </>
  </React.StrictMode>
);