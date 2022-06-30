import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'
import { CustomThemeProvider } from './theme/context/themeProvider'

import PasantiaApp from './PasantiaApp'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomThemeProvider>
        <PasantiaApp />
      </CustomThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
