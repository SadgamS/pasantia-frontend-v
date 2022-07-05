import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth/pages/LoginPage'
import Home from '../pasantia/pages/home/Home'
import { CrearUsuario } from '../pasantia/pages/usuarios/CrearUsuario'
import { Usuarios } from '../pasantia/pages/usuarios/Usuarios'

const AppRouter = () => {
  return (
        <Routes>
            <Route index path='/inicio' element={<Home />} />
            <Route path='/usuarios' element={<Usuarios />} />
            <Route path='/usuarios/crear-usuario' element={<CrearUsuario />} />
            <Route path='/auth/login' element={<LoginPage/>}/>
            <Route path="*" element={<Navigate to="/inicio" />} />
        </Routes>
  )
}

export default AppRouter