// Archivo que se muestra en el Menu
import Home from '../pasantia/pages/home/Home';
import { Usuarios } from '../pasantia/pages/usuarios/Usuarios';
import { Postulantes } from '../pasantia/pages/personas/postulantes/Postulantes';
import { ServidoresPublicos } from '../pasantia/pages/personas/servidores_publicos/ServidoresPublicos';

// @mui icons
import Icon from '@mui/material/Icon';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { TutoresAcademicos } from '../pasantia/pages/personas/tutores_academicos/TutoresAcademicos';

const routes = [
  {
    type: 'collapse',
    name: 'Incio',
    key: 'inicio',
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: '/inicio',
    component: <Home />,
  },
  {
    type: 'collapse',
    name: 'Usuarios',
    key: 'usuarios',
    icon: <Icon fontSize="small">group</Icon>,
    route: '/usuarios',
    component: <Usuarios />,
  },
  {
    type: 'subcollapse',
    name: 'Institucional',
    key: 'institucional',
    icon: <Icon fontSize="small">business_center</Icon>,
    items: [
      {
        type: 'collapse',
        name: 'Servidores publicos',
        key: 'servidores-publicos',
        icon: <Icon fontSize="small">work</Icon>,
        route: '/servidores-publicos',
        component: <ServidoresPublicos />,
      },
      {
        type: 'collapse',
        name: 'Cargos',
        key: 'cargos',
        icon: <Icon fontSize="small">badge</Icon>,
        route: '/usuarios',
        component: <Usuarios />,
      },
      {
        type: 'collapse',
        name: 'Unidades',
        key: 'unidades',
        icon: <Icon fontSize="small">domain</Icon>,
        route: '/usuarios',
        component: <Usuarios />,
      },
    ],
  },
  {
    type: 'subcollapse',
    name: 'Academico',
    key: 'academico',
    icon: <Icon fontSize="small">apartment</Icon>,
    items: [
      {
        type: 'collapse',
        name: 'Postulantes',
        key: 'postulantes',
        icon: <Icon fontSize="small">school</Icon>,
        route: '/postulantes',
        component: <Postulantes />,
      },
      
      {
        type: 'collapse',
        name: 'Tutores academicos',
        key: 'tutores-academicos',
        icon: <Icon fontSize="small">supervisor_account</Icon>,
        route: '/tutores-academicos',
        component: <TutoresAcademicos />
      },
      {
        type: 'collapse',
        name: 'Universidades',
        key: 'universidades',
        icon: <Icon fontSize="small">location_city</Icon>,
        route: '/usuarios',
        component: <Usuarios />,
      },
    ],
  },
  {
    type: 'collapse',
    name: 'Pasantes o Trabajo dirigido',
    key: 'pasantes',
    icon: <Icon fontSize="small">assignment_ind</Icon>,
    route: '/usuarios',
    component: <Usuarios />,
  },
  {
    type: 'collapse',
    name: 'Convocatorias',
    key: 'convocatorias',
    icon: <Icon fontSize="small">assignment_ind</Icon>,
    route: '/usuarios',
    component: <Usuarios />,
  },
];

export default routes;
