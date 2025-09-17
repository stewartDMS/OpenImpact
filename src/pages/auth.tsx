import { useState } from "react"
import { signIn, getSession, getProviders } from "next-auth/react"
import { GetServerSideProps } from "next"
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  Alert,
  IconButton,
} from "@mui/material"
import GoogleIcon from "@mui/icons-material/Google"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useRouter } from "next/router"

type AuthPageProps = {
  providers: any
}

export default function AuthPage({ providers }: AuthPageProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid credentials. Try username: demo, password: password")
      } else {
        router.push("/")
      }
    } catch (err) {
      setError("An error occurred during sign in")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" })
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 3,
            bgcolor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <IconButton
              onClick={() => router.push("/")}
              sx={{ mr: 1, color: "primary.main" }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              Sign In
            </Typography>
          </Box>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Welcome to Open Impact. Sign in to access your dashboard and contribute to global impact data.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Google Sign In */}
          {providers?.google && (
            <>
              <Button
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<GoogleIcon />}
                onClick={handleGoogleSignIn}
                sx={{
                  py: 1.5,
                  mb: 3,
                  borderColor: "#db4437",
                  color: "#db4437",
                  "&:hover": {
                    borderColor: "#c23321",
                    backgroundColor: "rgba(219, 68, 55, 0.04)",
                  },
                }}
              >
                Continue with Google
              </Button>

              <Divider sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  or
                </Typography>
              </Divider>
            </>
          )}

          {/* Demo Credentials Form */}
          <Box component="form" onSubmit={handleCredentialsSignIn}>
            <Stack spacing={3}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="demo"
                required
              />

              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
                sx={{ py: 1.5 }}
              >
                {loading ? "Signing In..." : "Sign In with Demo Account"}
              </Button>
            </Stack>
          </Box>

          {/* Demo Instructions */}
          <Box
            sx={{
              mt: 3,
              p: 2,
              bgcolor: "info.light",
              borderRadius: 2,
              border: "1px solid",
              borderColor: "info.main",
            }}
          >
            <Typography variant="subtitle2" color="info.dark" gutterBottom>
              Demo Credentials:
            </Typography>
            <Typography variant="body2" color="info.dark">
              <strong>Username:</strong> demo<br />
              <strong>Password:</strong> password
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  // If user is already logged in, redirect to home page
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  const providers = await getProviders()

  return {
    props: {
      providers: providers ?? {},
    },
  }
}