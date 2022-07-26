import {
  Autocomplete,
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
import { Box } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FormLayout } from '../../../../layouts/FormLayout';
import MDTypography from '../../../../theme/components/MDTypography';
import { DatosTutorAcademico } from '../components/DatosTutorAcademico';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from 'react';
import apiClient from '../../../../services/api';
import { defaultValuesPersonales } from '../forms/defaultValues/defaultDatosPersonales';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export const CrearTutorAcademico = () => {
  const [loading, setLoading] = useState(false);
  const [loadingUni, setLoadingUni] = useState(false);
  const [universidades, setUniversidades] = useState([]);

  const getUniversidades = async () => {
    setLoadingUni(true);
    try {
      const response = await apiClient.get('/api/universidades');
      setUniversidades(response.data);
      setLoadingUni(false);
    } catch (error) {
      setLoadingUni(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getUniversidades();
  }, []);

  const defaultValues = {
    ...defaultValuesPersonales,
    nivel_academico: '',
  };

  const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]*$/g;
  const schema = yup
    .object({
      nombres: yup
        .string()
        .required('Ingresa un nombre')
        .matches(regex, 'Solo puede introducir letras'),
      apellidos: yup
        .string()
        .required('Ingresa un apellido')
        .matches(regex, 'Solo puede introducir letras'),
      genero: yup.string().required('Por favor, seleccione un genero'),
      nivel_academico: yup
        .string()
        .required('Por favor, seleccione un Nivel academico'),
      universidad: yup
        .object()
        .required('Por favor seleccione una Universidad'),
    })
    .required();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  let navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const response = await apiClient.post('/api/tutores-academicos/crear', {
        ...data,
        id_universidad: data.universidad.id,
      });
      if (response.data.message === 'success') {
        Swal.fire({
          title: 'Agregado con exito!',
          text: 'Se agrego a un nuevo servidor publico',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
        navigate('/tutores-academicos');
      } else if (response.data.message === 'error') {
        Swal.fire({
          title: 'Ocurrio un error al guardar',
          text: 'Por favor intente nuevamente',
          icon: 'error',
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
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
            Añadir a un nuevo Tutor académico
          </MDTypography>
        </Grid>
      </Grid>
      <Box component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1} mt={1}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <DatosTutorAcademico control={control} errors={errors} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
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
                    Datos Académicos
                  </MDTypography>
                </Grid>
              </Grid>
              <Grid container mt={1} spacing={1}>
                <Grid item xs={12} sm={5} md={5} lg={6} mb={2}>
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
                      {errors.nivel_academico
                        ? errors.nivel_academico.message
                        : null}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={11} md={11} lg={11} mb={4}>
                <Controller
                  name="universidad"
                  control={control}
                  render={({ field: { onChange, onBlur } }) => (
                    <Autocomplete
                      onChange={(_, data) => onChange(data)}
                      onBlur={onBlur}
                      options={universidades}
                      loading={loadingUni}
                      getOptionLabel={(option) => option.nombre}
                      isOptionEqualToValue={(option, value) =>
                        option.nombre === value.nombre
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.universidad}
                          helperText={
                            errors.universidad
                              ? errors.universidad.message
                              : null
                          }
                          label="Seleccionar una Universidad..."
                          variant="standard"
                          fullWidth
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <>
                                {
                                  <Icon color="inherit" fontSize="small">
                                    search
                                  </Icon>
                                }
                                {params.InputProps.startAdornment}
                              </>
                            ),
                            endAdornment: (
                              <>
                                {loadingUni ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : null}
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
            </Card>
          </Grid>
        </Grid>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={5}
          p={2}
          mt={1}
        >
          <Link to="/tutores-academicos">
            <Button>Cancelar</Button>
          </Link>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            startIcon={<SaveIcon fontSize="medium" />}
            sx={{ width: 300 }}
          >
            Guardar
          </LoadingButton>
        </Stack>
      </Box>
    </FormLayout>
  );
};
