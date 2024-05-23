import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, AlertTitle } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    location: '',
    description: '',
    occupation: '',
    login_name: '',
    password: '',
    confirm_password: ''
  })
  const [error, setError] = useState(null)
  const [successAlert, setSuccessAlert] = useState(false)
  const checkInputValid = () => {
    if (formData.first_name === ""){
      setError("First Name is required")
      return false
    }
    if (formData.last_name === ""){
      setError("Last Name is required")
      return false
    }
    if (formData.login_name === ""){
      setError("Username is required")
      return false
    }
    if (formData.password === ""){
      setError("First Name is required")
      return false
    }
    return true
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    setError(null)
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const handleSubmit = async () => {
    if (!checkInputValid()) return
    const { confirm_password, ...userData } = formData
    if (confirm_password !== userData.password) {
      setError('Confirm Password Not Match')
      return
    }
    const res = await fetch("http://localhost:8081/api/user", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    if (!res.ok && res.status === 400) {
      setError("User name is existed")
    } else {
      setSuccessAlert(true)
    }

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleInputChange}
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="location"
                  label="Location"
                  name="location"
                  autoComplete="location"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="description"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="occupation"
                  label="Occupation"
                  name="occupation"
                  autoComplete="occupation"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  id="login_name"
                  label="Username"
                  name="login_name"
                  autoComplete="login_name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleInputChange}
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  id="confirm_password"
                  autoComplete="new-confirm_password"
                />
              </Grid>
            </Grid>
            {successAlert &&
              <Alert severity="success" sx={{ marginTop: 2 }}>
                <AlertTitle>Success</AlertTitle>
                Success create new account
              </Alert>
            }
            {error &&
              <Alert severity="error" sx={{ marginTop: 2 }}>
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
              Register Me
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to='/signin' variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}