import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import LoginPage from '../pages/LoginPage'
import GaleriaFotosPage from '../pages/GaleriaFotosPage'
import PerfilPage from '../pages/PerfilPage'
import MensagensPage from '../pages/MensagensPage'
import NotificacoesPage from '../pages/NotificacoesPage'
import ConfiguracoesPage from '../pages/ConfiguracoesPage'
import BuscaPage from '../pages/BuscaPage'
import AmigosPage from '../pages/AmigosPage'
import EventosPage from '../pages/EventosPage'
import GruposPage from '../pages/GruposPage'
import GrupoDetalhe from '../pages/GrupoDetalhe'
import VendasPage from '../pages/VendasPage'
import NoticiasPage from '../pages/NoticiasPage'
import VideoPage from '../pages/VideoPage'
import VideoStudioPage from '../pages/VideoStudioPage'
import EmpregosPage from '../pages/EmpregosPage'
import CriarPaginaPage from '../pages/CriarPaginaPage'
import PaginasListaPage from '../pages/PaginasListaPage'
import PaginaDetalhePage from '../pages/PaginaDetalhePage'
import AdicionarAmigosPage from '../pages/AdicionarAmigosPage'
import PerfilUsuarioPage from '../pages/PerfilUsuarioPage'
function Rotas() {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/galeria" element={<GaleriaFotosPage/>}/>
            <Route path="/perfil" element={<PerfilPage/>}/>
            <Route path="/mensagens" element={<MensagensPage/>}/>
            <Route path="/notificacoes" element={<NotificacoesPage/>}/>
            <Route path="/configuracoes" element={<ConfiguracoesPage/>}/>
            <Route path="/busca" element={<BuscaPage/>}/>
            <Route path="/amigos" element={<AmigosPage/>}/>
            <Route path="/eventos" element={<EventosPage/>}/>
            <Route path="/grupos" element={<GruposPage/>}/>
            <Route path="/gruposdetalhe" element={<GrupoDetalhe/>}/>
            <Route path="/vendas" element={<VendasPage/>}/>
            <Route path="/noticias" element={<NoticiasPage/>}/>      
            <Route path="/videos" element={<VideoPage/>}/>       
            <Route path="/videostudio" element={<VideoStudioPage/>}/>       
            <Route path="/empregos" element={<EmpregosPage/>}/>  
            <Route path="/pagina" element={<CriarPaginaPage/>}/>
            <Route path="/paginalista" element={<PaginasListaPage/>}/>
            <Route path="/adicionaramigo" element={<AdicionarAmigosPage/>}/>
            <Route path="/paginadetalhe" element={<PaginaDetalhePage/>}/>
            <Route path="/perfilusuario" element={<PerfilUsuarioPage/>}/>
         </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Rotas
