import {
  Button,
  Grid,
  Icon,
  InputAdornment,
  TextField,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../../../layouts/layoutContainers/DashboardLayout';
import MDBox from '../../../../theme/components/MDBox';
import MDTypography from '../../../../theme/components/MDTypography';
import { TableGrid } from '../../../components/Table/TableGrid';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';

export const PersonLayout = ({
  title,
  subtitle,
  link,
  buttonTitle,
  rows,
  columns,
  loading,
  page,
  rowCount,
  pageSize,
  setPage,
  setQuery,
  query,
}) => {
  return (
    <DashboardLayout>
      <MDBox mt={2} mb={2}>
        <Grid container>
          <Grid container justifyContent="center" mt={2}>
            <Grid item textAlign="center">
              <MDTypography variant="h4">{title}</MDTypography>
              <MDTypography variant="subtitle2">{subtitle}</MDTypography>
            </Grid>
          </Grid>
          <Grid item mt={2}>
            <Link to={link}>
              <Button
                sx={{ fontSize: 'small' }}
                variant="contained"
                startIcon={<AddIcon fontSize='medium'/>}
              >
                {buttonTitle}
              </Button>
            </Link>
          </Grid>
          <Box flex={1} />
          <Grid item mt={3} xs={10} lg={4}>
            <TextField
              placeholder="Buscar..."
              type="search"
              variant="standard"
              color="primary"
              focused
              fullWidth
              autoComplete='off'
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon color='inherit' fontSize='small'>search</Icon>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <TableGrid
            rows={rows}
            columns={columns}
            loading={loading}
            page={page}
            rowCount={rowCount}
            pageSize={pageSize}
            setPage={setPage}
          />
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
};
