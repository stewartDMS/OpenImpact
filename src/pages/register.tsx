import { Box, Container, Typography, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    general: ""
  });

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      general: ""
    };
    let isValid = true;

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear errors when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    // TODO: Implement registration with backend/Firebase Auth
    console.log("Registration attempt:", { email: formData.email });
    setErrors({ ...errors, general: "" });
    
    // For now, just show a success message
    alert("Registration successful! (This is a placeholder - backend integration pending)");
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      bgcolor: "linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      py: 4
    }}>
      {/* Header */}
      <Container maxWidth="xs" sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h3" fontWeight={800} color="primary" gutterBottom>
          Open Impact
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Join our community to explore and share impact data
        </Typography>
      </Container>

      {/* Registration Form */}
      <Container maxWidth="xs">
        <Box sx={{
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: 6,
          p: 4
        }}>
          <Typography variant="h5" fontWeight={700} align="center" mb={3}>
            Create Your Account
          </Typography>
          
          <form onSubmit={handleRegister}>
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
                autoFocus
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
              />

              {errors.general && (
                <Typography color="error" fontSize={14} align="center">
                  {errors.general}
                </Typography>
              )}

              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                sx={{ py: 1.5 }}
              >
                Create Account
              </Button>
            </Stack>
          </form>

          {/* Login Link */}
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Link href="/" style={{ color: "#2196f3", textDecoration: "none" }}>
                <strong>Sign In</strong>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{
        mt: "auto",
        py: 3,
        textAlign: "center",
        fontSize: "0.9rem",
        color: "text.secondary"
      }}>
        © {new Date().getFullYear()} Open Impact &middot; Empowering Social and Environmental Change
      </Box>
    </Box>
  );
}