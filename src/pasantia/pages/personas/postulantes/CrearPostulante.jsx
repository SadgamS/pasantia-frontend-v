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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { esES } from '@mui/material/locale';
import {es} from 'date-fns/locale'

import { Link } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import { FormLayout } from '../../../../layouts/FormLayout';
import MDBox from '../../../../theme/components/MDBox';
import MDTypography from '../../../../theme/components/MDTypography';

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from "react-hook-form";
import moment from "moment";
import { useEffect, useState } from 'react';
import apiClient from '../../../../services/api';

export const CrearPostulante = () => {
  const [univeridades, setUniveridades] = useState([]);
  // const [loadingConv, setLoadingConv] = useState(true)
  const [modalidad, setModalidad] = useState('');
  const [convocatorias, setConvocatorias] = useState([])
  const loadingUni = univeridades.length === 0 
  useEffect(() => {
    if (loadingUni) {
      
      (async () => {
      const response = await apiClient.get('/api/universidades');
      if (response.status === 200) {
        setUniveridades([...response.data])
      }
    })();
    };
  }, [loadingUni])

  useEffect(() => {
    if (modalidad != '') {
      (async ()  => {
        try{
          const response = await apiClient.get(`api/convocatorias/${modalidad}`);
          if (response.status === 200) {
            setConvocatorias(response.data);
          }
        } catch(error){

        }
      })();
    }
  }, [modalidad])

  const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]*$/g;

  const schema = yup.object({
    nombres: yup.string().required("Ingresa un nombre").matches(regex,"Solo puede introducir letras"),
    primer_apellido: yup.string().required("Ingresa un apellido").matches(regex,"Solo puede introducir letras"),
    segundo_apellido: yup.string().matches(regex,"Solo puede introducir letras"),
    ci: yup.string().required("Ingresa un carnet de identidad").min(5,"Minimo 5 caracteres"),
    extension: yup.string().required("Selecciona un departamento"),
    fecha_nacimiento: yup.date().nullable().required("Ingrese una fecha de nacimiento").typeError("Ingresa una fecha valida (dia/mes/año)").min(new Date("1990-01-01"), "Ingresa una fecha valida").test("fecha_nacimiento", "Tine que ser una persona mayor de 18 años", function (value) {
      return moment().diff(moment(value, "YYYY-MM-DD"), "years") >= 18;
    }),
    genero: yup.string().required("Seleccione un genero"),
    domicilio: yup.string().required("Ingrese su domicilio"),
    ciudad: yup.string().required("Ingrese ciudad de residencia").matches(regex,"Solo puede introducir letras"),
    correo: yup.string().email("Ingrese un correo valido"),
    celular: yup.string().required("Ingrese un celular").matches(/^[0-9 ]*$/, "Ingrese solo numeros"),
    nombre_referencia: yup.string().required("Ingresa un nombre de refrencia").matches(regex, "Solo puede introducir letras"),
    celular_referencia: yup.string().nullable().required("Ingrese un celular").matches(/^[0-9 ]*$/, "Ingrese solo numeros"),
    tipo_postulante: yup.string().required("Seleccione un tipo de postulante"),
    universidad: yup.object().required("Seleccione una universidad"),
    carrera: yup.string().required("Ingrese una carrera").matches(regex, "Solo puede introducir letras"),
    numero_anios_semestres: yup.string().required("Seleccione un año"),
    convocatoria: yup.object().required("Seleccione una convocatoria")
  }).required()

  const { control, handleSubmit, formState: {errors}, setValue} = useForm({
    mode: "all",
    defaultValues:{
      nombres: '',
      primer_apellido: '',
      segundo_apellido: '',
      ci: '',
      extension: '',
      fecha_nacimiento: null,
      genero: '',
      domicilio: '',
      ciudad: '',
      correo: '',
      celular: '',
      nombre_referencia: '',
      celular_referencia: '',
      tipo_postulante: '',
      carrera: '',
      numero_anios_semestres: '',
      
    },
    resolver: yupResolver(schema)
  });
  const onSubmit = data => console.log(data, moment(data.fecha_nacimiento).format("YYYY-MM-DD"))
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
              render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
                <TextField
                  onChange={onChange}
                  onBlur={onBlur}
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
              render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
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
              render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
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
              render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
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
              render={({field:{onChange, value, onBlur}})=>(
              <Select
                onChange={onChange}
                onBlur={onBlur}
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
          <LocalizationProvider adapterLocale={es}  dateAdapter={AdapterDateFns}>
            <Controller 
              name="fecha_nacimiento"
              control={control}
              render={({field:{onChange, value, onBlur}, fieldState:{error}})=>(
                <DatePicker
                  value={value}
                  onChange={onChange}
                  minDate={new Date('1990-01-01')}
                  maxDate={new Date().setFullYear(new Date().getFullYear()+1)}
                  label="Fecha de nacimiento"
                  views={['day', 'month', 'year']}
                  renderInput={(params) => <TextField {...params} onBlur={onBlur} error={!!error} helperText={error ? error.message : null} InputLabelProps={{shrink:true}} variant="standard" autoComplete="off"/>}
                />
              )}
            />

            </LocalizationProvider>

          </Grid>
          <Grid item xs={7} sm={7} md={5} lg={4} sx={{mt:{ xs:-1, sm:-1, md:-1, lg:-2}}}>
            <FormControl error={!!errors.genero} fullWidth>
              <FormLabel id="row-label" > Genero </FormLabel>
              <Controller 
                name="genero"
                control={control}
                render={({field:{onChange, value, onBlur}})=>(
                  <RadioGroup 
                    row  
                    aria-labelledby="row-radio-label"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                  >
                    <FormControlLabel value="F" control={<Radio />} label="Femenino"/>
                    <FormControlLabel value="M" control={<Radio />} label="Masculino"/>
                  </RadioGroup>
                )}
              />
              <FormHelperText>{errors.genero ? errors.genero.message : null}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      <Grid container mt={0} spacing={2} p={1} >
        <Grid item xs={12} sm={7} md={6} lg={5}>
          <Controller 
            name="domicilio"
            control={control}
            render={({field:{onChange, value, onBlur}, fieldState:{error}})=>(
              <TextField
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={!!error}
                placeholder="Calle Numero Zona"
                helperText={error ? error.message : null}
                variant="standard"
                label="Domicilio"
                InputLabelProps={{
                    shrink: true,
                  }}
                fullWidth
                autoComplete="off"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={2} lg={3}>
        <Controller 
          name="ciudad"
          control={control}
          render={({field:{onChange, value, onBlur}, fieldState:{error}})=>(
            <TextField
              variant="standard"
              label="Ciudad de residencia"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={!!error}
              helperText={error ? error.message : null}
              InputLabelProps={{
                  shrink: true,
                }}
              autoComplete="off"
              fullWidth
            />
          )}
        />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
        <Controller 
          name="correo"
          control={control}
          render={({field:{onChange, value, onBlur}, fieldState:{error}})=>(
            <TextField
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={!!error}
              helperText={error ? error.message : null}
              variant="standard"
              type="email"
              label="Correo"
              InputLabelProps={{
                  shrink: true,
                }}
              fullWidth
              autoComplete="off"
            />
          )}
        />
        </Grid>
      </Grid>
      <Grid container mt={0} spacing={2} p={1}>
        <Grid item xs={12} sm={4} md={3} lg={3}>
        <Controller 
          name="celular"
          control={control}
          render={({field:{onChange, value, onBlur}, fieldState:{error}})=>(
            <TextField
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={!!error}
              helperText={error ? error.message : null}
              variant="standard" 
              label="Celular"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              autoComplete='off'
              type="tel"
            />
          )}
        />
        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={6}>
        <Controller 
          name="nombre_referencia"
          control={control}
          render={({field:{onChange, value, onBlur}, fieldState:{error}})=>( 
            <TextField
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={!!error}
              helperText={error ? error.message : null}
              variant="standard" 
              label="Nombre de un familiar de referencia"
              InputLabelProps={{
                  shrink: true,
                }}
              fullWidth
              autoComplete='off'
            />
          )}
          />
        </Grid>
        <Grid item xs={12} sm={5} md={3} lg={3}>
        <Controller 
          name="celular_referencia"
          control={control}
          render={({field:{onChange, value, onBlur}, fieldState:{error}})=>(

            <TextField
              variant="standard" 
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={!!error}
              helperText={error ? error.message : null}
              label="Celular de referencia"
              InputLabelProps={{
                  shrink: true,
                }}
              fullWidth
              autoComplete='off'
              type="tel"
            />
          )}
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
          <FormControl error={!!errors.tipo_postulante} fullWidth>
            <Controller 
              name="tipo_postulante"
              control={control}
              render={({field: {onChange, value, onBlur}})=>(
              <RadioGroup 
                row
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                aria-labelledby="row-radio-label">
                <FormControlLabel value="Estudiante" control={<Radio />} label="Estudiante"/>
                <FormControlLabel value="Egresado" control={<Radio />} label="Egresado"/>
              </RadioGroup>
              )}
            />
          <FormHelperText>{errors.tipo_postulante ? errors.tipo_postulante.message : null}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={4}>
          <Controller 
            name="universidad"
            control={control}
            render={({field: {onChange, onBlur}})=>(
              <Autocomplete
                // value={value}  
                onChange={(_,data)=>onChange(data)}
                onBlur={onBlur}
                options={univeridades}
                loading={loadingUni}
                getOptionLabel={(option) => option.nombre}
                isOptionEqualToValue={(option, value) => option.nombre === value.nombre}
                renderInput={(params) => 
                  <TextField {...params} 
                    label="Universidad" 
                    error={!!errors.universidad} 
                    helperText={ errors.universidad ? errors.universidad.message : null} 
                    variant="standard"
                  />}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={4}>
          <Controller 
            name="carrera"
            control={control}
            render={({field: {onChange, value, onBlur}, fieldState: {error}})=>(
              <TextField
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={!!error}
                helperText={error ? error.message : null}
                variant="standard" 
                label="Carrera"
                InputLabelProps={{
                    shrink: true,
                  }}
                fullWidth
                autoComplete='off'
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid container mt={0} spacing={2} p={2}>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <FormControl error={!!errors.numero_anios_semestres} variant="standard" fullWidth>
            <InputLabel id="num">Numero de años o semestres</InputLabel>
            <Controller 
              name="numero_anios_semestres"
              control={control}
              render={({field: {onChange, value, onBlur}})=>(
                <Select
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  labelId="num" 
                  label="Numero de años o semestres">
                  <MenuItem value="4to año">4to año</MenuItem>
                  <MenuItem value="5to año">5to año</MenuItem>
                  <MenuItem value="Finalizado">Finalizado</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.numero_anios_semestres ? errors.numero_anios_semestres.message : null}</FormHelperText>
          </FormControl>
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
          <FormControl variant="standard" fullWidth>
            <InputLabel id="mod">Modalidad</InputLabel>
                <Select
                  value={modalidad}
                  onChange={(e => setModalidad(e.target.value))}
                  labelId="mod" 
                  label="Extension">
                  <MenuItem value="pasantia">Pasantia</MenuItem>
                  <MenuItem value="trabajo dirigido">Trabajo dirigido</MenuItem>
                </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12 } sm={7} md={8} lg={8}>
        <Controller 
            name="convocatoria"
            control={control}
            render={({field: {onChange, onBlur}})=>(
              <Autocomplete
                onChange={(_,data)=>onChange(data)}
                onBlur={onBlur}
                options={convocatorias}
                getOptionLabel={(option) => option.nombre_ref}
                isOptionEqualToValue={(option, value) => option.nombre_ref === value.nombre_ref}
                renderInput={(params) => <TextField 
                    {...params} 
                    error={!!errors.convocatoria} 
                    helperText={ errors.convocatoria ? errors.convocatoria.message : "Seleccione una modalidad para ver las convocatorias"}
                    label="Convocatorias de pasantia o trabajo dirigido" 
                    variant="standard" />}
              />
            )}
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
              // disabled={(Object.keys(errors).length!==0)}
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
