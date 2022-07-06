import { Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../../../layouts/layoutContainers/DashboardLayout'
import MDBox from '../../../../theme/components/MDBox'

import AddIcon from '@mui/icons-material/Add';
import MDTypography from '../../../../theme/components/MDTypography';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { TableGrid } from '../../../components/Table/TableGrid';
import axios from 'axios';

import ContactPageIcon from '@mui/icons-material/ContactPage';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';


export const Postulantes = () => {
  const [loading, setLoading] = useState(true);
  const [postulantes, setPostulantes] = useState([])
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/postulantes')
    .then(response => {
      setPostulantes(response.data);
      setLoading(false);
    }).catch(error => console.error(error))
  }, [])
  console.log(postulantes)
  const getNombres = (params) => {
    return `${params.row.persona.primer_nombre} ${params.row.persona.segundo_nombre}`
  }

  const getApellidos = (params) => {
    return `${params.row.persona.apellido_paterno} ${params.row.persona.apellido_materno}`
  }
  const getUniversidad = (params) => {
    return `${params.row.universidad.nombre}`
  }
  
  const getTipo = (params) => {
    return `${params.row.pasantia.tipo}`
  }

  const getCi = (params) => {
    return `${params.row.persona.ci} ${params.row.persona.extension}`
  }
  
  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'nombres', headerName: 'Nombres', valueGetter: getNombres, width: 160},
    { field: 'apellidos', headerName: 'Apellidos', valueGetter: getApellidos, width: 150},
    { field: 'ci', headerName: 'C.I.', valueGetter: getCi, width: 140},
    { field: 'carrera', headerName: 'Carrera', width: 120},
    { field: 'universidad', headerName: 'Universidad', valueGetter: getUniversidad, width: 130},
    { field: 'pasantia', headerName: 'Tipo Postulacion', valueGetter: getTipo, width: 130},
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


  return (
    <DashboardLayout>
        <MDBox mt={2} mb={2}>
          <Grid container >
            <Grid container justifyContent='center' mt={2}>
              <Grid item textAlign='center'>
                <MDTypography variant='h4'>
                  Postulantes
                </MDTypography>
                <MDTypography variant='subtitle2'>
                  Página de los postulantes a pasantias
                </MDTypography>
              </Grid>
            </Grid>
            <Grid item mt={2}>
              <Link to={'/postulantes/crearPostulante'}>
                <Button sx={{fontSize: 'small'}} variant='contained' startIcon={<AddIcon />}>
                  Agregar postulante
                </Button>
              </Link>
            </Grid>
            <TableGrid rows={postulantes} columns={columns} loading={loading}/>
          </Grid>
        </MDBox>
    </DashboardLayout>
  )
}
