import { Box, CssBaseline, TextField, Button, Avatar } from '@mui/material'
import  Container  from '@mui/material/Container'
import { Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import apiClient from '../../services/api'

export const LoginScreen = () => {
  

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget);
    console.log(data)
    apiClient.get('/sanctum/csrf-cookie')
    .then(response => {
        apiClient.post('/api/login', {
            email: data.get('email'),
            password: data.get('contraseña')
        }).then(response => {
            console.log(response)
        })
    });
  }
 

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box 
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant='h5'>
          Iniciar Sesion
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{mt: 1}}>
            <TextField
              margin='normal'
              fullWidth
              label= "Email"
              name= 'email'
              autoFocus
              type='email'
            />
            <TextField
              margin='normal'
              fullWidth
              label= "Contraseña"
              name= 'contraseña'
              type='password'
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
        </Box>
      </Box>
    </Container>
  )
}

