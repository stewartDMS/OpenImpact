import { Box, Container, Typography, Button, Stack, TextField, Paper } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Implement actual registration logic when backend is ready
      console.log("Registration attempted with:", { 
        email: formData.email,
        password: "***" // Don't log actual password
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, just show success message
      alert("Registration successful! (This is a placeholder - backend integration needed)");
      
      // Reset form
      setFormData({ email: "", password: "", confirmPassword: "" });
      setErrors({});
      
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ general: "Registration failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      bgcolor: "linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)",
      display: "flex",
      flexDirection: "column"
    }}>
      <Navbar />
      
      {/* Header Section */}
      <Box sx={{
        py: { xs: 4, md: 6 },
        textAlign: "center",
        background: "linear-gradient(125deg, #2196f3 0%, #21cbf3 100%)",
        color: "#fff",
      }}>
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Join Open Impact
          </Typography>
          <Typography variant="h6" color="inherit" sx={{ mb: 2 }}>
            Create your account to start exploring impact data
          </Typography>
        </Container>
      </Box>

      {/* Registration Form */}
      <Container maxWidth="sm" sx={{ 
        flex: 1, 
        display: "flex", 
        alignItems: "center", 
        py: { xs: 4, md: 6 } 
      }}>
        <Paper elevation={6} sx={{ 
          p: { xs: 3, md: 4 }, 
          borderRadius: 3, 
          width: "100%" 
        }}>
          <Typography variant="h4" fontWeight={700} align="center" mb={3}>
            Sign Up
          </Typography>
          
          {errors.general && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {errors.general}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange("email")}
                error={!!errors.email}
                helperText={errors.email}
                variant="outlined"
                required
              />
              
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleInputChange("password")}
                error={!!errors.password}
                helperText={errors.password}
                variant="outlined"
                required
              />
              
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                variant="outlined"
                required
              />

              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                disabled={isLoading}
                sx={{ 
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 600 
                }}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>

              <Box textAlign="center" mt={2}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{" "}
                  <Link href="/" style={{ 
                    color: "#2196f3", 
                    textDecoration: "none",
                    fontWeight: 600 
                  }}>
                    Sign In
                  </Link>
                </Typography>
              </Box>
            </Stack>
          </form>
        </Paper>
      </Container>

      {/* Footer */}
      <Box sx={{
        py: 3,
        bgcolor: "#222",
        color: "#fff",
        textAlign: "center",
        fontSize: "1rem",
        letterSpacing: "0.5px"
      }}>
        © {new Date().getFullYear()} Open Impact &middot; Empowering Social and Environmental Change
      </Box>
    </Box>
  );
}