import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
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
import MDBox from '../../../../theme/components/MDBox';
import MDTypography from '../../../../theme/components/MDTypography';

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from "react-hook-form";

export const CrearPostulante = () => {

  const schema = yup.object({
    nombres: yup.string().required("Ingresa un nombre").matches(/^[a-zA-Z ]*$/,"Solo puede introducir letras"),
    primer_apellido: yup.string().required("Ingresa un apellido").matches(/^[a-zA-Z ]*$/,"Solo puede introducir letras"),
    segundo_apellido: yup.string().matches(/^[a-zA-Z ]*$/,"Solo puede introducir letras"),
    ci: yup.string().required("Ingresa un carnet de identidad").min(5,"Minimo 5 caracteres"),
    extension: yup.string().required("Selecciona un departamento"),
    fecha_nacimiento: yup.date().max(new Date(),"asd"),
  }).required()

  const { control, handleSubmit, formState: {errors}} = useForm({
    mode: "onChange",
    defaultValues:{
      nombres: '',
      primer_apellido: '',
      segundo_apellido: '',
      ci: '',
      extension: '',
      fecha_nacimiento: ''
    },
    resolver: yupResolver(schema)
  });
  const onSubmit = data => console.log(data)
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
      <MDBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container mt={0} spacing={2} p={1}>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Controller 
              name="nombres"
              control={control}
              render={({field: {onChange, value}, formState:{error}}) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                  label="Nombres"
                  autoComplete="off"
                  fullWidth
                />
              )}
            />
            
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Controller 
              name="primer_apellido"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                  label="Primer apellido"
                  autoComplete="off"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
          <Controller 
              name="segundo_apellido"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                  label="Segundo apellido"
                  autoComplete="off"
                  fullWidth
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container mt={0} spacing={2} p={1}>
          <Grid item xs={8} sm={7} md={5} lg={3}>
            <Controller 
              name="ci"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                  label="Carnet de identidad"
                  autoComplete="off"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={4} sm={5} md={3} lg={2}>
            <FormControl variant="standard" fullWidth error={!!errors.extension}>
              <InputLabel id="ext">Extensión</InputLabel>
            <Controller 
              name="extension"
              control={control}
              render={({field:{onChange, value}})=>(
              <Select
                onChange={onChange}
                value={value} 
                labelId="ext" 
                label="Extension"
              >
                <MenuItem value={"La Paz"}>La Paz</MenuItem>
                <MenuItem value={"Santa Cruz"}>Santa Cruz</MenuItem>
                <MenuItem value={"Oruro"}>Oruro</MenuItem>
                <MenuItem value={"Cochabamba"}>Cochabamba</MenuItem>
                <MenuItem value={"Pando"}>Pando</MenuItem>
                <MenuItem value={"Potosi"}>Potosi</MenuItem>
                <MenuItem value={"Tarija"}>Tarija</MenuItem>
                <MenuItem value={"Sucre"}>Sucre</MenuItem>
                <MenuItem value={"Beni"}>Beni</MenuItem>
              </Select>
              )}
              />
              <FormHelperText>{errors.extension ? errors.extension.message : null}</FormHelperText>
              </FormControl>
          </Grid>
          <Grid item xs={5} sm={5} md={4} lg={3}>
            <Controller 
              name="fecha_nacimiento"
              control={control}
              render={({field: {onChange, value}}) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  variant="standard" 
                  label="Fecha de nacimiento"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              )}
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
        <Grid item xs={12} sm={7} md={6} lg={5}>
          <TextField
            variant="standard"
            label="Domicilio"
            InputLabelProps={{
                shrink: true,
              }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={5} md={2} lg={3}>
          <TextField
            variant="standard"
            label="Ciudad"
            InputLabelProps={{
                shrink: true,
              }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
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
      </Grid>
      <Grid container mt={0} spacing={2} p={1}>
        <Grid item xs={12} sm={4} md={3} lg={3}>
          <TextField
            variant="standard" 
            label="Celular"
            InputLabelProps={{
                shrink: true,
              }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={6}>
          <TextField
            variant="standard" 
            label="Nombre de un familiar de referencia"
            InputLabelProps={{
                shrink: true,
              }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={5} md={3} lg={3}>
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
