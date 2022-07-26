import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../auth/pages/LoginPage';
import { CrearPostulante } from '../pasantia/pages/personas/postulantes/CrearPostulante';
import { CrearServidorPublico } from '../pasantia/pages/personas/servidores_publicos/CrearServidorPublico';
import { CrearTutorAcademico } from '../pasantia/pages/personas/tutores_academicos/CrearTutorAcademico';
import { CrearUsuario } from '../pasantia/pages/usuarios/CrearUsuario';

import routes from './routes';
const AppRouter = () => {
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.type === 'subcollapse') {
        return getRoutes(route.items);
      }
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        );
      }

      return null;
    });
  return (
    <Routes>
      {/*Rutas que se muestran en el menu (Sidenav) */}
      {getRoutes(routes)}
      {/* Rutas que no estan en el Menu (Sidenav) */}
      <Route path="/usuarios/crear-usuario" element={<CrearUsuario />} />
      <Route
        path="/postulantes/crear-postulante"
        element={<CrearPostulante />}
      />
      <Route
        path="/servidores-publicos/crear-servidor-publico"
        element={<CrearServidorPublico />}
      />
      <Route
        path="/tutores-academicos/crear-tutor-academico"
        element={<CrearTutorAcademico />}
      />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/inicio" />} />
    </Routes>
  );
};

export default AppRouter;
