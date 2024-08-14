import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, InputGroup, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSunRain, faSearch, faBell, faCog, faPalette, faHome, faUser, faFile, faUserCircle, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ContextTheme';
import ColorPickerComp from '../styles/ColorPickerComp';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavbar = styled(Navbar)`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 1rem;
`;

const StyledNavLink = styled(Nav.Link)`
  color: #ffffff !important;
  text-decoration: none !important;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  &:hover {
    color: #FF0080 !important;
  }
`;

const StyledNavDropdown = styled(NavDropdown)`
  .dropdown-toggle {
    color: #ffffff !important;
    display: flex;
    align-items: center;
    &:hover {
      color: #FF0080 !important;
    }
  }
  .dropdown-menu {
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.18);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  }
  .dropdown-item {
    color: #ffffff;
    &:hover {
      background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
      color: #ffffff;
    }
  }
`;

const NavItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButton = styled.button`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  border: none;
  color: #ffffff;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

function NavMenuComp() {
  const { theme } = useTheme();
  const [showColorPickerComp, setShowColorPickerComp] = useState(false);
  const navigate = useNavigate();

  return (
    <StyledNavbar expand="lg" className="shadow-sm" theme={theme}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <FontAwesomeIcon icon={faCloudSunRain} style={{marginRight: '10px', color: '#FF0080', fontSize: '34px'}} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <InputGroup className="mb-2 mb-lg-0 mt-2 mt-lg-0" style={{maxWidth: '300px'}}>
            <Form.Control type="text" style={{backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff'}} />
            <StyledButton variant="primary" theme={theme}>
              <FontAwesomeIcon icon={faSearch} />
            </StyledButton>
          </InputGroup>
          <Nav className="mx-auto">
            <NavItemWrapper>
              <StyledNavLink as={Link} to="/" active><FontAwesomeIcon icon={faHome} style={{marginRight: '5px'}} />Home</StyledNavLink>
              <StyledNavLink as={Link} to="/empregos" active><FontAwesomeIcon icon={faBriefcase} style={{marginRight: '5px'}} />Empregos</StyledNavLink>
              <StyledNavLink as={Link} to="/perfil" active style={{borderColor: '#FF0080', color: '#FF0080'}}><FontAwesomeIcon icon={faUser} style={{marginRight: '5px'}} />Perfil</StyledNavLink>
              <StyledNavDropdown title={<><FontAwesomeIcon icon={faFile} style={{marginRight: '5px'}} />Páginas</>} id="basic-nav-dropdown" theme={theme}>
                <NavDropdown.Item as={Link} to="/galeria">Galeria</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/mensagens">Mensagens</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/notificacoes">Notificações</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/amigos">Amigos</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/eventos">Eventos</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/grupos">Grupos</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/gruposdetalhe">Grupo Detalhe</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/noticias">Noticias</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/vendas">Vendas</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/videos">Videos</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/videostudio">Video Studio</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/paginalista">Paginas</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/perfilusuario">Perfil de Usuario</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/adicionaramigo">Amigos para adicionar</NavDropdown.Item>
              </StyledNavDropdown>
              <StyledNavDropdown title={<><FontAwesomeIcon icon={faUserCircle} style={{marginRight: '5px'}} />Conta</>} id="basic-nav-dropdown" theme={theme}>
                <NavDropdown.Item as={Link} to="/configuracoes">Configurações</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
              </StyledNavDropdown>
            </NavItemWrapper>
          </Nav>
          <Nav>
            <NavItemWrapper>
              <StyledButton as={Link} to="/notificacoes" variant="primary" className="me-2" theme={theme}>
                <FontAwesomeIcon icon={faBell} />
              </StyledButton>
              <StyledButton as={Link} to="/configuracoes" variant="primary" className="me-2" theme={theme}>
                <FontAwesomeIcon icon={faCog} />
              </StyledButton>
              <StyledButton variant="primary" onClick={() => setShowColorPickerComp(!showColorPickerComp)} theme={theme}>
                <FontAwesomeIcon icon={faPalette} />
              </StyledButton>
            </NavItemWrapper>
          </Nav>
        </Navbar.Collapse>
      </Container>
      {showColorPickerComp && <ColorPickerComp />}
    </StyledNavbar>
  );
}

export default NavMenuComp;
