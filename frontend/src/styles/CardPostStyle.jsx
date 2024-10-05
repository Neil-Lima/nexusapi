import styled from 'styled-components';
import { Card, Form, Button, Image } from 'react-bootstrap';

export const CartaoEstilizado = styled(Card)`
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

export const ImagemPost = styled.img`
  width: 100%;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const BotaoAcao = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.$ativo ? props.theme.primaryColor : '#ffffff'};
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: ${props => props.theme.primaryColor};
  }
`;

export const ContagemCurtidas = styled.span`
  margin-left: 5px;
`;

export const SecaoComentarios = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const EntradaComentario = styled(Form.Control)`
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: #ffffff;
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

export const ItemComentario = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
`;

export const ImagemPerfilComentario = styled(Image)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const BotaoMostrarMais = styled(Button)`
  background: transparent;
  border: none;
  color: ${props => props.theme.primaryColor};
  padding: 5px 0;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
