import styled from 'styled-components';
import { Button } from 'react-bootstrap';

export const MessengerWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    bottom: 0;
    right: 0;
    border-radius: 10px 10px 0 0;
  }
`;

export const MessengerHeader = styled.div`
  background: linear-gradient(45deg, #8e2de2, #4a00e0);
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MessengerBody = styled.div`
  height: 300px;
  overflow-y: auto;
  padding: 10px;
`;

export const MessengerFooter = styled.div`
  padding: 10px;
  border-top: 1px solid rgba(255,255,255,0.18);
`;

export const Message = styled.div`
  background: ${props => props.sent ? 'linear-gradient(45deg, #8e2de2, #4a00e0)' : 'rgba(255,255,255,0.1)'};
  color: white;
  padding: 8px 12px;
  border-radius: 15px;
  margin-bottom: 10px;
  max-width: 80%;
  align-self: ${props => props.sent ? 'flex-end' : 'flex-start'};
`;

export const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #8e2de2, #4a00e0);
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-weight: bold;
  transition: all 0.3s ease;
  color: #ffffff;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    background: linear-gradient(45deg, #7928CA, #FF0080);
  }
`;
