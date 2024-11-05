import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { loginUser } from '../Slices/authSlice';
import { Button, TextField, Typography, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Import icons for visibility toggle
import { Link } from 'react-router-dom'; 

export default function LoginPage() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for showing password

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '400px', mx: 'auto', mt: 8, p: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Login</Typography>

      <TextField
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'} // Toggle password visibility
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />} 
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      )}

      {error && <Typography color="error">{error}</Typography>}

      <Typography variant="body2" sx={{ mt: 2 }}>
        Don't have an account?{' '}
        <Link to="/Registerpage" style={{ textDecoration: 'none', color: 'primary.main' }}>
          Register
        </Link>
      </Typography>
    </Box>
  );
}
