import { Box, Container, Typography, Button, TextField, Paper, Stack, Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";

export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validation
    if (!username.trim()) {
      setError("Username is required.");
      setIsLoading(false);
      return;
    }
    if (!password.trim()) {
      setError("Password is required.");
      setIsLoading(false);
      return;
    }

    // TODO: Implement actual authentication with NextAuth.js
    try {
      // Placeholder for NextAuth.js signIn
      console.log("Login attempt:", { username: username.trim(), password: "***" });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // This is where NextAuth.js signIn would be called
      // const result = await signIn('credentials', {
      //   username: username.trim(),
      //   password,
      //   redirect: false,
      // });
      
      setError("Authentication not yet implemented");
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      // TODO: Implement Google OAuth with NextAuth.js
      console.log("Google login attempt");
      
      // This is where NextAuth.js Google provider would be called
      // const result = await signIn('google', {
      //   callbackUrl: '/',
      // });
      
      setError("Google authentication not yet implemented");
    } catch (err) {
      setError("Google login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      bgcolor: "linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      py: 4
    }}>
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ 
          p: 6, 
          borderRadius: 4,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)"
        }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h3" fontWeight={800} color="primary" gutterBottom>
              Open Impact
            </Typography>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Sign In
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Access your account to explore and share impact data
            </Typography>
          </Box>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError("");
                }}
                disabled={isLoading}
                autoFocus
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  }
                }}
              />
              
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                disabled={isLoading}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  }
                }}
              />

              {error && (
                <Typography color="error" fontSize={14} align="center">
                  {error}
                </Typography>
              )}

              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  background: "linear-gradient(125deg, #2196f3 0%, #21cbf3 100%)",
                  "&:hover": {
                    background: "linear-gradient(125deg, #1976d2 0%, #0288d1 100%)",
                  }
                }}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </Stack>
          </form>

          {/* Divider */}
          <Divider sx={{ my: 4 }}>
            <Typography variant="body2" color="text.secondary">
              or
            </Typography>
          </Divider>

          {/* Google Login Button */}
          <Button
            fullWidth
            variant="outlined"
            size="large"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            disabled={isLoading}
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: "1rem",
              borderColor: "#dadce0",
              color: "#3c4043",
              "&:hover": {
                borderColor: "#1976d2",
                backgroundColor: "rgba(25, 118, 210, 0.04)",
              }
            }}
          >
            Continue with Google
          </Button>

          {/* Footer */}
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="body2" color="text.secondary">
              New to Open Impact?{" "}
              <Button 
                variant="text" 
                size="small"
                sx={{ 
                  textTransform: "none",
                  fontWeight: 600,
                  minWidth: "auto",
                  p: 0
                }}
              >
                Create an account
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}