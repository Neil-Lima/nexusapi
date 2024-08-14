import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Button, Image, Tab, Nav, ListGroup, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faEnvelope, faGlobeAmericas, faUsers, faThumbsUp, faComment, faShare, faEllipsisH, faCamera, faPencilAlt, faLock, faUserFriends, faBriefcase, faGraduationCap, faHeart, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useTheme } from '../context/ContextTheme';

const GradientBackground = styled.div`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  min-height: 100vh;
  padding: 20px 0;
`;

const StyledCard = styled(Card)`
  border-radius: ${props => props.theme.borderRadius};
  border: none;
  box-shadow: ${props => props.theme.boxShadow};
  margin-bottom: 20px;
  background: ${props => props.theme.cardBackground};
  color: ${props => props.theme.textColor};
  overflow: hidden;
`;

const StyledButton = styled(Button)`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-weight: bold;
  transition: ${props => props.theme.transition};
  color: ${props => props.theme.textColor};
  &:hover {
    transform: ${props => props.theme.buttonHoverTransform};
    box-shadow: ${props => props.theme.boxShadow};
    background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.secondaryColor}, ${props.theme.primaryColor})`};
  }
`;

const ProfileHeader = styled.div`
  position: relative;
  height: 350px;
  background-image: url(${props => props.coverImage});
  background-size: cover;
  background-position: center;
  border-radius: 20px 20px 0 0;
`;

const ProfileImage = styled(Image)`
  width: 180px;
  height: 180px;
  border: 5px solid #fff;
  position: absolute;
  bottom: -90px;
  left: 50px;
  z-index: 2;
  object-fit: cover;
`;

const ProfileInfo = styled.div`
  padding-top: 100px;
  padding-left: 20px;
`;

const PostCard = styled(StyledCard)`
  margin-bottom: 20px;
`;

const StyledNav = styled(Nav)`
  .nav-link {
    color: ${props => props.theme.textColor};
    &:hover, &.active {
      color: ${props => props.theme.highlightColor};
    }
  }
`;

const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
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
`;

const StyledListGroup = styled(ListGroup)`
  .list-group-item {
    background-color: transparent;
    border-color: ${props => props.theme.borderColor};
    color: ${props => props.theme.textColor};
  }
`;

const StyledForm = styled(Form)`
  textarea {
    background-color: ${props => props.theme.inputBackground};
    border-color: ${props => props.theme.borderColor};
    color: ${props => props.theme.textColor};
    &:focus {
      box-shadow: 0 0 0 0.2rem ${props => props.theme.focusColor};
    }
  }
`;

const StyledModal = styled(Modal)`
  .modal-content {
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 20px;
    color: #ffffff;
  }

  .modal-header {
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  .modal-footer {
    border-top: 1px solid rgba(255,255,255,0.1);
  }
`;

const ModalImage = styled(Image)`
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 10px;
`;

const IconButton = styled(Button)`
  background-color: transparent;
  border: none;
  color: ${props => props.theme.textColor};
  &:hover {
    color: ${props => props.theme.highlightColor};
  }
`;

function PerfilUsuarioPage() {
  const { theme } = useTheme();
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const mockUser = {
    id: 1,
    name: 'Itachi Uchiha',
    image: 'https://picsum.photos/180/180',
    coverImage: 'https://picsum.photos/1000/350',
    bio: 'Shinobi lendário do clã Uchiha, especialista em genjutsu e ninjutsu.',
    location: 'Konohagakure',
    friends: 789,
    followers: 10500,
    work: 'ANBU Black Ops',
    education: 'Academia Ninja de Konoha',
    relationship: 'Solteiro',
    posts: [
      { id: 1, content: 'A verdadeira força não está em nunca cair, mas em sempre se levantar.', likes: 256, comments: 42, shares: 18, image: 'https://picsum.photos/400/300?random=1' },
      { id: 2, content: 'O poder real vem da verdade. Sem isso, não há confiança. E sem confiança, não há aliados.', likes: 189, comments: 31, shares: 12 },
    ],
    photos: [
      'https://picsum.photos/200/200?random=1',
      'https://picsum.photos/200/200?random=2',
      'https://picsum.photos/200/200?random=3',
      'https://picsum.photos/200/200?random=4',
      'https://picsum.photos/200/200?random=5',
      'https://picsum.photos/200/200?random=6',
    ],
    mutualFriends: [
      { id: 1, name: 'Sasuke Uchiha', image: 'https://picsum.photos/50/50?random=1' },
      { id: 2, name: 'Naruto Uzumaki', image: 'https://picsum.photos/50/50?random=2' },
      { id: 3, name: 'Kakashi Hatake', image: 'https://picsum.photos/50/50?random=3' },
    ]
  };

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
    setShowPhotoModal(true);
  };

  return (
    <Layout>
      <GradientBackground theme={theme}>
        <Container>
          <StyledCard theme={theme}>
            <ProfileHeader coverImage={mockUser.coverImage}>
              <IconButton theme={theme} style={{ position: 'absolute', bottom: 20, right: 20 }}>
                <FontAwesomeIcon icon={faCamera} /> Alterar Capa
              </IconButton>
            </ProfileHeader>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <ProfileImage src={mockUser.image} roundedCircle />
                </Col>
                <Col md={8}>
                  <ProfileInfo>
                    <h2>{mockUser.name}</h2>
                    <p>{mockUser.bio}</p>
                    <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {mockUser.location} • <FontAwesomeIcon icon={faUserFriends} /> {mockUser.friends} amigos • <FontAwesomeIcon icon={faUsers} /> {mockUser.followers} seguidores</p>
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
                </Col>
              </Row>
            </Card.Body>
          </StyledCard>

          <Row>
            <Col md={4}>
              <StyledCard theme={theme}>
                <Card.Body>
                  <h5>Sobre</h5>
                  <StyledListGroup variant="flush" theme={theme}>
                    <ListGroup.Item><FontAwesomeIcon icon={faBriefcase} /> Trabalha na {mockUser.work}</ListGroup.Item>
                    <ListGroup.Item><FontAwesomeIcon icon={faGraduationCap} /> Estudou na {mockUser.education}</ListGroup.Item>
                    <ListGroup.Item><FontAwesomeIcon icon={faHeart} /> {mockUser.relationship}</ListGroup.Item>
                    <ListGroup.Item><FontAwesomeIcon icon={faGlobeAmericas} /> De {mockUser.location}</ListGroup.Item>
                  </StyledListGroup>
                </Card.Body>
              </StyledCard>

              <StyledCard theme={theme}>
                <Card.Body>
                  <h5>Fotos</h5>
                  <PhotoGrid>
                    {mockUser.photos.map((photo, index) => (
                      <PhotoItem key={index} onClick={() => handlePhotoClick(photo)}>
                        <img src={photo} alt={`Foto ${index + 1}`} />
                      </PhotoItem>
                    ))}
                  </PhotoGrid>
                </Card.Body>
              </StyledCard>

              <StyledCard theme={theme}>
                <Card.Body>
                  <h5>Amigos</h5>
                  <Row>
                    {mockUser.mutualFriends.map(friend => (
                      <Col xs={4} key={friend.id} className="mb-3">
                        <Image src={friend.image} roundedCircle fluid />
                        <p className="text-center mt-2">{friend.name}</p>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </StyledCard>
            </Col>

            <Col md={8}>
              <StyledCard theme={theme}>
                <Card.Body>
                  <StyledForm theme={theme}>
                    <Form.Group>
                      <Form.Control as="textarea" rows={3} placeholder="No que você está pensando?" />
                    </Form.Group>
                    <div className="d-flex justify-content-between mt-3">
                      <IconButton theme={theme}><FontAwesomeIcon icon={faCamera} /> Foto/Vídeo</IconButton>
                      <StyledButton theme={theme}>Publicar</StyledButton>
                    </div>
                  </StyledForm>
                </Card.Body>
              </StyledCard>

              {mockUser.posts.map((post) => (
                <PostCard key={post.id} theme={theme}>
                  <Card.Body>
                    <div className="d-flex align-items-center mb-3">
                      <Image src={mockUser.image} roundedCircle style={{width: '50px', height: '50px', marginRight: '10px'}} />
                      <div>
                        <h6 className="mb-0">{mockUser.name}</h6>
                        <small>2 horas atrás</small>
                      </div>
                    </div>
                    <Card.Text>{post.content}</Card.Text>
                    {post.image && <Image src={post.image} fluid className="mb-3" />}
                    <div className="d-flex justify-content-between">
                      <IconButton theme={theme}><FontAwesomeIcon icon={faThumbsUp} /> {post.likes}</IconButton>
                      <IconButton theme={theme}><FontAwesomeIcon icon={faComment} /> {post.comments}</IconButton>
                      <IconButton theme={theme}><FontAwesomeIcon icon={faShare} /> {post.shares}</IconButton>
                    </div>
                  </Card.Body>
                </PostCard>
              ))}
            </Col>
          </Row>
        </Container>

        <StyledModal show={showPhotoModal} onHide={() => setShowPhotoModal(false)} size="lg" centered theme={theme}>
          <Modal.Header closeButton>
            <Modal.Title>Visualização da Foto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ModalImage src={selectedPhoto} alt="Foto ampliada" fluid />
          </Modal.Body>
        </StyledModal>
      </GradientBackground>
    </Layout>
  );
}

export default PerfilUsuarioPage;
