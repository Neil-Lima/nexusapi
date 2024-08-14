import React from 'react';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  border-radius: ${props => props.theme.borderRadius};
  border: none;
  box-shadow: ${props => props.theme.boxShadow};
  margin-bottom: 20px;
  background: ${props => props.theme.cardBackground};
  color: ${props => props.theme.textColor};
  overflow: hidden;
`;

const GradientText = styled.span`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`;

const CardPerfilUsuarioComp = ({ theme }) => (
  <StyledCard theme={theme} className="text-center">
    <Card.Img variant="top" src="https://3.bp.blogspot.com/-SKgOrjUtWhE/UY2-87zw1PI/AAAAAAAAAH4/oSSr-Zh-6-8/s1600/Madara+Uchiha.jpg" style={{borderRadius: '20px 20px 0 0'}} />
    <Card.Body>
      <Card.Title style={{fontSize: '24px', fontWeight: 'bold'}}>
        <GradientText theme={theme}>Madara Uchiha</GradientText>
      </Card.Title>
      <Card.Text>
        Líder do <a href="#" style={{color: theme.highlightColor}}>clã Uchiha</a>, fundador da aldeia da folha, segundo sábio dos seis caminhos.
      </Card.Text>
    </Card.Body>
  </StyledCard>
);

export default CardPerfilUsuarioComp;
