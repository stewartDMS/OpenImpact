import { Box, Container, Typography, Button, Stack, Paper, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

/**
 * Authentication page using NextAuth.js
 * 
 * Provides sign-in options for:
 * - GitHub OAuth (developer-friendly)
 * - Google OAuth (general users) 
 * - Email magic links (passwordless)
 * 
 * Automatically redirects authenticated users to dashboard.
 */
export default function Auth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState("");

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  // Handle provider sign-in with loading state
  const handleSignIn = async (provider: string) => {
    setIsLoading(provider);
    try {
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Sign-in error:", error);
      setIsLoading("");
    }
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
          <Typography variant="h4" fontWeight={700} align="center" mb={1}>
            Welcome to Open Impact
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" mb={4}>
            Sign in to access your dashboard
          </Typography>
          
          <Stack spacing={3}>
            {/* GitHub Sign In */}
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={() => handleSignIn("github")}
              disabled={isLoading !== ""}
              startIcon={<GitHubIcon />}
              sx={{
                bgcolor: "#24292e",
                "&:hover": { bgcolor: "#1a1e22" },
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              {isLoading === "github" ? "Signing in..." : "Continue with GitHub"}
            </Button>

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
              {isLoading === "google" ? "Signing in..." : "Continue with Google"}
            </Button>

            <Divider sx={{ my: 2 }}>or</Divider>

            {/* Email Sign In */}
            <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={() => handleSignIn("email")}
              disabled={isLoading !== ""}
              startIcon={<EmailIcon />}
              sx={{
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              {isLoading === "email" ? "Sending magic link..." : "Sign in with Email"}
            </Button>
          </Stack>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary" mb={2}>
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