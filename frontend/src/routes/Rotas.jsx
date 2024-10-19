import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import PerfilPage from '../pages/PerfilPage';
import NotificacoesPage from '../pages/NotificacoesPage';
import ConfiguracoesPage from '../pages/ConfiguracoesPage';
import GruposPage from '../pages/GruposPage';
import GrupoDetalhe from '../pages/GrupoDetalhePage';
import NoticiasPage from '../pages/NoticiasPage';
import VideoPage from '../pages/VideoPage';
import VideoStudioPage from '../pages/VideoStudioPage';
import EmpregosPage from '../pages/EmpregosPage';
import PaginaDetalhePage from '../pages/PaginaDetalhePage';
import PerfilUsuarioPage from '../pages/PerfilUsuarioPage';
import AmigosPage from '../pages/AmigosPage';
import BuscaPage from '../pages/BuscaPage';
import AdicionarAmigosPage from '../pages/AdicionarAmigosPage';
import CriarPagina from '../pages/CriarPaginaPage';
import PaginasListaPage from '../pages/PaginasListaPage';
import EventosPage from '../pages/EventosPage';
import GaleriaFotosPage from '../pages/GaleriaFotosPage';
import MensagensPage from '../pages/MensagensPage';
import VendasPage from '../pages/VendasPage';

const queryClient = new QueryClient();

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

function Rotas() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/galeria" element={<PrivateRoute><GaleriaFotosPage /></PrivateRoute>} />
          <Route path="/perfil" element={<PrivateRoute><PerfilPage /></PrivateRoute>} />
          <Route path="/mensagens" element={<PrivateRoute><MensagensPage /></PrivateRoute>} />
          <Route path="/notificacoes" element={<PrivateRoute><NotificacoesPage /></PrivateRoute>} />
          <Route path="/configuracoes" element={<PrivateRoute><ConfiguracoesPage /></PrivateRoute>} />
          <Route path="/busca" element={<PrivateRoute><BuscaPage /></PrivateRoute>} />
          <Route path="/amigos" element={<PrivateRoute><AmigosPage /></PrivateRoute>} />
          <Route path="/eventos" element={<PrivateRoute><EventosPage /></PrivateRoute>} />
          <Route path="/grupos" element={<PrivateRoute><GruposPage /></PrivateRoute>} />
          <Route path="/gruposdetalhe" element={<PrivateRoute><GrupoDetalhe /></PrivateRoute>} />
          <Route path="/vendas" element={<PrivateRoute><VendasPage /></PrivateRoute>} />
          <Route path="/noticias" element={<PrivateRoute><NoticiasPage /></PrivateRoute>} />
          <Route path="/videos" element={<PrivateRoute><VideoPage /></PrivateRoute>} />
          <Route path="/videostudio" element={<PrivateRoute><VideoStudioPage /></PrivateRoute>} />
          <Route path="/empregos" element={<PrivateRoute><EmpregosPage /></PrivateRoute>} />
          <Route path="/pagina" element={<PrivateRoute><CriarPagina /></PrivateRoute>} />
          <Route path="/paginalista" element={<PrivateRoute><PaginasListaPage /></PrivateRoute>} />
          <Route path="/adicionaramigo" element={<PrivateRoute><AdicionarAmigosPage /></PrivateRoute>} />
          <Route path="/paginadetalhe" element={<PrivateRoute><PaginaDetalhePage /></PrivateRoute>} />
          <Route path="/perfilusuario" element={<PrivateRoute><PerfilUsuarioPage /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default Rotas;
