import { Button, Grid } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../../layouts/layoutContainers/DashboardLayout'
import MDBox from '../../../theme/components/MDBox'
import MDTypography from '../../../theme/components/MDTypography'
import { TableGrid } from '../../components/Table/TableGrid'
import AddIcon from '@mui/icons-material/Add';

export const PersonLayout = ({title, subtitle, link , buttonTitle, rows, columns, loading }) => {
  return (
    <DashboardLayout>
        <MDBox mt={2} mb={2}>
          <Grid container >
            <Grid container justifyContent='center' mt={2}>
              <Grid item textAlign='center'>
                <MDTypography variant='h4'>
                  { title }
                </MDTypography>
                <MDTypography variant='subtitle2'>
                  { subtitle }
                </MDTypography>
              </Grid>
            </Grid>
            <Grid item mt={2}>
              <Link to={ link }>
                <Button sx={{fontSize: 'small'}} variant='contained' startIcon={<AddIcon />}>
                  { buttonTitle }
                </Button>
              </Link>
            </Grid>
            <TableGrid rows={rows} columns={columns} loading={loading}/>
          </Grid>
        </MDBox>
    </DashboardLayout>
  )
}
