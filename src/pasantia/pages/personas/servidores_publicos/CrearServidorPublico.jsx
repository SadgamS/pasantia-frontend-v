import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Card, Grid, Stack, TextField } from '@mui/material';
import { FormLayout } from '../../../../layouts/FormLayout';
import MDTypography from '../../../../theme/components/MDTypography';
import { DatosPersonalesLayout } from '../layouts/DatosPersonalesLayout';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';
import { defaultValuesPersonales } from '../forms/defaultValues/defaultDatosPersonales';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../forms/validations/validationServidorPublico';
import apiClient from '../../../../services/api';

export const CrearServidorPublico = () => {
    const [loading, setLoading] = useState(false);
    const [unidades, setUnidades] = useState([])

    const getUnidades = async () => {
        try {
            const response = await apiClient.get('/api/unidades');
            setUnidades(response.data)
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
      getUnidades()
    }, [])
    console.log(unidades)
   const{handleSubmit,control, formState: {errors}}= useForm({
    mode: 'all',
    defaultValues: defaultValuesPersonales,
    resolver: yupResolver(schema)
   })
   const onSubmit = (data) => {
        console.log(data)
   }
  return (
    <FormLayout>
      <Grid container mt={1} justifyContent="center">
        <Grid item >
          <MDTypography variant="h6" color="secondary" fontWeight="bold" textTransform="uppercase">
            Añadir a un nuevo Servidor publico
          </MDTypography>
        </Grid>
      </Grid>
      <Box component="form" role="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1} mt={1}>
          <Grid item lg={6}>
            <DatosPersonalesLayout control={control} errors={errors}/>
          </Grid>
          
          <Grid item lg={6}>
          <Card>
            
            
          <Grid container mt={2}>
        <Grid item>
          <MDTypography variant="subtitle2" fontWeight="regular" color="info">
            Datos 
          </MDTypography>
        </Grid>
      </Grid>
      <Grid container mt={0} spacing={2} p={1}>
        <Grid item xs={12} sm={8} md={5} lg={4} >
        <Controller
          name="formacion_academica"
          control={control}
          render={({field:{onChange, value, onBlur}, fieldState:{error}})=>(

            <TextField
              variant="standard" 
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={!!error}
              helperText={error ? error.message : null}
              label="Formación academica"
              InputLabelProps={{
                  shrink: true,
                }}
              fullWidth
              autoComplete='off'
            />
          )}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={5} lg={4} >
        <Controller
          name="nivel_academico"
          control={control}
          render={({field:{onChange, value, onBlur}, fieldState:{error}})=>(

            <TextField
              variant="standard" 
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={!!error}
              helperText={error ? error.message : null}
              label="Nivel academico"
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
      <Grid container mt={0} spacing={2} p={1}>
        <Grid item xs={12} sm={8} md={5} lg={4} >
            <Controller 
                 name="unidad"
                 control={control}
                 render={({field: {onChange, onBlur}})=>(
                    <Autocomplete
                    onChange={(_,data)=>onChange(data)}
                onBlur={onBlur}
                
                options={unidades}
                getOptionLabel={(option) => option.nombre}
                isOptionEqualToValue={(option, value) => option.nombre === value.nombre}
                renderInput={(params) => <TextField 
                    {...params} 
                    error={!!errors.unidad} 
                    helperText={ errors.unidad ? errors.unidad.message : "Seleccione una modalidad para ver las convocatorias"}
                    label="Unidades" 
                    variant="standard" 
                    />}
                    />
                 )}
            />
        </Grid>
        </Grid>
        </Card>
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
              startIcon={<SaveIcon fontSize='medium'/>}
              >
              Guardar
            </LoadingButton>
        </Stack>
        </Box>
    </FormLayout>
  );
};
