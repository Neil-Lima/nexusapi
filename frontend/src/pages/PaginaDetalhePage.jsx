import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Button, Image, Tab, Nav, Form, InputGroup, ListGroup, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faShare, faUser, faEnvelope, faImage, faVideo, faNewspaper, faPaperPlane, faBell, faEdit, faEllipsisV, faThumbsUp, faReply, faInfoCircle, faChevronDown, faUserPlus, faCalendarAlt, faChartLine } from '@fortawesome/free-solid-svg-icons';
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
  margin-bottom: 20px;
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

const CoverPhoto = styled.div`
  height: 300px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 20px 20px 0 0;
  position: relative;
`;

const ProfilePhoto = styled(Image)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid #ffffff;
  position: absolute;
  bottom: -75px;
  left: 20px;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #ffffff;
  margin-top: 80px;
`;

const PageCategory = styled.span`
  background-color: ${props => props.theme.primaryColor};
  color: #ffffff;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-left: 10px;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const Stat = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`;

const StyledNav = styled(Nav)`
  .nav-link {
    color: #ffffff;
    &:hover, &.active {
      color: ${props => props.theme.primaryColor};
    }
  }
`;

const PostCard = styled(StyledCard)`
  margin-bottom: 20px;
`;

const PostImage = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const PostActions = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
`;

const ActionButton = styled(Button)`
  background: transparent;
  border: none;
  color: #ffffff;
  &:hover {
    color: ${props => props.theme.primaryColor};
  }
`;

const CommentSection = styled.div`
  margin-top: 20px;
`;

const Comment = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
`;

const CommentAuthor = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const FollowerItem = styled(ListGroup.Item)`
  background: transparent;
  border: none;
  color: #ffffff;
  display: flex;
  align-items: center;
  padding: 15px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
  }
`;

const FollowerAvatar = styled(Image)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
`;

const ChatWindow = styled(Modal)`
  .modal-content {
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.18);
    color: #ffffff;
  }
`;

const FeedContainer = styled.div`
  max-height: 600px;
  max-width: 800px;
  overflow-y: auto;
  padding-right: 15px;
  margin: 0 auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }
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
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 10px;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

const InfoIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  margin-right: 15px;
  color: ${props => props.theme.primaryColor};
`;

function PaginaDetalhePage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('posts');
  const [message, setMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState(3);

  const pageData = {
    name: "TechInnovators",
    category: "Tecnologia e Inovação",
    coverPhoto: "https://picsum.photos/1200/400",
    profilePhoto: "https://picsum.photos/200",
    followers: 25000,
    likes: 18000,
    posts: 350,
    description: "Explorando as fronteiras da tecnologia e inovação. Junte-se a nós nesta jornada emocionante rumo ao futuro!",
    admin: "John Doe",
    createdAt: "01/01/2022",
    lastPost: "15/05/2023",
    engagement: "85%",
  };

  const posts = [
    { id: 1, type: 'text', content: 'Estamos empolgados em anunciar nosso próximo evento de tecnologia! Fiquem atentos para mais detalhes.', likes: 250, comments: 45, shares: 30 },
    { id: 2, type: 'image', content: 'https://picsum.photos/800/600', caption: 'Nossa equipe trabalhando duro no novo projeto de IA!', likes: 500, comments: 78, shares: 65 },
    { id: 3, type: 'video', content: 'https://www.example.com/video.mp4', caption: 'Confira nossa nova demonstração de realidade aumentada!', likes: 750, comments: 120, shares: 95 },
    { id: 4, type: 'text', content: 'Novo artigo sobre as tendências de IA para 2023 já está disponível em nosso blog!', likes: 180, comments: 32, shares: 25 },
    { id: 5, type: 'image', content: 'https://picsum.photos/800/600?random=1', caption: 'Nosso CEO participando do painel sobre o futuro da tecnologia na conferência TechWorld 2023', likes: 420, comments: 56, shares: 40 },
    { id: 6, type: 'text', content: 'Estamos contratando! Procuramos desenvolvedores full-stack apaixonados por inovação. Confira as vagas em nosso site.', likes: 300, comments: 85, shares: 50 },
  ];

  const comments = [
    { id: 1, author: 'Alice Johnson', avatar: 'https://picsum.photos/50/50?random=1', content: 'Isso é incrível! Mal posso esperar pelo evento.', likes: 15 },
    { id: 2, author: 'Bob Smith', avatar: 'https://picsum.photos/50/50?random=2', content: 'A tecnologia de IA de vocês parece promissora!', likes: 8 },
    { id: 3, author: 'Carol Davis', avatar: 'https://picsum.photos/50/50?random=3', content: 'Adorei a demonstração de RA. Quando será lançado?', likes: 12 },
  ];

  const followers = [
    { id: 1, name: 'John Doe', avatar: 'https://picsum.photos/50/50?random=4', role: 'Desenvolvedor Full Stack' },
    { id: 2, name: 'Jane Smith', avatar: 'https://picsum.photos/50/50?random=5', role: 'UX Designer' },
    { id: 3, name: 'Mike Johnson', avatar: 'https://picsum.photos/50/50?random=6', role: 'Gerente de Produto' },
    { id: 4, name: 'Emily Brown', avatar: 'https://picsum.photos/50/50?random=7', role: 'Engenheira de IA' },
    { id: 5, name: 'David Lee', avatar: 'https://picsum.photos/50/50?random=8', role: 'Analista de Dados' },
    { id: 6, name: 'Sarah Wilson', avatar: 'https://picsum.photos/50/50?random=9', role: 'Especialista em Cibersegurança' },
  ];

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    console.log('Mensagem enviada:', message);
    setMessage('');
  };

  const loadMorePosts = () => {
    setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 3);
  };

  return (
    <Layout>
      <GradientBackground theme={theme}>
        <Container className="px-3" style={{ maxWidth: '1200px' }}>
          <StyledCard>
            <CoverPhoto src={pageData.coverPhoto}>
              <ProfilePhoto src={pageData.profilePhoto} alt={pageData.name} />
            </CoverPhoto>
            <Card.Body>
              <Row>
                <Col lg={9} md={8}>
                  <PageTitle>
                    {pageData.name}
                    <PageCategory theme={theme}>{pageData.category}</PageCategory>
                  </PageTitle>
                  <p>{pageData.description}</p>
                </Col>
                <Col lg={3} md={4}>
                  <StatsContainer>
                    <Stat>
                      <StatNumber>{pageData.followers.toLocaleString()}</StatNumber>
                      <StatLabel>Seguidores</StatLabel>
                    </Stat>
                    <Stat>
                      <StatNumber>{pageData.likes.toLocaleString()}</StatNumber>
                      <StatLabel>Curtidas</StatLabel>
                    </Stat>
                    <Stat>
                      <StatNumber>{pageData.posts.toLocaleString()}</StatNumber>
                      <StatLabel>Postagens</StatLabel>
                    </Stat>
                  </StatsContainer>
                  <div className="d-flex justify-content-around mt-3">
                    <StyledButton theme={theme}>
                      <FontAwesomeIcon icon={faUser} className="me-2" />
                      Seguir
                    </StyledButton>
                    <StyledButton theme={theme} onClick={() => setShowChat(true)}>
                      <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                      Mensagem
                    </StyledButton>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </StyledCard>

          <StyledCard>
            <Card.Body>
              <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                <StyledNav variant="tabs" className="mb-3">
                  <Nav.Item>
                    <Nav.Link eventKey="posts">
                      <FontAwesomeIcon icon={faNewspaper} className="me-2" />
                      Posts
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="photos">
                      <FontAwesomeIcon icon={faImage} className="me-2" />
                      Fotos
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="videos">
                      <FontAwesomeIcon icon={faVideo} className="me-2" />
                      Vídeos
                    </Nav.Link>
                    </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="followers">
                      <FontAwesomeIcon icon={faUser} className="me-2" />
                      Seguidores
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="info">
                      <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
                      Informações
                    </Nav.Link>
                  </Nav.Item>
                </StyledNav>

                <Tab.Content>
                  <Tab.Pane eventKey="posts">
                    <FeedContainer>
                      {posts.slice(0, visiblePosts).map(post => (
                        <PostCard key={post.id}>
                          <Card.Body>
                            {post.type === 'text' && <p>{post.content}</p>}
                            {post.type === 'image' && (
                              <>
                                <PostImage src={post.content} alt="Post" />
                                <p className="mt-2">{post.caption}</p>
                              </>
                            )}
                            {post.type === 'video' && (
                              <>
                                <video width="100%" controls>
                                  <source src={post.content} type="video/mp4" />
                                  Seu navegador não suporta o elemento de vídeo.
                                </video>
                                <p className="mt-2">{post.caption}</p>
                              </>
                            )}
                            <PostActions>
                              <ActionButton theme={theme}>
                                <FontAwesomeIcon icon={faHeart} /> {post.likes}
                              </ActionButton>
                              <ActionButton theme={theme}>
                                <FontAwesomeIcon icon={faComment} /> {post.comments}
                              </ActionButton>
                              <ActionButton theme={theme}>
                                <FontAwesomeIcon icon={faShare} /> {post.shares}
                              </ActionButton>
                            </PostActions>
                            <CommentSection>
                              {comments.map(comment => (
                                <Comment key={comment.id}>
                                  <CommentAuthor>
                                    <Image src={comment.avatar} roundedCircle width="30" height="30" className="me-2" />
                                    {comment.author}
                                  </CommentAuthor>
                                  <p>{comment.content}</p>
                                  <div>
                                    <ActionButton theme={theme}>
                                      <FontAwesomeIcon icon={faThumbsUp} /> {comment.likes}
                                    </ActionButton>
                                    <ActionButton theme={theme}>
                                      <FontAwesomeIcon icon={faReply} /> Responder
                                    </ActionButton>
                                  </div>
                                </Comment>
                              ))}
                            </CommentSection>
                          </Card.Body>
                        </PostCard>
                      ))}
                      {visiblePosts < posts.length && (
                        <div className="text-center mt-3">
                          <StyledButton onClick={loadMorePosts} theme={theme}>
                            <FontAwesomeIcon icon={faChevronDown} className="me-2" />
                            Carregar mais
                          </StyledButton>
                        </div>
                      )}
                    </FeedContainer>
                  </Tab.Pane>
                  <Tab.Pane eventKey="photos">
                    <FeedContainer>
                      <Row>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                          <Col md={4} key={num} className="mb-4">
                            <Image src={`https://picsum.photos/400/400?random=${num}`} fluid rounded />
                          </Col>
                        ))}
                      </Row>
                    </FeedContainer>
                  </Tab.Pane>
                  <Tab.Pane eventKey="videos">
                    <FeedContainer>
                      <Row>
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <Col md={6} key={num} className="mb-4">
                            <video width="100%" controls poster={`https://picsum.photos/400/225?random=${num}`}>
                              <source src={`https://www.example.com/video${num}.mp4`} type="video/mp4" />
                              Seu navegador não suporta o elemento de vídeo.
                            </video>
                            <p className="mt-2">Vídeo demonstrativo {num}</p>
                          </Col>
                        ))}
                      </Row>
                    </FeedContainer>
                  </Tab.Pane>
                  <Tab.Pane eventKey="followers">
                    <FeedContainer>
                      <Row>
                        {followers.map(follower => (
                          <Col md={6} lg={4} key={follower.id} className="mb-4">
                            <FollowerItem>
                              <FollowerAvatar src={follower.avatar} alt={follower.name} />
                              <div>
                                <h5>{follower.name}</h5>
                                <p className="text-muted">{follower.role}</p>
                                <StyledButton size="sm" theme={theme}>
                                  <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                                  Seguir
                                </StyledButton>
                              </div>
                            </FollowerItem>
                          </Col>
                        ))}
                      </Row>
                    </FeedContainer>
                  </Tab.Pane>
                  <Tab.Pane eventKey="info">
                    <FeedContainer>
                      <StyledListGroup>
                        <ListGroup.Item>
                          <InfoIcon icon={faUser} theme={theme} />
                          <strong>Administrador:</strong> {pageData.admin}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <InfoIcon icon={faCalendarAlt} theme={theme} />
                          <strong>Data de Criação:</strong> {pageData.createdAt}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <InfoIcon icon={faNewspaper} theme={theme} />
                          <strong>Última Postagem:</strong> {pageData.lastPost}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <InfoIcon icon={faEdit} theme={theme} />
                          <strong>Total de Postagens:</strong> {pageData.posts}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <InfoIcon icon={faChartLine} theme={theme} />
                          <strong>Taxa de Engajamento:</strong> {pageData.engagement}
                        </ListGroup.Item>
                      </StyledListGroup>
                    </FeedContainer>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </StyledCard>

          <StyledCard>
            <Card.Body>
              <h3>Envie uma mensagem para os seguidores</h3>
              <Form onSubmit={handleMessageSubmit}>
                <InputGroup>
                  <Form.Control
                    as="textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Digite sua mensagem aqui..."
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', border: 'none' }}
                  />
                  <StyledButton type="submit" theme={theme}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </StyledButton>
                </InputGroup>
              </Form>
            </Card.Body>
          </StyledCard>
        </Container>
      </GradientBackground>

      <ChatWindow show={showChat} onHide={() => setShowChat(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chat com {pageData.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ height: '300px', overflowY: 'auto', marginBottom: '20px' }}>
            <p>Bem-vindo ao chat! Como podemos ajudar?</p>
          </div>
          <Form onSubmit={(e) => { e.preventDefault(); }}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Digite sua mensagem..."
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#ffffff', border: 'none' }}
              />
              <StyledButton type="submit" theme={theme}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </StyledButton>
            </InputGroup>
          </Form>
        </Modal.Body>
      </ChatWindow>
    </Layout>
  );
}

export default PaginaDetalhePage;
