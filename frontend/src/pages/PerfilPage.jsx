import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Image, Button, Nav, Form, ListGroup, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUserFriends, faImages, faVideo, faHeart, faComment, faShareAlt, faMapMarkerAlt, faBriefcase, faGraduationCap, faEnvelope, faPhone, faBirthdayCake, faPlusCircle, faBook, faMusic, faPlane, faUtensils } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useTheme } from '../context/ContextTheme';
import MessengerWindowComp from '../components/MessengerWindowComp';
import EmojiSelectorComp from '../components/EmojiSelectorComp';

const GradientBackground = styled.div`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  min-height: 100vh;
  padding: 20px 0;
`;

const StyledCard = styled(Card)`
  border-radius: 20px;
  border: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.18);
  color: #ffffff;
  overflow: hidden;
`;

const ProfileHeader = styled.div`
  position: relative;
  height: 300px;
  background-image: url('https://picsum.photos/1000/300');
  background-size: cover;
  background-position: center;
  border-radius: 20px 20px 0 0;
`;

const ProfileImage = styled(Image)`
  position: absolute;
  bottom: -50px;
  left: 20px;
  border: 4px solid #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const ProfileInfo = styled.div`
  padding: 60px 20px 20px;
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

const StyledNav = styled(Nav)`
  .nav-link {
    color: #ffffff;
    font-weight: bold;
    &:hover, &.active {
      color: ${props => props.theme.primaryColor};
    }
  }
`;

const PostCard = styled(StyledCard)`
  margin-bottom: 20px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px);
  }

  svg {
    margin-right: 15px;
    color: ${props => props.theme.primaryColor};
    font-size: 1.5em;
  }

  .info-content {
    flex-grow: 1;
  }

  .info-title {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .info-detail {
    font-size: 0.9em;
    opacity: 0.8;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.textColor || '#ffffff'};
  font-size: 0.9rem;
  padding: 5px 10px;
  margin-right: 15px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.primaryColor};
  }
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
`;

const PhotoItem = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover .overlay {
    opacity: 1;
  }
`;

const FriendGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`;

const FriendItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 10px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  }

  .friend-name {
    font-weight: bold;
    color: ${props => props.theme.primaryColor};
    margin-bottom: 5px;
  }

  .friend-status {
    font-size: 0.8rem;
    color: #cccccc;
  }
`;

function PerfilPage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState([
    { id: 1, user: 'John Doe', userImage: 'https://picsum.photos/50/50?random=1', content: 'Just had an amazing day at the beach! 🏖️', image: 'https://picsum.photos/400/300?random=1', likes: 150, comments: 45, shares: 20 },
    { id: 2, user: 'Jane Smith', userImage: 'https://picsum.photos/50/50?random=2', content: 'Excited to start my new job tomorrow! 🎉', likes: 200, comments: 60, shares: 30 },
    { id: 3, user: 'John Doe', userImage: 'https://picsum.photos/50/50?random=1', content: 'Check out this delicious meal I cooked! 🍝', image: 'https://picsum.photos/400/300?random=3', likes: 180, comments: 55, shares: 25 },
  ]);
  const [showAllFriends, setShowAllFriends] = useState(false);

  const handlePostAction = (postId, action) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, [action]: post[action] + 1 };
      }
      return post;
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <>
            <StyledCard>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Control as="textarea" rows={3} placeholder="O que você está pensando?" />
                  </Form.Group>
                  <div className="d-flex justify-content-between mt-2">
                    <StyledButton theme={theme} size="sm">
                      <FontAwesomeIcon icon={faImages} className="me-2" /> Foto
                    </StyledButton>
                    <StyledButton theme={theme} size="sm">
                      <FontAwesomeIcon icon={faVideo} className="me-2" /> Vídeo
                    </StyledButton>
                    <StyledButton theme={theme}>Publicar</StyledButton>
                  </div>
                </Form>
              </Card.Body>
            </StyledCard>
            {posts.map((post) => (
              <PostCard key={post.id}>
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <Image src={post.userImage} roundedCircle style={{width: '40px', height: '40px', marginRight: '10px'}} />
                    <div>
                      <h6 className="mb-0">{post.user}</h6>
                      <small style={{color: '#cccccc'}}>2 horas atrás</small>
                    </div>
                  </div>
                  <Card.Text>{post.content}</Card.Text>
                  {post.image && <Card.Img src={post.image} className="mb-3 rounded" />}
                  <div>
                    <ActionButton theme={theme} onClick={() => handlePostAction(post.id, 'likes')}>
                      <FontAwesomeIcon icon={faHeart} /> {post.likes}
                    </ActionButton>
                    <ActionButton theme={theme} onClick={() => handlePostAction(post.id, 'comments')}>
                      <FontAwesomeIcon icon={faComment} /> {post.comments}
                    </ActionButton>
                    <ActionButton theme={theme} onClick={() => handlePostAction(post.id, 'shares')}>
                      <FontAwesomeIcon icon={faShareAlt} /> {post.shares}
                    </ActionButton>
                  </div>
                </Card.Body>
              </PostCard>
            ))}
          </>
        );
      case 'about':
        return (
          <StyledCard>
            <Card.Body>
              <h4 className="mb-4">Informações Pessoais</h4>
              <InfoItem theme={theme}>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <div className="info-content">
                  <div className="info-title">Localização</div>
                  <div className="info-detail">São Paulo, Brasil</div>
                </div>
              </InfoItem>
              <InfoItem theme={theme}>
                <FontAwesomeIcon icon={faBriefcase} />
                <div className="info-content">
                  <div className="info-title">Profissão</div>
                  <div className="info-detail">Designer Gráfico na ArtCorp</div>
                </div>
              </InfoItem>
              <InfoItem theme={theme}>
                <FontAwesomeIcon icon={faGraduationCap} />
                <div className="info-content">
                  <div className="info-title">Educação</div>
                  <div className="info-detail">Design Gráfico, Universidade XYZ</div>
                </div>
              </InfoItem>
              <InfoItem theme={theme}>
                <FontAwesomeIcon icon={faEnvelope} />
                <div className="info-content">
                  <div className="info-title">Email</div>
                  <div className="info-detail">johndoe@email.com</div>
                </div>
              </InfoItem>
              <InfoItem theme={theme}>
                <FontAwesomeIcon icon={faPhone} />
                <div className="info-content">
                  <div className="info-title">Telefone</div>
                  <div className="info-detail">+55 11 98765-4321</div>
                </div>
              </InfoItem>
              <InfoItem theme={theme}>
                <FontAwesomeIcon icon={faBirthdayCake} />
                <div className="info-content">
                  <div className="info-title">Aniversário</div>
                  <div className="info-detail">15 de março</div>
                </div>
              </InfoItem>
            </Card.Body>
          </StyledCard>
        );
      case 'friends':
        const allFriends = ['Alice Johnson', 'Bob Smith', 'Carol Williams', 'David Brown', 'Eva Davis', 'Frank Miller', 'Grace Lee', 'Henry Wilson', 'Ivy Chen', 'Jack Taylor'];
        const displayedFriends = showAllFriends ? allFriends : allFriends.slice(0, 6);
        return (
          <StyledCard>
            <Card.Body>
              <h4 className="mb-4">Amigos</h4>
              <FriendGrid>
                {displayedFriends.map((friend, index) => (
                  <FriendItem key={index} theme={theme}>
                    <Image src={`https://picsum.photos/80/80?random=${index + 10}`} />
                    <div className="friend-name">{friend}</div>
                    <div className="friend-status">Online</div>
                  </FriendItem>
                ))}
              </FriendGrid>
              {!showAllFriends && allFriends.length > 6 && (
                <div className="text-center mt-3">
                  <StyledButton theme={theme} onClick={() => setShowAllFriends(true)}>
                    Mostrar mais
                  </StyledButton>
                </div>
              )}
            </Card.Body>
          </StyledCard>
        );
      case 'photos':
        return (
          <StyledCard>
            <Card.Body>
              <h4>Fotos</h4>
              <PhotoGrid>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((photo) => (
                  <PhotoItem key={photo}>
                    <img src={`https://picsum.photos/300/300?random=${photo + 20}`} alt={`Photo ${photo}`} />
                    <div className="overlay">
                      <FontAwesomeIcon icon={faImages} size="2x" color="white" />
                    </div>
                  </PhotoItem>
                ))}
              </PhotoGrid>
            </Card.Body>
          </StyledCard>
        );
      case 'videos':
        return (
          <StyledCard>
            <Card.Body>
              <h4>Vídeos</h4>
              <p>Funcionalidade de vídeos em desenvolvimento.</p>
            </Card.Body>
          </StyledCard>
        );
      default:
        return null;
    }
  };

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
              {renderContent()}
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
