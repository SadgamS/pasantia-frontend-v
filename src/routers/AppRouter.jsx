import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth/pages/LoginPage'
import Home from '../pasantia/pages/home/Home'

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/'>
                <Route index element={<Home />} />
                <Route path='login' element={<LoginPage/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
