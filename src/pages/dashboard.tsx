import { Box, Container, Typography, Grid, Paper, Card, CardContent } from '@mui/material';
import Head from 'next/head';
import InsightsIcon from '@mui/icons-material/Insights';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import PeopleIcon from '@mui/icons-material/People';

const mockStats = [
  {
    title: 'Total Impact Score',
    value: '85.2',
    icon: <InsightsIcon sx={{ fontSize: 40 }} />,
    color: 'primary.main',
    change: '+12%'
  },
  {
    title: 'Environmental Score',
    value: '78.5',
    icon: <EnergySavingsLeafIcon sx={{ fontSize: 40 }} />,
    color: 'success.main',
    change: '+8%'
  },
  {
    title: 'Social Impact',
    value: '92.1',
    icon: <PeopleIcon sx={{ fontSize: 40 }} />,
    color: 'secondary.main',
    change: '+15%'
  },
  {
    title: 'Growth Trend',
    value: '↗ 23%',
    icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
    color: 'info.main',
    change: 'This quarter'
  }
];

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard - Open Impact</title>
        <meta name="description" content="View and analyze your organization's impact metrics and insights." />
      </Head>
      
      <Box sx={{ py: 4, minHeight: 'calc(100vh - 64px)', bgcolor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
            Impact Dashboard
          </Typography>
          
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Track your organization&apos;s social and environmental impact metrics
          </Typography>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {mockStats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card elevation={2} sx={{ height: '100%' }}>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ color: stat.color, mb: 2 }}>
                      {stat.icon}
                    </Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="caption" color="success.main" fontWeight={600}>
                      {stat.change}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Main Content Areas */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  Recent Activity
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Your impact dashboard is currently being set up. Here you will see:
                </Typography>
                <Box component="ul" sx={{ pl: 3, mt: 2 }}>
                  <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                    Real-time impact metrics and KPIs
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                    Interactive charts and visualizations
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                    Benchmarking against industry standards
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                    AI-generated insights and recommendations
                  </Typography>
                </Box>
              </Paper>

              <Paper elevation={2} sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  Impact Trends
                </Typography>
                <Box sx={{ 
                  height: 200, 
                  bgcolor: '#f9f9f9', 
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Typography variant="body1" color="text.secondary">
                    Chart visualization coming soon...
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Quick Actions
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Upload new impact data
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Generate monthly report
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    • Set impact goals
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    • Connect data sources
                  </Typography>
                </Box>
              </Paper>

              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  AI Insights
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Based on your recent data, we recommend focusing on:
                </Typography>
                <Box sx={{ bgcolor: '#e3f2fd', p: 2, borderRadius: 1, mt: 2 }}>
                  <Typography variant="body2" fontWeight={500}>
                    💡 Improving energy efficiency could increase your environmental score by 15%
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}