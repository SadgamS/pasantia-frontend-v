import { useEffect, useState } from 'react';
import apiClient from '../../../../services/api';
import { PersonLayout } from '../PersonLayout'
import { GridActionsCellItem } from '@mui/x-data-grid';

import ContactPageIcon from '@mui/icons-material/ContactPage';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const ServidoresPublicos = () => {
  const [loading, setLoading] = useState(true);
  const [servidoresPublicos, setServidoresPublicos] = useState([])

  useEffect(() => {
    apiClient.get('/api/servidores-publicos')
    .then(response => {
      setServidoresPublicos(response.data);
      setLoading(false);
    }).catch(error => console.error(error))
  }, [])
  
  const columns = [
    // { field: 'id', hide:true},
    { field: 'nombres', headerName: 'Nombres', valueGetter: "", minWidth: 160, flex: 1},
    { field: 'apellidos', headerName: 'Apellidos', valueGetter: "", minWidth: 150, flex: 1},
    { field: 'ci', headerName: 'C.I.', valueGetter: "", minWidth: 140, flex: 1},
    { field: 'carrera', headerName: 'Carrera', minWidth: 120, flex: 1},
    { field: 'universidad', headerName: 'Universidad', valueGetter: "", minWidth: 130, flex: 1},
    { field: 'pasantia', headerName: 'Tipo Postulacion', valueGetter: " ", minWidth: 130, flex: 1},
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
      title="Servidores publicos"
      subtitle="Página de los servidores publicos"
      link="/"
      buttonTitle="Agregar servidor publico"
      rows={servidoresPublicos}
      columns={columns}
      loading={loading}
    />
  )
}
