import { useEffect, useState } from "react"
import { Box, Button, ButtonGroup, Card, Grid, Icon, Modal, TextField } from "@mui/material"
import DashboardLayout from "../../../layouts/layoutContainers/DashboardLayout"
import MDBox from "../../../theme/components/MDBox"
import MDTypography from "../../../theme/components/MDTypography"
import { DataGrid, esES, GridToolbar, GridActionsCellItem, GridToolbarContainer, GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter } from "@mui/x-data-grid"
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom"
import axios from "axios"
import ContactPageIcon from '@mui/icons-material/ContactPage';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const Usuarios = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/users')
      .then(response =>{
        setUsers(response.data.data)
      })
  }, [])

  const getRol = (params) => {
      return `${params.row.rol.tipo_rol} `
  }

  const getPersona = (params) => {
    return `${params.row.persona.primer_nombre} ${params.row.persona.apellido_paterno}`
  }
   const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'usuario', headerName: 'Usuario', width: 150 },
    { field: 'ultimo_ingreso', headerName: 'Ultimo ingreso', type:'dateTime', width: 230 },
    { field: 'created_at', headerName: 'Creado en', type:'dateTime' ,width: 180 },
    { field: 'rol', headerName: 'Rol' ,width: 110, valueGetter: getRol },
    { field: 'persona', headerName: 'Persona' ,width: 150, valueGetter: getPersona },
    {
      field: 'actions',
      headerName: 'Acciones',
      type: 'actions',
      width: 110,
      getActions: (params) =>[
          <GridActionsCellItem
            icon={<ContactPageIcon color="info" /> }
            label="ver" 
          />,
          <GridActionsCellItem
            icon={<EditIcon color="warning" /> }
            label="editar" 
          />,
          <GridActionsCellItem
            icon={<DeleteIcon color="error" /> }
            label="borrar" 
          />,
      ],
    }
  ];

  function CustomToolbar() {
    return (
      <>
      <GridToolbarContainer >
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector /> 
        <Box flex={1}/>
        <GridToolbarQuickFilter />
      </GridToolbarContainer>

        {/* <GridToolbarContainer sx={{display:"flex", justifyContent:"flex-end" }}>
        </GridToolbarContainer> */}
      </> 
 
    );
  }
  
  return (
    <DashboardLayout>
        <MDBox mt={2} mb={2}>
            <Grid container spacing={1}>
                <Grid item xs={12} mt={2}>
                   <Link to={"/usuarios/crear-usuario"}> 
                <Button sx={{fontSize: "small"}} variant="contained" startIcon={<AddIcon />} >
                    Agregar Usuario
                </Button>
                   </Link>
               {/* <Box mt={4} width={"100%"} height={500} p={1} > */}
               <div style={{ height:450, width: "100%", marginTop: 30}}>
                  <div style={{display: "flex", height: "100%"}}>
                    <div style={{flexGrow: 1}}>
                     <DataGrid 
                         sx={{fontSize: 14}}
                         rows={users} columns={columns}
                         localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                         components={{Toolbar: CustomToolbar}}
                        //  componentsProps={ {toolbar: {showQuickFilter: true}}}
                         pageSize={5}
                         rowsPerPageOptions={[5]}
                     />   

                    </div>
                  </div>
               </div>
                {/* </Box> */}  
                </Grid>
            </Grid>
        </MDBox>

    </DashboardLayout>
  )
}
