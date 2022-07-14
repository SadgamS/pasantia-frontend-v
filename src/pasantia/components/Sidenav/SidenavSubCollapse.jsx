import { Collapse, Icon, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React, { useContext, useState } from 'react'
import { SidenavCollapse } from './SidenavCollapse'

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MDBox from '../../../theme/components/MDBox';
import { collapseIcon, collapseIconBox, collapseItem, collapseText } from './styles/sidenavCollapse';
import { CustomTheme } from '../../../theme/context/themeContext';
import { NavLink } from 'react-router-dom';

export const SidenavSubCollapse = ({ name, icon, items, active }) => {

  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = useContext( CustomTheme );
  const collapseName = location.pathname.replace("/", "");
  let esActivo = false;
  items.forEach(i => {
    if (i.key === collapseName || collapseName.replace("/"," ").includes(i.key)) {
      esActivo = true
    }
  });
 
  const [open, setOpen] = useState(esActivo);
  const handleClick = () => {
      setOpen((prev) => !prev)
  }
  return (
    <>
        <ListItem button onClick={handleClick}>
            <MDBox
              sx={(theme) =>
                collapseItem(theme, {
                  active,
                  transparentSidenav,
                  whiteSidenav,
                  darkMode,
                  sidenavColor,
                })
              }
            >     
            <ListItemIcon
                sx={(theme) =>
                    collapseIconBox(theme, { transparentSidenav, whiteSidenav, darkMode, active })
                  }
            >
            {typeof icon === "string" ? (
                <Icon sx={(theme) => collapseIcon(theme, { active })}>{icon}</Icon>
                ) : (
                    icon
                    )}
            </ListItemIcon>
            <ListItemText
                primary={name}
                sx={(theme) =>
                    collapseText(theme, {
                      miniSidenav,
                      transparentSidenav,
                      whiteSidenav,
                      active,
                    })
                  }
            />
            {open ? <ExpandLess /> : <ExpandMore />}
            </MDBox>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List sx={{pl:2}}>
                {
                    items.map(({name, key, icon, route}) => 
                        (
                          <NavLink key={key} to={route}>
                            <SidenavCollapse name={name} icon={icon} active={collapseName.replace("/"," ").includes(key)}/>
                          </NavLink>
                        )
                    ) 
   
                }
            </List>
        </Collapse>
    </>
  )
}
