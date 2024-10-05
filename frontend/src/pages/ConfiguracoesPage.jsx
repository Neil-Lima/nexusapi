import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, ListGroup, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faUser, faLock, faBell, faGlobe, faHome, faGlobeAmericas, faUsers, faPalette, faLanguage, faAccessibility, faShieldAlt, faUserSecret, faBars } from '@fortawesome/free-solid-svg-icons';
import { GradientBackground, StyledCard, StyledButton, IconWrapper, GradientText, SidebarWrapper, Overlay, StyledForm, AnimatedSwitch, SettingsSection, StyledListGroup } from '../styles/ConfiguracoesStyle';
import { useTheme } from '../context/ContextTheme';
import { settingsSections } from '../utils/ConfiguracoesUtil';

function ConfiguracoesPage() {
  const { theme, updateTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('profile');
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

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
    const section = settingsSections.find(s => s.id === activeSection);
    if (!section) return null;

    return (
      <SettingsSection>
        <h4 className="mb-4">{section.title}</h4>
        <StyledForm>
          {section.fields.map((field, index) => (
            <Form.Group key={index}>
              <Form.Label>{field.label}</Form.Label>
              {field.type === 'text' || field.type === 'email' || field.type === 'password' ? (
                <Form.Control type={field.type} placeholder={field.placeholder} />
              ) : field.type === 'textarea' ? (
                <Form.Control as="textarea" rows={3} placeholder={field.placeholder} />
              ) : field.type === 'select' ? (
                <Form.Control as="select">
                  {field.options.map((option, optionIndex) => (
                    <option key={optionIndex}>{option}</option>
                  ))}
                </Form.Control>
              ) : field.type === 'switch' ? (
                <AnimatedSwitch 
                  type="switch"
                  id={`switch-${index}`}
                  label={field.label}
                  theme={theme}
                />
              ) : null}
            </Form.Group>
          ))}
          <StyledButton theme={theme} className="mt-3">{section.buttonText}</StyledButton>
        </StyledForm>
      </SettingsSection>
    );
  };

  return (
    <Layout>
      <GradientBackground theme={theme}>
        <Container>
          <Row>
            <Overlay show={showSidebar} onClick={toggleSidebar} />
            <Col lg={3}>
              <SidebarWrapper show={showSidebar}>
                <LeftColumn theme={theme} />
              </SidebarWrapper>
            </Col>
            <Col lg={9}>
              <StyledButton className="d-lg-none mb-3" onClick={toggleSidebar} theme={theme}>
                <FontAwesomeIcon icon={faBars} />
              </StyledButton>
              <StyledCard>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h4><FontAwesomeIcon icon={faCog} className="mr-2" /> Configurações</h4>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={3}>
                      <StyledListGroup theme={theme}>
                        {settingsSections.map((section) => (
                          <ListGroup.Item 
                            key={section.id}
                            action 
                            onClick={() => setActiveSection(section.id)} 
                            active={activeSection === section.id}
                          >
                            <FontAwesomeIcon icon={section.icon} /> {section.title}
                          </ListGroup.Item>
                        ))}
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
