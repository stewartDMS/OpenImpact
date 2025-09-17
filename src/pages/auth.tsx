import { Box, Container, Typography, Button, Stack, Paper } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn, useSession, getProviders } from "next-auth/react";
import { GitHub, Google, Email } from "@mui/icons-material";
import { GetServerSideProps } from "next";

interface AuthProps {
  providers: Record<string, any> | null;
}

export default function Auth({ providers }: AuthProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  // Show loading or nothing while redirecting
  if (status === "loading") {
    return (
      <Box sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (status === "authenticated") {
    return null;
  }

  const getProviderIcon = (providerId: string) => {
    switch (providerId) {
      case 'github':
        return <GitHub />;
      case 'google':
        return <Google />;
      case 'email':
        return <Email />;
      default:
        return null;
    }
  };

  const getProviderColor = (providerId: string) => {
    switch (providerId) {
      case 'github':
        return { bgcolor: '#24292e', '&:hover': { bgcolor: '#1a1e22' } };
      case 'google':
        return { bgcolor: '#db4437', '&:hover': { bgcolor: '#c23321' } };
      case 'email':
        return {};
      default:
        return {};
    }
  };

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
          
          <Stack spacing={2}>
            {providers && Object.values(providers).map((provider: any) => (
              <Button
                key={provider.name}
                variant={provider.id === 'email' ? 'outlined' : 'contained'}
                size="large"
                startIcon={getProviderIcon(provider.id)}
                onClick={() => signIn(provider.id)}
                fullWidth
                sx={getProviderColor(provider.id)}
              >
                Sign in with {provider.name}
              </Button>
            ))}
            
            {(!providers || Object.keys(providers).length === 0) && (
              <Typography color="text.secondary" align="center">
                No authentication providers configured.
                <br />
                Please configure environment variables.
              </Typography>
            )}
          </Stack>

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

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};