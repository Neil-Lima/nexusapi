import styled from 'styled-components';
import { Card, Form } from 'react-bootstrap';

export const StyledCard = styled(Card)`
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

export const PostImage = styled.img`
  width: 100%;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.active ? props.theme.primaryColor : '#ffffff'};
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: ${props => props.theme.primaryColor};
  }
`;

export const LikeCount = styled.span`
  margin-left: 5px;
`;

export const CommentSection = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const CommentInput = styled(Form.Control)`
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: #ffffff;
  margin-top: 10px;
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  &:focus {
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: none;
  }
`;
