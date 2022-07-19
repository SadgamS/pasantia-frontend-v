import { FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {es} from 'date-fns/locale'
import React from 'react';
import { Controller } from 'react-hook-form';
import MDTypography from '../../../../theme/components/MDTypography';

export const DatosPersonalesLayout = ({control, errors}) => {
  return (
    <>
     <Grid container mt={2}>
        <Grid item>
          <MDTypography variant="subtitle2" fontWeight="regular" color="info">
            Datos Personales
          </MDTypography>
        </Grid>
      </Grid>
      <Grid container mt={0} spacing={2} p={1}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
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
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <TextField
                onChange={(e) => onChange(e.target.value.toUpperCase())}
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
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <TextField
                onChange={(e) => onChange(e.target.value.toUpperCase())}
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
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <TextField
                onChange={(e) => onChange(e.target.value.toUpperCase())}
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
                  <MenuItem value={'QR'}>QR</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>
              {errors.expedicion ? errors.expedicion.message : null}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={8} sm={5} md={4} lg={3}>
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
        <Grid
          item
          xs={12}
          sm={7}
          md={5}
          lg={4}
          sx={{ mt: { xs: -1, sm: -1, md: -1, lg: -2 } }}
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
      <Grid container mt={0} spacing={2} p={1}>
        <Grid item xs={12} sm={7} md={5} lg={5}>
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
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <TextField
                variant="standard"
                label="Ciudad de residencia"
                value={value}
                onChange={(e) => onChange(e.target.value.toUpperCase())}
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
                variant="standard"
                label="Celular"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                autoComplete="off"
                type="tel"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={6} lg={6}>
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
                variant="standard"
                label="Nombre completo de un familiar de referencia"
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
            name="celular_referencia"
            control={control}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
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
                autoComplete="off"
                type="tel"
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};
