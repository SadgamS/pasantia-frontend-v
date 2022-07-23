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
    name: 'Personas',
    key: 'personas',
    icon: <Icon fontSize="small">groups</Icon>,
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
        name: 'Servidores publicos',
        key: 'servidores-publicos',
        icon: <Icon fontSize="small">work</Icon>,
        route: '/servidores-publicos',
        component: <ServidoresPublicos />,
      },
      {
        type: 'collapse',
        name: 'Tutores academicos',
        key: 'tutores-academicos',
        icon: <Icon fontSize="small">supervisor_account</Icon>,
        route: '/tutores-academicos',
        component: <TutoresAcademicos />
      },
    ],
  },
];

export default routes;
