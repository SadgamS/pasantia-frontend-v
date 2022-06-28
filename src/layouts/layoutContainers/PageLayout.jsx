import { useEffect, useContext } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

import { Box } from "@mui/material";

// Material Dashboard 2 React context
import { CustomTheme } from "../../theme/context/themeContext";

export const PageLayout = ({ background, children }) => {
  const { setLayout } = useContext( CustomTheme );
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout("page");
  }, [pathname]);
  
  return (
    <Box
      width="100vw"
      height="100%"
      minHeight="100vh"
      bgColor={background}
      sx={{ overflowX: "hidden" }}
    >
      {children}
    </Box>
  )
}
