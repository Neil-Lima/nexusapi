import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faGlobeAmericas, faUsers, faImage, faVideo, faSmile, faStar, faComment, faShareAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { ListGroup, Card, Image } from 'react-bootstrap';
import { StyledCard, IconWrapper, GradientText, StyledButton, StoryItem } from '../styles/HomeStyles';
import api from '../api/api';

export const initializeSession = async (setUserData, fetchPosts, navigate) => {
  try {
    const response = await api.get('/user');
    setUserData(response.data);
    fetchPosts();
  } catch (error) {
    console.error('Error initializing session:', error);
    navigate('/');
  }
};

export const fetchPosts = async (setPosts, setLoading) => {
  setLoading(true);
  try {
    const response = await api.get('/posts');
    setPosts(response.data);
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
  setLoading(false);
};

export const loadMorePosts = async (posts, setPosts, setLoading) => {
  setLoading(true);
  try {
    const lastPostId = posts[posts.length - 1].id;
    const response = await api.get(`/posts?after=${lastPostId}`);
    setPosts([...posts, ...response.data]);
  } catch (error) {
    console.error('Error loading more posts:', error);
  }
  setLoading(false);
};

export const LeftColumn = ({ theme, userData }) => (
  <>
    <StyledCard theme={theme} className="text-center">
      <Card.Img variant="top" src={userData?.coverImage || "https://via.placeholder.com/500x200"} style={{borderRadius: '20px 20px 0 0'}} />
      <Card.Body>
        <Card.Title style={{fontSize: '24px', fontWeight: 'bold'}}>
          <GradientText theme={theme}>{userData?.name || 'User Name'}</GradientText>
        </Card.Title>
        <Card.Text>
          {userData?.bio || 'User bio goes here'}
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
