import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Image, Button, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faEnvelope, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ContextTheme';
import { GradientBackground, StyledCard, ProfileHeader, ProfileImage, ProfileInfo, StyledButton, StyledNav, PostCard, InfoItem, PhotoGrid, PhotoItem, FriendGrid, FriendItem, TestimonialCard } from '../styles/PerfilUsuarioStyle';
import { mockUser, renderContent } from '../utils/PerfilUsuarioUtil';

function PerfilUsuarioPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <Layout>
      <GradientBackground theme={theme}>
        <Container>
          <StyledCard theme={theme}>
            <ProfileHeader coverImage={mockUser.coverImage}>
              <ProfileImage src={mockUser.image} roundedCircle />
            </ProfileHeader>
            <Card.Body>
              <ProfileInfo>
                <h2>{mockUser.name}</h2>
                <p>{mockUser.bio}</p>
                <p>{mockUser.location} • {mockUser.mutualFriends.length} amigos em comum</p>
                <StyledButton theme={theme} className="me-2">
                  <FontAwesomeIcon icon={faUserPlus} /> Adicionar Amigo
                </StyledButton>
                <StyledButton theme={theme} className="me-2">
                  <FontAwesomeIcon icon={faEnvelope} /> Mensagem
                </StyledButton>
                <StyledButton theme={theme}>
                  <FontAwesomeIcon icon={faEllipsisH} />
                </StyledButton>
              </ProfileInfo>
            </Card.Body>
            <StyledNav variant="tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)} theme={theme}>
              <Nav.Item>
                <Nav.Link eventKey="posts">Posts</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="about">Sobre</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="friends">Amigos</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="photos">Fotos</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="testimonials">Depoimentos</Nav.Link>
              </Nav.Item>
            </StyledNav>
          </StyledCard>

          <Row>
            <Col md={8}>
              {renderContent(activeTab, theme, mockUser)}
            </Col>
            <Col md={4}>
              <StyledCard theme={theme}>
                <Card.Body>
                  <h5>Apresentação</h5>
                  <p>{mockUser.presentation}</p>
                </Card.Body>
              </StyledCard>

              <StyledCard theme={theme}>
                <Card.Body>
                  <h5>Fotos</h5>
                  <PhotoGrid>
                    {mockUser.photos.slice(0, 9).map((photo, index) => (
                      <PhotoItem key={index}>
                        <img src={photo} alt={`Foto ${index + 1}`} />
                      </PhotoItem>
                    ))}
                  </PhotoGrid>
                </Card.Body>
              </StyledCard>

              <StyledCard theme={theme}>
                <Card.Body>
                  <h5>Amigos em Comum ({mockUser.mutualFriends.length})</h5>
                  <FriendGrid>
                    {mockUser.mutualFriends.map(friend => (
                      <FriendItem key={friend.id}>
                        <Image src={friend.image} roundedCircle fluid />
                        <p>{friend.name}</p>
                      </FriendItem>
                    ))}
                  </FriendGrid>
                </Card.Body>
              </StyledCard>
            </Col>
          </Row>
        </Container>
      </GradientBackground>
    </Layout>
  );
}

export default PerfilUsuarioPage;
