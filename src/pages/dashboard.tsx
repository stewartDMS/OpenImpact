import { Box, Container, Typography, Button, Paper, Grid, TextField, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";

type Datum = { title: string; value: string };

/**
 * Protected Dashboard Page using NextAuth.js session
 * 
 * Features:
 * - Session-based authentication protection
 * - Automatic redirect to /auth if not authenticated
 * - Secure sign-out functionality
 * - User data management interface
 */
export default function DashboardPage() {
  const [data, setData] = useState<Datum[]>([]);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (!session) {
      router.push("/auth");
    }
  }, [session, status, router]);

  const handleLogout = async () => {
    // Sign out and redirect to home page
    await signOut({ callbackUrl: "/" });
  };

  const handleAddData = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !value.trim()) {
      setError("Both fields are required.");
      return;
    }
    setError("");
    setData(prev => [...prev, { title: title.trim(), value: value.trim() }]);
    setTitle("");
    setValue("");
  };

  // Show loading while checking authentication
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

  // Show loading while redirecting unauthenticated users
  if (!session) {
    return null;
  }

  // Get user display name (prioritize name, fallback to email)
  const userName = session.user?.name || session.user?.email || "User";

  return (
    <Box sx={{
      minHeight: "100vh",
      bgcolor: "#f5f5f5",
      py: 4,
    }}>
      <Container maxWidth="lg">
        <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Box>
              <Typography variant="h4" fontWeight={700}>
                Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                Welcome back, {userName}!
              </Typography>
            </Box>
            <Button variant="outlined" onClick={handleLogout}>
              Sign Out
            </Button>
          </Box>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" mb={2}>Add New Data</Typography>
              <Paper elevation={1} sx={{ p: 3 }}>
                <Box component="form" onSubmit={handleAddData} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                      label="Title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                        if (error) setError("");
                      }}
                      size="small"
                      fullWidth
                    />
                    <TextField
                      label="Value"
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                        if (error) setError("");
                      }}
                      size="small"
                      fullWidth
                    />
                  </Box>
                  {error && <Alert severity="error">{error}</Alert>}
                  <Button type="submit" variant="contained" color="success">
                    Add Data
                  </Button>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" mb={2}>Your Data</Typography>
              <Paper elevation={1} sx={{ p: 3 }}>
                {data.length === 0 ? (
                  <Typography color="text.secondary">No data added yet.</Typography>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {data.map((item, idx) => (
                      <Box key={idx} sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        py: 1,
                        borderBottom: idx < data.length - 1 ? '1px solid #e0e0e0' : 'none'
                      }}>
                        <Typography variant="body2" fontWeight={500}>{item.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{item.value}</Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}