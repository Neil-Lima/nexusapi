import React from 'react';
import { Card, Form, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faVideo, faHeart, faComment, faShareAlt, faMapMarkerAlt, faBriefcase, faGraduationCap, faEnvelope, faPhone, faBirthdayCake } from '@fortawesome/free-solid-svg-icons';
import { StyledCard, StyledButton, PostCard, InfoItem, ActionButton, PhotoGrid, PhotoItem, FriendGrid, FriendItem, PostImage } from '../styles/PerfilStyle';

export const initialPosts = [
  { id: 1, user: 'John Doe', userImage: 'https://picsum.photos/50/50?random=1', content: 'Just had an amazing day at the beach! 🏖️', image: 'https://picsum.photos/400/300?random=1', likes: 150, comments: 45, shares: 20 },
  { id: 2, user: 'Jane Smith', userImage: 'https://picsum.photos/50/50?random=2', content: 'Excited to start my new job tomorrow! 🎉', likes: 200, comments: 60, shares: 30 },
  { id: 3, user: 'John Doe', userImage: 'https://picsum.photos/50/50?random=1', content: 'Check out this delicious meal I cooked! 🍝', image: 'https://picsum.photos/400/300?random=3', likes: 180, comments: 55, shares: 25 },
];

export const handlePostAction = (postId, action, posts, setPosts) => {
  setPosts(posts.map(post => {
    if (post.id === postId) {
      return { ...post, [action]: post[action] + 1 };
    }
    return post;
  }));
};

export const renderContent = (activeTab, theme, posts, setPosts, showAllFriends, setShowAllFriends) => {
  switch (activeTab) {
    case 'posts':
      return (
        <>
          <StyledCard>
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Control as="textarea" rows={3} placeholder="O que você está pensando?" />
                </Form.Group>
                <div className="d-flex justify-content-between mt-2">
                  <StyledButton theme={theme} size="sm">
                    <FontAwesomeIcon icon={faImages} className="me-2" /> Foto
                  </StyledButton>
                  <StyledButton theme={theme} size="sm">
                    <FontAwesomeIcon icon={faVideo} className="me-2" /> Vídeo
                  </StyledButton>
                  <StyledButton theme={theme}>Publicar</StyledButton>
                </div>
              </Form>
            </Card.Body>
          </StyledCard>
          {posts.map((post) => (
            <PostCard key={post.id}>
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <Image src={post.userImage} roundedCircle style={{width: '40px', height: '40px', marginRight: '10px'}} />
                  <div>
                    <h6 className="mb-0">{post.user}</h6>
                    <small style={{color: '#cccccc'}}>2 horas atrás</small>
                  </div>
                </div>
                <Card.Text>{post.content}</Card.Text>
                {post.image && <PostImage src={post.image} className="mb-3 rounded" />}
                <div>
                  <ActionButton theme={theme} onClick={() => handlePostAction(post.id, 'likes', posts, setPosts)}>
                    <FontAwesomeIcon icon={faHeart} /> {post.likes}
                  </ActionButton>
                  <ActionButton theme={theme} onClick={() => handlePostAction(post.id, 'comments', posts, setPosts)}>
                    <FontAwesomeIcon icon={faComment} /> {post.comments}
                  </ActionButton>
                  <ActionButton theme={theme} onClick={() => handlePostAction(post.id, 'shares', posts, setPosts)}>
                    <FontAwesomeIcon icon={faShareAlt} /> {post.shares}
                  </ActionButton>
                </div>
              </Card.Body>
            </PostCard>
          ))}
        </>
      );
    case 'about':
      return (
        <StyledCard>
          <Card.Body>
            <h4 className="mb-4">Informações Pessoais</h4>
            <InfoItem theme={theme}>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <div className="info-content">
                <div className="info-title">Localização</div>
                <div className="info-detail">São Paulo, Brasil</div>
              </div>
            </InfoItem>
            <InfoItem theme={theme}>
              <FontAwesomeIcon icon={faBriefcase} />
              <div className="info-content">
                <div className="info-title">Profissão</div>
                <div className="info-detail">Designer Gráfico na ArtCorp</div>
              </div>
            </InfoItem>
            <InfoItem theme={theme}>
              <FontAwesomeIcon icon={faGraduationCap} />
              <div className="info-content">
                <div className="info-title">Educação</div>
                <div className="info-detail">Design Gráfico, Universidade XYZ</div>
              </div>
            </InfoItem>
            <InfoItem theme={theme}>
              <FontAwesomeIcon icon={faEnvelope} />
              <div className="info-content">
                <div className="info-title">Email</div>
                <div className="info-detail">johndoe@email.com</div>
              </div>
            </InfoItem>
            <InfoItem theme={theme}>
              <FontAwesomeIcon icon={faPhone} />
              <div className="info-content">
                <div className="info-title">Telefone</div>
                <div className="info-detail">+55 11 98765-4321</div>
              </div>
            </InfoItem>
            <InfoItem theme={theme}>
              <FontAwesomeIcon icon={faBirthdayCake} />
              <div className="info-content">
                <div className="info-title">Aniversário</div>
                <div className="info-detail">15 de março</div>
              </div>
            </InfoItem>
          </Card.Body>
        </StyledCard>
      );
    case 'friends':
      const allFriends = ['Alice Johnson', 'Bob Smith', 'Carol Williams', 'David Brown', 'Eva Davis', 'Frank Miller', 'Grace Lee', 'Henry Wilson', 'Ivy Chen', 'Jack Taylor'];
      const displayedFriends = showAllFriends ? allFriends : allFriends.slice(0, 6);
      return (
        <StyledCard>
          <Card.Body>
            <h4 className="mb-4">Amigos</h4>
            <FriendGrid>
              {displayedFriends.map((friend, index) => (
                <FriendItem key={index} theme={theme}>
                  <Image src={`https://picsum.photos/80/80?random=${index + 10}`} />
                  <div className="friend-name">{friend}</div>
                  <div className="friend-status">Online</div>
                </FriendItem>
              ))}
            </FriendGrid>
            {!showAllFriends && allFriends.length > 6 && (
              <div className="text-center mt-3">
                <StyledButton theme={theme} onClick={() => setShowAllFriends(true)}>
                  Mostrar mais
                </StyledButton>
              </div>
            )}
          </Card.Body>
        </StyledCard>
      );
    case 'photos':
      return (
        <StyledCard>
          <Card.Body>
            <h4>Fotos</h4>
            <PhotoGrid>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((photo) => (
                <PhotoItem key={photo}>
                  <img src={`https://picsum.photos/300/300?random=${photo + 20}`} alt={`Photo ${photo}`} />
                  <div className="overlay">
                    <FontAwesomeIcon icon={faImages} size="2x" color="white" />
                  </div>
                </PhotoItem>
              ))}
            </PhotoGrid>
          </Card.Body>
        </StyledCard>
      );
    case 'videos':
      return (
        <StyledCard>
          <Card.Body>
            <h4>Vídeos</h4>
            <p>Funcionalidade de vídeos em desenvolvimento.</p>
          </Card.Body>
        </StyledCard>
      );
    default:
      return null;
  }
};
