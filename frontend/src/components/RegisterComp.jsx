import React from 'react';
import {
  Container,
  Button,
  Form,
  Row,
  Col
} from 'react-bootstrap';

function RegisterComp() {
  // Gerar um array de anos de 1990 até 2023
  const anos = Array.from({ length: 2023 - 1990 + 1 }, (_, index) => 1990 + index);

  // Array de meses e dias
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const dias = Array.from({ length: 31 }, (_, index) => index + 1);

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3">
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
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Aniversário</Form.Label>
          <Row>
            <Col>
              <Form.Select>
                <option>Dia</option>
                {dias.map((dia) => (
                  <option key={dia} value={dia}>{dia}</option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select>
                <option>Mês</option>
                {meses.map((mes, index) => (
                  <option key={index} value={index + 1}>{mes}</option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select>
                <option>Ano</option>
                {anos.map((ano) => (
                  <option key={ano} value={ano}>{ano}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Informações de Login</Form.Label>
          <Form.Control type="email" placeholder="Email" className="mb-2" />
          <Form.Control type="password" placeholder="Senha" className="mb-2" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Cadastrar
        </Button>
      </Form>
    </Container>
  );
}

export default RegisterComp;
