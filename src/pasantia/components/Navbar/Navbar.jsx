import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Material icons
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { AppBar, Box, IconButton, Menu, Toolbar } from '@mui/material'

import { navbar, navbarContainer, navbarRow } from './styles';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import NotificationItem from '../Items/NotificationItem/NotificationItem';
import MDBox from '../../../theme/components/MDBox';

import { CustomTheme } from '../../../theme/context/themeContext';

export const Navbar = ({ absolute, light, isMini}) => {
  const [navbarType, setNavbarType] = useState();
  const route = useLocation().pathname.split("/").slice(1);
  const { setTransparentNavbar, setMiniSidenav,setOpenConfigurator,setDarkMode,miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = useContext( CustomTheme );
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }
    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar((fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }
    
    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
     */
    window.addEventListener("scroll", handleTransparentNavbar);
    
    // Call the handleTransparentNavbar function to set the state with the initial value.
    // handleTransparentNavbar();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(!miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(!openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<PersonIcon />} title="Cuenta" />
      <NotificationItem icon={<LogoutIcon />} title="Cerrar Sesion" />
    </Menu>
  );

   // Change DarkMode or LightMode
   const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AppBar
      position={absolute ? 'absolute' : navbarType}
      color='inherit'
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
        <Toolbar sx={(theme) => navbarContainer(theme)}>
            <MDBox 
              color= "inherit"
              mb={{xs:1, md:0}}
              sx={(theme) => navbarRow(theme, { isMini })}
            >
              <Box
                display={{ xs: "none", xl: "block" }}   
                sx={{pr: 1}}   
              >
                  <IconButton color="inherit" disableRipple onClick={handleMiniSidenav}>
                    {miniSidenav ? <MenuOpenIcon /> : <MenuIcon /> }
                  </IconButton>
              </Box>
              <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
            </MDBox>
            {isMini ? null: ( 
              <Box sx={(theme) => navbarRow(theme, {})}>
                <Box pr={1}>
                </Box>
                <MDBox color={ light ? "white" : "inherit"} >
                  <IconButton 
                    color="inherit"
                    onClick={handleMiniSidenav}
                  >
                    {miniSidenav ? <MenuOpenIcon /> : <MenuIcon /> }
                  </IconButton>
                  <IconButton 
                    color="inherit" 
                    onClick={handleDarkMode}
                  >
                    {darkMode ? <Brightness7Icon /> : <Brightness4Icon />} 
                  </IconButton>
                  <IconButton 
                    color="inherit"        
                    onClick={handleConfiguratorOpen}
                  >
                    <SettingsIcon /> 
                  </IconButton>
                  <IconButton 
                    color="inherit"
                    aria-controls="notification-menu"
                    aria-haspopup="true"
                    onClick={handleOpenMenu}
                  >
                    <AccountCircleIcon /> 
                  </IconButton>
                  {renderMenu()}
                </MDBox>
            </Box>)}
           
        </Toolbar>

    </AppBar>
  )
}
