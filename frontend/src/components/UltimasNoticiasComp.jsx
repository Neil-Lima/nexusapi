import React from 'react';
import { Card } from 'react-bootstrap';
import { StyledCard, NewsItem } from '../styles/UltimasNoticiasStyle';
import { getNoticias } from '../utils/UltimasNoticiasUtil';

function UltimasNoticiasComp({ theme }) {
  const noticias = getNoticias();

  return (
    <StyledCard>
      <Card.Body>
        <Card.Title style={{color: theme.highlightColor}}>Últimas Notícias</Card.Title>
        {noticias.map((noticia) => (
          <NewsItem key={noticia.id}>
            <h6>{noticia.title}</h6>
            <small style={{color: theme.secondaryHighlightColor}}>{noticia.time}</small>
          </NewsItem>
        ))}
      </Card.Body>
    </StyledCard>
  );
}

export default UltimasNoticiasComp;
