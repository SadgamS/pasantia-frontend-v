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
  const [value, setValue] = useState(null);
  const [rolValue, setRolValue] = useState(null);
  const [datos, setDatos] = useState(
    {
      name: '',
      contraseña: '',
      correo: ''
    }
  )
  
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
  
  const handleData = (e, newValue) => {
    setValue( newValue );
    setDatos({
      name: newValue.ci,
      contraseña: newValue.ci+newValue.extension.toLowerCase(),
    })
  }

  const schema = yup.object({

  }).required()

  const { handleSubmit, control } = useForm({
 
    resolver: yupResolver(schema)
  });

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
              value={value}
              onChange={handleData}
              options={personas}
              getOptionLabel={(option) => (option.primer_nombre+' '+option.apellido_paterno)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => <TextField {...params} variant="standard" label="Personas"/>}
              />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Autocomplete 
              id='rol'
              value={rolValue}
              onChange={(e,newValue) => setRolValue(newValue)}
              options={rols}
              getOptionLabel={(option) => (option.tipo_rol)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => <TextField {...params} variant="standard" label="Rol"/>}
            />
          </Grid>
          <Grid item sm={5}>
            {rolValue != null ? <Alert severity='info' sx={{fontSize: "small"}}>
                { rolValue.descripcion }
            </Alert>: null}
          </Grid>
          </Grid>
          <Grid item container mt={1} spacing={2}>

          <Grid item xs={12} sm={5}>
            <Controller 
              name="Usuario"
              control={control}
              defaultValue={datos.name} 
              render={({field: {onChange, value=datos.name}}) => (
                <TextField 
                  variant="standard" 
                  label="Usuario"
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Controller 
              name="password"
              control={control}
              render={({field: {onChange, value=datos.contraseña}}) => (
                <TextField 
                  type="password" 
                  variant="standard" 
                  label="Contraseña"
                  onChange={onChange}  
                  value={value} 
                  fullWidth
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
