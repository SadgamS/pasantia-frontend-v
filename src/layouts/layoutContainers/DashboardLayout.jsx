import { Box } from "@mui/material";
import { useEffect, useContext } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";


// Material Dashboard 2 React context
import { CustomTheme } from "../../theme/context/themeContext";

const DashboardLayout = ({ children }) => {
  const { setLayout, miniSidenav } = useContext( CustomTheme );
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout("dashboard");
  }, [pathname]);
  return (
    <Box
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,
        position: "relative",

        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      {children}
    </Box>
  )
}




export default DashboardLayout