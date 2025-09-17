import { Box, Container, Typography, Button, Paper, Divider } from "@mui/material";
import { signIn, getSession, getProviders } from "next-auth/react";
import { GetServerSideProps } from "next";
import GoogleIcon from "@mui/icons-material/Google";
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";

interface AuthPageProps {
  providers: any;
}

export default function AuthPage({ providers }: AuthPageProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleSignIn = async (providerId: string) => {
    setIsLoading(providerId);
    await signIn(providerId, { callbackUrl: "/" });
    setIsLoading(null);
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
        <Paper elevation={8} sx={{ p: 6, borderRadius: 3, textAlign: "center" }}>
          <Typography variant="h4" fontWeight={700} gutterBottom color="#2196f3">
            Welcome to Open Impact
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Sign in to explore environmental and social impact data
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {providers && Object.values(providers).map((provider: any) => {
              if (provider.id === "credentials") {
                return (
                  <Button
                    key={provider.id}
                    variant="contained"
                    size="large"
                    onClick={() => handleSignIn(provider.id)}
                    disabled={isLoading === provider.id}
                    startIcon={<LoginIcon />}
                    sx={{
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 600,
                      bgcolor: "#2196f3",
                      "&:hover": { bgcolor: "#1976d2" }
                    }}
                  >
                    {isLoading === provider.id ? "Signing in..." : "Demo Login"}
                  </Button>
                );
              }

              if (provider.id === "google") {
                return (
                  <Button
                    key={provider.id}
                    variant="outlined"
                    size="large"
                    onClick={() => handleSignIn(provider.id)}
                    disabled={isLoading === provider.id}
                    startIcon={<GoogleIcon />}
                    sx={{
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: 600,
                      borderColor: "#db4437",
                      color: "#db4437",
                      "&:hover": { 
                        borderColor: "#c23321",
                        bgcolor: "#fce8e6"
                      }
                    }}
                  >
                    {isLoading === provider.id ? "Signing in..." : `Sign in with ${provider.name}`}
                  </Button>
                );
              }

              return null;
            })}
          </Box>

          <Divider sx={{ my: 4 }}>
            <Typography variant="body2" color="text.secondary">
              Demo Credentials
            </Typography>
          </Divider>

          <Typography variant="body2" color="text.secondary">
            Username: <strong>demo</strong><br />
            Password: <strong>password</strong>
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Button
              variant="text"
              onClick={() => window.history.back()}
              sx={{ color: "#2196f3" }}
            >
              ← Back to Home
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  
  // Redirect if already signed in
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const providers = await getProviders();
  
  return {
    props: {
      providers: providers ?? {},
    },
  };
};