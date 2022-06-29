import { useState } from "react";

// react-router-dom components
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import SendIcon from '@mui/icons-material/Send';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// Authentication layout components
import { BasicLayout } from "../../layouts/BasicLayout";

// Images
import bgImage from "../../assets/images/bg-sign-in-basic.jpeg";
import { Alert, Avatar, Box, TextField, Typography } from "@mui/material";
import { LoadingButton } from '@mui/lab';
// import { useMaterialUIController } from "context";
import { useForm, Controller } from "react-hook-form";
import apiClient from "../../services/api";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import MDTypography from "../../theme/components/MDTypography";


export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({AuthError: false, UnknownError: false});
  const [loading, setLoading] = useState(false);
  
  const handleClickShowPassword = () =>{
  
    setShowPassword(!showPassword);
  }

  const schema = yup.object({
    Usuario: yup.string().required("Usuario es requerido"),
    Contraseña: yup.string().min(4, "Minimo 5 caracteres").required("Contraseña es requerida"),

  }).required()
  
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema)
  });

  let navigate = useNavigate();
  
  const onSubmit = (data) => {
    console.log(data.Usuario)
    setLoading(true);
    apiClient.get('/sanctum/csrf-cookie')
    .then(response => {
      apiClient.post('/login', {
          name: data.Usuario,
          password: data.Contraseña
      }).then(response => {
          if (response.status === 200) {
            console.log(response);
            setLoading(false);
            navigate("/dashboard");
          }
      }).catch(error => {
          if (error.response && error.response.status === 422) {
            setError({AuthError: true, UnknownError: false})
            setLoading(false);
          }else{
            setError({ AuthError: false, UnknownError: true })
            console.error(error)
            setLoading(false);
          }
      })
  });

  };
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            mx: 2,
            p: 2,
            mb: 1,
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h4" fontWeight="medium" >
            Iniciar Sesión
          </Typography>
        </Box>
        <Box pt={2} pb={3} px={3}>
          <Box component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
            <Box mb={3}>
              <Controller 
                name="Usuario"
                control={control}
                defaultValue=""
                render={({field: {onChange, value}, fieldState: {error}})=> (
                  <TextField
                    fullWidth
                    label="Usuario"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
            </Box>
            <Box mb={2}>
              <Controller 
                name="Contraseña"
                control={control}
                defaultValue=""
                render={({field: {onChange, value}, fieldState: {error}})=> (
                  <TextField
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    label="Contraseña"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
              />
            </Box>
            <Box display="flex" alignItems="center" ml={-1} mt={1}>
              <Switch checked={showPassword} onChange={handleClickShowPassword} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleClickShowPassword}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Mostrar Contraseña
              </MDTypography>
            </Box>
            {error.AuthError ? (<Alert sx={{ mt: 2, fontSize: "small"}} variant="filled" severity="error">
                    Error en las credeciales!
                  </Alert>) : null}
            {error.UnknownError ? (<Alert sx={{ mt: 2, fontSize: "small"}} variant="filled" severity="error">
              Error en la verificacion!
            </Alert>) : null}      
            <Box mt={4} mb={1}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={loading }
                loadingPosition="start"
                startIcon={<SendIcon />}
                // variant="gradient" 
                fullWidth
              >
                Ingresar
              </LoadingButton>
            </Box>              
          </Box>
        </Box>
      </Card>
    </BasicLayout>
  )
}
