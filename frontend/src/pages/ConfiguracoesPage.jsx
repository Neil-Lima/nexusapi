import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Image, Button, ListGroup, Form, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faUser, faLock, faBell, faGlobe, faHome, faGlobeAmericas, faUsers, faPalette, faLanguage, faAccessibility, faShieldAlt, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../context/ContextTheme';

const GradientBackground = styled.div`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  min-height: 100vh;
  padding: 20px 0;
`;

const StyledCard = styled(Card)`
  border-radius: 20px;
  border: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.18);
  color: #ffffff;
  overflow: hidden;
`;

const StyledButton = styled(Button)`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-weight: bold;
  transition: all 0.3s ease;
  color: #ffffff;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.secondaryColor}, ${props.theme.primaryColor})`};
  }
`;

const IconWrapper = styled.div`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const GradientText = styled.span`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`;

const StyledForm = styled(Form)`
  .form-control {
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 15px;
    color: #ffffff;
    padding: 15px;
    transition: all 0.3s ease;

    &:focus {
      background-color: rgba(255, 255, 255, 0.2);
      box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.25);
    }
  }

  .form-label {
    color: #ffffff;
    font-weight: bold;
  }
`;

const AnimatedSwitch = styled(Form.Check)`
  .custom-control-input:checked ~ .custom-control-label::before {
    background-color: ${props => props.theme.primaryColor};
    border-color: ${props => props.theme.primaryColor};
  }

  .custom-control-label::before {
    transition: all 0.3s ease;
  }

  .custom-control-input:checked ~ .custom-control-label::before {
    transform: scale(1.1);
  }
`;

const SettingsSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
`;

const StyledListGroup = styled(ListGroup)`
  background: transparent;
  border-radius: 15px;
  overflow: hidden;

  .list-group-item {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: #ffffff;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    padding: 15px;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateX(5px);
    }

    &.active {
      background: ${props => `linear-gradient(45deg, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
      color: #ffffff;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    svg {
      margin-right: 10px;
      font-size: 1.2em;
    }
  }
`;

function ConfiguracoesPage() {
  const { theme, updateTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('profile');

  const LeftColumn = ({ theme }) => (
    <>
      <StyledCard className="text-center">
        <Card.Img variant="top" src="https://3.bp.blogspot.com/-SKgOrjUtWhE/UY2-87zw1PI/AAAAAAAAAH4/oSSr-Zh-6-8/s1600/Madara+Uchiha.jpg" style={{borderRadius: '20px 20px 0 0'}} />
        <Card.Body>
          <Card.Title style={{fontSize: '24px', fontWeight: 'bold'}}>
            <GradientText theme={theme}>Madara Uchiha</GradientText>
          </Card.Title>
          <Card.Text>
            Líder do <a href="#" style={{color: '#FF0080'}}>clã Uchiha</a>, fundador da aldeia da folha, segundo sábio dos seis caminhos.
          </Card.Text>
        </Card.Body>
      </StyledCard>
      <ListGroup className="mb-4">
        {[
          { icon: faHome, text: 'Feed', color: '#FF0080' },
          { icon: faUser, text: 'Conexões', color: '#7928CA' },
          { icon: faGlobeAmericas, text: 'Ultimas noticias', color: '#4a00e0' },
          { icon: faUsers, text: 'Grupos', color: '#8e2de2' }
        ].map((item, index) => (
          <ListGroup.Item key={index} className="border-0 d-flex align-items-center" style={{backgroundColor: 'transparent', color: '#ffffff', padding: '15px 0'}}>
            <IconWrapper theme={theme}>
              <FontAwesomeIcon icon={item.icon} style={{fontSize: '20px', color: '#ffffff'}} />
            </IconWrapper>
            <span style={{fontSize: '18px'}}>{item.text}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );

  const renderSettingsContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <SettingsSection>
            <h4 className="mb-4">Configurações de Perfil</h4>
            <StyledForm>
              <Form.Group>
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" placeholder="Seu nome" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="seu@email.com" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Bio</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Fale sobre você" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Localização</Form.Label>
                <Form.Control type="text" placeholder="Sua cidade" />
              </Form.Group>
              <StyledButton theme={theme}>Salvar Alterações</StyledButton>
            </StyledForm>
          </SettingsSection>
        );
      case 'security':
        return (
          <SettingsSection>
            <h4 className="mb-4">Configurações de Segurança</h4>
            <StyledForm>
              <Form.Group>
                <Form.Label>Senha Atual</Form.Label>
                <Form.Control type="password" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Nova Senha</Form.Label>
                <Form.Control type="password" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirmar Nova Senha</Form.Label>
                <Form.Control type="password" />
              </Form.Group>
              <AnimatedSwitch 
                type="switch"
                id="2fa-switch"
                label="Ativar autenticação de dois fatores"
                theme={theme}
              />
              <StyledButton theme={theme} className="mt-3">Atualizar Segurança</StyledButton>
            </StyledForm>
          </SettingsSection>
        );
      case 'notifications':
        return (
          <SettingsSection>
            <h4 className="mb-4">Configurações de Notificações</h4>
            <StyledForm>
              <AnimatedSwitch 
                type="switch"
                id="email-notifications"
                label="Notificações por email"
                theme={theme}
              />
              <AnimatedSwitch 
                type="switch"
                id="push-notifications"
                label="Notificações push"
                theme={theme}
              />
              <AnimatedSwitch 
                type="switch"
                id="sms-notifications"
                label="Notificações por SMS"
                theme={theme}
              />
              <StyledButton theme={theme} className="mt-3">Salvar Preferências</StyledButton>
            </StyledForm>
          </SettingsSection>
        );
      case 'privacy':
        return (
          <SettingsSection>
            <h4 className="mb-4">Configurações de Privacidade</h4>
            <StyledForm>
              <Form.Group>
                <Form.Label>Quem pode ver seu perfil</Form.Label>
                <Form.Control as="select">
                  <option>Todos</option>
                  <option>Apenas amigos</option>
                  <option>Ninguém</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Quem pode enviar mensagens</Form.Label>
                <Form.Control as="select">
                  <option>Todos</option>
                  <option>Apenas amigos</option>
                  <option>Ninguém</option>
                </Form.Control>
              </Form.Group>
              <AnimatedSwitch 
                type="switch"
                id="profile-indexing"
                label="Permitir que mecanismos de busca indexem seu perfil"
                theme={theme}
              />
              <StyledButton theme={theme} className="mt-3">Salvar Configurações</StyledButton>
            </StyledForm>
          </SettingsSection>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <GradientBackground theme={theme}>
        <Container>
          <Row>
            <Col lg={3}>
              <LeftColumn theme={theme} />
            </Col>
            <Col lg={9}>
              <StyledCard>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h4><FontAwesomeIcon icon={faCog} className="mr-2" /> Configurações</h4>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={3}>
                      <StyledListGroup theme={theme}>
                        <ListGroup.Item action onClick={() => setActiveSection('profile')} active={activeSection === 'profile'}>
                          <FontAwesomeIcon icon={faUser} /> Perfil
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={() => setActiveSection('security')} active={activeSection === 'security'}>
                          <FontAwesomeIcon icon={faLock} /> Segurança
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={() => setActiveSection('notifications')} active={activeSection === 'notifications'}>
                          <FontAwesomeIcon icon={faBell} /> Notificações
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={() => setActiveSection('privacy')} active={activeSection === 'privacy'}>
                          <FontAwesomeIcon icon={faGlobe} /> Privacidade
                        </ListGroup.Item>
                      </StyledListGroup>
                    </Col>
                    <Col md={9}>
                      {renderSettingsContent()}
                    </Col>
                  </Row>
                </Card.Body>
              </StyledCard>
            </Col>
          </Row>
        </Container>
      </GradientBackground>
    </Layout>
  );
}

export default ConfiguracoesPage;
