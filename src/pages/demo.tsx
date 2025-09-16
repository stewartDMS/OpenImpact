import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import MainLayout from '../layouts/MainLayout';
import HelloWorld from '../components/HelloWorld';
import { formatDate } from '../utils/formatDate';
import { useIsMounted } from '../hooks/useIsMounted';

const DemoPage: React.FC = () => {
  const isMounted = useIsMounted();
  const currentDate = new Date();

  return (
    <MainLayout title="Open Impact - Demo">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center" fontWeight={700}>
          Component Demo
        </Typography>
        
        <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Demonstrating the new project structure with example components
        </Typography>

        <Grid container spacing={4}>
          {/* HelloWorld Component Demo */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                HelloWorld Component
              </Typography>
              <HelloWorld name="Developer" message="Welcome to the restructured Open Impact!" />
            </Paper>
          </Grid>

          {/* Utility Functions Demo */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Date Formatting Utilities
              </Typography>
              <Box sx={{ '& > div': { mb: 1 } }}>
                <div><strong>Short:</strong> {formatDate(currentDate, 'short')}</div>
                <div><strong>Long:</strong> {formatDate(currentDate, 'long')}</div>
                <div><strong>Numeric:</strong> {formatDate(currentDate, 'numeric')}</div>
                <div><strong>ISO:</strong> {formatDate(currentDate, 'iso')}</div>
                <div><strong>Relative:</strong> {formatDate(currentDate, 'relative')}</div>
              </Box>
            </Paper>
          </Grid>

          {/* Hooks Demo */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Custom Hooks
              </Typography>
              <Typography variant="body1">
                Component mounted status: <strong>{isMounted() ? 'Mounted' : 'Not Mounted'}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                The useIsMounted hook helps prevent memory leaks by checking if components are still mounted before state updates.
              </Typography>
            </Paper>
          </Grid>

          {/* API Client Demo */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                API Client
              </Typography>
              <Typography variant="body1" gutterBottom>
                Enhanced API client available with the following features:
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <li>TypeScript support with proper typing</li>
                <li>Automatic timeout handling</li>
                <li>Centralized error handling</li>
                <li>Request/response interceptors</li>
                <li>RESTful methods (GET, POST, PUT, DELETE, PATCH)</li>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default DemoPage;