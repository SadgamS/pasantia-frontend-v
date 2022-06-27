import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginScreen } from '../components/auth/LoginScreen'
import Home from '../components/pages/home/Home'

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/'>
                <Route index element={<Home />} />
                <Route path='login' element={<LoginScreen/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
