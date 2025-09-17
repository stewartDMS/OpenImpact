import { Box, Container, Typography, Button, Stack, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../lib/auth";

export default function Auth() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Username is required.");
      return;
    }
    setError("");
    login(username.trim());
    router.push("/dashboard");
  };

  // Show loading or nothing while redirecting
  if (isAuthenticated) {
    return null;
  }

  return (
    <Box sx={{
      minHeight: "100vh",
      bgcolor: "linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Container maxWidth="xs">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight={700} align="center" mb={1}>
            Welcome to Open Impact
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" mb={4}>
            Sign in to access your dashboard
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
                Sign In
              </Button>
            </Stack>
          </form>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Link href="/" passHref>
              <Button variant="text" color="primary">
                ← Back to Home
              </Button>
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}