import { Box, Container, Typography, Button, Grid, Paper } from "@mui/material";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import LanguageIcon from "@mui/icons-material/Language";
import InsightsIcon from "@mui/icons-material/Insights";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const features = [
  {
    icon: <EnergySavingsLeafIcon color="success" sx={{ fontSize: 40 }} />, 
    title: "Sustainable Data",
    desc: "Curate and share impactful environmental and social datasets.",
  },
  {
    icon: <LanguageIcon color="primary" sx={{ fontSize: 40 }} />, 
    title: "Open Collaboration",
    desc: "Work openly, collaborate globally for better outcomes.",
  },
  {
    icon: <InsightsIcon color="secondary" sx={{ fontSize: 40 }} />, 
    title: "Powerful Insights",
    desc: "Generate and visualize insights to drive positive change.",
  },
];

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Box sx={{
      minHeight: "100vh",
      bgcolor: "linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Hero Section */}
      <Box sx={{
        py: { xs: 8, md: 12 },
        textAlign: "center",
        background: "linear-gradient(125deg, #2196f3 0%, #21cbf3 100%)",
        color: "#fff",
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" fontWeight={800} gutterBottom>
            Open Impact
          </Typography>
          <Typography variant="h5" color="inherit" sx={{ mb: 4 }}>
            An open-source platform to explore, analyze, and share social and environmental impact data.
          </Typography>
          <Button
            onClick={() => router.push('/auth')}
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#fff",
              color: "#2196f3",
              fontWeight: 600,
              px: 5,
              py: 1.5,
              fontSize: "1.15rem",
              boxShadow: 2,
              "&:hover": { bgcolor: "#e3f2fd" },
            }}
          >
            {session ? 'Go to Dashboard' : 'Get Started'}
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
          Why Open Impact?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((f, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Paper elevation={4} sx={{
                p: 4,
                textAlign: "center",
                borderRadius: 4,
                height: "100%",
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-8px)", boxShadow: 8 }
              }}>
                <Box mb={2}>{f.icon}</Box>
                <Typography variant="h6" fontWeight={700} mb={1}>
                  {f.title}
                </Typography>
                <Typography color="text.secondary">{f.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Welcome Section for Authenticated Users */}
      {session && (
        <Container sx={{ py: { xs: 6, md: 10 } }}>
          <Paper elevation={6} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={700} mb={2} color="primary">
              Welcome back, {session.user?.name || session.user?.email}!
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              You&apos;re ready to explore and analyze impact data.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ mr: 2 }}
            >
              Start Exploring Data
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => router.push('/auth')}
            >
              Account Settings
            </Button>
          </Paper>
        </Container>
      )}

      {/* Call to Action for Non-Authenticated Users */}
      {!session && (
        <Container sx={{ py: { xs: 6, md: 10 } }}>
          <Paper elevation={6} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={700} mb={2} color="primary">
              Ready to Make an Impact?
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Join Open Impact to access powerful tools for social and environmental data analysis.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push('/auth')}
              sx={{ mr: 2 }}
            >
              Sign In
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => router.push('/auth')}
            >
              Create Account
            </Button>
          </Paper>
        </Container>
      )}

      {/* Footer */}
      <Box sx={{
        mt: "auto",
        py: 3,
        bgcolor: "#222",
        color: "#fff",
        textAlign: "center",
        fontSize: "1rem",
        letterSpacing: "0.5px"
      }}>
        © {new Date().getFullYear()} Open Impact &middot; Empowering Social and Environmental Change
      </Box>
    </Box>
  );
}