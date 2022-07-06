import { Card, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import DashboardLayout from "../../../../layouts/layoutContainers/DashboardLayout"
import MDBox from "../../../../theme/components/MDBox"
import MDTypography from "../../../../theme/components/MDTypography"

export const CrearPostulante = () => {
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
            <Grid container mt={1}>
              <Grid item>
                <MDTypography variant='h5' fontWeight='bold'>
                  Añadir a un nuevo postulante
                </MDTypography>
              </Grid>
            </Grid>
            <Grid container mt={2}>
              <Grid item>
                <MDTypography variant='subtitle2' fontWeight='regular'>
                  Datos Personales
                </MDTypography>
              </Grid>
            </Grid>
            <MDBox component="form" role="form">
              <Grid container mt={1} spacing={1}>
                <Grid item  sm={3}>
                  <TextField 
                    label='Primer nombre'
                    fullWidth
                  />
                </Grid>
                <Grid item  sm={3}>
                  <TextField 
                    label='Segundo nombre'
                    fullWidth
                  />
                </Grid>
                <Grid item  sm={3}>
                  <TextField 
                    label='Apellido paterno'
                    fullWidth
                  />
                </Grid>
                <Grid item  sm={3}>
                  <TextField
                    label='Apellido materno'
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container mt={2} spacing={1}>
                <Grid item sm={2}>
                    <TextField 
                        label='Carnet de identidad'
                        fullWidth
                    />
                </Grid>
                <Grid item sm={1.5}>
                    <FormControl fullWidth>
                        <InputLabel id="ext">Extensión</InputLabel>
                        <Select
                            labelId="ext"
                            label="Extension"
                        >               
                            <MenuItem value={10}>La Paz</MenuItem>
                            <MenuItem value={20}>Santa Cruz</MenuItem>
                            <MenuItem value={30}>PTS</MenuItem>
                        </Select>
                    </FormControl>      
                </Grid>
                <Grid item sm={1.5}>
                    <FormControl fullWidth>
                        <InputLabel id="ext">Genero</InputLabel>
                        <Select
                            labelId="ext"
                            label="Genero"
                        >               
                            <MenuItem value={10}>Hombre</MenuItem>
                            <MenuItem value={20}>Mujer</MenuItem>
                        </Select>
                    </FormControl>      
                </Grid>
                <Grid item sm={2}>
                    <TextField 
                        label='Fecha de nacimiento'
                        type='date'
                        InputLabelProps={{
                            shrink: true,
                          }}
                        fullWidth
                    />
                </Grid>
                <Grid item sm={2}>
                    <TextField 
                        label='Celular'
                        InputLabelProps={{
                            shrink: true,
                          }}
                        fullWidth
                    />
                </Grid>
                <Grid item sm={3}>
                    <TextField 
                        label='Correo'
                        InputLabelProps={{
                            shrink: true,
                          }}
                        fullWidth
                    />
                </Grid>

              </Grid>
            </MDBox>
        </Card>
    </DashboardLayout>
  )
}
