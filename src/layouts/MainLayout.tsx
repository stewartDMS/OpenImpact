import React from 'react';
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import GitHubIcon from '@mui/icons-material/GitHub';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)',
  boxShadow: theme.shadows[2],
}));

const Footer = styled(Box)(({ theme }) => ({
  marginTop: 'auto',
  backgroundColor: '#222',
  color: '#fff',
  textAlign: 'center',
  padding: theme.spacing(3, 0),
  fontSize: '1rem',
  letterSpacing: '0.5px',
}));

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  title = 'Open Impact' 
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* App Bar */}
      <StyledAppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
            sx={{ mr: 2 }}
          >
            <EnergySavingsLeafIcon />
          </IconButton>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            {title}
          </Typography>
          
          <Button 
            color="inherit" 
            startIcon={<GitHubIcon />}
            href="https://github.com/stewartDMS/OpenImpact"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Button>
        </Toolbar>
      </StyledAppBar>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Container maxWidth="lg">
          {children}
        </Container>
      </Box>

      {/* Footer */}
      <Footer>
        © {new Date().getFullYear()} Open Impact &middot; Empowering Social and Environmental Change
      </Footer>
    </Box>
  );
};

export default MainLayout;