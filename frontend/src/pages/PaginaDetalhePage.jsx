import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Image, Tab, Nav, Form, InputGroup, ListGroup, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faShare, faUser, faEnvelope, faImage, faVideo, faNewspaper, faPaperPlane, faBell, faEdit, faEllipsisV, faThumbsUp, faReply, faInfoCircle, faChevronDown, faUserPlus, faCalendarAlt, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ContextTheme';
import {
  GradientBackground,
  StyledCard,
  StyledButton,
  CoverPhoto,
  ProfilePhoto,
  PageTitle,
  PageCategory,
  StatsContainer,
  Stat,
  StatNumber,
  StatLabel,
  StyledNav,
  PostCard,
  PostImage,
  PostActions,
  ActionButton,
  CommentSection,
  Comment,
  CommentAuthor,
  FollowerItem,
  FollowerAvatar,
  ChatWindow,
  FeedContainer,
  StyledListGroup,
  InfoIcon
} from '../styles/PaginaDetalheStyle';
import { pageData, posts, comments, followers } from '../utils/PaginaDetalheUtil';

function PaginaDetalhePage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('posts');
  const [message, setMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState(3);

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
