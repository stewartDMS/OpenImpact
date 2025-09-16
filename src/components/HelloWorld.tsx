import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: '#fff',
  boxShadow: theme.shadows[4],
  borderRadius: theme.spacing(2),
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

interface HelloWorldProps {
  name?: string;
  message?: string;
}

const HelloWorld: React.FC<HelloWorldProps> = ({ 
  name = 'World', 
  message = 'Welcome to Open Impact!' 
}) => {
  return (
    <Box sx={{ p: 2 }}>
      <StyledCard>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
            Hello, {name}!
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            {message}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>
            This is an example component using Material-UI with styled components.
          </Typography>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default HelloWorld;