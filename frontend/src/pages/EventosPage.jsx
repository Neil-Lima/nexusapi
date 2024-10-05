import React, { useState, useRef, useEffect } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Button, Form, ListGroup, Modal, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faClock, faUsers, faHeart, faComment, faShare, faHome, faUser, faGlobeAmericas, faBars, faPlus, faImage, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ContextTheme';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { GradientBackground, StyledCard, StyledButton, IconWrapper, GradientText, SidebarWrapper, Overlay, EventImage, StyledModal } from '../styles/EventosStyle';
import { handleCreateEvent, handleInputChange, handleDateChange, handleImageUpload, toggleSidebar, initialEvents, initialNewEvent } from '../utils/EventosUtil';

function EventosPage() {
  const { theme } = useTheme();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newEvent, setNewEvent] = useState(initialNewEvent);
  const [events, setEvents] = useState(initialEvents);

  const fileInputRef = useRef(null);

  useEffect(() => {
    // Efeitos colaterais, se necessário
  }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <Overlay show={showSidebar} onClick={() => toggleSidebar(setShowSidebar)} />
            <Col lg={3}>
              <SidebarWrapper show={showSidebar}>
                <LeftColumn theme={theme} />
              </SidebarWrapper>
            </Col>
            <Col lg={9}>
              <StyledButton className="d-lg-none mb-3" onClick={() => toggleSidebar(setShowSidebar)} theme={theme}>
                <FontAwesomeIcon icon={faBars} />
              </StyledButton>
              <StyledCard>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Eventos</h2>
                    <StyledButton onClick={() => setShowModal(true)} theme={theme}>
                      <FontAwesomeIcon icon={faPlus} className="me-2" />
                      Criar Evento
                    </StyledButton>
                  </div>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Buscar eventos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                  {filteredEvents.map((event) => (
                    <StyledCard key={event.id}>
                      <EventImage src={event.image} alt={event.title} />
                      <Card.Body>
                        <h4>{event.title}</h4>
                        <div className="mb-3">
                          <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                          {event.date}
                          <FontAwesomeIcon icon={faClock} className="ms-3 me-2" />
                          {event.time}
                        </div>
                        <div className="mb-3">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                          {event.location}
                        </div>
                        <div className="mb-3">
                          <FontAwesomeIcon icon={faUsers} className="me-2" />
                          {event.attendees} participantes
                        </div>
                        <div className="d-flex justify-content-between">
                          <StyledButton theme={theme}>Participar</StyledButton>
                          <div>
                            <Button variant="link" className="text-white">
                              <FontAwesomeIcon icon={faHeart} /> {event.likes}
                            </Button>
                            <Button variant="link" className="text-white">
                              <FontAwesomeIcon icon={faComment} /> {event.comments}
                            </Button>
                            <Button variant="link" className="text-white">
                              <FontAwesomeIcon icon={faShare} /> {event.shares}
                            </Button>
                          </div>
                        </div>
                      </Card.Body>
                    </StyledCard>
                  ))}
                </Card.Body>
              </StyledCard>
            </Col>
          </Row>
        </Container>

        <StyledModal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Criar Novo Evento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={(e) => handleCreateEvent(e, newEvent, events, setEvents, setShowModal, setNewEvent)}>
              <Form.Group className="mb-3">
                <Form.Label>Título do Evento</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o título do evento"
                  name="title"
                  value={newEvent.title}
                  onChange={(e) => handleInputChange(e, setNewEvent)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Data</Form.Label>
                <DatePicker
                  selected={newEvent.date}
                  onChange={(date) => handleDateChange(date, setNewEvent)}
                  dateFormat="dd/MM/yyyy"
                  className="form-control"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Hora</Form.Label>
                <Form.Control
                  type="time"
                  name="time"
                  value={newEvent.time}
                  onChange={(e) => handleInputChange(e, setNewEvent)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Local</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o local do evento"
                  name="location"
                  value={newEvent.location}
                  onChange={(e) => handleInputChange(e, setNewEvent)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Descreva o evento"
                  name="description"
                  value={newEvent.description}
                  onChange={(e) => handleInputChange(e, setNewEvent)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Imagem do Evento</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setNewEvent)}
                  ref={fileInputRef}
                  required
                />
              </Form.Group>
              <StyledButton type="submit" theme={theme}>
                Criar Evento
              </StyledButton>
            </Form>
          </Modal.Body>
        </StyledModal>
      </GradientBackground>
    </Layout>
  );
}

export default EventosPage;
