import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Button, Form, ListGroup, Modal, InputGroup, Image, Nav, Tab, Dropdown, Badge, Accordion } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserPlus, faSearch, faHome, faUser, faGlobeAmericas, faBars, faPlus, faComments, faCalendarAlt, faInfoCircle, faImage, faVideo, faCog, faBell, faEnvelope, faThumbsUp, faShare, faEllipsisV, faEdit, faTrash, faMapMarkerAlt, faLink, faLock, faGlobe, faClock, faHeart, faPaperPlane, faSmile, faPoll, faFileAlt } from '@fortawesome/free-solid-svg-icons';
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

const GroupHeader = styled.div`
  position: relative;
  height: 300px;
  background-image: url(${props => props.coverImage});
  background-size: cover;
  background-position: center;
  border-radius: 20px 20px 0 0;
  display: flex;
  align-items: flex-end;
  padding: 20px;
`;

const GroupInfo = styled.div`
  background: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 10px;
  width: 100%;
`;

const GroupNav = styled(Nav)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0 0 20px 20px;
  padding: 10px;
  .nav-link {
    color: #ffffff;
    &:hover, &.active {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 10px;
    }
  }
`;

const Post = styled(Card)`
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 15px;
`;

const Member = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }
`;

const Event = styled(Card)`
  margin-bottom: 15px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 15px;
`;

const Discussion = styled(Card)`
  margin-bottom: 15px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 15px;
`;

const MediaItem = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
  border-radius: 10px;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Comment = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
`;

const EmojiPicker = styled.div`
  position: absolute;
  bottom: 100%;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  z-index: 1000;
`;

const Poll = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
  margin-top: 15px;
`;

const PollOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const PollBar = styled.div`
  height: 20px;
  background: ${props => `linear-gradient(to right, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  border-radius: 10px;
  margin-right: 10px;
`;

function GrupoDetalhe() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('feed');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const group = {
    id: 1,
    name: 'Amantes de Anime',
    description: 'Grupo para discutir e compartilhar sobre anime e mangá',
    members: 1500,
    coverImage: 'https://picsum.photos/1200/400?random=1',
    privacy: 'Público',
    category: 'Entretenimento',
    createdAt: '2022-01-15',
    admins: [
      { id: 1, name: 'Naruto Uzumaki', avatar: 'https://picsum.photos/50/50?random=1' },
      { id: 2, name: 'Sasuke Uchiha', avatar: 'https://picsum.photos/50/50?random=2' }
    ],
    moderators: [
      { id: 3, name: 'Sakura Haruno', avatar: 'https://picsum.photos/50/50?random=3' },
      { id: 4, name: 'Kakashi Hatake', avatar: 'https://picsum.photos/50/50?random=4' }
    ],
    members: [
      { id: 5, name: 'Hinata Hyuga', avatar: 'https://picsum.photos/50/50?random=5' },
      { id: 6, name: 'Shikamaru Nara', avatar: 'https://picsum.photos/50/50?random=6' },
      { id: 7, name: 'Ino Yamanaka', avatar: 'https://picsum.photos/50/50?random=7' },
      { id: 8, name: 'Gaara', avatar: 'https://picsum.photos/50/50?random=8' },
      { id: 9, name: 'Rock Lee', avatar: 'https://picsum.photos/50/50?random=9' },
      { id: 10, name: 'Tenten', avatar: 'https://picsum.photos/50/50?random=10' },
    ],
    posts: [
      {
        id: 1,
        author: { id: 1, name: 'Naruto Uzumaki', avatar: 'https://picsum.photos/50/50?random=1' },
        content: 'Qual é o seu anime favorito desta temporada? Estou adorando Jujutsu Kaisen!',
        image: 'https://picsum.photos/600/400?random=5',
        likes: 145,
        comments: [
          { id: 1, author: { id: 5, name: 'Hinata Hyuga', avatar: 'https://picsum.photos/50/50?random=5' }, content: 'Também estou amando Jujutsu Kaisen! A animação está incrível!' },
          { id: 2, author: { id: 6, name: 'Shikamaru Nara', avatar: 'https://picsum.photos/50/50?random=6' }, content: 'Prefiro algo mais estratégico como Death Note.' },
          { id: 3, author: { id: 7, name: 'Ino Yamanaka', avatar: 'https://picsum.photos/50/50?random=7' }, content: 'Estou assistindo My Hero Academia e está muito bom!' }
        ],
        shares: 25,
        createdAt: '2023-06-10T14:30:00Z'
      },
      {
        id: 2,
        author: { id: 2, name: 'Sasuke Uchiha', avatar: 'https://picsum.photos/50/50?random=2' },
        content: 'Alguém aqui já assistiu todos os filmes do Studio Ghibli? Qual é o seu favorito?',
        poll: {
          question: 'Qual é o seu filme favorito do Studio Ghibli?',
          options: [
            { id: 1, text: 'A Viagem de Chihiro', votes: 42 },
            { id: 2, text: 'Meu Amigo Totoro', votes: 38 },
            { id: 3, text: 'Princesa Mononoke', votes: 35 },
            { id: 4, text: 'O Castelo Animado', votes: 40 }
          ],
          totalVotes: 155
        },
        likes: 98,
        comments: [
          { id: 4, author: { id: 8, name: 'Gaara', avatar: 'https://picsum.photos/50/50?random=8' }, content: 'Meu favorito é Princesa Mononoke, a temática ambiental é muito bem trabalhada.' },
          { id: 5, author: { id: 9, name: 'Rock Lee', avatar: 'https://picsum.photos/50/50?random=9' }, content: 'Difícil escolher apenas um, mas acho que vou de A Viagem de Chihiro!' }
        ],
        shares: 15,
        createdAt: '2023-06-09T10:15:00Z'
      },
      {
        id: 3,
        author: { id: 3, name: 'Sakura Haruno', avatar: 'https://picsum.photos/50/50?random=3' },
        content: 'Pessoal, o que vocês acham de organizarmos um cosplay meetup no próximo mês?',
        likes: 210,
        comments: [
          { id: 6, author: { id: 10, name: 'Tenten', avatar: 'https://picsum.photos/50/50?random=10' }, content: 'Adorei a ideia! Podemos fazer uma competição de melhores cosplays?' },
          { id: 7, author: { id: 5, name: 'Hinata Hyuga', avatar: 'https://picsum.photos/50/50?random=5' }, content: 'Eu topo! Já sei até qual personagem vou escolher.' }
        ],
        shares: 45,
        createdAt: '2023-06-08T16:45:00Z'
      },
      {
        id: 4,
        author: { id: 4, name: 'Kakashi Hatake', avatar: 'https://picsum.photos/50/50?random=4' },
        content: 'Acabei de terminar de ler o último capítulo do mangá de One Piece. Sem spoilers, mas estou impressionado!',
        likes: 178,
        comments: [
          { id: 8, author: { id: 6, name: 'Shikamaru Nara', avatar: 'https://picsum.photos/50/50?random=6' }, content: 'Não me diga! Preciso colocar minha leitura em dia urgentemente.' },
          { id: 9, author: { id: 7, name: 'Ino Yamanaka', avatar: 'https://picsum.photos/50/50?random=7' }, content: 'One Piece sempre surpreendendo! Mal posso esperar para ler.' }
        ],
        shares: 30,
        createdAt: '2023-06-07T09:20:00Z'
      }
    ],
    events: [
      { id: 1, name: 'Maratona de Anime', date: '2023-07-15', time: '14:00', location: 'Online', description: 'Vamos assistir juntos os melhores episódios de diversos animes!', attendees: 120 },
      { id: 2, name: 'Cosplay Contest', date: '2023-08-01', time: '10:00', location: 'Centro de Convenções', description: 'Mostre seu melhor cosplay e concorra a prêmios incríveis!', attendees: 250 },
      { id: 3, name: 'Debate: O Impacto do Anime na Cultura Pop', date: '2023-07-22', time: '19:00', location: 'Auditório da Universidade', description: 'Venha discutir como o anime tem influenciado a cultura global nas últimas décadas.', attendees: 80 }
    ],
    discussions: [
      { id: 1, title: 'Teorias sobre o final de Attack on Titan', author: { id: 11, name: 'Eren Yeager', avatar: 'https://picsum.photos/50/50?random=11' }, replies: 78, lastReply: '2023-06-10T08:30:00Z' },
      { id: 2, title: 'Ranking dos melhores vilões de anime', author: { id: 12, name: 'Light Yagami', avatar: 'https://picsum.photos/50/50?random=12' }, replies: 56, lastReply: '2023-06-09T22:15:00Z' },
      { id: 3, title: 'Adaptações de mangá para anime: expectativas vs. realidade', author: { id: 13, name: 'Gon Freecss', avatar: 'https://picsum.photos/50/50?random=13' }, replies: 42, lastReply: '2023-06-08T14:45:00Z' }
    ],
    media: [
      { id: 1, type: 'image', url: 'https://picsum.photos/300/300?random=1', description: 'Cosplay grupal de Naruto' },
      { id: 2, type: 'image', url: 'https://picsum.photos/300/300?random=2', description: 'Fan art de My Hero Academia' },
      { id: 3, type: 'image', url: 'https://picsum.photos/300/300?random=3', description: 'Coleção de mangás' },
      { id: 4, type: 'image', url: 'https://picsum.photos/300/300?random=4', description: 'Poster do último filme de anime' },
      { id: 5, type: 'video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'AMV de Demon Slayer' },
      { id: 6, type: 'video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'Trailer da nova temporada de One Piece' }
    ]
  };

  const handleInvite = (event) => {
    event.preventDefault();
    // Lógica para enviar convite
    setShowInviteModal(false);
  };

  const handleLike = (postId) => {
    // Lógica para dar like no post
  };

  const handleComment = (postId, comment) => {
    // Lógica para adicionar comentário
  };

  const handleShare = (postId) => {
    // Lógica para compartilhar post
  };

  const handlePollVote = (postId, optionId) => {
    // Lógica para votar na enquete
  };

  return (
    <Layout>
      <GradientBackground theme={theme}>
        <Container>
          <StyledCard>
            <GroupHeader coverImage={group.coverImage}>
              <GroupInfo>
                <h1>{group.name}</h1>
                <p>{group.description}</p>
                <div>
                  <FontAwesomeIcon icon={faUsers} /> {group.members.length} membros
                  <span className="mx-2">•</span>
                  <FontAwesomeIcon icon={group.privacy === 'Público' ? faGlobe : faLock} /> {group.privacy}
                  <span className="mx-2">•</span>
                  <FontAwesomeIcon icon={faInfoCircle} /> {group.category}
                </div>
              </GroupInfo>
            </GroupHeader>
            <GroupNav variant="tabs" defaultActiveKey="feed" onSelect={(k) => setActiveTab(k)}>
              <Nav.Item>
                <Nav.Link eventKey="feed"><FontAwesomeIcon icon={faHome} /> Feed</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="members"><FontAwesomeIcon icon={faUsers} /> Membros</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="events"><FontAwesomeIcon icon={faCalendarAlt} /> Eventos</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="discussions"><FontAwesomeIcon icon={faComments} /> Discussões</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="media"><FontAwesomeIcon icon={faImage} /> Mídia</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="about"><FontAwesomeIcon icon={faInfoCircle} /> Sobre</Nav.Link>
              </Nav.Item>
            </GroupNav>
            <Card.Body>
              <Tab.Content>
                <Tab.Pane eventKey="feed" active={activeTab === 'feed'}>
                  <Form className="mb-4">
                    <Form.Group>
                      <Form.Control as="textarea" rows={3} placeholder="O que você está pensando?" />
                    </Form.Group>
                    <div className="d-flex justify-content-between mt-2">
                      <StyledButton theme={theme} size="sm">
                        <FontAwesomeIcon icon={faImage} /> Foto
                      </StyledButton>
                      <StyledButton theme={theme} size="sm">
                        <FontAwesomeIcon icon={faVideo} /> Vídeo
                      </StyledButton>
                      <StyledButton theme={theme} size="sm">
                        <FontAwesomeIcon icon={faPoll} /> Enquete
                      </StyledButton>
                      <StyledButton theme={theme}>Publicar</StyledButton>
                    </div>
                  </Form>
                  {group.posts.map(post => (
                    <Post key={post.id}>
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div className="d-flex align-items-center">
                            <Image src={post.author.avatar} roundedCircle width={40} height={40} className="mr-2" />
                            <div>
                              <h5 className="mb-0">{post.author.name}</h5>
                              <small><FontAwesomeIcon icon={faClock} /> {new Date(post.createdAt).toLocaleString()}</small>
                            </div>
                          </div>
                          <Dropdown>
                            <Dropdown.Toggle variant="link" id={`dropdown-post-${post.id}`}>
                              <FontAwesomeIcon icon={faEllipsisV} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#"><FontAwesomeIcon icon={faEdit} /> Editar</Dropdown.Item>
                              <Dropdown.Item href="#"><FontAwesomeIcon icon={faTrash} /> Excluir</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        <p>{post.content}</p>
                        {post.image && <Image src={post.image} fluid className="mb-3 rounded" />}
                        {post.poll && (
                          <Poll>
                            <h6>{post.poll.question}</h6>
                            {post.poll.options.map(option => (
                              <PollOption key={option.id}>
                                <PollBar 
                                  theme={theme}
                                  style={{width: `${(option.votes / post.poll.totalVotes) * 100}%`}}
                                />
                                <span>{option.text} ({Math.round((option.votes / post.poll.totalVotes) * 100)}%)</span>
                              </PollOption>
                            ))}
                            <small>{post.poll.totalVotes} votos</small>
                          </Poll>
                        )}
                        <div className="d-flex justify-content-between align-items-center mt-3">
                          <div>
                            <Button variant="link" onClick={() => handleLike(post.id)}>
                              <FontAwesomeIcon icon={faThumbsUp} /> {post.likes}
                            </Button>
                            <Button variant="link">
                              <FontAwesomeIcon icon={faComments} /> {post.comments.length}
                            </Button>
                            <Button variant="link" onClick={() => handleShare(post.id)}>
                              <FontAwesomeIcon icon={faShare} /> {post.shares}
                            </Button>
                          </div>
                          <small>{post.comments.length} comentários</small>
                        </div>
                        <hr />
                        {post.comments.map(comment => (
                          <Comment key={comment.id}>
                            <div className="d-flex align-items-center mb-2">
                              <Image src={comment.author.avatar} roundedCircle width={30} height={30} className="mr-2" />
                              <div>
                                <h6 className="mb-0">{comment.author.name}</h6>
                                <small><FontAwesomeIcon icon={faClock} /> {new Date().toLocaleString()}</small>
                              </div>
                            </div>
                            <p className="mb-0">{comment.content}</p>
                          </Comment>
                        ))}
                        <Form onSubmit={(e) => {
                          e.preventDefault();
                          handleComment(post.id, e.target.comment.value);
                          e.target.comment.value = '';
                        }} className="mt-3">
                          <InputGroup>
                            <Form.Control
                              name="comment"
                              placeholder="Escreva um comentário..."
                            />
                            <Button variant="outline-secondary" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                              <FontAwesomeIcon icon={faSmile} />
                            </Button>
                            <Button variant="outline-secondary" type="submit">
                              <FontAwesomeIcon icon={faPaperPlane} />
                            </Button>
                          </InputGroup>
                          {showEmojiPicker && (
                            <EmojiPicker>
                              {/* Adicione aqui um componente de seleção de emojis */}
                            </EmojiPicker>
                          )}
                        </Form>
                      </Card.Body>
                    </Post>
                  ))}
                </Tab.Pane>
                <Tab.Pane eventKey="members" active={activeTab === 'members'}>
                  <h4>Administradores</h4>
                  {group.admins.map((admin) => (
                    <Member key={admin.id}>
                      <Image src={admin.avatar} roundedCircle />
                      <div>
                        <h5>{admin.name}</h5>
                        <Badge bg="danger">Administrador</Badge>
                      </div>
                    </Member>
                  ))}
                  <h4 className="mt-4">Moderadores</h4>
                  {group.moderators.map((mod) => (
                    <Member key={mod.id}>
                      <Image src={mod.avatar} roundedCircle />
                      <div>
                        <h5>{mod.name}</h5>
                        <Badge bg="warning">Moderador</Badge>
                      </div>
                    </Member>
                  ))}
                  <h4 className="mt-4">Membros</h4>
                  <StyledButton theme={theme} className="mb-3" onClick={() => setShowInviteModal(true)}>
                    <FontAwesomeIcon icon={faUserPlus} /> Convidar Membros
                  </StyledButton>
                  <Row>
                    {group.members.map((member) => (
                      <Col key={member.id} xs={6} md={4} lg={3} className="mb-3">
                        <Member>
                          <Image src={member.avatar} roundedCircle />
                          <div>
                            <h6>{member.name}</h6>
                          </div>
                        </Member>
                      </Col>
                    ))}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="events" active={activeTab === 'events'}>
                  <StyledButton theme={theme} className="mb-3">
                    <FontAwesomeIcon icon={faPlus} /> Criar Evento
                  </StyledButton>
                  {group.events.map(event => (
                    <Event key={event.id}>
                      <Card.Body>
                        <h5>{event.name}</h5>
                        <p><FontAwesomeIcon icon={faCalendarAlt} /> {event.date} às {event.time}</p>
                        <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {event.location}</p>
                        <p>{event.description}</p>
                        <p><FontAwesomeIcon icon={faUsers} /> {event.attendees} participantes</p>
                        <StyledButton theme={theme} size="sm">Participar</StyledButton>
                      </Card.Body>
                    </Event>
                  ))}
                </Tab.Pane>
                <Tab.Pane eventKey="discussions" active={activeTab === 'discussions'}>
                  <StyledButton theme={theme} className="mb-3">
                    <FontAwesomeIcon icon={faPlus} /> Nova Discussão
                  </StyledButton>
                  {group.discussions.map(discussion => (
                    <Discussion key={discussion.id}>
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                          <h5>{discussion.title}</h5>
                          <Badge bg="primary" pill>{discussion.replies} respostas</Badge>
                        </div>
                        <div className="d-flex align-items-center mt-2">
                          <Image src={discussion.author.avatar} roundedCircle width={30} height={30} className="mr-2" />
                          <span>{discussion.author.name}</span>
                          <span className="mx-2">•</span>
                          <small><FontAwesomeIcon icon={faClock} /> Última resposta: {new Date(discussion.lastReply).toLocaleString()}</small>
                        </div>
                        <StyledButton theme={theme} size="sm" className="mt-3">Ver Discussão</StyledButton>
                      </Card.Body>
                    </Discussion>
                  ))}
                </Tab.Pane>
                <Tab.Pane eventKey="media" active={activeTab === 'media'}>
                  <Row>
                    {group.media.map(item => (
                      <Col xs={6} md={4} lg={3} key={item.id}>
                        <MediaItem>
                          {item.type === 'image' ? (
                            <img src={item.url} alt={item.description} />
                          ) : (
                            <iframe
                              width="100%"
                              height="100%"
                              src={item.url}
                              title={item.description}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          )}
                        </MediaItem>
                        <small>{item.description}</small>
                      </Col>
                    ))}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="about" active={activeTab === 'about'}>
                  <h4>Sobre o Grupo</h4>
                  <p>{group.description}</p>
                  <h5>Detalhes</h5>
                  <ListGroup variant="flush">
                    <ListGroup.Item><FontAwesomeIcon icon={faUsers} /> {group.members.length} membros</ListGroup.Item>
                    <ListGroup.Item><FontAwesomeIcon icon={group.privacy === 'Público' ? faGlobe : faLock} /> {group.privacy}</ListGroup.Item>
                    <ListGroup.Item><FontAwesomeIcon icon={faInfoCircle} /> Categoria: {group.category}</ListGroup.Item>
                    <ListGroup.Item><FontAwesomeIcon icon={faCalendarAlt} /> Criado em: {new Date(group.createdAt).toLocaleDateString()}</ListGroup.Item>
                  </ListGroup>
                  <h5 className="mt-4">Administradores</h5>
                  {group.admins.map((admin) => (
                    <Member key={admin.id}>
                      <Image src={admin.avatar} roundedCircle />
                      <div>
                        <h6>{admin.name}</h6>
                        <Badge bg="danger">Administrador</Badge>
                      </div>
                    </Member>
                  ))}
                  <h5 className="mt-4">Moderadores</h5>
                  {group.moderators.map((mod) => (
                    <Member key={mod.id}>
                      <Image src={mod.avatar} roundedCircle />
                      <div>
                        <h6>{mod.name}</h6>
                        <Badge bg="warning">Moderador</Badge>
                      </div>
                    </Member>
                  ))}
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </StyledCard>
        </Container>
      </GradientBackground>

      <Modal show={showInviteModal} onHide={() => setShowInviteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Convidar Membros</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleInvite}>
            <Form.Group className="mb-3">
              <Form.Label>E-mail</Form.Label>
              <Form.Control type="email" placeholder="Digite o e-mail do convidado" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mensagem (opcional)</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Digite uma mensagem personalizada" />
            </Form.Group>
            <StyledButton theme={theme} type="submit">
              Enviar Convite
            </StyledButton>
          </Form>
        </Modal.Body>
      </Modal>
    </Layout>
  );
}

export default GrupoDetalhe;
