import { Box, Container, Typography, Button, Paper, Stack, TextField, Divider } from "@mui/material";
import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import GoogleIcon from "@mui/icons-material/Google";
import LoginIcon from "@mui/icons-material/Login";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        username: username.trim(),
        password: password.trim(),
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials. Try demo/password");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("An error occurred during sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (err) {
      setError("An error occurred during Google sign in.");
      setLoading(false);
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
        <Paper elevation={8} sx={{ p: 4, borderRadius: 3 }}>
          <Box textAlign="center" mb={3}>
            <LoginIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Sign In to Open Impact
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Choose your preferred sign-in method
            </Typography>
          </Box>

          {/* Google Sign In */}
          <Button
            variant="outlined"
            fullWidth
            size="large"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleSignIn}
            disabled={loading}
            sx={{ mb: 3, py: 1.5 }}
          >
            Continue with Google
          </Button>

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          {/* Credentials Form */}
          <form onSubmit={handleCredentialsSignIn}>
            <Stack spacing={2}>
              <Typography variant="h6" align="center" color="text.secondary">
                Demo Credentials
              </Typography>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError("");
                }}
                placeholder="demo"
                disabled={loading}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                placeholder="password"
                disabled={loading}
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
                disabled={loading}
                sx={{ py: 1.5 }}
              >
                {loading ? "Signing In..." : "Sign In with Demo"}
              </Button>
            </Stack>
          </form>

          <Box textAlign="center" mt={3}>
            <Typography variant="body2" color="text.secondary">
              Demo credentials: username &quot;demo&quot;, password &quot;password&quot;
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}