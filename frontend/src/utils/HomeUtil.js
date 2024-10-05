import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faGlobeAmericas, faUsers, faImage, faVideo, faSmile, faStar, faComment, faShareAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { ListGroup, Card, Image } from 'react-bootstrap';
import { StyledCard, IconWrapper, GradientText, StyledButton, StoryItem } from '../styles/HomeStyles';

export const LeftColumn = ({ theme }) => (
  <>
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
    <ListGroup className="mb-4">
      {[
        { icon: faHome, text: 'Feed', color: theme.highlightColor },
        { icon: faUser, text: 'Conexões', color: theme.secondaryHighlightColor },
        { icon: faGlobeAmericas, text: 'Ultimas noticias', color: theme.primaryColor },
        { icon: faUsers, text: 'Grupos', color: theme.secondaryColor }
      ].map((item, index) => (
        <ListGroup.Item key={index} className="border-0 d-flex align-items-center" style={{backgroundColor: 'transparent', color: theme.textColor, padding: '15px 0'}}>
          <IconWrapper theme={theme}>
            <FontAwesomeIcon icon={item.icon} style={{fontSize: '20px', color: theme.textColor}} />
          </IconWrapper>
          <span style={{fontSize: '18px'}}>{item.text}</span>
        </ListGroup.Item>
      ))}
    </ListGroup>
  </>
);

export const RightColumn = ({ theme }) => (
  <>
    <StyledCard theme={theme}>
      <Card.Body>
        <h5 className="mb-3" style={{color: theme.highlightColor}}>Destaques</h5>
        {/* StyledCarousel component here */}
      </Card.Body>
    </StyledCard> 
    <StyledCard theme={theme}>
      <Card.Body>
        <h5 className="mb-3" style={{color: theme.highlightColor}}>Sugestões de Amizade</h5>
        {['Hashirama Senju', 'Sakura Haruno', 'Naruto Uzumaki'].map((name, index) => (
          <div key={index} className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex align-items-center">
              <Image src={`https://picsum.photos/50/50?random=${index}`} roundedCircle style={{width: '40px', height: '40px', marginRight: '10px', boxShadow: theme.boxShadow}} />
              <span>{name}</span>
            </div>
            <StyledButton size="sm" theme={theme}>Adicionar</StyledButton>
          </div>
        ))}
      </Card.Body>
    </StyledCard>
    
    <StyledCard theme={theme}>
      <Card.Body>
        <h5 className="mb-3" style={{color: theme.highlightColor}}>Últimas Notícias</h5>
        {['Nova técnica ninja descoberta', 'Torneio dos Kages anunciado', 'Mistério dos Uchihas revelado', 'Jiraiya lança novo livro'].map((news, index) => (
          <div key={index} className="mb-2">
            <h6>{news}</h6>
            <small style={{color: theme.secondaryHighlightColor}}>{4 - index}h atrás</small>
          </div>
        ))}
      </Card.Body>
    </StyledCard>
  </>
);

export const renderStories = (theme) => (
  ['Create Story', 'John', 'Jenni', 'Sagarika'].map((name, index) => (
    <StoryItem key={index} bg={`https://picsum.photos/200/300?random=${index}`} theme={theme}>
      {name === 'Create Story' ? (
        <StyledButton style={{position: 'absolute', bottom: '10px', left: '10px', right: '10px'}} theme={theme}>
          <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
          Create
        </StyledButton>
      ) : (
        <span style={{position: 'relative', zIndex: 1}}>{name}</span>
      )}
    </StoryItem>
  ))
);
