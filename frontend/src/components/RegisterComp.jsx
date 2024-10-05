import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { StyledForm, StyledButton, FormGroup } from './RegisterStyle';
import { generateYears, months, generateDays } from './RegisterUtil';

function RegisterComp() {
  const years = generateYears();
  const days = generateDays();

  return (
    <Container>
      <StyledForm>
        <FormGroup>
          <Form.Label>Informações pessoais</Form.Label>
          <Form.Control placeholder="Nome" className="mb-2" />
          <Form.Control placeholder="Sobrenome" className="mb-2" />
          <Form.Control placeholder="Local" className="mb-2" />
          <Form.Control placeholder="Idade" className="mb-2" />
          <Form.Select className="mb-2">
            <option>Estado civil</option>
            <option value="solteiro">Solteiro</option>
            <option value="namorando">Namorando</option>
            <option value="casado">Casado</option>
          </Form.Select>
        </FormGroup>

        <FormGroup>
          <Form.Label>Aniversário</Form.Label>
          <Row>
            <Col>
              <Form.Select>
                <option>Dia</option>
                {days.map((dia) => (
                  <option key={dia} value={dia}>{dia}</option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select>
                <option>Mês</option>
                {months.map((mes, index) => (
                  <option key={index} value={index + 1}>{mes}</option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select>
                <option>Ano</option>
                {years.map((ano) => (
                  <option key={ano} value={ano}>{ano}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </FormGroup>

        <FormGroup>
          <Form.Label>Informações de Login</Form.Label>
          <Form.Control type="email" placeholder="Email" className="mb-2" />
          <Form.Control type="password" placeholder="Senha" className="mb-2" />
        </FormGroup>

        <StyledButton variant="primary" type="submit">
          Cadastrar
        </StyledButton>
      </StyledForm>
    </Container>
  );
}

export default RegisterComp;
