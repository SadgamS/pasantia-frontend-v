import { Button, CssBaseline, Paper } from "@mui/material"
import { ThemeProvider,createTheme } from "@mui/material/styles"
import { Sidenav } from "./pasantia/components/Sidenav/Sidenav"
import AppRouter from "./routers/AppRouter"
import { AppTheme } from "./theme/AppTheme"

// Material Dashboard 2 React themes

// Material Dashboard 2 React Dark Mode themes
// import themeDark from "assets/theme-dark";

function PasantiaApp() {
  return (
    <AppTheme>
      {/* <Sidenav /> */}
      <AppRouter />
    </AppTheme>
  )
}

export default PasantiaApp
