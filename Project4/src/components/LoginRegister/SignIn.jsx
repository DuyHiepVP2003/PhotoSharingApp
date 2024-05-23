import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, AlertTitle } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';

const defaultTheme = createTheme();

export default function SignIn({ onLogin, onLogout }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    login_name: '',
    password: ''
  })
  const [error, setError] = useState('')
  useEffect(() => {
    onLogout()
  }, [onLogout])
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setError(false)
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok || response.status === 404) {
        setError('Username or password is not valid')
        throw new Error('Failed to login');
      }
      const userData = await response.json();
      localStorage.setItem('user', JSON.stringify({
        _id: userData._id,
        first_name: userData.first_name,
      }))
      localStorage.setItem('token', userData.token);
      onLogin(userData.token)
      navigate(`/users/${userData._id}`)
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              onChange={handleInputChange}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="login_name"
              autoComplete="username"
              autoFocus
            />
            <TextField
              onChange={handleInputChange}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {error &&
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
              </Alert>
            }
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}