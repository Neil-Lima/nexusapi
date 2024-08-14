import React, { useState } from 'react';
import { Card, Form, Button, Modal, Container, Row, Col } from 'react-bootstrap';
import { RiLoginBoxLine, RiLockPasswordLine, RiMailLine } from 'react-icons/ri';
import styled from 'styled-components';
import { useTheme } from '../context/ContextTheme';

const GradientBackground = styled.div`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  min-height: 100vh;
  padding: 20px 0;
`;

const StyledCard = styled(Card)`
  border-radius: ${props => props.theme.borderRadius};
  border: none;
  box-shadow: ${props => props.theme.boxShadow};
  margin-bottom: 20px;
  background: ${props => props.theme.cardBackground};
  color: ${props => props.theme.textColor};
  overflow: hidden;
`;

const StyledButton = styled(Button)`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-weight: bold;
  transition: ${props => props.theme.transition};
  color: white;
  &:hover {
    transform: ${props => props.theme.buttonHoverTransform};
    box-shadow: ${props => props.theme.boxShadow};
    background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.secondaryColor}, ${props.theme.primaryColor})`};
  }
`;

const GradientText = styled.span`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`;

const StyledModal = styled(Modal)`
  .modal-content {
    background: ${props => props.theme.cardBackground};
    color: ${props => props.theme.textColor};
  }
  .modal-header {
    border-bottom-color: ${props => props.theme.borderColor};
  }
  .modal-footer {
    border-top-color: ${props => props.theme.borderColor};
  }
`;

const StyledFormControl = styled(Form.Control)`
  background: ${props => props.theme.inputBackground || props.theme.cardBackground};
  color: ${props => props.theme.textColor};
  border-color: ${props => props.theme.borderColor};
  &::placeholder {
    color: ${props => props.theme.placeholderColor || 'rgba(255, 255, 255, 0.5)'};
  }
`;

const StyledFormSelect = styled(Form.Select)`
  background: ${props => props.theme.inputBackground || props.theme.cardBackground};
  color: ${props => props.theme.textColor};
  border-color: ${props => props.theme.borderColor};
`;

const StyledFormLabel = styled(Form.Label)`
  color: ${props => props.theme.textColor};
`;

const LoginPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { theme } = useTheme();

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const anos = Array.from({ length: 2023 - 1990 + 1 }, (_, index) => 1990 + index);
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const dias = Array.from({ length: 31 }, (_, index) => index + 1);

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
                <Form className="text-center">
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
              <Form>
                <Form.Group className="mb-3">
                  <StyledFormLabel theme={theme}>Informações pessoais</StyledFormLabel>
                  <StyledFormControl placeholder="Nome" className="mb-2" theme={theme} />
                  <StyledFormControl placeholder="Sobrenome" className="mb-2" theme={theme} />
                  <StyledFormControl placeholder="Local" className="mb-2" theme={theme} />
                  <StyledFormControl placeholder="Idade" className="mb-2" theme={theme} />
                  <StyledFormSelect className="mb-2" theme={theme}>
                    <option>Estado civil</option>
                    <option value="solteiro">Solteiro</option>
                    <option value="namorando">Namorando</option>
                    <option value="casado">Casado</option>
                  </StyledFormSelect>
                </Form.Group>

                <Form.Group className="mb-3">
                  <StyledFormLabel theme={theme}>Aniversário</StyledFormLabel>
                  <Row>
                    <Col>
                      <StyledFormSelect theme={theme}>
                        <option>Dia</option>
                        {dias.map((dia) => (
                          <option key={dia} value={dia}>{dia}</option>
                        ))}
                      </StyledFormSelect>
                    </Col>
                    <Col>
                      <StyledFormSelect theme={theme}>
                        <option>Mês</option>
                        {meses.map((mes, index) => (
                          <option key={index} value={index + 1}>{mes}</option>
                        ))}
                      </StyledFormSelect>
                    </Col>
                    <Col>
                      <StyledFormSelect theme={theme}>
                        <option>Ano</option>
                        {anos.map((ano) => (
                          <option key={ano} value={ano}>{ano}</option>
                        ))}
                      </StyledFormSelect>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-3">
                  <StyledFormLabel theme={theme}>Informações de Login</StyledFormLabel>
                  <StyledFormControl type="email" placeholder="Email" className="mb-2" theme={theme} />
                  <StyledFormControl type="password" placeholder="Senha" className="mb-2" theme={theme} />
                </Form.Group>

                <StyledButton variant="primary" type="submit" theme={theme}>
                  Cadastrar
                </StyledButton>
              </Form>
            </Container>
          </Modal.Body>
        </StyledModal>
      </Container>
    </GradientBackground>
  );
}

export default LoginPage;
