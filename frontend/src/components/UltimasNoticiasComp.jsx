import React from 'react';
import { Card } from 'react-bootstrap';
import { StyledCard, NewsItem } from '../styles/UltimasNoticiasStyle';

function UltimasNoticiasComp() {
  const noticias = [
    { id: 1, title: 'Notícia 1', source: 'Fonte 1' },
    { id: 2, title: 'Notícia 2', source: 'Fonte 2' },
    { id: 3, title: 'Notícia 3', source: 'Fonte 3' },
  ];

  return (
    <StyledCard>
      <Card.Body>
        <Card.Title>Últimas Notícias</Card.Title>
        {noticias.map((noticia) => (
          <NewsItem key={noticia.id}>
            <h6>{noticia.title}</h6>
            <small>{noticia.source}</small>
          </NewsItem>
        ))}
      </Card.Body>
    </StyledCard>
  );
}

export default UltimasNoticiasComp;
