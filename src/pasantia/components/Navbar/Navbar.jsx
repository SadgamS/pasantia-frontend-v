import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { navbar, navbarContainer, navbarRow } from './styles';

export const Navbar = () => {
  return (
    <AppBar
      position='absolute'
      color='inherit'
      sx={(theme) => navbar(theme)}
    >
        <Toolbar sx={(theme) => navbarContainer(theme)}>
            <Box 
              color= "inherit"
              mb={{xs:1, md:0}}
              sx={(theme) => navbarRow(theme, {})}
            >
              <Box
                display={{ xs: "none", xl: "block" }}   
                sx={{pr: 1}}   
              >
                  <IconButton color="inherit">
                    <MenuIcon />
                  </IconButton>
              </Box>
            </Box>
            <Box sx={(theme) => navbarRow(theme, {})}>
              <Box pr={1}>
              
              </Box>
              
              <Box>
                <IconButton color="inherit">
                   <MenuIcon />
                </IconButton>
                <IconButton color="inherit">
                  <Brightness4Icon /> 
                </IconButton>
                <IconButton color="inherit">
                  <SettingsIcon /> 
                </IconButton>
                <IconButton color="inherit">
                  <AccountCircleIcon /> 
                </IconButton>
              </Box>
            </Box>
        </Toolbar>

    </AppBar>
  )
}
