import styled from 'styled-components';
import { Card, Button } from 'react-bootstrap';

export const StyledCard = styled(Card)`
  border-radius: ${props => props.theme.borderRadius};
  border: none;
  box-shadow: ${props => props.theme.boxShadow};
  margin-bottom: 20px;
  background: ${props => props.theme.cardBackground};
  color: ${props => props.theme.textColor};
  overflow: hidden;
`;

export const StyledButton = styled(Button)`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-weight: bold;
  transition: ${props => props.theme.transition};
  color: ${props => props.theme.textColor};
  &:hover {
    transform: ${props => props.theme.buttonHoverTransform};
    box-shadow: ${props => props.theme.boxShadow};
    background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.secondaryColor}, ${props.theme.primaryColor})`};
  }
`;
