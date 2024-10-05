import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Button, Form, ListGroup, Modal, InputGroup, Image, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserPlus, faSearch, faHome, faUser, faGlobeAmericas, faBars, faPlus, faComments, faCalendarAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ContextTheme';
import { GradientBackground, StyledCard, StyledButton, IconWrapper, GradientText, SidebarWrapper, Overlay, GroupImage, StyledModal, GroupMember } from '../styles/GruposStyle';
import { handleCreateGroup, handleInputChange, handleImageUpload, groups, LeftColumn } from '../utils/GruposUtil';

function GruposPage() {
  const { theme } = useTheme();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    category: '',
    image: null
  });

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.category.toLowerCase().includes(searchTerm.toLowerCase())
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
            <Form onSubmit={(e) => handleCreateGroup(e, newGroup, setNewGroup, groups, setShowModal)}>
              <Form.Group className="mb-3">
                <Form.Label>Nome do Grupo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o nome do grupo"
                  name="name"
                  value={newGroup.name}
                  onChange={(e) => handleInputChange(e, setNewGroup)}
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
                  onChange={(e) => handleInputChange(e, setNewGroup)}
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
                  onChange={(e) => handleInputChange(e, setNewGroup)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Imagem do Grupo</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setNewGroup)}
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
