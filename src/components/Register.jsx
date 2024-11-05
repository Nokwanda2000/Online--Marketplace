import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../Slices/RegisterSlice';
import { AppProvider } from '@toolpad/core/AppProvider';
import { Button, TextField, Typography, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom'; // Import Link from React Router

export default function RegistrationPage() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.registration);

  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    // Dispatch the registerUser action
    dispatch(registerUser({ email, password }));
  };

  return (
    <AppProvider theme={theme}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '400px',
          mx: 'auto',
          mt: 8,
          p: 4,
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>Create Account</Typography>

        <TextField
          name="email"
          label="Email"
          type="email"
          required
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          required
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          required
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {formError && <Typography color="error">{formError}</Typography>}
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        )}

        {error && <Typography color="error">{error}</Typography>}

        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link to="/Loginpage" style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
            Login
          </Link>
        </Typography>
      </Box>
    </AppProvider>
  );
}
