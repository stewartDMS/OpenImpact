import { Box, Container, Typography, Button, Grid, Paper, Stack } from "@mui/material";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import LanguageIcon from "@mui/icons-material/Language";
import InsightsIcon from "@mui/icons-material/Insights";
import { useState } from "react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const features = [
  {
    icon: <EnergySavingsLeafIcon color="primary" sx={{ fontSize: 48 }} />,
    title: "Sustainability",
    description: "Analyze and showcase your organization’s social and environmental impact."
  },
  {
    icon: <LanguageIcon color="primary" sx={{ fontSize: 48 }} />,
    title: "Open Data",
    description: "Explore and contribute to a public repository of impactful data."
  },
  {
    icon: <InsightsIcon color="primary" sx={{ fontSize: 48 }} />,
    title: "Insights",
    description: "Gain actionable insights through easy-to-use analytics tools."
  }
];

export default function Home() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Username is required.");
      return;
    }
    setError("");
    // TODO: Add actual login logic here
  };

  return (
    <>
      <Box sx={{ bgcolor: "#e3f2fd", pt: 8, pb: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h2" align="center" fontWeight={700} color="primary" gutterBottom>
            Open Impact
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            An open-source platform to explore, analyze, and share social and environmental impact data.
          </Typography>
          <Button
            onClick={() => router.push('/auth')}
            variant="contained"
            size="large"
            sx={{ display: "block", mx: "auto", mt: 3, mb: 2 }}
          >
            {session ? 'Go to Dashboard' : 'Get Started'}
          </Button>
        </Container>
      </Box>

      <Container sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Paper elevation={4} sx={{ p: 3, textAlign: "center" }}>
                {feature.icon}
                <Typography variant="h6" fontWeight={700} mt={2}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Login section */}
      <Container maxWidth="xs" sx={{ mb: 10 }}>
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
                  setUsername((e.target as HTMLInputElement).value);
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
    </>
  );
}
