import styled from 'styled-components';
import { Card, Button } from 'react-bootstrap';

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

export const FriendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  img {
    margin-right: 15px;
  }

  h6 {
    margin-bottom: 5px;
  }
`;

export const AddButton = styled(Button)`
  background: linear-gradient(45deg, #8e2de2, #4a00e0);
  border: none;
  border-radius: 20px;
  padding: 5px 15px;
  font-size: 0.8rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;
