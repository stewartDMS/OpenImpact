import { Box, Container, Typography, Button, Grid, Paper, Avatar, Menu, MenuItem } from "@mui/material";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import LanguageIcon from "@mui/icons-material/Language";
import InsightsIcon from "@mui/icons-material/Insights";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

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

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleUserMenuClose();
    signOut();
  };

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
        position: "relative"
      }}>
        {/* Header with Auth */}
        <Box sx={{
          position: "absolute",
          top: 16,
          right: 16,
          display: "flex",
          alignItems: "center",
          gap: 2
        }}>
          {status === "loading" ? (
            <Typography variant="body2">Loading...</Typography>
          ) : session ? (
            <>
              <Button
                onClick={handleUserMenuClick}
                startIcon={<Avatar sx={{ width: 24, height: 24 }}>{session.user?.name?.[0] || "U"}</Avatar>}
                sx={{
                  color: "white",
                  textTransform: "none",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.1)" }
                }}
              >
                {session.user?.name || session.user?.email}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleUserMenuClose}
              >
                <MenuItem onClick={handleUserMenuClose}>
                  <DashboardIcon sx={{ mr: 1 }} />
                  Dashboard
                </MenuItem>
                <MenuItem onClick={handleSignOut}>
                  <AccountCircleIcon sx={{ mr: 1 }} />
                  Sign Out
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Link href="/auth" passHref>
              <Button
                variant="contained"
                startIcon={<AccountCircleIcon />}
                sx={{
                  bgcolor: "rgba(255,255,255,0.9)",
                  color: "#2196f3",
                  "&:hover": { bgcolor: "white" }
                }}
              >
                Sign In
              </Button>
            </Link>
          )}
        </Box>

        <Container maxWidth="md">
          <Typography variant="h2" fontWeight={800} gutterBottom>
            Open Impact
          </Typography>
          <Typography variant="h5" color="inherit" sx={{ mb: 4 }}>
            An open-source platform to explore, analyze, and share social and environmental impact data.
          </Typography>
          {session ? (
            <Typography variant="h6" sx={{ mb: 2 }}>
              Welcome back, {session.user?.name || "User"}!
            </Typography>
          ) : (
            <Link href="/auth" passHref>
              <Button
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
                Get Started
              </Button>
            </Link>
          )}
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

      {/* Dashboard Section for Authenticated Users */}
      {session && (
        <Container sx={{ py: { xs: 6, md: 8 } }}>
          <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
            Your Dashboard
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
                <DashboardIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" fontWeight={600} mb={1}>
                  Data Projects
                </Typography>
                <Typography color="text.secondary" mb={2}>
                  Manage your impact data projects
                </Typography>
                <Button variant="outlined" size="small">
                  View Projects
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
                <InsightsIcon color="secondary" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" fontWeight={600} mb={1}>
                  Analytics
                </Typography>
                <Typography color="text.secondary" mb={2}>
                  View insights and reports
                </Typography>
                <Button variant="outlined" size="small">
                  View Analytics
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper elevation={3} sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
                <EnergySavingsLeafIcon color="success" sx={{ fontSize: 48, mb: 2 }} />
                <Typography variant="h6" fontWeight={600} mb={1}>
                  Impact Score
                </Typography>
                <Typography color="text.secondary" mb={2}>
                  Track your environmental impact
                </Typography>
                <Button variant="outlined" size="small">
                  View Impact
                </Button>
              </Paper>
            </Grid>
          </Grid>
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