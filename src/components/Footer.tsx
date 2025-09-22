import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 3,
        bgcolor: '#222',
        color: '#fff',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Open Impact · Empowering Social and Environmental Change
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;