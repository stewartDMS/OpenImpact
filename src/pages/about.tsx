import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About - Open Impact</title>
        <meta name="description" content="Learn about Open Impact's mission to drive social and environmental change through open data." />
      </Head>
      
      <Box sx={{ py: 4, minHeight: 'calc(100vh - 64px)' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom align="center" fontWeight={700}>
            About Open Impact
          </Typography>
          
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
            Empowering positive change through open data and collaboration
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 4, height: '100%' }}>
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  Our Mission
                </Typography>
                <Typography variant="body1" paragraph>
                  Open Impact is dedicated to democratizing access to social and environmental data, 
                  enabling organizations and individuals to make informed decisions that drive positive change.
                </Typography>
                <Typography variant="body1">
                  We believe that transparency and open collaboration are key to addressing the world&apos;s 
                  most pressing challenges, from climate change to social inequality.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 4, height: '100%' }}>
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  Our Vision
                </Typography>
                <Typography variant="body1" paragraph>
                  We envision a world where impact data is accessible, standardized, and actionable, 
                  enabling every organization to measure and improve their social and environmental footprint.
                </Typography>
                <Typography variant="body1">
                  Through open-source tools and community-driven insights, we&apos;re building the infrastructure 
                  for a more sustainable and equitable future.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom fontWeight={600} align="center">
                  What We Do
                </Typography>
                <Grid container spacing={3} sx={{ mt: 2 }}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="h6" gutterBottom>
                      Data Curation
                    </Typography>
                    <Typography variant="body2">
                      We collect, clean, and standardize impact data from various sources, 
                      making it accessible through our platform.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="h6" gutterBottom>
                      Analytics & Insights
                    </Typography>
                    <Typography variant="body2">
                      Our AI-powered analytics help organizations understand their impact 
                      and identify opportunities for improvement.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="h6" gutterBottom>
                      Community Building
                    </Typography>
                    <Typography variant="body2">
                      We foster a community of changemakers who share knowledge, 
                      best practices, and collaborate on impact initiatives.
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}