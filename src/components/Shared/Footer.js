import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 3, bgcolor: 'primary.main', color: 'white', mt: 'auto' }}>
      <Typography variant="body1" align="center">
        © {new Date().getFullYear()} Profile Explorer
      </Typography>
    </Box>
  );
};

export default Footer;