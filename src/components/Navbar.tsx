import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        color: "#333"
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 700,
              color: "#2196f3",
              cursor: "pointer"
            }}
          >
            Open Impact
          </Typography>
        </Link>
        
        <Box sx={{ display: "flex", gap: 2 }}>
          {router.pathname === "/register" ? (
            <Link href="/" style={{ textDecoration: "none" }}>
              <Button 
                variant="outlined" 
                sx={{ 
                  borderColor: "#2196f3",
                  color: "#2196f3",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "#1976d2",
                    bgcolor: "rgba(33, 150, 243, 0.04)"
                  }
                }}
              >
                Sign In
              </Button>
            </Link>
          ) : (
            <Link href="/register" style={{ textDecoration: "none" }}>
              <Button 
                variant="contained" 
                sx={{ 
                  bgcolor: "#2196f3",
                  fontWeight: 600,
                  "&:hover": {
                    bgcolor: "#1976d2"
                  }
                }}
              >
                Sign Up
              </Button>
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}