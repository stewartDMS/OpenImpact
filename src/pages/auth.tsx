import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getSession } from 'next-auth/react'
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  TextField, 
  Paper, 
  Stack, 
  Alert,
  Divider,
  CircularProgress
} from '@mui/material'
import { Google as GoogleIcon } from '@mui/icons-material'
import { useRouter } from 'next/router'

export default function AuthPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Handle successful authentication redirect
  useEffect(() => {
    if (session && router.query.callbackUrl) {
      router.push(router.query.callbackUrl as string)
    }
  }, [session, router])

  const handleGoogleSignIn = async () => {
    setError('')
    setLoading(true)
    try {
      await signIn('google', { callbackUrl: '/' })
    } catch (err) {
      setError('Failed to sign in with Google')
    } finally {
      setLoading(false)
    }
  }

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else if (result?.ok) {
        router.push('/')
      }
    } catch (err) {
      setError('An error occurred during sign in')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  // Loading state
  if (status === 'loading') {
    return (
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default'
      }}>
        <CircularProgress />
      </Box>
    )
  }

  // Already signed in
  if (session) {
    return (
      <Box sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)'
      }}>
        <Container maxWidth="xs">
          <Paper elevation={6} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
            <Typography variant="h4" fontWeight={700} mb={2} color="primary">
              Welcome to Open Impact!
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Hello, {session.user?.name || session.user?.email}! You&apos;re successfully signed in.
            </Typography>
            <Stack spacing={2}>
              <Button
                variant="contained"
                size="large"
                onClick={() => router.push('/')}
                sx={{ mb: 1 }}
              >
                Go to Dashboard
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handleSignOut}
                disabled={loading}
              >
                Sign Out
              </Button>
            </Stack>
          </Paper>
        </Container>
      </Box>
    )
  }

  // Sign in form
  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)'
    }}>
      <Container maxWidth="xs">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight={700} align="center" mb={1} color="primary">
            Sign In
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" mb={4}>
            Welcome to Open Impact
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Google Sign In */}
          <Button
            fullWidth
            variant="outlined"
            size="large"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleSignIn}
            disabled={loading}
            sx={{
              mb: 3,
              py: 1.5,
              borderColor: '#db4437',
              color: '#db4437',
              '&:hover': {
                borderColor: '#c23321',
                bgcolor: 'rgba(219, 68, 55, 0.04)'
              }
            }}
          >
            {loading ? <CircularProgress size={20} /> : 'Continue with Google'}
          </Button>

          <Divider sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              or
            </Typography>
          </Divider>

          {/* Email/Password Form */}
          <form onSubmit={handleCredentialsSignIn}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                autoComplete="email"
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ py: 1.5 }}
              >
                {loading ? <CircularProgress size={20} /> : 'Sign In'}
              </Button>
            </Stack>
          </form>

          <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 3 }}>
            For demo purposes, any email/password combination will work
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}