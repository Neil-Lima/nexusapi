import React from 'react';
import { Card, Image } from 'react-bootstrap';
import { StyledCard, FriendItem, AddButton } from '../styles/SugestoesAmizadeStyle';
import { getSugestoes } from '../utils/SugestoesAmizadeUtil';

function SugestoesAmizadeComp() {
  const sugestoes = getSugestoes();

  return (
    <StyledCard>
      <Card.Body>
        <Card.Title>Sugestões de Amizade</Card.Title>
        {sugestoes.map((sugestao) => (
          <FriendItem key={sugestao.id}>
            <Image src={sugestao.image} roundedCircle width={50} height={50} />
            <div>
              <h6>{sugestao.name}</h6>
              <AddButton>Adicionar</AddButton>
            </div>
          </FriendItem>
        ))}
      </Card.Body>
    </StyledCard>
  );
}

export default SugestoesAmizadeComp;
