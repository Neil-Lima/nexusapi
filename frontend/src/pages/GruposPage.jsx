import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Button, Form, ListGroup, Modal, InputGroup, Image, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserPlus, faSearch, faHome, faUser, faGlobeAmericas, faBars, faPlus, faComments, faCalendarAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
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

const GroupImage = styled(Image)`
  width: 100%;
  height: 150px;
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
`;

const GroupMember = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

function GruposPage() {
  const { theme } = useTheme();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: 'Amantes de Anime',
      description: 'Grupo para discutir e compartilhar sobre anime e mangá',
      members: 1500,
      image: 'https://picsum.photos/800/400?random=1',
      category: 'Entretenimento'
    },
    {
      id: 2,
      name: 'Desenvolvedores React',
      description: 'Comunidade para desenvolvedores React compartilharem conhecimento',
      members: 3000,
      image: 'https://picsum.photos/800/400?random=2',
      category: 'Tecnologia'
    },
    {
      id: 3,
      name: 'Fotografia Urbana',
      description: 'Grupo para entusiastas de fotografia urbana',
      members: 800,
      image: 'https://picsum.photos/800/400?random=3',
      category: 'Arte'
    }
  ]);

  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    category: '',
    image: null
  });

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleCreateGroup = (event) => {
    event.preventDefault();
    const newGroupWithId = { 
      ...newGroup, 
      id: groups.length + 1,
      members: 1,
      image: newGroup.image ? URL.createObjectURL(newGroup.image) : 'https://picsum.photos/800/400?random=' + (groups.length + 1)
    };
    setGroups([...groups, newGroupWithId]);
    setShowModal(false);
    setNewGroup({
      name: '',
      description: '',
      category: '',
      image: null
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGroup({ ...newGroup, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewGroup({ ...newGroup, image: file });
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.category.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <h2>Grupos</h2>
                    <StyledButton onClick={() => setShowModal(true)} theme={theme}>
                      <FontAwesomeIcon icon={faPlus} className="me-2" />
                      Criar Grupo
                    </StyledButton>
                  </div>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <FontAwesomeIcon icon={faSearch} />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Buscar grupos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                  <Row>
                    {filteredGroups.map((group) => (
                      <Col md={6} key={group.id}>
                        <StyledCard>
                          <GroupImage src={group.image} alt={group.name} />
                          <Card.Body>
                            <Card.Title>{group.name}</Card.Title>
                            <Card.Text>{group.description}</Card.Text>
                            <div className="d-flex justify-content-between align-items-center">
                              <Badge bg="primary" pill>
                                <FontAwesomeIcon icon={faUsers} className="me-2" />
                                {group.members} membros
                              </Badge>
                              <Badge bg="secondary" pill>{group.category}</Badge>
                            </div>
                            <div className="mt-3">
                              <StyledButton theme={theme} size="sm" className="me-2">
                                <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                                Participar
                              </StyledButton>
                              <StyledButton theme={theme} size="sm" variant="outline-primary">
                                <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
                                Detalhes
                              </StyledButton>
                            </div>
                          </Card.Body>
                        </StyledCard>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </StyledCard>
            </Col>
          </Row>
        </Container>

        <StyledModal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Criar Novo Grupo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleCreateGroup}>
              <Form.Group className="mb-3">
                <Form.Label>Nome do Grupo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o nome do grupo"
                  name="name"
                  value={newGroup.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Descreva o grupo"
                  name="description"
                  value={newGroup.description}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Categoria</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite a categoria do grupo"
                  name="category"
                  value={newGroup.category}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Imagem do Grupo</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Form.Group>
              <StyledButton type="submit" theme={theme}>
                Criar Grupo
              </StyledButton>
            </Form>
          </Modal.Body>
        </StyledModal>
      </GradientBackground>
    </Layout>
  );
}

export default GruposPage;
