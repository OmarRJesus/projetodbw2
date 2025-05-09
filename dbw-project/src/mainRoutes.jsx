import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './containers/Login/LoginSignup.jsx'
import Time_theme from './containers/select_time_theme/time_theme.jsx'
import BrainStormingPage from './containers/brainStormPage/BrainStormPage.jsx'
import MainPage from './containers/MainPage/mainPage.jsx'
import ProfileDetails from './containers/profileDetails/ProfileDetails.jsx'
import Details from './containers/details/Details.jsx'
// Um componente simples para a página principal como exemplo
// (src/components/PaginaPrincipal/PaginaPrincipal.js)
// function PaginaPrincipal() {
//   return <h1>Bem-vindo à Página Principal!</h1>;
// }

function AppRoutes() {
  return (
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/home" element={<MainPage />} /> {/* Rota para a  página principal */}
    <Route path="/brainstorm" element={<BrainStormingPage />} /> {/* Rota para a página de brainstorming */}
    <Route path="/select_time_theme" element={<Time_theme />} /> {/* Rota para a página de seleção de tema e tempo */}
    <Route path="/profile" element={<ProfileDetails />} /> {/* Rota para a página de detalhes do perfil */}
    <Route path="/details" element={<Details />} /> {/* Rota para a página de detalhes do brainstorm */}

      {/* rota padrão, redireciona para /login se o utilizador não estiver autenticado, ou para /home se estiver, nao vamos poder aceder ao site se nao tivemos uma conta criada */}
      
      <Route path="*" element={<Navigate to="/login" replace />} />
      
    </Routes>
  );
}

export default AppRoutes;