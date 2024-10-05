import styled, { keyframes } from 'styled-components';
import { Card, ListGroup, Button } from 'react-bootstrap';

export const GradientBackground = styled.div`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  min-height: 100vh;
  padding: 20px 0;
`;

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
  height: calc(100vh - 100px);
`;

export const ContactList = styled(ListGroup)`
  max-height: calc(100vh - 200px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
`;

export const ContactItem = styled(ListGroup.Item)`
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover, &.active {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const MessageContainer = styled.div`
  height: calc(100vh - 280px);
  overflow-y: auto;
  padding: 20px;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
`;

export const Message = styled.div`
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 20px;
  margin-bottom: 10px;
  ${props => props.sent ? `
    background-color: ${props.theme.primaryColor};
    color: #ffffff;
    align-self: flex-end;
    border-bottom-right-radius: 0;
  ` : `
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    align-self: flex-start;
    border-bottom-left-radius: 0;
  `}
`;

export const StyledButton = styled(Button)`
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

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const MessageGroup = styled.div`
  margin-bottom: 20px;
  animation: ${fadeIn} 0.3s ease;
`;

export const DateDivider = styled.div`
  text-align: center;
  margin: 20px 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
  }
  
  span {
    background: rgba(0, 0, 0, 0.5);
    padding: 0 10px;
    position: relative;
    color: #ffffff;
  }
`;

export const StatusIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.online ? '#4CAF50' : '#9E9E9E'};
  margin-left: 10px;
`;

export const QuickReplyButton = styled(Button)`
  margin-right: 10px;
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #ffffff;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;
