import { Divider, Icon, List} from '@mui/material';
import SidenavRoot from './SidenavRoot';

import { CustomTheme } from '../../../theme/context/themeContext';
import { NavLink, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import MDTypography from '../../../theme/components/MDTypography';
import MDBox from '../../../theme/components/MDBox';
import routes from '../../../routers/routes';
import { SidenavCollapse } from './SidenavCollapse';
import sidenavLogoLabel from './styles/sidenav';
import { SidenavSubCollapse } from './SidenavSubCollapse';

export const Sidenav = ({ ...rest }) => {
  const {
    miniSidenav,
    transparentSidenav,
    whiteSidenav,
    darkMode,
    sidenavColor,
    setMiniSidenav,
    setTransparentSidenav,
    setWhiteSidenav,
  } = useContext(CustomTheme);
  const location = useLocation();
  const collapseName = location.pathname.replace('/', '');

  let textColor = 'white';

  if (transparentSidenav || (whiteSidenav &&  !darkMode)) {
    textColor = 'dark';
  } else if (whiteSidenav &&  darkMode) {
    textColor = 'inherit';
  }

  const closeSidenav = () => setMiniSidenav(true);
  const closeOpenSidenav = () => setMiniSidenav(!miniSidenav);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(window.innerWidth < 1200);
      setTransparentSidenav(
        window.innerWidth < 1200 ? false : transparentSidenav,
      );
      setWhiteSidenav(window.innerWidth < 1200 ? false : whiteSidenav);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener('resize', handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleMiniSidenav);
  }, [location]);

  const renderRoutes = routes.map(
    ({ type, name, icon, title, key, route, items }) => {
      let returnValue;
      if (type === 'collapse') {
        returnValue = (
          <NavLink key={key} to={route}>
            <SidenavCollapse
              name={name}
              icon={icon}
              active={key === collapseName}
            />
          </NavLink>
        );
      } else if (type === 'subcollapse') {
        returnValue = (
          <SidenavSubCollapse name={name} icon={icon} key={key} items={items} />
        );
      }

      return returnValue;
    },
  );

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={5} pd={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: 'block', xl: 'none' }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: 'pointer' }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: 'bold' }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to="/" display="flex" alignItems="center">
          <MDBox sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}>
            <MDTypography component="h6" fontWeight="medium" color={textColor}>
              Sistema de Pasantia
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
};
