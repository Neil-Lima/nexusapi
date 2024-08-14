import React from 'react';
import { Card, Image } from 'react-bootstrap';
import { StyledCard, FriendItem, AddButton } from '../styles/SugestoesAmizadeStyle';

function SugestoesAmizadeComp() {
  const sugestoes = [
    { id: 1, name: 'João Silva', image: 'https://picsum.photos/50/50?random=1' },
    { id: 2, name: 'Maria Santos', image: 'https://picsum.photos/50/50?random=2' },
    { id: 3, name: 'Pedro Oliveira', image: 'https://picsum.photos/50/50?random=3' },
  ];

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
