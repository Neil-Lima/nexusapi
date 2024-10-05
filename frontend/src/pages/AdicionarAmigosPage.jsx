import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Form, InputGroup, Button, ListGroup, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserPlus, faHome, faUser, faGlobeAmericas, faUsers, faBars } from '@fortawesome/free-solid-svg-icons';
import { GradientBackground, StyledCard, StyledButton, UserItem, IconWrapper, GradientText, SidebarWrapper, Overlay } from '../styles/AdicionarAmigosStyle';
import { useTheme } from '../context/ContextTheme';
import { mockUsers } from '../utils/AdicionarAmigosUtil';

function AdicionarAmigosPage() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <Card.Body>
                  <h2 className="mb-4">Adicionar Amigos</h2>
                  <Form className="mb-4">
                    <InputGroup>
                      <Form.Control
                        placeholder="Buscar usuários..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{background: 'rgba(255,255,255,0.1)', color: '#ffffff', border: 'none'}}
                      />
                      <StyledButton variant="primary" theme={theme}>
                        <FontAwesomeIcon icon={faSearch} />
                      </StyledButton>
                    </InputGroup>
                  </Form>
                  <ListGroup>
                    {filteredUsers.map((user) => (
                      <UserItem key={user.id} className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Image src={user.image} roundedCircle style={{width: '50px', height: '50px', marginRight: '15px'}} />
                          <div>
                            <h5 className="mb-0">{user.name}</h5>
                            <small>{user.mutualFriends} amigos em comum</small>
                          </div>
                        </div>
                        <StyledButton variant="primary" theme={theme}>
                          <FontAwesomeIcon icon={faUserPlus} /> Adicionar
                        </StyledButton>
                      </UserItem>
                    ))}
                  </ListGroup>
                </Card.Body>
              </StyledCard>
            </Col>
          </Row>
        </Container>
      </GradientBackground>
    </Layout>
  );
}

export default AdicionarAmigosPage;
