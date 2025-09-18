import { Box, Container, Typography, Button, Paper, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import Dashboard from "../components/Dashboard";
import DataInputForm from "../components/DataInputForm";

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

  const handleAddData = (newData: Datum) => {
    setData(prev => [...prev, newData]);
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
              <DataInputForm onAdd={handleAddData} />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" mb={2}>Your Dashboard</Typography>
              <Dashboard 
                username={userName} 
                data={data} 
                onLogout={handleLogout} 
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}