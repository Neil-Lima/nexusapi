import React, { useState, useRef } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Button, Form, ListGroup, Modal, InputGroup, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faClock, faUsers, faHeart, faComment, faShare, faHome, faUser, faGlobeAmericas, faBars, faPlus, faImage, faSearch } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useTheme } from '../context/ContextTheme';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

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

const EventImage = styled(Image)`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 20px 20px 0 0;
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

  .form-control, .form-select {
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    color: #ffffff;

    &:focus {
      background-color: rgba(255, 255, 255, 0.2);
      color: #ffffff;
      box-shadow: none;
    }
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container input {
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    color: #ffffff;
    width: 100%;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;

    &:focus {
      background-color: rgba(255, 255, 255, 0.2);
      color: #ffffff;
      box-shadow: none;
    }
  }
`;

function EventosPage() {
  const { theme } = useTheme();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: new Date(),
    time: '',
    location: '',
    description: '',
    image: null
  });
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Festival de Música',
      date: '2023-07-15',
      time: '18:00',
      location: 'Parque Central',
      attendees: 500,
      likes: 250,
      comments: 45,
      shares: 30,
      image: 'https://picsum.photos/800/400?random=1'
    },
    {
      id: 2,
      title: 'Exposição de Arte',
      date: '2023-07-22',
      time: '10:00',
      location: 'Galeria Municipal',
      attendees: 200,
      likes: 180,
      comments: 35,
      shares: 25,
      image: 'https://picsum.photos/800/400?random=2'
    },
    {
      id: 3,
      title: 'Maratona da Cidade',
      date: '2023-08-05',
      time: '07:00',
      location: 'Centro da Cidade',
      attendees: 1000,
      likes: 450,
      comments: 80,
      shares: 60,
      image: 'https://picsum.photos/800/400?random=3'
    }
  ]);

  const fileInputRef = useRef(null);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleCreateEvent = (event) => {
    event.preventDefault();
    const newEventWithId = { 
      ...newEvent, 
      id: events.length + 1,
      image: newEvent.image ? URL.createObjectURL(newEvent.image) : null,
      attendees: 0,
      likes: 0,
      comments: 0,
      shares: 0
    };
    setEvents([...events, newEventWithId]);
    setShowModal(false);
    setNewEvent({
      title: '',
      date: new Date(),
      time: '',
      location: '',
      description: '',
      image: null
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleDateChange = (date) => {
    setNewEvent({ ...newEvent, date });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewEvent({ ...newEvent, image: file });
  };

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
            <Form onSubmit={handleCreateEvent}>
              <Form.Group className="mb-3">
                <Form.Label>Título do Evento</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o título do evento"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Data</Form.Label>
                <DatePicker
                  selected={newEvent.date}
                  onChange={handleDateChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Imagem do Evento</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
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
