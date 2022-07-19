import { useEffect, useMemo, useState } from 'react';
import { PersonLayout } from '../layouts/PersonLayout';

import { GridActionsCellItem } from '@mui/x-data-grid';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import apiClient from '../../../../services/api';
import debounceFunction from '../../../../helpers/debounceFunction';

export const ServidoresPublicos = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [servidoresPublicos, setServidoresPublicos] = useState([]);
  const [query, setQuery] = useState('');

  const debounceFetchData = useMemo(() => {
    const fetchData = async (page, query) => {
      try {
        const response = await apiClient.get(
          `/api/servidores-publicos?page=${page + 1}&search=${query}`,
        );
        setServidoresPublicos(response.data.data);
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

  const handleChange = (newPage) => {
    setPage(newPage);
  };
  const handleQuery = (value) => {
    setQuery(value);
  };

  const getNombres = (params) => {
    return `${params.row.persona.nombres}`;
  };

  const getApellidos = (params) => {
    return `${params.row.persona.primer_apellido} ${
      params.row.persona.segundo_apellido != null
        ? params.row.persona.segundo_apellido
        : ''
    }`;
  };

  const getCi = (params) => {
    return `${params.row.persona.ci} ${params.row.persona.expedicion}`;
  };

  const getUnidad = (params) => {
    return `${params.row.unidad.nombre}`;
  };

  const columns = [
    // { field: 'id', hide:true},
    {
      field: 'nombres',
      headerName: 'Nombres',
      valueGetter: getNombres,
      minWidth: 160,
      flex: 1,
    },
    {
      field: 'apellidos',
      headerName: 'Apellidos',
      valueGetter: getApellidos,
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'ci',
      headerName: 'C.I.',
      valueGetter: getCi,
      minWidth: 140,
      flex: 1,
    },
    {
      field: 'formacion_academica',
      headerName: 'Formación académica',
      minWidth: 120,
      flex: 1,
    },
    {
      field: 'nivel_academico',
      headerName: 'Nivel académico',
      valueGetter: '',
      minWidth: 130,
      flex: 1,
    },
    {
      field: 'unidad',
      headerName: 'Unidad',
      valueGetter: getUnidad,
      minWidth: 130,
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      type: 'actions',
      minWidth: 120,
      flex: 1,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<ContactPageIcon color="info" />}
          label="ver"
        />,
        <GridActionsCellItem
          icon={<EditIcon color="warning" />}
          label="editar"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon color="error" />}
          label="borrar"
        />,
      ],
    },
  ];

  return (
    <PersonLayout
      title="Servidores publicos"
      subtitle="Página de los servidores publicos"
      link="/servidores-publicos/crear-servidor-publico"
      buttonTitle="Agregar servidor publico"
      rows={servidoresPublicos}
      page={page}
      pageSize={pageSize}
      rowCount={rowCount}
      columns={columns}
      loading={loading}
      setPage={handleChange}
      setQuery={handleQuery}
      query={query}
    />
  );
};
