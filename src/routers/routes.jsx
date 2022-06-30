

// @mui icons
import Icon from "@mui/material/Icon";
import GroupsIcon from '@mui/icons-material/Groups';


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
    icon: <GroupsIcon fontSize="small" />,
    route: "/usuarios",
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
