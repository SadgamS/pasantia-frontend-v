import { useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CustomTheme } from "./context/themeContext";
import { CssBaseline } from "@mui/material";
import themeDark from "./theme-dark"
import themeLight from "./theme-light";

export const AppTheme = ({ children }) => {
  const { mode }= useContext(CustomTheme);
 
  return (
    <ThemeProvider theme={themeLight}>
        <CssBaseline />
        { children }
    </ThemeProvider>
  )
}
