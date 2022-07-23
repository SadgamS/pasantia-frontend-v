import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { FormLayout } from '../../../../layouts/FormLayout';
import MDTypography from '../../../../theme/components/MDTypography';
import { DatosPersonales } from '../components/DatosPersonales';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { defaultValuesPersonales } from '../forms/defaultValues/defaultDatosPersonales';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../forms/validations/validationServidorPublico';
import apiClient from '../../../../services/api';
import * as yup from "yup";
import moment from 'moment';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export const CrearServidorPublico = () => {
  const [loading, setLoading] = useState(false);
  const [loadingUnidades, setLoadingUnidades] = useState(false);
  const [unidades, setUnidades] = useState([]);

  const getUnidades = async () => {
    setLoadingUnidades(true);
    try {
      const response = await apiClient.get('/api/unidades');
      setUnidades(response.data);
      setLoadingUnidades(false);
    } catch (error) {
      setLoadingUnidades(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getUnidades();
  }, []);
  
  const defaultValues = {
    ...defaultValuesPersonales,
    formacion_academica: "",
    nivel_academico: "",
  }
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]*$/g;
  const schemaServidorPublico = yup.object({
    ...schema,
    formacion_academica: yup.string().required("Por favor, ingresa una formacion").matches(regex, "Solo puede ingresar letras"),
    nivel_academico: yup.string().required("Por favor, seleccione un Nivel academico"),
    unidad: yup.object().required("Por favor, seleccione una Unidad")
  }).required()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: defaultValues,
    resolver: yupResolver(schemaServidorPublico),
  });
  let navigate = useNavigate();
  const onSubmit = async (data) => {
    // console.log(data);
    setLoading(true);
    try {
      const response = await apiClient.post('/api/servidores-publicos/crear',{
        ...data,
        fecha_nacimiento: moment(data.fecha_nacimiento).format("YYYY-MM-DD"),
        celular: Number(data.celular),
        numero_referencia: Number(data.celular_referencia),
        id_unidad: data.unidad.id,
      })
      if (response.data.message === 'success') {
        Swal.fire({
          title: 'Agregado con exito!',
          text: 'Se agrego a un nuevo servidor publico',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        setLoading(false);
        navigate('/servidores-publicos');
      }else if(response.data.message === 'error'){
        Swal.fire({
          title: 'Ocurrio un error al guardar',
          text: 'Por favor intente nuevamente',
          icon: 'error',
        });
        setLoading(false)
      }
    } catch (error) {
      
    }
  };
  return (
    <FormLayout>
      <Grid container mt={1} justifyContent="center">
        <Grid item>
          <MDTypography
            variant="h5"
            color="secondary"
            fontWeight="medium"
            textTransform="uppercase"
          >
            Añadir a un nuevo Servidor publico
          </MDTypography>
        </Grid>
      </Grid>
      <Box component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1} mt={1}>
          <Grid item md={6} lg={6}>
            <DatosPersonales control={control} errors={errors} />
          </Grid>

          <Grid item lg={6}>
            <Card
              sx={{
                p: 2,
                mt: 1,
              }}
            >
              <Grid container mt={2}>
                <Grid item>
                  <MDTypography
                    variant="h5"
                    fontWeight="medium"
                    color="primary"
                  >
                    Datos
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container mt={1} spacing={1} justifyContent="center">
                <Grid item xs={12} sm={8} md={5} lg={6}>
                  <Controller
                    name="formacion_academica"
                    control={control}
                    render={({
                      field: { onChange, value, onBlur },
                      fieldState: { error },
                    }) => (
                      <TextField
                        variant="outlined"
                        value={value}
                        onChange={(e)=>onChange(e.target.value.toUpperCase())}
                        onBlur={onBlur}
                        error={!!error}
                        helperText={error ? error.message : null}
                        label="Formación academica"
                        fullWidth
                        autoComplete="off"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={8} md={5} lg={6}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    error={!!errors.nivel_academico}
                  >
                    <InputLabel id="ext">Nivel academico</InputLabel>
                    <Controller
                      name="nivel_academico"
                      control={control}
                      render={({ field: { onChange, value, onBlur } }) => (
                        <Select
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          labelId="niv"
                          label="Nivel academico"
                        >
                          <MenuItem value={'BACHILLER'}>Bachiller</MenuItem>
                          <MenuItem value={'TECNICO SUPERIOR'}>
                            Tecnico Superior
                          </MenuItem>
                          <MenuItem value={'LICENCIATURA'}>
                            Licenciatura
                          </MenuItem>
                          <MenuItem value={'MAESTRIA'}>Maestria</MenuItem>
                          <MenuItem value={'DOCTORADO'}>Doctorado</MenuItem>
                        </Select>
                      )}
                    />
                    <FormHelperText>
                      {errors.nivel_academico ? errors.nivel_academico.message : null}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container mt={2} mb={2} spacing={1} >
                <Grid item xs={12} sm={8} md={5} lg={12}>
                  <Controller
                    name="unidad"
                    control={control}
                    render={({ field: { onChange, onBlur } }) => (
                      <Autocomplete
                        onChange={(_, data) => onChange(data)}
                        onBlur={onBlur}
                        options={unidades}
                        loading={loadingUnidades}
                        getOptionLabel={(option) => option.nombre}
                        isOptionEqualToValue={(option, value) =>
                          option.nombre === value.nombre
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={!!errors.unidad}
                            helperText={
                              errors.unidad
                                ? errors.unidad.message
                                : null
                            }
                            label="Buscar Unidades..."
                            variant="standard"
                            InputProps={{
                              ...params.InputProps,
                              startAdornment: (
                                <>
                                  {<Icon color='inherit' fontSize='small'>search</Icon>}
                                  {params.InputProps.startAdornment}
                                </>
                              ),
                              endAdornment: (
                                <>
                                  {loadingUnidades ? <CircularProgress color="inherit" size={20} /> : null}
                                  {params.InputProps.endAdornment}
                                </>
                              ),
                            }}
                          />
                        )}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={3}
          p={2}
          mt={2}
        >
          <Link to="/servidores-publicos">
            <Button>Cancelar</Button>
          </Link>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            startIcon={<SaveIcon fontSize="medium" />}
          >
            Guardar
          </LoadingButton>
        </Stack>
            </Card>
            
          </Grid>
        </Grid>
     </Box>
    </FormLayout>
  );
};
