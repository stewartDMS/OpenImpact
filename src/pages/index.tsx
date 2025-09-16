import { Box, Container, Typography, Button, Grid, Paper, Stack } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Username is required.");
      return;
    }
    setError("");
    // TODO: Implement login
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
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" fontWeight={800} gutterBottom>
            Open Impact
          </Typography>
          <Typography variant="h6" color="inherit" sx={{ mb: 2, fontWeight: 600 }}>
            OpenImpact is running on Next.js!
          </Typography>
          <Typography variant="h5" color="inherit" sx={{ mb: 4 }}>
            An open-source platform to explore, analyze, and share social and environmental impact data.
          </Typography>
          <Button
            href="#login"
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
        </Container>
      </Box>

      {/* Features Section - Simplified without icons */}
      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
          Why Open Impact?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Paper elevation={4} sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 4,
              height: "100%",
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-8px)", boxShadow: 8 }
            }}>
              <Typography variant="h6" fontWeight={700} mb={1}>
                Sustainable Data
              </Typography>
              <Typography color="text.secondary">
                Curate and share impactful environmental and social datasets.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={4} sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 4,
              height: "100%",
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-8px)", boxShadow: 8 }
            }}>
              <Typography variant="h6" fontWeight={700} mb={1}>
                Open Collaboration
              </Typography>
              <Typography color="text.secondary">
                Work openly, collaborate globally for better outcomes.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={4} sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 4,
              height: "100%",
              transition: "transform 0.2s",
              "&:hover": { transform: "translateY(-8px)", boxShadow: 8 }
            }}>
              <Typography variant="h6" fontWeight={700} mb={1}>
                Powerful Insights
              </Typography>
              <Typography color="text.secondary">
                Generate and visualize insights to drive positive change.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Login Section */}
      <Container id="login" maxWidth="xs" sx={{ mb: 10 }}>
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3, mt: 4 }}>
          <Typography variant="h5" fontWeight={700} align="center" mb={2}>
            Login to Get Started
          </Typography>
          <form onSubmit={handleLogin}>
            <Stack spacing={2}>
              <input
                style={{
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #bdbdbd",
                  fontSize: "1rem",
                  width: "100%",
                }}
                placeholder="Enter username"
                value={username}
                onChange={e => {
                  setUsername(e.target.value);
                  if (error) setError("");
                }}
                autoFocus
              />
              {error && (
                <Typography color="error" fontSize={14} align="left">
                  {error}
                </Typography>
              )}
              <Button type="submit" variant="contained" size="large">
                Log In
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>

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