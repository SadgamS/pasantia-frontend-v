import { CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import PasantiaApp from './PasantiaApp'
import { CustomThemeProvider } from './theme/context/themeProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CustomThemeProvider>
      <PasantiaApp />
    </CustomThemeProvider>
  </React.StrictMode>
)
