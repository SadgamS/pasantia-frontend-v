import { useState } from "react"
import { Box, Button, ButtonGroup, Card, Grid, Icon, Modal, TextField } from "@mui/material"
import DashboardLayout from "../../../layouts/layoutContainers/DashboardLayout"
import MDBox from "../../../theme/components/MDBox"
import MDTypography from "../../../theme/components/MDTypography"
import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid"
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom"


export const Usuarios = () => {
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  return (
    <DashboardLayout>
        <MDBox mt={2} mb={2}>
            <Grid container spacing={1}>
                <Grid item xs={12} mt={2}>
                   <Link to={"/usuarios/crear-usuario"}> 
                <Button variant="outlined" color="info" startIcon={<AddIcon />} >
                    Agregar Usuario
                </Button>
                   </Link>
               <Box mt={4} width={"100%"} height={400}>
                     <DataGrid rows={rows} columns={columns}
                         localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                         components={{Toolbar: GridToolbar}}
                         componentsProps={{ toolbar: {showQuickFilter: true}}}
                     />   
                </Box>
                </Grid>
            </Grid>
        </MDBox>

    </DashboardLayout>
  )
}
