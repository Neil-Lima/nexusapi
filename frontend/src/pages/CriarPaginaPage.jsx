import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, Button, Image, ListGroup, InputGroup, Dropdown, Modal, Nav, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faInfoCircle, faMapMarkerAlt, faPhone, faEnvelope, faGlobe, faPlus, faCog, faEye, faCamera, faVideo, faNewspaper, faCalendarAlt, faTags } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useTheme } from '../context/ContextTheme';

const StyledModal = styled(Modal)`
  .modal-content {
    background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
    color: #ffffff;
  }
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

const CoverPhotoUpload = styled.div`
  height: 200px;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const ProfilePhotoUpload = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: -60px auto 20px;
  border: 4px solid ${props => props.theme.primaryColor};
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const StyledForm = styled(Form)`
  .form-control, .form-select {
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;
    &:focus {
      background-color: rgba(255, 255, 255, 0.2);
      box-shadow: none;
      border-color: ${props => props.theme.primaryColor};
    }
  }
  .form-label {
    color: #ffffff;
  }
`;

const StyledNav = styled(Nav)`
  .nav-link {
    color: #ffffff;
    &:hover, &.active {
      color: ${props => props.theme.primaryColor};
    }
  }
`;

const PreviewCard = styled(Card)`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 15px;
  overflow: hidden;
`;

const PreviewCoverPhoto = styled.div`
  height: 150px;
  background-color: #333;
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
`;

const PreviewProfilePhoto = styled(Image)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #fff;
  margin-top: -40px;
  margin-left: 20px;
`;

function CriarPaginaPage({ show, handleClose }) {
  const { theme } = useTheme();
  const [pageName, setPageName] = useState('');
  const [pageCategory, setPageCategory] = useState('');
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [about, setAbout] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [tags, setTags] = useState('');

  const handleCoverPhotoUpload = (event) => {
    const file = event.target.files[0];
    setCoverPhoto(URL.createObjectURL(file));
  };

  const handleProfilePhotoUpload = (event) => {
    const file = event.target.files[0];
    setProfilePhoto(URL.createObjectURL(file));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implementar lógica para salvar os dados da página
    console.log('Página criada:', { pageName, pageCategory, about, location, phone, email, website, tags });
    handleClose();
  };

  return (
    <StyledModal show={show} onHide={handleClose} size="xl" centered theme={theme}>
      <Modal.Header closeButton>
        <Modal.Title>Criar Nova Página</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col lg={8}>
            <StyledForm onSubmit={handleSubmit}>
              <Form.Group controlId="coverPhoto" className="mb-4">
                <CoverPhotoUpload>
                  {coverPhoto ? (
                    <Image src={coverPhoto} alt="Cover" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                  ) : (
                    <FontAwesomeIcon icon={faImage} size="3x" />
                  )}
                  <Form.Control type="file" hidden onChange={handleCoverPhotoUpload} />
                </CoverPhotoUpload>
              </Form.Group>

              <ProfilePhotoUpload theme={theme}>
                {profilePhoto ? (
                  <Image src={profilePhoto} alt="Profile" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}} />
                ) : (
                  <FontAwesomeIcon icon={faCamera} size="2x" />
                )}
                <Form.Control type="file" hidden onChange={handleProfilePhotoUpload} />
              </ProfilePhotoUpload>

              <Form.Group controlId="pageName" className="mb-3">
                <Form.Label>Nome da Página</Form.Label>
                <Form.Control 
                  type="text" 
                  value={pageName}
                  onChange={(e) => setPageName(e.target.value)}
                  placeholder="Digite o nome da sua página"
                  required
                />
              </Form.Group>

              <Form.Group controlId="pageCategory" className="mb-3">
                <Form.Label>Categoria</Form.Label>
                <Form.Select 
                  value={pageCategory}
                  onChange={(e) => setPageCategory(e.target.value)}
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="Negócio Local">Negócio Local</option>
                  <option value="Empresa">Empresa</option>
                  <option value="Marca">Marca</option>
                  <option value="Artista">Artista</option>
                  <option value="Entretenimento">Entretenimento</option>
                  <option value="Causa">Causa</option>
                  <option value="Comunidade">Comunidade</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="about" className="mb-3">
                <Form.Label>Sobre</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Descreva sua página"
                />
              </Form.Group>

              <Form.Group controlId="location" className="mb-3">
                <Form.Label>Localização</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </InputGroup.Text>
                  <Form.Control 
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Endereço"
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="phone" className="mb-3">
                <Form.Label>Telefone</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faPhone} />
                  </InputGroup.Text>
                  <Form.Control 
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Número de telefone"
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputGroup.Text>
                  <Form.Control 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Endereço de email"
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="website" className="mb-3">
                <Form.Label>Website</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faGlobe} />
                  </InputGroup.Text>
                  <Form.Control 
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="URL do website"
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="tags" className="mb-3">
                <Form.Label>Tags</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faTags} />
                  </InputGroup.Text>
                  <Form.Control 
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Adicione tags separadas por vírgula"
                  />
                </InputGroup>
              </Form.Group>

              <StyledButton type="submit" theme={theme}>
                Criar Página
              </StyledButton>
            </StyledForm>
          </Col>
          <Col lg={4}>
            <StyledCard>
              <Card.Body>
                <h4 className="mb-4">Pré-visualização</h4>
                <PreviewCard>
                  <PreviewCoverPhoto image={coverPhoto} />
                  <Card.Body>
                    <PreviewProfilePhoto src={profilePhoto || 'https://via.placeholder.com/80'} alt="Profile" />
                    <h5 className="mt-3">{pageName || 'Nome da Página'}</h5>
                    <p className="text-muted">{pageCategory || 'Categoria'}</p>
                    <p>{about || 'Descrição da página'}</p>
                    <ListGroup variant="flush">
                      {location && (
                        <ListGroup.Item>
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                          {location}
                        </ListGroup.Item>
                      )}
                      {phone && (
                        <ListGroup.Item>
                          <FontAwesomeIcon icon={faPhone} className="me-2" />
                          {phone}
                        </ListGroup.Item>
                      )}
                      {email && (
                        <ListGroup.Item>
                          <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                          {email}
                        </ListGroup.Item>
                      )}
                      {website && (
                        <ListGroup.Item>
                          <FontAwesomeIcon icon={faGlobe} className="me-2" />
                          {website}
                        </ListGroup.Item>
                      )}
                    </ListGroup>
                  </Card.Body>
                </PreviewCard>
              </Card.Body>
            </StyledCard>
          </Col>
        </Row>
      </Modal.Body>
    </StyledModal>
  );
}

export default CriarPaginaPage;
