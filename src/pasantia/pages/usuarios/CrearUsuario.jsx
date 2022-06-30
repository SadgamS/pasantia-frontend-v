import { Autocomplete, Card, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../../layouts/layoutContainers/DashboardLayout'
import MDTypography from '../../../theme/components/MDTypography'
import axios from 'axios';

export const CrearUsuario = () => {
  const [personas, setPersonas] = useState([]);
  const [value, setValue] = useState(null);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/personas/users')
    .then((response) => {
       setPersonas(response.data)
    })
  }, [])
  
  
  
  console.log(value)
  // const name = value.nombres.charAt(0);
  // console.log(name)  
  let name, ci = ''
  if (value != undefined) {
    name = value.nombres.charAt(0)+value.apellidos.toLowerCase();
    ci = value.ci
  }
  console.log(name) 

  return (
    <DashboardLayout>
      <Card
        sx={{
          position: "relative",
          mt: 2,
          mx: 3,
          py: 2,
          px: 2,
          flexGrow: 1
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <MDTypography variant="h5" fontWeight="medium">
              Crear un nuevo usuario
            </MDTypography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete 
              id='people'
              value={value}
              onChange={(e,newValue)=> { setValue(newValue) }}
              options={personas}
              getOptionLabel={(option) => (option.nombres+' '+option.apellidos)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => <TextField {...params} variant="standard" label="Personas"/>}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField variant="standard" label="Usuario" value={name}  placeholder="Nombre de usuario" fullWidth focused />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField type="password" variant="standard" label="Contraseña"  placeholder="Contraseña CI" value={ci} fullWidth focused/>
          </Grid>
        </Grid>
        <div>hola</div>
      </Card>
    </DashboardLayout>
  )
}
