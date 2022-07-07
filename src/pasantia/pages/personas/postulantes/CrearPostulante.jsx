import { Card, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { Box } from "@mui/system"
import DashboardLayout from "../../../../layouts/layoutContainers/DashboardLayout"
import MDBox from "../../../../theme/components/MDBox"
import MDTypography from "../../../../theme/components/MDTypography"

export const CrearPostulante = () => {
  return (
    <DashboardLayout> 
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={11} md={11} lg={11} xl={10}>
          <Card
            sx={{
              position: "relative",
                mt: { xs:3,sm:4},
                mx: { xs:0,sm:2, md:1, lg:2, xl:0},
                py: { xs:2,sm:2, md:2, lg:3, xl:3},
                px: { xs:2,sm:2, md:3, lg:4, xl:4},
                flexGrow: 1,
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
                <MDTypography variant='subtitle2' fontWeight='regular' color='info'>
                  Datos Personales
                </MDTypography>
              </Grid>
            </Grid>
            <MDBox component="form" role="form">
              <Grid container mt={1} spacing={2} p={2}>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <TextField
                    variant='standard'
                    InputLabelProps={{
                      shrink: true,
                    }} 
                    label='Primer nombre'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <TextField
                    variant='standard'
                    InputLabelProps={{
                      shrink: true,
                    }} 
                    label='Segundo nombre'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <TextField 
                    variant='standard'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label='Apellido paterno'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <TextField
                    variant='standard'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label='Apellido materno'
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container mt={2} spacing={2}>
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

            </Grid>
          </Grid>
        
        
    </DashboardLayout>
  )
}
