import { useReducer } from 'react';
import { CustomTheme } from './themeContext';
import { themeReducer } from './themeReducer';

// Initial State 
const init = () => {
    let darkMode = false;
    if (localStorage.getItem('Mode') !== undefined && localStorage.getItem('Mode') === 'dark') {
      darkMode = true;
    }
    
    return {
      miniSidenav: false,
      transparentSidenav: false,
      whiteSidenav: false,
      sidenavColor: "info",
      transparentNavbar: false,
      fixedNavbar: false,
      openConfigurator: false,
      layout: "dashboard",
      darkMode: darkMode,
    }
} 


export const CustomThemeProvider = ({children}) => {
  
  const [themeState, dispatch] = useReducer(themeReducer, {},init);

  // Context module functions
    const setMiniSidenav = (value) => {dispatch({ type: "MINI_SIDENAV", value });}
    const setTransparentSidenav = (value) => {dispatch({ type: "TRANSPARENT_SIDENAV", value });}
    const setWhiteSidenav = (value) => {dispatch({ type: "WHITE_SIDENAV", value });}
    const setSidenavColor = (value) => {dispatch({ type: "SIDENAV_COLOR", value });}
    const setTransparentNavbar = (value) => {dispatch({ type: "TRANSPARENT_NAVBAR", value });}
    const setFixedNavbar = (value) => {dispatch({ type: "FIXED_NAVBAR", value });}
    const setOpenConfigurator = (value) => {dispatch({ type: "OPEN_CONFIGURATOR", value });}
    const setLayout = (value) => {dispatch({ type: "LAYOUT", value });}
    const setDarkMode = (value) => {
      localStorage.setItem('mode', value);
      dispatch({ type: "DARKMODE", value });
    }
  
    return (
    <CustomTheme.Provider value={{
        ...themeState,
        setMiniSidenav,
        setTransparentNavbar,
        setTransparentSidenav,
        setLayout,
        setFixedNavbar,
        setOpenConfigurator,
        setSidenavColor,
        setWhiteSidenav,
        setDarkMode
    }}>
        { children }
    </CustomTheme.Provider>
  )
}
