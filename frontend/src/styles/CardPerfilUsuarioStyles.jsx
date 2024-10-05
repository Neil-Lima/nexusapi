import styled from 'styled-components';
import { Card } from 'react-bootstrap';

export const StyledCard = styled(Card)`
  border-radius: ${props => props.theme.borderRadius};
  border: none;
  box-shadow: ${props => props.theme.boxShadow};
  margin-bottom: 20px;
  background: ${props => props.theme.cardBackground};
  color: ${props => props.theme.textColor};
  overflow: hidden;
`;

export const GradientText = styled.span`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`;
