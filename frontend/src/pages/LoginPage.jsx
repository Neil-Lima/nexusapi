import React from 'react';
import { Card, Form, Button, Modal, Container, Row, Col, Image } from 'react-bootstrap';
import { RiLoginBoxLine, RiLockPasswordLine, RiMailLine, RiUserLine, RiCalendarLine, RiMapPinLine, RiImageAddLine, RiImageEditLine } from 'react-icons/ri';
import { useTheme } from '../context/ContextTheme';
import { GradientBackground, StyledCard, StyledButton, GradientText, StyledModal, StyledFormControl, StyledFormSelect, StyledFormLabel, ProfileImageWrapper, CoverImageWrapper, ImagePreviewContainer } from '../styles/LoginStyle';
import { useLoginForm, anos, meses, dias } from '../utils/LoginUtil';

function LoginPage() {
  const { theme } = useTheme();
  const {
    showModal,
    profileImage,
    coverImage,
    handleModalClose,
    handleModalShow,
    handleLoginSubmit,
    handleSignupSubmit,
    handleImageUpload,
    setProfileImage,
    setCoverImage,
    isLoading,
    error,
    showResultModal,
    setShowResultModal,
    resultModalContent
  } = useLoginForm();

  return (
    <GradientBackground theme={theme}>
      <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center">
        <Row className="w-100">
          <Col md={6} lg={4} className="mx-auto">
            <StyledCard theme={theme}>
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <RiLoginBoxLine size={50} style={{color: theme.primaryColor}} />
                  <h2 className="mt-3 font-weight-bold"><GradientText theme={theme}>Login</GradientText></h2>
                </div>
                <Form className="text-center" onSubmit={handleLoginSubmit}>
                  <Form.Group className="mb-4">
                    <div className="input-group">
                      <span className="input-group-text" style={{background: `linear-gradient(${theme.gradientDirection}, ${theme.primaryColor}, ${theme.secondaryColor})`, color: 'white'}}>
                        <RiMailLine />
                      </span>
                      <StyledFormControl type="email" name="email" placeholder="Email" className="py-2" theme={theme} />
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <div className="input-group">
                      <span className="input-group-text" style={{background: `linear-gradient(${theme.gradientDirection}, ${theme.primaryColor}, ${theme.secondaryColor})`, color: 'white'}}>
                        <RiLockPasswordLine />
                      </span>
                      <StyledFormControl type="password" name="password" placeholder="Senha" className="py-2" theme={theme} />
                    </div>
                  </Form.Group>
                  <StyledButton type="submit" className="w-100 py-2 mb-3" theme={theme}>
                    Entrar
                  </StyledButton>
                  <p className="mb-0">
                    <a href="#" style={{color: theme.highlightColor}}>Esqueceu a senha?</a>
                  </p>
                </Form>
              </Card.Body>
              <Card.Footer className="bg-transparent text-center border-0 py-3">
                <StyledButton variant="outline-primary" onClick={handleModalShow} theme={theme}>
                  Criar nova conta
                </StyledButton>
              </Card.Footer>
            </StyledCard>
          </Col>
        </Row>

        <StyledModal show={showModal} onHide={handleModalClose} size="lg" theme={theme}>
          <Modal.Header closeButton>
            <Modal.Title><GradientText theme={theme}>Cadastre-se</GradientText></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Form onSubmit={handleSignupSubmit}>
                <ImagePreviewContainer>
                  <CoverImageWrapper>
                    <Image src={coverImage || '/default_cover.jpg'} fluid />
                    <Form.Group>
                      <StyledButton as="label" htmlFor="coverImageUpload" theme={theme}>
                        <RiImageAddLine />
                      </StyledButton>
                      <Form.Control
                        id="coverImageUpload"
                        type="file"
                        onChange={(event) => handleImageUpload(event, setCoverImage)}
                        accept="image/*"
                        hidden
                      />
                    </Form.Group>
                  </CoverImageWrapper>
                  <ProfileImageWrapper>
                    <Image src={profileImage || '/default_profile.jpg'} roundedCircle />
                    <Form.Group>
                      <StyledButton as="label" htmlFor="profileImageUpload" theme={theme}>
                        <RiImageEditLine />
                      </StyledButton>
                      <Form.Control
                        id="profileImageUpload"
                        type="file"
                        onChange={(event) => handleImageUpload(event, setProfileImage)}
                        accept="image/*"
                        hidden
                      />
                    </Form.Group>
                  </ProfileImageWrapper>
                </ImagePreviewContainer>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <StyledFormLabel theme={theme}>Nome</StyledFormLabel>
                      <div className="input-group">
                        <span className="input-group-text" style={{background: `linear-gradient(${theme.gradientDirection}, ${theme.primaryColor}, ${theme.secondaryColor})`, color: 'white'}}>
                          <RiUserLine />
                        </span>
                        <StyledFormControl type="text" name="nome" placeholder="Seu nome" required theme={theme} />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <StyledFormLabel theme={theme}>Sobrenome</StyledFormLabel>
                      <div className="input-group">
                        <span className="input-group-text" style={{background: `linear-gradient(${theme.gradientDirection}, ${theme.primaryColor}, ${theme.secondaryColor})`, color: 'white'}}>
                          <RiUserLine />
                        </span>
                        <StyledFormControl type="text" name="sobrenome" placeholder="Seu sobrenome" required theme={theme} />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <StyledFormLabel theme={theme}>Email</StyledFormLabel>
                  <div className="input-group">
                    <span className="input-group-text" style={{background: `linear-gradient(${theme.gradientDirection}, ${theme.primaryColor}, ${theme.secondaryColor})`, color: 'white'}}>
                      <RiMailLine />
                    </span>
                    <StyledFormControl type="email" name="email" placeholder="Seu email" required theme={theme} />
                  </div>
                </Form.Group>
                <Form.Group className="mb-3">
                  <StyledFormLabel theme={theme}>Senha</StyledFormLabel>
                  <div className="input-group">
                    <span className="input-group-text" style={{background: `linear-gradient(${theme.gradientDirection}, ${theme.primaryColor}, ${theme.secondaryColor})`, color: 'white'}}>
                      <RiLockPasswordLine />
                    </span>
                    <StyledFormControl type="password" name="senha" placeholder="Sua senha" required theme={theme} />
                  </div>
                </Form.Group>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <StyledFormLabel theme={theme}>País</StyledFormLabel>
                      <StyledFormControl type="text" name="pais" placeholder="Seu país" required theme={theme} />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <StyledFormLabel theme={theme}>Estado</StyledFormLabel>
                      <StyledFormControl type="text" name="estado" placeholder="Seu estado" required theme={theme} />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                    <StyledFormLabel theme={theme}>Cidade</StyledFormLabel>
                      <StyledFormControl type="text" name="cidade" placeholder="Sua cidade" required theme={theme} />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <StyledFormLabel theme={theme}>Data de Nascimento</StyledFormLabel>
                  <Row>
                    <Col xs={4}>
                      <StyledFormSelect name="dia" theme={theme}>
                        <option value="">Dia</option>
                        {dias.map(dia => <option key={dia} value={dia}>{dia}</option>)}
                      </StyledFormSelect>
                    </Col>
                    <Col xs={4}>
                      <StyledFormSelect name="mes" theme={theme}>
                        <option value="">Mês</option>
                        {meses.map((mes, index) => <option key={index} value={index + 1}>{mes}</option>)}
                      </StyledFormSelect>
                    </Col>
                    <Col xs={4}>
                      <StyledFormSelect name="ano" theme={theme}>
                        <option value="">Ano</option>
                        {anos.map(ano => <option key={ano} value={ano}>{ano}</option>)}
                      </StyledFormSelect>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mb-3">
                  <StyledFormLabel theme={theme}>Gênero</StyledFormLabel>
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      label="Masculino"
                      name="genero"
                      value="masculino"
                      id="genero-masculino"
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="Feminino"
                      name="genero"
                      value="feminino"
                      id="genero-feminino"
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="Outro"
                      name="genero"
                      value="outro"
                      id="genero-outro"
                    />
                  </div>
                </Form.Group>
                <StyledButton variant="primary" type="submit" theme={theme}>
                  Cadastrar
                </StyledButton>
              </Form>
            </Container>
          </Modal.Body>
        </StyledModal>

        <Modal show={showResultModal} onHide={() => setShowResultModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{resultModalContent.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{resultModalContent.message}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowResultModal(false)}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </GradientBackground>
  );
}

export default LoginPage;
