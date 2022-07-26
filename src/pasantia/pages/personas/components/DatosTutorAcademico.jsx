import {
    Card,
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
    TextField,
  } from '@mui/material';
  import { DatePicker } from '@mui/x-date-pickers';
  import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { es } from 'date-fns/locale';
  import React from 'react';
  import { Controller } from 'react-hook-form';
  import MDTypography from '../../../../theme/components/MDTypography';
  
  export const DatosTutorAcademico = ({ control, errors }) => {
    return (
      <Card
        sx={{
          p: 2,
          mt: 1,
        }}
      >
        <Grid container mt={2}>
          <Grid item>
            <MDTypography variant="h5" fontWeight="medium" color="primary">
              Datos Personales
            </MDTypography>
          </Grid>
        </Grid>
        <Grid container mt={1} spacing={1} justifyContent="center">
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Controller
              name="nombres"
              control={control}
              render={({
                field: { onChange, value, onBlur },
                fieldState: { error },
              }) => (
                <TextField
                  onChange={(e) => onChange(e.target.value.toUpperCase())}
                  onBlur={onBlur}
                  value={value}
                  variant="outlined"
                  error={!!error}
                  helperText={error ? error.message : null}
                  label="Nombres"
                  autoComplete="off"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Controller
              name="apellidos"
              control={control}
              render={({
                field: { onChange, value, onBlur },
                fieldState: { error },
              }) => (
                <TextField
                  onChange={(e) => onChange(e.target.value.toUpperCase())}
                  value={value}
                  onBlur={onBlur}
                  variant="outlined"
                  error={!!error}
                  helperText={error ? error.message : null}
                  label="Apellidos"
                  autoComplete="off"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid
          item
          xs={12}
          sm={11}
          md={11}
          lg={11}
          mt={1}
          mb={4}
        >
          <FormControl error={!!errors.genero} fullWidth>
            <FormLabel id="row-label"> Genero </FormLabel>
            <Controller
              name="genero"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <RadioGroup
                  row
                  aria-labelledby="row-radio-label"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                >
                  <FormControlLabel
                    value="F"
                    control={<Radio />}
                    label="Femenino"
                  />
                  <FormControlLabel
                    value="M"
                    control={<Radio />}
                    label="Masculino"
                  />
                </RadioGroup>
              )}
            />
            <FormHelperText>
              {errors.genero ? errors.genero.message : null}
            </FormHelperText>
          </FormControl>
        </Grid>
        </Grid>
        
      </Card>
    );
  };
  