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
import {es} from 'date-fns/locale'

import { Link, useNavigate } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { FormLayout } from '../../../../layouts/FormLayout';
import MDBox from '../../../../theme/components/MDBox';
import MDTypography from '../../../../theme/components/MDTypography';

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from "react-hook-form";
import moment from "moment";
import { useEffect, useState } from 'react';
import apiClient from '../../../../services/api';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { Box } from '@mui/system';

export const CrearPostulante = () => {
  const [univeridades, setUniveridades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalidad, setModalidad] = useState('');
  const [convocatorias, setConvocatorias] = useState([]);
  const [loadingConv, setLoadingConv] = useState(true);
  const loadingUni = univeridades.length === 0;

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
          const response = await apiClient.get(`/api/convocatorias/${modalidad}`);
          if (response.status === 200) {
            setConvocatorias(response.data);
            setLoadingConv(false);
          }
        } catch(error){
          console.error(error);
          setLoadingConv(true);
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
    expedicion: yup.string().required("Selecciona un departamento"),
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
    convocatoria: yup.object().required("Seleccione una convocatoria (primero eliga una modalidad)"),
    doc_ci: yup.mixed().required("Es necesario el CI en formato PDF")
                .test("fileSize", "El archivo no puede pesar más de 5Mb", (value, context) => {
                  return value && value[0] && value[0].size <= 5000000;
                })
                .test("type", "Solo se admiten documentos en formato PDF", function (value) {
                  return value && value[0] && value[0].type === "application/pdf";
                }),
    doc_cv: yup.mixed().required("Es necesario el C.V. en formato PDF")
                .test("fileSize", "El archivo no puede pesar más de 5Mb", (value, context) => {
                  return value && value[0] && value[0].size <= 5000000;
                })
                .test("type", "Solo se admiten documentos en formato PDF", function (value) {
                  return value && value[0] && value[0].type === "application/pdf";
                }),
    doc_matricula: yup.mixed().when('tipo_postulante',{
      is: (val) => val === "Estudiante",
      then: (schema) => schema.required("Es necesario la matricula en formato PDF")
      .test("fileSize", "El archivo no puede pesar más de 5Mb", (value, context) => {
        return value && value[0] && value[0].size <= 5000000;
      })
      .test("type", "Solo se admiten documentos en formato PDF", function (value) {
        return value && value[0] && value[0].type === "application/pdf";
      }),
    }),
    doc_histoAca: yup.mixed().when('tipo_postulante',{
      is: (val) => val === "Estudiante",
      then: (schema) => schema.required("Es necesario el historial academico en formato PDF")
      .test("fileSize", "El archivo no puede pesar más de 5Mb", (value, context) => {
        return value && value[0] && value[0].size <= 5000000;
      })
      .test("type", "Solo se admiten documentos en formato PDF", function (value) {
        return value && value[0] && value[0].type === "application/pdf";
      }),
    }),
    doc_notasol: yup.mixed().required("Es necesario la nota de solicitud en formato PDF")
    .test("fileSize", "El archivo no puede pesar más de 5Mb", (value, context) => {
      return value && value[0] && value[0].size <= 5000000;
    })
    .test("type", "Solo se admiten documentos en formato PDF", function (value) {
      return value && value[0] && value[0].type === "application/pdf";
    }),
    doc_certificadoEgreso: yup.mixed().when('tipo_postulante',{
      is: (val) => val === "Egresado",
      then: (schema) => schema.required("Es necesario el certificado de egresado en formato PDF")
      .test("fileSize", "El archivo no puede pesar más de 5Mb", (value, context) => {
        return value && value[0] && value[0].size <= 5000000;
      })
      .test("type", "Solo se admiten documentos en formato PDF", function (value) {
        return value && value[0] && value[0].type === "application/pdf";
      }),
    }),
  }).required()

  const { control, handleSubmit, formState: {errors}, register, watch, setValue} = useForm({
    mode: "all",
    defaultValues:{
      nombres: '',
      primer_apellido: '',
      segundo_apellido: '',
      ci: '',
      expedicion: '',
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
      doc_ci: null,
      doc_cv: null,
      doc_matricula: null,
      doc_histoAca:null,
      doc_notasol: null,
      doc_certificadoEgreso:null
    },
    resolver: yupResolver(schema)
  });
  const obsTipoPos = watch("tipo_postulante");
  const obsDocCi = watch("doc_ci");
  const obsDocCv = watch("doc_cv");
  const obsDocMatricula = watch("doc_matricula");
  const obsDocHistoAca = watch("doc_histoAca");
  const obsDocNotaSol = watch("doc_notasol");
  const obsDocCertificadoE = watch("doc_certificadoEgreso");
  console.log(obsDocCi);
  let navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log(data)
    setLoading(true)
    try{
      const response = await apiClient.post('/api/postulantes/crear',{
        nombres: data.nombres,
        primer_apellido: data.primer_apellido,
        segundo_apellido: data.segundo_apellido,
        ci: data.ci,
        expedicion: data.expedicion,
        fecha_nacimiento: moment(data.fecha_nacimiento).format("YYYY-MM-DD"),
        genero: data.genero,
        domicilio: data.domicilio,
        ciudad: data.ciudad,
        correo: data.correo,
        celular: Number(data.celular),
        nombre_referencia: data.nombre_referencia,
        numero_referencia: Number(data.celular_referencia),
        tipo_postulante: data.tipo_postulante.toUpperCase(),
        carrera: data.carrera,
        numero_anios_semestre: data.numero_anios_semestres.toUpperCase(),
        id_universidad: data.universidad.id,
        id_pasantia: data.convocatoria.id,
        doc_ci: data.doc_ci[0],
        doc_cv: data.doc_cv[0],
        doc_matricula: data.doc_matricula ? data.doc_matricula[0]: '',
        doc_histoAca: data.doc_histoAca ? data.doc_histoAca[0]: '',
        doc_notasol: data.doc_notasol[0],
        doc_certificadoEgreso: data.doc_certificadoEgreso ? data.doc_certificadoEgreso[0] : '',
      },{headers:{'Content-Type': 'multipart/form-data',}});
      console.log(response)
      if (response.data.message === 'success') {
        setLoading(false)
        Swal.fire({
          title: 'Agregado con exito!',
          text: 'Se agrego a un nuevo postulante',
          icon: 'success'
        });
        navigate('/postulantes');
      } else if(response.data.message === 'error'){
        setLoading(false)
        Swal.fire({
          title: 'Ocurrio un error al guardar',
          text: 'Por favor intente nuevamente',
          icon: 'error',
        });
      }
    } catch (error){
      console.error(error)
      setLoading(false)
      Swal.fire({
        title: 'Ocurrio un error al guardar',
        text: 'Por favor intente nuevamente',
        icon: 'error',
      });
    }
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
      <MDBox component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container mt={0} spacing={2} p={1}>
          <Grid item xs={12} sm={6} md={4} lg={4}>
          <Controller 
              name="nombres"
              control={control}
              render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
                <TextField
                  onChange={(e)=>onChange(e.target.value.toUpperCase())}
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
                  onChange={(e)=>onChange(e.target.value.toUpperCase())}
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
                  onChange={(e)=>onChange(e.target.value.toUpperCase())}
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
          <Grid item xs={6} sm={7} md={5} lg={3}>
            <Controller 
              name="ci"
              control={control}
              render={({field: {onChange, value, onBlur}, fieldState: {error}}) => (
                <TextField
                  onChange={(e)=>onChange(e.target.value.toUpperCase())}
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
          <Grid item xs={6} sm={5} md={3} lg={2}>
            <FormControl variant="standard" fullWidth error={!!errors.expedicion}>
              <InputLabel id="ext">Expedición</InputLabel>
            <Controller 
              name="expedicion"
              control={control}
              render={({field:{onChange, value, onBlur}})=>(
              <Select
                onChange={onChange}
                onBlur={onBlur}
                value={value} 
                labelId="ext" 
                label="Extension"
              >
                <MenuItem value={"BE"}>Beni</MenuItem>
                <MenuItem value={"CB"}>Cochabamba</MenuItem>
                <MenuItem value={"CH"}>Chuquisaca</MenuItem>
                <MenuItem value={"LP"}>La Paz</MenuItem>
                <MenuItem value={"OR"}>Oruro</MenuItem>
                <MenuItem value={"PD"}>Pando</MenuItem>
                <MenuItem value={"PT"}>Potosi</MenuItem>
                <MenuItem value={"SC"}>Santa Cruz</MenuItem>
                <MenuItem value={"TJ"}>Tarija</MenuItem>
                <MenuItem value={"QR"}>QR</MenuItem>
              </Select>
              )}
              />
              <FormHelperText>{errors.expedicion ? errors.expedicion.message : null}</FormHelperText>
              </FormControl>
          </Grid>
          <Grid item xs={8} sm={5} md={4} lg={3}>
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
                  renderInput={(params) => 
                      <TextField {...params} 
                      onBlur={onBlur} 
                      error={!!error} 
                      helperText={error ? error.message : null} 
                      InputLabelProps={{shrink:true}} 
                      variant="standard"
                      fullWidth 
                      autoComplete="off"
                    />}
                />
              )}
            />

            </LocalizationProvider>

          </Grid>
          <Grid item xs={12} sm={7} md={5} lg={4} sx={{mt:{ xs:-1, sm:-1, md:-1, lg:-2}}}>
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
        <Grid item xs={12} sm={7} md={5} lg={5}>
          <Controller 
            name="domicilio"
            control={control}
            render={({field:{onChange, value, onBlur}, fieldState:{error}})=>(
              <TextField
                value={value}
                onChange={(e)=>onChange(e.target.value.toUpperCase())}
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
        <Grid item xs={12} sm={5} md={3} lg={3}>
        <Controller 
          name="ciudad"
          control={control}
          render={({field:{onChange, value, onBlur}, fieldState:{error}})=>(
            <TextField
              variant="standard"
              label="Ciudad de residencia"
              value={value}
              onChange={(e)=>onChange(e.target.value.toUpperCase())}
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
              onChange={(e)=>onChange(e.target.value.toUpperCase())}
              onBlur={onBlur}
              error={!!error}
              helperText={error ? error.message : null}
              variant="standard" 
              label="Nombre completo de un familiar de referencia"
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
                onChange={(e)=>{onChange(e)
                  if (e.target.value === "Estudiante") {
                    setValue('doc_matricula', null)
                    setValue('doc_histoAca', null)
                  }else if (e.target.value === "Egresado"){
                    setValue('doc_certificadoEgreso', null)
                  }    
                }}
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
                onChange={(e)=>onChange(e.target.value.toUpperCase())}
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
                  <MenuItem value="3er AÑO">3er año</MenuItem>
                  <MenuItem value="4to AÑO">4to año</MenuItem>
                  <MenuItem value="5to AÑO">5to año</MenuItem>
                  <MenuItem value="FINALIZADO">Finalizado</MenuItem>
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
        <Grid item xs={12} sm={5} md={4} lg={4}>
          <FormControl variant="standard" fullWidth>
            <InputLabel id="mod">Modalidad</InputLabel>
                <Select
                  value={modalidad}
                  onChange={(e => setModalidad(e.target.value))}
                  labelId="mod" 
                  label="Modalidad">
                  <MenuItem value="PASANTIA">Pasantia</MenuItem>
                  <MenuItem value="TRABAJO DIRIGIDO">Trabajo dirigido</MenuItem>
                </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={7} md={8} lg={8}>
        <Controller 
            name="convocatoria"
            control={control}
            render={({field: {onChange, onBlur}})=>(
              <Autocomplete
                onChange={(_,data)=>onChange(data)}
                onBlur={onBlur}
                loading={loadingConv}
                options={convocatorias}
                getOptionLabel={(option) => option.nombre_ref}
                isOptionEqualToValue={(option, value) => option.nombre_ref === value.nombre_ref}
                renderInput={(params) => <TextField 
                    {...params} 
                    error={!!errors.convocatoria} 
                    helperText={ errors.convocatoria ? errors.convocatoria.message : "Seleccione una modalidad para ver las convocatorias"}
                    label="Convocatorias de pasantia o trabajo dirigido" 
                    variant="standard" 
                    />}
              />
            )}
        />
        </Grid>
      </Grid>
      <Grid container mt={1}>
        <Grid item>
          <MDTypography variant="subtitle2" fontWeight="regular" color="info">
            Documentos
          </MDTypography>
        </Grid>
      </Grid>
      <Grid container mt={0} spacing={1} p={2}>
        <Grid item xs={12} sm={7} md={8} lg={4}>
              <FormControl error={!!errors.doc_ci} fullWidth>
                <Button variant="contained" color={!!errors.doc_ci ? "error" : "primary"} component="label" startIcon={<AttachFileIcon/>}>
                  Carnet de identidad
                  <input  {...register("doc_ci")}  hidden accept="application/pdf" type="file" />
                </Button>
                <FormHelperText>{errors.doc_ci ? errors.doc_ci.message : null}</FormHelperText>
              </FormControl>
              {
               obsDocCi && obsDocCi.length > 0 ? (
                    <Box display="flex" alignItems="center" mt={1}>
                      <UploadFileIcon />
                      <MDTypography variant="caption" sx={{fontSize: 16}} fontWeight="regular" width={200}>
                      {obsDocCi[0].name}
                      </MDTypography>
                    </Box>

                ) : null
              }
        </Grid>
        <Grid item xs={12} sm={7} md={8} lg={4}>
              <FormControl error={!!errors.doc_cv} fullWidth>
                <Button variant="contained" color={!!errors.doc_cv ? "error" : "primary"} component="label" startIcon={<AttachFileIcon/>}>
                  Hoja de Vida
                  <input  {...register("doc_cv")}  hidden accept="application/pdf" type="file" />
                </Button>
                <FormHelperText>{errors.doc_cv ? errors.doc_cv.message : null}</FormHelperText>
              </FormControl>
              {
               obsDocCv && obsDocCv.length > 0 ? (
                    <Box display="flex" alignItems="center" mt={1}>
                      <UploadFileIcon />
                      <MDTypography variant="caption" sx={{fontSize: 16}} fontWeight="regular" width={200}>
                      {obsDocCv[0].name}
                      </MDTypography>
                    </Box>

                ) : null
              }
        </Grid>
        <Grid item xs={12} sm={7} md={8} lg={4}>
                  <FormControl error={!!errors.doc_notasol} fullWidth>
                    <Button variant="contained" color={!!errors.doc_notasol ? "error" : "primary"} component="label" startIcon={<AttachFileIcon/>}>
                      Nota de solicitud
                      <input  {...register("doc_notasol")}  hidden accept="application/pdf" type="file" />
                    </Button>
                    <FormHelperText>{errors.doc_notasol ? errors.doc_notasol.message : null}</FormHelperText>
                  </FormControl>
                  {
                   obsDocNotaSol && obsDocNotaSol.length > 0 ? (
                        <Box display="flex" alignItems="center" mt={1}>
                          <UploadFileIcon />
                          <MDTypography variant="caption" sx={{fontSize: 16}} fontWeight="regular" width={200}>
                          {obsDocNotaSol[0].name}
                          </MDTypography>
                        </Box>

                    ) : null
                  }
            </Grid>

      {
        obsTipoPos === "Estudiante" ? 
        ( <>
            <Grid item xs={12} sm={7} md={8} lg={3}>
              <FormControl error={!!errors.doc_matricula} fullWidth>
                <Button variant="contained" color={!!errors.doc_matricula ? "error" : "primary"} component="label" startIcon={<AttachFileIcon/>}>
                  Matricula
                  <input  {...register("doc_matricula")}  hidden accept="application/pdf" type="file" />
                </Button>
                <FormHelperText>{errors.doc_matricula ? errors.doc_matricula.message : null}</FormHelperText>
              </FormControl>
              {
                obsDocMatricula && obsDocMatricula.length > 0 ? (
                    <Box display="flex" alignItems="center" mt={1}>
                      <UploadFileIcon />
                      <MDTypography variant="caption" sx={{fontSize: 16}} fontWeight="regular" width={200}>
                      {obsDocMatricula[0].name}
                      </MDTypography>
                    </Box>

                ) : null
              }
            </Grid>
            <Grid item xs={12} sm={7} md={8} lg={4}>
                  <FormControl error={!!errors.doc_histoAca} fullWidth>
                    <Button variant="contained" color={!!errors.doc_histoAca ? "error" : "primary"} component="label" startIcon={<AttachFileIcon/>}>
                      Historial Academico
                      <input  {...register("doc_histoAca")}  hidden accept="application/pdf" type="file" />
                    </Button>
                    <FormHelperText>{errors.doc_histoAca ? errors.doc_histoAca.message : null}</FormHelperText>
                  </FormControl>
                  {
                    obsDocHistoAca && obsDocHistoAca.length > 0 ? (
                        <Box display="flex" alignItems="center" mt={1}>
                          <UploadFileIcon />
                          <MDTypography variant="caption" sx={{fontSize: 16}} fontWeight="regular" width={200}>
                          {obsDocHistoAca[0].name}
                          </MDTypography>
                        </Box>

                    ) : null
                  }
            </Grid>
            
          </>
          ) : null
        }
      {
        obsTipoPos === "Egresado" ? (
          <Grid item xs={12} sm={7} md={8} lg={4}>
              <FormControl error={!!errors.doc_certificadoEgreso} fullWidth>
                <Button variant="contained" color={!!errors.doc_certificadoEgreso ? "error" : "primary"} component="label" startIcon={<AttachFileIcon/>}>
                  Certificado Egreso
                  <input  {...register("doc_certificadoEgreso")}  hidden accept="application/pdf" type="file" />
                </Button>
                <FormHelperText>{errors.doc_certificadoEgreso ? errors.doc_certificadoEgreso.message : null}</FormHelperText>
              </FormControl>
              {
                obsDocCertificadoE && obsDocCertificadoE.length > 0 ? (
                    <Box display="flex" alignItems="center" mt={1}>
                      <UploadFileIcon />
                      <MDTypography variant="caption" sx={{fontSize: 16}} fontWeight="regular" width={200}>
                      {obsDocCertificadoE[0].name}
                      </MDTypography>
                    </Box>

                ) : null
              }
            </Grid>
        ) : null
      }

    </Grid>
      <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={3}
          p={2}
          mt={2}
          >
            <Link to="/postulantes">
              <Button>
                Cancelar
              </Button> 
            </Link>
           <LoadingButton
              type="submit"
              color="info"
              variant="outlined"
              loading={loading}
              startIcon={<SaveIcon />}
              >
              Guardar
            </LoadingButton>
        </Stack>
      </MDBox>
    </FormLayout>
  );
};
