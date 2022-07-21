import { Alert, Autocomplete, Button, Card, CircularProgress, Grid, Icon, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../../layouts/layoutContainers/DashboardLayout'
import MDTypography from '../../../theme/components/MDTypography'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm, Controller } from "react-hook-form";
import { Box } from '@mui/system'
import { Link, useNavigate } from 'react-router-dom'
import { FormLayout } from '../../../layouts/FormLayout'
import apiClient from '../../../services/api'
import { useMemo } from 'react'
import debounceFunction from '../../../helpers/debounceFunction'

export const CrearUsuario = () => {
  const [personas, setPersonas] = useState([]);
  const [rols, setRols] = useState([]);
  const [rol, setRol] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // axios.get('http://127.0.0.1:8000/api/personas/users')
    // .then((response) => {
    //    setPersonas(response.data)
    // });

    axios.get('http://127.0.0.1:8000/api/rols')
    .then((response) => {
       setRols([...response.data])
    });
  }, [])

  const getPersonas = useMemo(()=>{
    const fetchData = async (query) => {
      setLoading(true);
      try {
        const response = await apiClient.get('/api/personas/users?search'+query);
        setPersonas([...response.data]);
        setLoading(false);
      } catch (error) {
        console.error(error)
      }
    }

    return debounceFunction(fetchData, 250);
  }, [])
  
  useEffect(() => {
    setLoading(true);
    getPersonas(query);
  }, [query])
  

  // useEffect(() =>{
  //   let active =true;
  //   if (!loading) {
  //      return undefined; 
  //   }

  //   (async () => {
  //     const response = await axios.get('http://127.0.0.1:8000/api/rols');
  //     if (active) {
  //       setRols([...response.data])
  //     }

  //   })();
  //   return () => {
  //     active = false
  //   }
    
  // }, [loading])
  
  // // const handleData = (e, newValue) => {
  // //   setPersona( newValue );
  // //   console.log(persona)
   
  // // }

  const schema = yup.object({
    Usuario: yup.string().required("Ingresa un usuario").min(4, "Minimo 4 caracteres"),
    Contraseña: yup.string().lowercase().trim().required("Ingresa una contraseña").min(4, "Minimo 4 caracteres"),
    rol: yup.object().nullable().required("Ingresa un rol"),
  }).required()

  const { handleSubmit, control, setValue, resetField, formState: {errors}, clearErrors } = useForm({
    defaultValues:{
      Usuario: "",
      Contraseña: '',
      id_persona:'',
      
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => console.log(data)
  
  return (
    <FormLayout>
      <Box component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} alignItems="center" p={2}>
          <Grid item xs={12}>
            <MDTypography variant="h5" fontWeight="medium">
              Crear un nuevo usuario
            </MDTypography>
          </Grid>
          <Grid item container spacing={2} mt={1}>

          <Grid item xs={12} sm={5} md={5} >
            <Autocomplete 
              id='people'
              freeSolo
              onChange={(e,newValue) => { 
                if (newValue != undefined) {
                  setValue('Usuario', newValue.ci)
                  setValue('id_persona', newValue.id)
                  setValue('Contraseña', newValue.ci+newValue.extension)
                  clearErrors(['Usuario', 'Contraseña'])
                } else {
                  resetField("Usuario")
                  resetField("Contraseña")
                }
              }}
              options={personas}
              loading={loading}
              onInputChange={(e, newValue) => setQuery(newValue)}
              getOptionLabel={(option) => (option.nombres+' '+option.primer_apellido+' '+option.segundo_apellido)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField 
                {...params} 
                variant="standard" 
                label="Buscar personas..."
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
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
                
              />)}
              
              />
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
              <Controller 
                render={({field: {onChange}}) => (
                  <Autocomplete 
                    options={rols}
                    isOptionEqualToValue={(option, value) => option.tipo_rol === value.tipo_rol}
                    getOptionLabel={(option) => option.tipo_rol}
                    renderInput={(params) =>(
                      <TextField 
                        { ...params }
                        error={!!errors.rol}
                        helperText={ errors.rol ? errors.rol.message : null}
                        label="Roles"
                        variant="standard"
                      />
                    )}
                    onChange={(_, data) => {
                      onChange(data)
                      setRol(data)
                    }}
                  />
                )}
                defaultValue={null} 
                name="rol"
                control={control}
              />
          </Grid>
          <Grid item xs={12} sm={5} md={5}>
            {rol != null ? <Alert severity='info' sx={{fontSize: "small"}}>
                { rol.descripcion }
            </Alert>: null}
          </Grid>
          </Grid>
          <Grid item container mt={1} spacing={2}>

          <Grid item xs={12} sm={5} md={6}>
            <Controller 
              name="Usuario"
              control={control}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <TextField
                  label="Usuario"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={5} md={6}>
            <Controller 
              name="Contraseña"
              control={control}
              render={({field: {onChange, value}, fieldState:{ error}}) => (
                <TextField 
                  type="password" 
                  label="Contraseña"
                  onChange={onChange}  
                  value={value}
                  error={!!error}
                  helperText={error ? error.message : null}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
              )}
            />
          </Grid>
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
      </Box>
    </FormLayout>
  )
}
