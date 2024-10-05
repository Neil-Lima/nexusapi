import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Form, InputGroup, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faCamera, faMapMarkerAlt, faPhone, faEnvelope, faGlobe, faTags } from '@fortawesome/free-solid-svg-icons';
import { GradientBackground, StyledCard, StyledButton, CoverPhotoUpload, ProfilePhotoUpload, StyledForm, PreviewCard, PreviewCoverPhoto, PreviewProfilePhoto } from '../styles/CriarPaginaStyle';
import { useTheme } from '../context/ContextTheme';
import { initialState, handleInputChange, handlePhotoUpload, handleSubmit } from '../utils/CriarPaginaUtil';

function CriarPaginaPage() {
  const { theme } = useTheme();
  const [state, setState] = useState(initialState);

  return (
    <Layout>
      <GradientBackground theme={theme}>
        <Container>
          <Row>
            <Col lg={8}>
              <StyledCard>
                <Card.Body>
                  <h2 className="mb-4">Criar Nova Página</h2>
                  <StyledForm onSubmit={(e) => handleSubmit(e, state)}>
                    <Form.Group controlId="coverPhoto" className="mb-4">
                      <CoverPhotoUpload>
                        {state.coverPhoto ? (
                          <Image src={state.coverPhoto} alt="Cover" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                        ) : (
                          <FontAwesomeIcon icon={faImage} size="3x" />
                        )}
                        <Form.Control type="file" hidden onChange={(e) => handlePhotoUpload(e, 'coverPhoto', setState)} />
                      </CoverPhotoUpload>
                    </Form.Group>

                    <ProfilePhotoUpload theme={theme}>
                      {state.profilePhoto ? (
                        <Image src={state.profilePhoto} alt="Profile" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}} />
                      ) : (
                        <FontAwesomeIcon icon={faCamera} size="2x" />
                      )}
                      <Form.Control type="file" hidden onChange={(e) => handlePhotoUpload(e, 'profilePhoto', setState)} />
                    </ProfilePhotoUpload>

                    {['pageName', 'pageCategory', 'about', 'location', 'phone', 'email', 'website', 'tags'].map((field) => (
                      <Form.Group controlId={field} className="mb-3" key={field}>
                        <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                        <InputGroup>
                          {field !== 'pageName' && field !== 'pageCategory' && field !== 'about' && (
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={
                                field === 'location' ? faMapMarkerAlt :
                                field === 'phone' ? faPhone :
                                field === 'email' ? faEnvelope :
                                field === 'website' ? faGlobe :
                                faTags
                              } />
                            </InputGroup.Text>
                          )}
                          <Form.Control
                            as={field === 'about' ? 'textarea' : field === 'pageCategory' ? 'select' : 'input'}
                            type={field === 'email' ? 'email' : field === 'website' ? 'url' : 'text'}
                            value={state[field]}
                            onChange={(e) => handleInputChange(e, field, setState)}
                            placeholder={`Digite ${field === 'pageName' ? 'o nome da sua página' : field}`}
                            required={field === 'pageName' || field === 'pageCategory'}
                          >
                            {field === 'pageCategory' && (
                              <>
                                <option value="">Selecione uma categoria</option>
                                <option value="Negócio Local">Negócio Local</option>
                                <option value="Empresa">Empresa</option>
                                <option value="Marca">Marca</option>
                                <option value="Artista">Artista</option>
                                <option value="Entretenimento">Entretenimento</option>
                                <option value="Causa">Causa</option>
                                <option value="Comunidade">Comunidade</option>
                              </>
                            )}
                          </Form.Control>
                        </InputGroup>
                      </Form.Group>
                    ))}

                    <StyledButton type="submit" theme={theme}>
                      Criar Página
                    </StyledButton>
                  </StyledForm>
                </Card.Body>
              </StyledCard>
            </Col>
            <Col lg={4}>
              <StyledCard>
                <Card.Body>
                  <h4 className="mb-4">Pré-visualização</h4>
                  <PreviewCard>
                    <PreviewCoverPhoto image={state.coverPhoto} />
                    <Card.Body>
                      <PreviewProfilePhoto src={state.profilePhoto || 'https://via.placeholder.com/80'} alt="Profile" />
                      <h5 className="mt-3">{state.pageName || 'Nome da Página'}</h5>
                      <p className="text-muted">{state.pageCategory || 'Categoria'}</p>
                      <p>{state.about || 'Descrição da página'}</p>
                      {state.location && (
                        <p><FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />{state.location}</p>
                      )}
                      {state.phone && (
                        <p><FontAwesomeIcon icon={faPhone} className="me-2" />{state.phone}</p>
                      )}
                      {state.email && (
                        <p><FontAwesomeIcon icon={faEnvelope} className="me-2" />{state.email}</p>
                      )}
                      {state.website && (
                        <p><FontAwesomeIcon icon={faGlobe} className="me-2" />{state.website}</p>
                      )}
                    </Card.Body>
                  </PreviewCard>
                </Card.Body>
              </StyledCard>
            </Col>
          </Row>
        </Container>
      </GradientBackground>
    </Layout>
  );
}

export default CriarPaginaPage;
