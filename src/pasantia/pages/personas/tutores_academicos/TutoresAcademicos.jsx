import { useEffect, useMemo, useState } from "react";
import debounceFunction from "../../../../helpers/debounceFunction";
import apiClient from "../../../../services/api";
import { PersonLayout } from "../layouts/PersonLayout"
import { GridActionsCellItem } from '@mui/x-data-grid';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export const TutoresAcademicos = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [tutoresAcademicos, setTutoresAcademicos] = useState([]);
  const [query, setQuery] = useState('');

  const debounceFetchData = useMemo(() => {
    const fetchData = async (page, query) => {
      try {
        const response = await apiClient.get(
          `/api/tutores-academicos?page=${page + 1}&search=${query}`,
        );
        setTutoresAcademicos(response.data.data);
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
    return params.row.persona.apellidos;
  };

  const getCi = (params) => {
    return `${params.row.persona.ci} ${params.row.persona.expedicion}`;
  };

  const getUniversidad = (params) => {
    return `${params.row.universidad.nombre}`;
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
      field: 'nivel_academico',
      headerName: 'Nivel académico',
      valueGetter: '',
      minWidth: 130,
      flex: 1,
    },
    {
      field: 'universidad',
      headerName: 'Universidad',
      valueGetter: getUniversidad,
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
      title="Tutores academicos"
      subtitle="Pagina de los tutores academicos"
      link="/tutores-academicos/crear-tutor-academico"
      buttonTitle="agregar tutor academico"
      rows={tutoresAcademicos}
      columns={columns}
      page={page}
      pageSize={pageSize}
      rowCount={rowCount}
      loading={loading}
      setPage={handleChange}
      setQuery={handleQuery}
      query={query}
    />
  )
}
