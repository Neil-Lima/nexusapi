import React from 'react';
import { Card } from 'react-bootstrap';
import { StyledCard, GradientText } from './CardPerfilUsuarioStyles';
import { userProfileData } from './CardPerfilUsuarioUtil';

const CardPerfilUsuarioComp = ({ theme }) => (
  <StyledCard theme={theme} className="text-center">
    <Card.Img variant="top" src={userProfileData.image} style={{borderRadius: '20px 20px 0 0'}} />
    <Card.Body>
      <Card.Title style={{fontSize: '24px', fontWeight: 'bold'}}>
        <GradientText theme={theme}>{userProfileData.name}</GradientText>
      </Card.Title>
      <Card.Text>
        {userProfileData.description.split('clã')[0]}
        <a href="#" style={{color: theme.highlightColor}}>clã Uchiha</a>
        {userProfileData.description.split('clã')[1]}
      </Card.Text>
    </Card.Body>
  </StyledCard>
);

export default CardPerfilUsuarioComp;
