import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Form, InputGroup, Button, ListGroup, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserPlus, faUserMinus, faEnvelope, faHome, faUser, faGlobeAmericas, faUsers, faBars } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
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

const FriendItem = styled(Card)`
  background: transparent;
  border: none;
  color: #ffffff;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-5px);
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

const SidebarWrapper = styled.div`
  @media (max-width: 991px) {
    position: fixed;
    top: 0;
    left: ${props => props.show ? '0' : '-50%'};
    width: 50%;
    height: 100vh;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-right: 1px solid rgba(255,255,255,0.18);
    transition: left 0.3s ease-in-out;
    z-index: 1000;
    overflow-y: auto;
    padding: 20px;
  }
`;

const Overlay = styled.div`
  @media (max-width: 991px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: ${props => props.show ? 'block' : 'none'};
    z-index: 999;
  }
`;

function AmigosPage() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);

  const mockFriends = [
    { id: 1, name: 'Naruto Uzumaki', image: 'https://picsum.photos/50/50?random=1', isFriend: true },
    { id: 2, name: 'Sasuke Uchiha', image: 'https://picsum.photos/50/50?random=2', isFriend: true },
    { id: 3, name: 'Sakura Haruno', image: 'https://picsum.photos/50/50?random=3', isFriend: false },
    { id: 4, name: 'Kakashi Hatake', image: 'https://picsum.photos/50/50?random=4', isFriend: true },
    { id: 5, name: 'Hinata Hyuga', image: 'https://picsum.photos/50/50?random=5', isFriend: false },
    { id: 6, name: 'Shikamaru Nara', image: 'https://picsum.photos/50/50?random=6', isFriend: true },
  ];

  const filteredFriends = mockFriends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                  <h2 className="mb-4">Amigos</h2>
                  <Form className="mb-4">
                    <InputGroup>
                      <Form.Control
                        placeholder="Buscar amigos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{background: 'rgba(255,255,255,0.1)', color: '#ffffff', border: 'none'}}
                      />
                      <StyledButton variant="primary" theme={theme}>
                        <FontAwesomeIcon icon={faSearch} />
                      </StyledButton>
                    </InputGroup>
                  </Form>
                  <Row xs={1} md={2} lg={3} className="g-4">
                    {filteredFriends.map((friend) => (
                      <Col key={friend.id}>
                        <FriendItem>
                          <Card.Body>
                            <div className="d-flex flex-column align-items-center text-center">
                              <Image src={friend.image} roundedCircle style={{width: '100px', height: '100px', marginBottom: '15px'}} />
                              <h5>{friend.name}</h5>
                              <div className="mt-3">
                                <StyledButton variant="primary" theme={theme} className="me-2">
                                  <FontAwesomeIcon icon={faEnvelope} />
                                </StyledButton>
                                <StyledButton 
                                  variant={friend.isFriend ? "danger" : "success"} 
                                  theme={theme}
                                >
                                  <FontAwesomeIcon icon={friend.isFriend ? faUserMinus : faUserPlus} />
                                </StyledButton>
                              </div>
                            </div>
                          </Card.Body>
                        </FriendItem>
                      </Col>
                    ))}
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

export default AmigosPage;
