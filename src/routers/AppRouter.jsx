import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth/pages/LoginPage'
import Home from '../pasantia/pages/home/Home'
import { ServidoresPublicos } from '../pasantia/pages/personas/servidores_publicos/ServidoresPublicos'
import { CrearPostulante } from '../pasantia/pages/personas/postulantes/CrearPostulante'
import { Postulantes } from '../pasantia/pages/personas/postulantes/Postulantes'
import { CrearUsuario } from '../pasantia/pages/usuarios/CrearUsuario'
import { Usuarios } from '../pasantia/pages/usuarios/Usuarios'

const AppRouter = () => {
  return (
        <Routes>
            <Route index path='/inicio' element={<Home />} />
            <Route path='/usuarios' element={<Usuarios />} />
            <Route path='/usuarios/crear-usuario' element={<CrearUsuario />} />
            <Route path='/postulantes' element={<Postulantes />} />
            <Route path='/postulantes/crear-postulante' element={<CrearPostulante />} />
            <Route path='/servidores-publicos' element={<ServidoresPublicos/>} />
            <Route path='/auth/login' element={<LoginPage/>}/>
            <Route path="*" element={<Navigate to="/inicio" />} />
        </Routes>
  )
}

export default AppRouter
