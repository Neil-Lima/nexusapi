import React from 'react';
import { Card, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBriefcase, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { StyledCard, PostCard, InfoItem, PhotoGrid, PhotoItem, FriendGrid, FriendItem, TestimonialCard } from '../styles/PerfilUsuarioStyle';

export const mockUser = {
  id: 1,
  name: 'Alex Johnson',
  image: 'https://picsum.photos/200/200',
  coverImage: 'https://picsum.photos/1000/350',
  bio: 'Desenvolvedor de software apaixonado por tecnologia e inovação.',
  location: 'São Francisco, CA',
  work: 'Engenheiro de Software na TechCorp',
  education: 'Ciência da Computação, Universidade de Stanford',
  presentation: 'Criando soluções tecnológicas para um mundo melhor, um código de cada vez.',
  photos: [
    'https://picsum.photos/200/200?random=1',
    'https://picsum.photos/200/200?random=2',
    'https://picsum.photos/200/200?random=3',
    'https://picsum.photos/200/200?random=4',
    'https://picsum.photos/200/200?random=5',
    'https://picsum.photos/200/200?random=6',
    'https://picsum.photos/200/200?random=7',
    'https://picsum.photos/200/200?random=8',
    'https://picsum.photos/200/200?random=9',
  ],
  mutualFriends: [
    { id: 1, name: 'Emma Watson', image: 'https://picsum.photos/50/50?random=1' },
    { id: 2, name: 'Chris Evans', image: 'https://picsum.photos/50/50?random=2' },
    { id: 3, name: 'Scarlett Johansson', image: 'https://picsum.photos/50/50?random=3' },
  ],
  posts: [
    { id: 1, content: 'Acabei de lançar meu novo projeto open-source! Confira no link abaixo.', image: 'https://picsum.photos/400/300?random=10', likes: 256, comments: 42, shares: 18 },
    { id: 2, content: 'Participando de uma conferência incrível sobre IA. A tecnologia está evoluindo rapidamente!', image: 'https://picsum.photos/400/300?random=11', likes: 189, comments: 31, shares: 12 },
  ],
  testimonials: [
    { id: 1, author: 'Emma Watson', content: 'Alex é um profissional excepcional e um amigo ainda melhor. Sempre disposto a ajudar e compartilhar conhecimento.' },
    { id: 2, author: 'Chris Evans', content: 'Trabalhar com Alex é sempre uma experiência enriquecedora. Sua paixão por tecnologia é contagiante!' },
  ]
};

export const renderContent = (activeTab, theme, user) => {
  switch (activeTab) {
    case 'posts':
      return (
        <>
          {user.posts.map((post) => (
            <PostCard key={post.id} theme={theme}>
              <Card.Body>
                <Card.Text>{post.content}</Card.Text>
                {post.image && <Image src={post.image} fluid className="mb-3" />}
                <div>
                  <small>Curtidas: {post.likes}</small> •
                  <small> Comentários: {post.comments}</small> •
                  <small> Compartilhamentos: {post.shares}</small>
                </div>
              </Card.Body>
            </PostCard>
          ))}
        </>
      );
      case 'about':
        return (
          <StyledCard theme={theme}>
            <Card.Body>
              <h4 className="mb-4">Informações Públicas</h4>
              <InfoItem theme={theme}>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <div className="info-content">
                  <div className="info-title">Localização</div>
                  <div className="info-detail">{user.location}</div>
                </div>
              </InfoItem>
              <InfoItem theme={theme}>
                <FontAwesomeIcon icon={faBriefcase} />
                <div className="info-content">
                  <div className="info-title">Trabalho</div>
                  <div className="info-detail">{user.work}</div>
                </div>
              </InfoItem>
              <InfoItem theme={theme}>
                <FontAwesomeIcon icon={faGraduationCap} />
                <div className="info-content">
                  <div className="info-title">Educação</div>
                  <div className="info-detail">{user.education}</div>
                </div>
              </InfoItem>
            </Card.Body>
          </StyledCard>
        );
      case 'friends':
        return (
          <StyledCard theme={theme}>
            <Card.Body>
              <h4 className="mb-4">Amigos em Comum ({user.mutualFriends.length})</h4>
              <FriendGrid>
                {user.mutualFriends.map(friend => (
                  <FriendItem key={friend.id}>
                    <img src={friend.image} alt={friend.name} />
                    <p>{friend.name}</p>
                  </FriendItem>
                ))}
              </FriendGrid>
            </Card.Body>
          </StyledCard>
        );
      case 'photos':
        return (
          <StyledCard theme={theme}>
            <Card.Body>
              <h4>Fotos</h4>
              <PhotoGrid>
                {user.photos.map((photo, index) => (
                  <PhotoItem key={index}>
                    <img src={photo} alt={`Foto ${index + 1}`} />
                  </PhotoItem>
                ))}
              </PhotoGrid>
            </Card.Body>
          </StyledCard>
        );
      case 'testimonials':
        return (
          <>
            {user.testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} theme={theme}>
                <Card.Body>
                  <Card.Text>{testimonial.content}</Card.Text>
                  <Card.Footer>
                    <small className="text-muted">- {testimonial.author}</small>
                  </Card.Footer>
                </Card.Body>
              </TestimonialCard>
            ))}
          </>
        );
      default:
        return null;
    }
  };
  
