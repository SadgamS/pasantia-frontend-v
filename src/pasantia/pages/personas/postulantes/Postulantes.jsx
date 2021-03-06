import { Button, Grid } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
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
import debounceFunction from '../../../../helpers/debounceFunction';
import { PersonLayout } from '../layouts/PersonLayout';
import apiClient from '../../../../services/api';


export const Postulantes = () => {
  const [loading, setLoading] = useState(true);
  const [postulantes, setPostulantes] = useState([])
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [query, setQuery] = useState('');

  const handleChange = (newPage) => {
      setPage(newPage)
    }

    const handleQuery = (value) => {
      setQuery(value);
    };
  

    const debounceFetchData = useMemo(() => {
      const fetchData = async (page, query) => {
        try {
          const response = await apiClient.get(
            `api/postulantes?page=${page+1}&search=${query}`,
          );
          setPostulantes(response.data.data);
          setRowCount(response.data.total);
          setPageSize(response.data.per_page);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
      return debounceFunction(fetchData, 250);
    }, []);
    useEffect(() => {
      setLoading(true);
      debounceFetchData(page, query);
    }, [page, query]);

  const getNombres = (params) => {
    return `${params.row.persona.nombres}`
  }

  const getApellidos = (params) => {
    return `${params.row.persona.primer_apellido} ${params.row.persona.segundo_apellido !=  null ? params.row.persona.segundo_apellido : ""}`
  }
  const getUniversidad = (params) => {
    return `${params.row.universidad.nombre}`
  }
  
  const getTipo = (params) => {
    return `${params.row.pasantia.tipo}`
  }

  const getCi = (params) => {
    return `${params.row.persona.ci} ${params.row.persona.expedicion}`
  }
  
  const columns = [
    // { field: 'id', hide:true},
    { field: 'nombres', headerName: 'Nombres', valueGetter: getNombres, minWidth: 160, flex: 1},
    { field: 'apellidos', headerName: 'Apellidos', valueGetter: getApellidos, minWidth: 150, flex: 1},
    { field: 'ci', headerName: 'C.I.', valueGetter: getCi, minWidth: 140, flex: 1},
    { field: 'carrera', headerName: 'Carrera', minWidth: 120, flex: 1},
    { field: 'universidad', headerName: 'Universidad', valueGetter: getUniversidad, minWidth: 130, flex: 1},
    { field: 'pasantia', headerName: 'Tipo Postulacion', valueGetter: getTipo, minWidth: 130, flex: 1},
    {
      field: 'actions',
      headerName: 'Acciones',
      type: 'actions',
      minWidth: 120,
      flex: 1,
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
    <PersonLayout
      title="Postulantes"
      subtitle="P??gina de los postulantes a pasantias"
      link="/postulantes/crear-postulante"
      buttonTitle="Agregar postulante"
      rows={postulantes}
      page={page}
      pageSize={pageSize}
      rowCount={rowCount}
      columns={columns}
      loading={loading}
      setPage={handleChange}
      setQuery={handleQuery}
      query={query}
    />
  )
}
