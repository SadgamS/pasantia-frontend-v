import { Card, Grid, TextField } from '@mui/material'
import React from 'react'
import DashboardLayout from '../../../layouts/layoutContainers/DashboardLayout'
import MDTypography from '../../../theme/components/MDTypography'
import { Navbar } from '../../components/Navbar/Navbar'

export const CrearUsuario = () => {
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
          <Grid item xs={6}>
            <TextField variant="standard" label="Usuario"  placeholder="Nombre de usuario" fullWidth focused />
          </Grid>
          <Grid item xs={6}>
            <TextField variant="standard" label="Persona"  placeholder="Persona perteneciente" fullWidth focused/>
          </Grid>
        </Grid>
        <div>hola</div>
      </Card>
    </DashboardLayout>
  )
}
