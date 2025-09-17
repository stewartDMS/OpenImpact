import { Box, Container, Typography, Button, Grid, Paper, Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import LanguageIcon from "@mui/icons-material/Language";
import InsightsIcon from "@mui/icons-material/Insights";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

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
  const { data: session, status } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signOut();
    handleMenuClose();
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      bgcolor: "linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Header */}
      <Box sx={{ 
        position: "sticky", 
        top: 0, 
        zIndex: 100, 
        bgcolor: "rgba(255, 255, 255, 0.9)", 
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)"
      }}>
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h5" fontWeight={700} color="primary.main">
              Open Impact
            </Typography>
            
            {status === "loading" ? (
              <Box>Loading...</Box>
            ) : session ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body1" color="text.primary">
                  Welcome, {session.user?.name || session.user?.email}
                </Typography>
                <IconButton onClick={handleMenuOpen} sx={{ p: 0.5 }}>
                  {session.user?.image ? (
                    <Avatar src={session.user.image} sx={{ width: 36, height: 36 }} />
                  ) : (
                    <Avatar sx={{ width: 36, height: 36, bgcolor: "primary.main" }}>
                      <AccountCircleIcon />
                    </Avatar>
                  )}
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button
                variant="contained"
                onClick={() => signIn()}
                sx={{ borderRadius: 2 }}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Container>
      </Box>

      {session ? (
        // Authenticated Dashboard View
        <Container maxWidth="lg" sx={{ py: 6, flex: 1 }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="h3" fontWeight={800} gutterBottom color="primary.main">
              Welcome to Your Dashboard
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Start exploring and contributing to global impact data
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper elevation={4} sx={{ p: 4, textAlign: "center", borderRadius: 3, height: "100%" }}>
                <EnergySavingsLeafIcon color="success" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" fontWeight={700} mb={2}>
                  Environmental Data
                </Typography>
                <Typography color="text.secondary" mb={3}>
                  Access and analyze environmental impact metrics from trusted sources.
                </Typography>
                <Button variant="outlined" fullWidth>
                  Explore Data
                </Button>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper elevation={4} sx={{ p: 4, textAlign: "center", borderRadius: 3, height: "100%" }}>
                <InsightsIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" fontWeight={700} mb={2}>
                  Generate Insights
                </Typography>
                <Typography color="text.secondary" mb={3}>
                  Use AI-powered tools to generate meaningful insights from impact data.
                </Typography>
                <Button variant="outlined" fullWidth>
                  Create Insights
                </Button>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper elevation={4} sx={{ p: 4, textAlign: "center", borderRadius: 3, height: "100%" }}>
                <LanguageIcon color="secondary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" fontWeight={700} mb={2}>
                  Collaborate
                </Typography>
                <Typography color="text.secondary" mb={3}>
                  Connect with global communities working on social and environmental impact.
                </Typography>
                <Button variant="outlined" fullWidth>
                  Join Community
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      ) : (
        // Unauthenticated Landing Page
        <>
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
                variant="contained"
                size="large"
                onClick={() => signIn()}
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
                Get Started
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
        </>
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