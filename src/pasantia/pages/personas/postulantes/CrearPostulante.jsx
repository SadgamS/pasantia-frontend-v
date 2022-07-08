import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { Link } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import { FormLayout } from '../../../../layouts/FormLayout';
import DashboardLayout from '../../../../layouts/layoutContainers/DashboardLayout';
import MDBox from '../../../../theme/components/MDBox';
import MDTypography from '../../../../theme/components/MDTypography';

import FileUpload from "react-mui-fileuploader"

export const CrearPostulante = () => {
  const handleFileUploadError = (error) => {
    // Do something...
    console.log(error)
  }
  
  const handleFilesChange = (files) => {
    // Do something...
    console.log(files)
  }
  return (
    <FormLayout>
      <Grid container mt={1}>
        <Grid item>
          <MDTypography variant="h5" fontWeight="bold">
            Añadir a un nuevo postulante
          </MDTypography>
        </Grid>
      </Grid>
      <Grid container mt={2}>
        <Grid item>
          <MDTypography variant="subtitle2" fontWeight="regular" color="info">
            Datos Personales
          </MDTypography>
        </Grid>
      </Grid>
      <MDBox component="form" role="form">
        <Grid container mt={0} spacing={2} p={2}>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <TextField
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              label="Primer nombre"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <TextField
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              label="Segundo nombre"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <TextField
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              label="Apellido paterno"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <TextField
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              label="Apellido materno"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container mt={0} spacing={2} p={1}>
          <Grid item xs={8} sm={7} md={5} lg={3}>
            <TextField
              variant="standard" 
              label="Carnet de identidad"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth 
            />
          </Grid>
          <Grid item xs={4} sm={5} md={3} lg={2}>
            <FormControl  fullWidth>
              <InputLabel id="ext">Extensión</InputLabel>
              <Select   labelId="ext" label="Extension">
                <MenuItem >La Paz</MenuItem>
                <MenuItem >Santa Cruz</MenuItem>
                <MenuItem >PTS</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={5} sm={5} md={4} lg={3}>
            <TextField
              variant="standard" 
              label="Fecha de nacimiento"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={7} sm={7} md={5} lg={4} sx={{mt:{ xs:-1, sm:-1, md:-1, lg:-2}}}>
            <FormControl fullWidth>
              <FormLabel id="row-label" > Genero </FormLabel>
              <RadioGroup row  aria-labelledby="row-radio-label">
                <FormControlLabel value="f" control={<Radio />} label="Femenino"/>
                <FormControlLabel value="m" control={<Radio />} label="Masculino"/>
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      <Grid container mt={0} spacing={2} p={1} >
        <Grid item xs={6} sm={7} md={6} lg={4}>
          <TextField
            variant="standard"
            type="email"
            label="Correo"
            InputLabelProps={{
                shrink: true,
              }}
            fullWidth
          />
        </Grid>
        <Grid item xs={5} sm={5} md={5} lg={3}>
          <TextField
            variant="standard" 
            label="Celular"
            InputLabelProps={{
                shrink: true,
              }}
            fullWidth
          />
        </Grid>
        <Grid item xs={5} sm={5} md={5} lg={3}>
          <TextField
            variant="standard" 
            label="Celular de referencia"
            InputLabelProps={{
                shrink: true,
              }}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container mt={2}>
        <Grid item>
          <MDTypography variant="subtitle2" fontWeight="regular" color="info">
            Datos Academicos
          </MDTypography>
        </Grid>
      </Grid>
      <Grid container mt={0} spacing={2} p={2}>
        <Grid item xs={12} sm={8} md={5} lg={4} >
          <FormControl fullWidth>
            <RadioGroup row  aria-labelledby="row-radio-label">
              <FormControlLabel value="es" control={<Radio />} label="Estudiante"/>
              <FormControlLabel value="eg" control={<Radio />} label="Egresado"/>
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={4}>
          <Autocomplete 
            renderInput={(params) => <TextField {...params} label="Universidad" variant="standard" />}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={4}>
          <TextField
            variant="standard" 
            label="Carrera"
            InputLabelProps={{
                shrink: true,
              }}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container mt={0} spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <FormControl  fullWidth>
            <InputLabel id="ext">Numero de años o semestres</InputLabel>
            <Select labelId="ext" label="Numero de años o semestres">
              <MenuItem >8vo semestre</MenuItem>
              <MenuItem >Finalizado</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
            <TextField type="file " label="doc"/>
        </Grid>
      </Grid>
      <Grid container mt={1}>
        <Grid item>
          <MDTypography variant="subtitle2" fontWeight="regular" color="info">
            Pasantia o Trabajo dirigido
          </MDTypography>
        </Grid>
      </Grid>
      <Grid container mt={0} spacing={2} p={2}>
        <Grid item xs={12 } sm={5} md={4} lg={4}>
          <FormControl  fullWidth>
            <InputLabel id="ext">Modalidad</InputLabel>
            <Select   labelId="ext" label="Extension">
              <MenuItem >Pasantia</MenuItem>
              <MenuItem >Trabajo dirigido</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12 } sm={7} md={8} lg={8}>
          <Autocomplete 
            renderInput={(params) => <TextField {...params} label="Convocatorias de pasantia o trabajo dirigido" variant="standard" />}
          />
        </Grid>
      </Grid>
      <FileUpload
      multiFile={true}
      disabled={false}
      title="My awesome file uploader"
      header="[Drag to drop]"
      leftLabel="or"
      rightLabel="to select files"
      buttonLabel="click here"
      buttonRemoveLabel="Remove all"
      maxFileSize={1}
      maxUploadFiles={1}
      maxFilesContainerHeight={357}
      errorSizeMessage={'fill it or move it to use the default error message'}
      allowedExtensions={['jpg', 'jpeg', 'pdf']}
      onFilesChange={handleFilesChange}
      onError={handleFileUploadError}
      
      bannerProps={{ elevation: 0, variant: "outlined" }}
      containerProps={{ elevation: 0, variant: "outlined" }}
    />
      <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
          p={2}
          mt={2}
          >
            <Link to="/usuarios">
              <Button>
                Cancelar
              </Button> 
            </Link>
           <LoadingButton
              type="submit"
              color="info"
              variant="outlined"
              startIcon={<SaveIcon />}
              >
              Guardar
            </LoadingButton>
        </Stack>
      </MDBox>
    </FormLayout>
  );
};
