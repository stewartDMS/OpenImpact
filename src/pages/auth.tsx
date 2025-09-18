import { Box, Container, Typography, Button, Stack, Paper, Divider, TextField, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

// Demo-only: fake registration process
async function fakeSignUp(email: string, password: string): Promise<{success: boolean, error?: string}> {
  // Simulate delay and allow any email/password for demo
  await new Promise(res => setTimeout(res, 800));
  if (!email || !password) return { success: false, error: "Email and password required" };
  if (email === "already@taken.com") return { success: false, error: "Email already in use" };
  return { success: true };
}

export default function Auth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState("");
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState<{success?: string, error?: string}>({});

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  // Handle provider sign-in with loading state
  const handleSignIn = async (provider: string) => {
    setIsLoading(provider);
    setFeedback({});
    try {
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch (error) {
      setFeedback({ error: "Sign-in error. Try again." });
      setIsLoading("");
    }
  };

  // Handle demo email sign in
  const handleEmailSignIn = async () => {
    setIsLoading("email");
    setFeedback({});
    try {
      await signIn("email", { email, callbackUrl: "/dashboard" });
    } catch (error) {
      setFeedback({ error: "Email sign-in failed. Check your email." });
    }
    setIsLoading("");
  };

  // Handle demo sign up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading("signUp");
    setFeedback({});
    // Replace with real registration call in production
    const result = await fakeSignUp(email, password);
    if (result.success) {
      setFeedback({ success: "Registration successful! Please sign in." });
      setMode("signIn");
      setEmail("");
      setPassword("");
    } else {
      setFeedback({ error: result.error });
    }
    setIsLoading("");
  };

  // Show loading while checking session
  if (status === "loading") {
    return (
      <Box sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  // Don't render if already authenticated (will redirect)
  if (session) {
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
          <Typography variant="h3" fontWeight={700} align="center" color="#2196f3" mb={1}>
            {mode === "signIn" ? "Sign In" : "Sign Up"}
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" mb={3}>
            Welcome to Open Impact
          </Typography>

          <Stack spacing={3}>
            {/* Google Sign In */}
            <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={() => handleSignIn("google")}
              disabled={isLoading !== ""}
              startIcon={
                <Box
                  component="img"
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google"
                  sx={{ width: 20, height: 20 }}
                />
              }
              sx={{
                textTransform: "none",
                fontSize: "1rem",
                borderColor: "#dadce0",
                color: "#3c4043",
                "&:hover": { borderColor: "#1976d2", bgcolor: "#f8f9fa" },
              }}
            >
              {isLoading === "google" ? "Signing in..." : `Continue with Google`}
            </Button>

            {/* Divider and Email/Password */}
            <Divider sx={{ my: 2 }}>or</Divider>

            <form onSubmit={mode === "signIn" ? e => { e.preventDefault(); handleEmailSignIn(); } : handleSignUp}>
              <Stack spacing={2}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  disabled={isLoading !== ""}
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete={mode === "signUp" ? "new-password" : "current-password"}
                  required
                  disabled={isLoading !== ""}
                />
                {feedback.error && (
                  <Alert severity="error">{feedback.error}</Alert>
                )}
                {feedback.success && (
                  <Alert severity="success">{feedback.success}</Alert>
                )}
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  type="submit"
                  disabled={isLoading !== ""}
                  sx={{ fontWeight: 600 }}
                >
                  {mode === "signIn"
                    ? isLoading === "email"
                      ? "Signing in..."
                      : "Sign In"
                    : isLoading === "signUp"
                      ? "Signing up..."
                      : "Sign Up"}
                </Button>
              </Stack>
            </form>
          </Stack>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary" mb={2}>
              {mode === "signIn"
                ? "Don't have an account? "
                : "Already have an account? "}
              <Button
                variant="text"
                onClick={() => {
                  setMode(mode === "signIn" ? "signUp" : "signIn");
                  setFeedback({});
                }}
                sx={{ textTransform: "none", fontWeight: 600, pl: 1 }}
              >
                {mode === "signIn" ? "Sign Up" : "Sign In"}
              </Button>
            </Typography>
            <Typography variant="caption" color="text.secondary">
              For demo purposes, any email/password combination will work
            </Typography>
          </Box>

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="caption" color="text.secondary">
              Secure authentication powered by NextAuth.js
            </Typography>
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