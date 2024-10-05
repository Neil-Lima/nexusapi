import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Button, Form, ListGroup, Modal, InputGroup, Image, Nav, Tab, Dropdown, Badge, Accordion } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserPlus, faSearch, faHome, faUser, faGlobeAmericas, faBars, faPlus, faComments, faCalendarAlt, faInfoCircle, faImage, faVideo, faCog, faBell, faEnvelope, faThumbsUp, faShare, faEllipsisV, faEdit, faTrash, faMapMarkerAlt, faLink, faLock, faGlobe, faClock, faHeart, faPaperPlane, faSmile, faPoll, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ContextTheme';
import { GradientBackground, StyledCard, StyledButton, GroupHeader, GroupInfo, GroupNav, Post, Member, Event, Discussion, MediaItem, Comment, EmojiPicker, Poll, PollOption, PollBar } from '../styles/GrupoDetalheStyle';
import { handleInvite, handleLike, handleComment, handleShare, handlePollVote, group } from '../utils/GrupoDetalheUtil';

function GrupoDetalhePage() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('feed');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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

export default GrupoDetalhePage;
