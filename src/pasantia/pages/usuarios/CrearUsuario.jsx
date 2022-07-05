import { Alert, Autocomplete, Button, Card, Grid, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../../layouts/layoutContainers/DashboardLayout'
import MDTypography from '../../../theme/components/MDTypography'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm, Controller } from "react-hook-form";
import { Box } from '@mui/system'

export const CrearUsuario = () => {
  const [personas, setPersonas] = useState([]);
  const [rols, setRols] = useState([]);
  const [rol, setRol] = useState(null);
  
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/personas/users')
    .then((response) => {
       setPersonas(response.data)
    });

    axios.get('http://127.0.0.1:8000/api/rols')
    .then((response) => {
       setRols(response.data)
    });
  }, [])
  
  // const handleData = (e, newValue) => {
  //   setPersona( newValue );
  //   console.log(persona)
   
  // }

  const schema = yup.object({
    Usuario: yup.string().required("Ingresa un usuario").min(4, "Minimo 4 caracteres"),
    Contraseña: yup.string().required("Ingresa una contraseña").min(4, "Minimo 4 caracteres"),
  }).required()

  const { handleSubmit, control, setValue, reset } = useForm({
    defaultValues:{
      Usuario: "",
      Contraseña: '',
      id_persona:'',
      
    },
    resolver: yupResolver(schema)
  });

  console.log('persona')
  const onSubmit = (data) => console.log(data)
  
  return (
    <DashboardLayout>
      <Card
        sx={{
          position: "relative",
          mt: 4,
          mx: 3,
          py: 2,
          px: 2,
          flexGrow: 1
        }}
      >
          <Box component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} alignItems="center" p={2}>
          <Grid item xs={12}>
            <MDTypography variant="h5" fontWeight="medium">
              Crear un nuevo usuario
            </MDTypography>
          </Grid>
          <Grid item container spacing={2} mt={1}>

          <Grid item xs={12} sm={5} >
            <Autocomplete 
              id='people'
          
              onChange={(e,newValue) => { 
                if (newValue != undefined) {
                  setValue('Usuario', newValue.ci)
                  setValue('id_persona', newValue.id)
                  setValue('Contraseña', newValue.ci+newValue.extension.toLowerCase())
                } else {
                  reset()
                }
              }}
              options={personas}
              getOptionLabel={(option) => (option.primer_nombre+' '+option.apellido_paterno)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => <TextField {...params} variant="standard" label="Personas"/>}
              />
          </Grid>
          <Grid item xs={12} sm={2}>
              <Autocomplete 
                  onChange={(e,newValue) => {
                    if (newValue != undefined) {
                      setValue('id_rol',newValue.id)
                      setRol(newValue)
                    }else {
                      setRol(null)
                    }
                  }}
                  options={rols}
                  getOptionLabel={(option) => (option.tipo_rol)}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => <TextField {...params} variant="standard" label="Rol" required/>}
              />
          </Grid>
          <Grid item sm={5}>
            {rol != null ? <Alert severity='info' sx={{fontSize: "small"}}>
                { rol.descripcion }
            </Alert>: null}
          </Grid>
          </Grid>
          <Grid item container mt={1} spacing={2}>

          <Grid item xs={12} sm={5}>
            <Controller 
              name="Usuario"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <TextField
                  label="Usuario"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  focused
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Controller 
              name="Contraseña"
              control={control}
              render={({field: {onChange, value}, fieldState:{ error}}) => (
                <TextField 
                  type="password" 
                  label="Contraseña"
                  onChange={onChange}  
                  value={value}
                  error={!!error}
                  helperText={error ? error.message : null} 
                  fullWidth
                  focused
                />
              )}
            />
          </Grid>
        </Grid>
        </Grid>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
          p={2}
          mt={2}
          >
            <Button>
              Cancelar
            </Button> 
           <LoadingButton
              type='submit'
              color="info"
              variant="outlined"
              startIcon={<SaveIcon />}
              >
              Guardar
            </LoadingButton>
        </Stack>
        </Box>
      </Card>
    </DashboardLayout>
  )
}
