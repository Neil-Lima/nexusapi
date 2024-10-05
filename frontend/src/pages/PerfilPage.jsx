import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Image, Button, Nav, Form, ListGroup, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUserFriends, faImages, faVideo, faHeart, faComment, faShareAlt, faMapMarkerAlt, faBriefcase, faGraduationCap, faEnvelope, faPhone, faBirthdayCake, faBook, faMusic, faPlane, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ContextTheme';
import MessengerWindowComp from '../components/MessengerWindowComp';
import { GradientBackground, StyledCard, ProfileHeader, ProfileImage, ProfileInfo, StyledButton, StyledNav, PostCard, InfoItem, ActionButton, PhotoGrid, PhotoItem, FriendGrid, FriendItem } from '../styles/PerfilStyle';
import { initialPosts, handlePostAction, renderContent } from '../utils/PerfilUtil';

function PerfilPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState(initialPosts);
  const [showAllFriends, setShowAllFriends] = useState(false);

  return (
    <Layout>
      <GradientBackground theme={theme}>
        <Container>
          <StyledCard>
            <ProfileHeader>
              <ProfileImage src="https://picsum.photos/200/200?random=profile" roundedCircle width={150} height={150} />
            </ProfileHeader>
            <ProfileInfo>
              <h2>John Doe</h2>
              <p>"Apaixonado por arte, design e novas experiências."</p>
              <StyledButton theme={theme}>
                <FontAwesomeIcon icon={faEdit} /> Editar Perfil
              </StyledButton>
            </ProfileInfo>
            <StyledNav variant="tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)} theme={theme}>
              <Nav.Item>
                <Nav.Link eventKey="posts">Posts</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="about">Sobre</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="friends">
                  <FontAwesomeIcon icon={faUserFriends} /> Amigos
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="photos">
                  <FontAwesomeIcon icon={faImages} /> Fotos
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="videos">
                  <FontAwesomeIcon icon={faVideo} /> Vídeos
                </Nav.Link>
              </Nav.Item>
            </StyledNav>
          </StyledCard>

          <Row>
            <Col md={8}>
              {renderContent(activeTab, theme, posts, setPosts, showAllFriends, setShowAllFriends)}
            </Col>
            <Col md={4}>
              <StyledCard>
                <Card.Body>
                  <Card.Title>Sobre John</Card.Title>
                  <Card.Text>
                    Designer gráfico apaixonado por criar visuais impactantes e contar histórias através da arte. 
                    Sempre em busca de inspiração e novas formas de expressão criativa.
                  </Card.Text>
                </Card.Body>
              </StyledCard>
              <StyledCard>
                <Card.Body>
                  <Card.Title>Interesses</Card.Title>
                  <ListGroup variant="flush">
                    {[
                      { icon: faBook, text: 'Literatura' },
                      { icon: faMusic, text: 'Música Indie' },
                      { icon: faPlane, text: 'Viagens' },
                      { icon: faUtensils, text: 'Gastronomia' },
                      { icon: faImages, text: 'Fotografia' }
                    ].map((interest, index) => (
                      <ListGroup.Item key={index} style={{background: 'transparent', color: '#ffffff'}}>
                        <FontAwesomeIcon icon={interest.icon} style={{marginRight: '10px'}} />
                        {interest.text}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </StyledCard>
              <StyledCard>
                <Card.Body>
                  <Card.Title>Estatísticas</Card.Title>
                  <InfoItem theme={theme}>
                    <FontAwesomeIcon icon={faUserFriends} /> 500+ conexões
                  </InfoItem>
                  <InfoItem theme={theme}>
                    <FontAwesomeIcon icon={faImages} /> 200+ fotos
                  </InfoItem>
                  <InfoItem theme={theme}>
                    <FontAwesomeIcon icon={faVideo} /> 20+ vídeos
                  </InfoItem>
                </Card.Body>
              </StyledCard>
            </Col>
          </Row>
        </Container>
        <MessengerWindowComp />
      </GradientBackground>
    </Layout>
  );
}

export default PerfilPage;
