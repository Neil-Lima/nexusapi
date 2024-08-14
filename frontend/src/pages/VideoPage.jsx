import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Button, Form, InputGroup, ListGroup, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faExpand, faThumbsUp, faShare, faBookmark, faComment, faEye, faClock, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useTheme } from '../context/ContextTheme';
import { motion } from 'framer-motion';

const GradientBackground = styled.div`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  min-height: 100vh;
  padding: 20px 0;
`;

const StyledCard = styled(Card)`
  border-radius: 20px;
  border: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.18);
  color: #ffffff;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
`;

const StyledButton = styled(Button)`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-weight: bold;
  transition: all 0.3s ease;
  color: #ffffff;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.secondaryColor}, ${props.theme.primaryColor})`};
  }
`;

const VideoPlayer = styled.div`
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  background: #000;
  border-radius: 20px;
  overflow: hidden;
`;

const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const VideoInfo = styled.div`
  margin-top: 20px;
`;

const VideoTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 10px;
`;

const VideoDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
`;

const InteractionBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const InteractionButton = styled(StyledButton)`
  padding: 8px 15px;
  font-size: 0.9rem;
`;

const CommentSection = styled.div`
  margin-top: 30px;
`;

const CommentForm = styled(Form)`
  margin-bottom: 20px;
`;

const CommentList = styled(ListGroup)`
  .list-group-item {
    background: transparent;
    border-color: rgba(255, 255, 255, 0.1);
    color: #ffffff;
  }
`;

const RelatedVideos = styled.div`
  margin-top: 20px;
`;

const RelatedVideoItem = styled(StyledCard)`
  margin-bottom: 15px;
  cursor: pointer;
`;

const RelatedVideoTitle = styled.h6`
  font-size: 0.9rem;
  margin: 0;
`;

const LoadMoreButton = styled(StyledButton)`
  width: 100%;
  margin-top: 15px;
`;

function VideoPage() {
  const { theme } = useTheme();
  const [videoData, setVideoData] = useState(null);
  const [comments, setComments] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [visibleVideos, setVisibleVideos] = useState(5);

  useEffect(() => {
    // Simular carregamento de dados do vídeo
    setVideoData({
      id: 'dQw4w9WgXcQ',
      title: 'Vídeo Incrível',
      description: 'Este é um vídeo incrível que você precisa assistir!',
      views: 1000000,
      likes: 50000,
      uploadDate: '2023-06-15',
      creator: {
        name: 'Criador Talentoso',
        subscribers: 500000
      }
    });

    // Simular carregamento de comentários
    setComments([
      { id: 1, user: 'Usuário1', text: 'Ótimo vídeo!', date: '2023-06-16' },
      { id: 2, user: 'Usuário2', text: 'Muito informativo!', date: '2023-06-17' }
    ]);

    // Simular carregamento de vídeos relacionados
    setRelatedVideos([
      { id: 'abc123', title: 'Vídeo Relacionado 1', thumbnail: 'https://picsum.photos/120/68?random=1' },
      { id: 'def456', title: 'Vídeo Relacionado 2', thumbnail: 'https://picsum.photos/120/68?random=2' },
      { id: 'ghi789', title: 'Vídeo Relacionado 3', thumbnail: 'https://picsum.photos/120/68?random=3' },
      { id: 'jkl012', title: 'Vídeo Relacionado 4', thumbnail: 'https://picsum.photos/120/68?random=4' },
      { id: 'mno345', title: 'Vídeo Relacionado 5', thumbnail: 'https://picsum.photos/120/68?random=5' },
      { id: 'pqr678', title: 'Vídeo Relacionado 6', thumbnail: 'https://picsum.photos/120/68?random=6' },
      { id: 'stu901', title: 'Vídeo Relacionado 7', thumbnail: 'https://picsum.photos/120/68?random=7' },
      { id: 'vwx234', title: 'Vídeo Relacionado 8', thumbnail: 'https://picsum.photos/120/68?random=8' },
      { id: 'yz0567', title: 'Vídeo Relacionado 9', thumbnail: 'https://picsum.photos/120/68?random=9' },
      { id: 'abc890', title: 'Vídeo Relacionado 10', thumbnail: 'https://picsum.photos/120/68?random=10' }
    ]);
  }, []);

  const loadMoreVideos = () => {
    setVisibleVideos(prevVisible => prevVisible + 5);
  };

  if (!videoData) {
    return <div>Carregando...</div>;
  }

  return (
    <Layout>
      <GradientBackground theme={theme}>
        <Container>
          <Row>
            <Col md={8}>
              <VideoPlayer>
                <VideoIframe
                  src={`https://www.youtube.com/embed/${videoData.id}`}
                  allowFullScreen
                />
              </VideoPlayer>
              <VideoInfo>
                <VideoTitle>{videoData.title}</VideoTitle>
                <VideoDescription>{videoData.description}</VideoDescription>
                <div>
                  <FontAwesomeIcon icon={faEye} /> {videoData.views} visualizações
                  <FontAwesomeIcon icon={faClock} className="ml-3" /> Publicado em {videoData.uploadDate}
                </div>
              </VideoInfo>
              <InteractionBar>
                <InteractionButton theme={theme}>
                  <FontAwesomeIcon icon={faThumbsUp} /> {videoData.likes}
                </InteractionButton>
                <InteractionButton theme={theme}>
                  <FontAwesomeIcon icon={faShare} /> Compartilhar
                </InteractionButton>
                <InteractionButton theme={theme}>
                  <FontAwesomeIcon icon={faBookmark} /> Salvar
                </InteractionButton>
              </InteractionBar>
              <CommentSection>
                <h3>Comentários</h3>
                <CommentForm>
                  <Form.Group>
                    <Form.Control as="textarea" rows={3} placeholder="Adicione um comentário..." />
                  </Form.Group>
                  <StyledButton theme={theme} type="submit">Comentar</StyledButton>
                </CommentForm>
                <CommentList>
                  {comments.map(comment => (
                    <ListGroup.Item key={comment.id}>
                      <strong>{comment.user}</strong> - {comment.date}
                      <p>{comment.text}</p>
                    </ListGroup.Item>
                  ))}
                </CommentList>
              </CommentSection>
            </Col>
            <Col md={4}>
              <RelatedVideos>
                <h3>Vídeos Relacionados</h3>
                {relatedVideos.slice(0, visibleVideos).map(video => (
                  <RelatedVideoItem key={video.id}>
                    <Row noGutters>
                      <Col xs={4}>
                        <Card.Img src={video.thumbnail} />
                      </Col>
                      <Col xs={8}>
                        <Card.Body>
                          <RelatedVideoTitle>{video.title}</RelatedVideoTitle>
                        </Card.Body>
                      </Col>
                    </Row>
                  </RelatedVideoItem>
                ))}
                {visibleVideos < relatedVideos.length && (
                  <LoadMoreButton theme={theme} onClick={loadMoreVideos}>
                    Ver mais <FontAwesomeIcon icon={faChevronDown} />
                  </LoadMoreButton>
                )}
              </RelatedVideos>
            </Col>
          </Row>
        </Container>
      </GradientBackground>
    </Layout>
  );
}

export default VideoPage;
