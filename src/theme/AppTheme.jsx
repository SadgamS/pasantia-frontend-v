import { useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CustomTheme } from "./context/themeContext";
import { CssBaseline } from "@mui/material";
import themeDark from "./theme-dark"

export const AppTheme = ({ children }) => {
  const { mode }= useContext(CustomTheme);

    const darkTheme = createTheme({
        palette:{
            mode:mode,
        }
    });  
  return (
    <ThemeProvider theme={themeDark}>
        <CssBaseline />
        { children }
    </ThemeProvider>
  )
}
