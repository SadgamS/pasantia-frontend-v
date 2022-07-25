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

export const DatosPersonales = ({ control, errors }) => {
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
      </Grid>
      <Grid container mt={1} spacing={1} justifyContent="center">
        <Grid item xs={4} sm={4} md={4} lg={4}>
          <Controller
            name="ci"
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
                label="Numero de C.I."
                autoComplete="off"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4}>
          <FormControl variant="outlined" fullWidth error={!!errors.expedicion}>
            <InputLabel id="ext">Expedición</InputLabel>
            <Controller
              name="expedicion"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Select
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  labelId="ext"
                  label="Extension"
                >
                  <MenuItem value={'BE'}>Beni</MenuItem>
                  <MenuItem value={'CB'}>Cochabamba</MenuItem>
                  <MenuItem value={'CH'}>Chuquisaca</MenuItem>
                  <MenuItem value={'LP'}>La Paz</MenuItem>
                  <MenuItem value={'OR'}>Oruro</MenuItem>
                  <MenuItem value={'PD'}>Pando</MenuItem>
                  <MenuItem value={'PT'}>Potosi</MenuItem>
                  <MenuItem value={'SC'}>Santa Cruz</MenuItem>
                  <MenuItem value={'TJ'}>Tarija</MenuItem>
                  <MenuItem value={'QR'}>(Sin expedición)QR</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>
              {errors.expedicion ? errors.expedicion.message : null}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4}>
          <LocalizationProvider adapterLocale={es} dateAdapter={AdapterDateFns}>
            <Controller
              name="fecha_nacimiento"
              control={control}
              render={({
                field: { onChange, value, onBlur },
                fieldState: { error },
              }) => (
                <DatePicker
                  value={value}
                  onChange={onChange}
                  minDate={new Date('1990-01-01')}
                  maxDate={new Date().setFullYear(new Date().getFullYear() + 1)}
                  label="Fecha de nacimiento"
                  views={['day', 'month', 'year']}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      onBlur={onBlur}
                      error={!!error}
                      helperText={error ? error.message : null}
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      fullWidth
                      autoComplete="off"
                    />
                  )}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <Grid container mt={1} spacing={1}>
        <Grid
          item
          xs={12}
          sm={5}
          md={5}
          lg={5}
          sx={{ mt: { xs: -1, sm: -1, md: -1, lg: -1 } }}
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
        <Grid item xs={12} sm={7} md={7} lg={7}>
          <Controller
            name="domicilio"
            control={control}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <TextField
                value={value}
                onChange={(e) => onChange(e.target.value.toUpperCase())}
                onBlur={onBlur}
                error={!!error}
                placeholder="Calle Numero Zona"
                helperText={error ? error.message : null}
                variant="outlined"
                label="Domicilio"
                fullWidth
                multiline
                autoComplete="off"
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid container mt={1} spacing={1} justifyContent="center">
        <Grid item xs={12} sm={6} md={5} lg={5}>
          <Controller
            name="ciudad"
            control={control}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <TextField
                variant="outlined"
                label="Ciudad de residencia"
                value={value}
                onChange={(e) => onChange(e.target.value.toUpperCase())}
                onBlur={onBlur}
                error={!!error}
                helperText={error ? error.message : null}
                autoComplete="off"
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={7} lg={7}>
          <Controller
            name="correo"
            control={control}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <TextField
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={!!error}
                helperText={error ? error.message : null}
                variant="outlined"
                type="email"
                label="Correo"
                fullWidth
                autoComplete="off"
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid container mt={1} mb={3} spacing={1} justifyContent="center">
        <Grid item xs={6} sm={3} md={3} lg={3}>
          <Controller
            name="celular"
            control={control}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <TextField
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={!!error}
                helperText={error ? error.message : null}
                variant="outlined"
                label="Celular"
                fullWidth
                autoComplete="off"
                type="tel"
              />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={3} md={3} lg={3}>
          <Controller
            name="celular_referencia"
            control={control}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <TextField
                variant="outlined"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={!!error}
                helperText={error ? error.message : null}
                label="Cel. de ref."
                fullWidth
                autoComplete="off"
                type="tel"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Controller
            name="nombre_referencia"
            control={control}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <TextField
                value={value}
                onChange={(e) => onChange(e.target.value.toUpperCase())}
                onBlur={onBlur}
                error={!!error}
                helperText={error ? error.message : null}
                variant="outlined"
                label="Nombre de un familiar de ref."
                fullWidth
                autoComplete="off"
              />
            )}
          />
        </Grid>
      </Grid>
    </Card>
  );
};
