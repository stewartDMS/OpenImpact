import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
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
  CircularProgress,
} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      setError('')
      await signIn('google', { callbackUrl: '/' })
    } catch (err) {
      setError('Failed to sign in with Google')
      setLoading(false)
    }
  }

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields')
      return
    }

    try {
      setLoading(true)
      setError('')
      
      const result = await signIn('credentials', {
        email: email.trim(),
        password: password.trim(),
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        // Check if sign in was successful
        const session = await getSession()
        if (session) {
          router.push('/')
        }
      }
    } catch (err) {
      setError('An error occurred during sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 4,
    }}>
      <Container maxWidth="sm">
        <Paper elevation={8} sx={{ p: 6, borderRadius: 4 }}>
          <Box textAlign="center" mb={4}>
            <Typography variant="h3" fontWeight={800} color="primary" gutterBottom>
              Open Impact
            </Typography>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Sign In to Continue
            </Typography>
            <Typography color="text.secondary">
              Access your impact data dashboard
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Stack spacing={3}>
            {/* Google Sign-In Button */}
            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              disabled={loading}
              sx={{
                py: 1.5,
                borderColor: '#4285f4',
                color: '#4285f4',
                '&:hover': {
                  borderColor: '#4285f4',
                  bgcolor: 'rgba(66, 133, 244, 0.04)',
                },
              }}
            >
              Continue with Google
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                or
              </Typography>
            </Divider>

            {/* Email/Password Form */}
            <form onSubmit={handleCredentialsSignIn}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError('')
                  }}
                  disabled={loading}
                  autoComplete="email"
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (error) setError('')
                  }}
                  disabled={loading}
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ py: 1.5, mt: 2 }}
                >
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    'Sign In with Email'
                  )}
                </Button>
              </Stack>
            </form>

            <Box textAlign="center" mt={3}>
              <Typography variant="body2" color="text.secondary">
                Demo credentials: demo@openimpact.org / demo123
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}