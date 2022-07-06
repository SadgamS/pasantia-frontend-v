import { Grid } from '@mui/material'
import React from 'react'
import DashboardLayout from '../../../../layouts/layoutContainers/DashboardLayout'
import MDBox from '../../../../theme/components/MDBox'

export const Postulantes = () => {
  return (
    <DashboardLayout>
        <MDBox mt={2} mb={2}>
          <Grid container >
            <div>Postulantes</div>
          </Grid>
        </MDBox>
    </DashboardLayout>
  )
}
