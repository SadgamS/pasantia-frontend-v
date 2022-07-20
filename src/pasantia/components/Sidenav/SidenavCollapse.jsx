import { Icon, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { useContext } from "react";
import MDBox from "../../../theme/components/MDBox"
import { collapseIcon, collapseIconBox, collapseItem, collapseText } from "./styles/sidenavCollapse"
import { CustomTheme } from "../../../theme/context/themeContext";

export const SidenavCollapse = ({ icon, name, active, ...rest}) => {
  
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = useContext( CustomTheme );
  return (
    <ListItem component="li">
      <MDBox
        {...rest}
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
      </MDBox>
    </ListItem>
  )
}
