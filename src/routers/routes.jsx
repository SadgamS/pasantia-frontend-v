

// @mui icons
import Icon from "@mui/material/Icon";
import GroupsIcon from '@mui/icons-material/Groups';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const routes = [
  {
    type: "collapse",
    name: "Incio",
    key: "inicio",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/inicio",
  },
  {
    type: "collapse",
    name: "Usuarios",
    key: "usuarios",
    icon: <GroupIcon fontSize="small" />,
    route: "/usuarios",
  },
  {
    type: "subcollapse",
    name: "Personas",
    key: "personas",
    icon: <GroupsIcon fontSize="small" />,
    items:[{
      name: "Postulantes",
      key: "postulantes",
      icon: <SchoolIcon fontSize="small" />,
      route: "/postulantes",
    },
    {
      name: "Funcionarios",
      key: "funcionarios",
      icon: <WorkIcon fontSize="small" />,
      route: ""
    },
    {
      name: "Tutores Academicos",
      key: "tutores academicos",
      icon: <SupervisorAccountIcon fontSize="small" />,
      route: ""
    }
    ]
  },
  // {
  //   type: "subcollapse",
  //   name: "Usuarios",
  //   key: "usuarios",
  //   icon: <GroupsIcon fontSize="small" />,
  //   items:[{
  //       name: "Others",
  //       key: "usuarios",
  //       icon: <Icon fontSize="small">dashboard</Icon>,
  //       route: "/usuarios",
  //   }]
  // }
];

export default routes;
