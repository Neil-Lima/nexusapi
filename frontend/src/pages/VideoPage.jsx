import Layout from '../layout/Layout';
import { Container, Row, Col, Form, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faShare, faBookmark, faComment, faEye, faClock, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ContextTheme';
import { GradientBackground, StyledCard, StyledButton, VideoPlayer, VideoIframe, VideoInfo, VideoTitle, VideoDescription, InteractionBar, InteractionButton, CommentSection, CommentForm, CommentList, RelatedVideos, RelatedVideoItem, RelatedVideoTitle, LoadMoreButton, StyledTextArea, CommentCard, CommentAuthor, CommentDate, CommentText, CommentAvatar, RelatedVideoInfo, RelatedVideoDate, RelatedVideoDuration } from '../styles/VideoStyle';
import { fetchVideoData, fetchComments, fetchRelatedVideos } from '../utils/VideoUtil';

function VideoPage() {
  const { theme } = useTheme();
  const [videoData, setVideoData] = useState(null);
  const [comments, setComments] = useState([]);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [visibleVideos, setVisibleVideos] = useState(5);

  useEffect(() => {
    setVideoData(fetchVideoData());
    setComments(fetchComments());
    setRelatedVideos(fetchRelatedVideos());
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
                    <StyledTextArea
                      as="textarea"
                      rows={4}
                      cols={50}
                      placeholder="Adicione um comentário..."
                      theme={theme}
                    />
                  </Form.Group>
                  <StyledButton theme={theme} type="submit">Comentar</StyledButton>
                </CommentForm>
                <CommentList>
                  {comments.map(comment => (
                    <CommentCard key={comment.id} theme={theme}>
                      <Row>
                        <Col xs={2} md={1}>
                          <CommentAvatar src={comment.avatar} roundedCircle />
                        </Col>
                        <Col xs={10} md={11}>
                          <CommentAuthor>{comment.user}</CommentAuthor>
                          <CommentDate>{comment.date}</CommentDate>
                          <CommentText>{comment.text}</CommentText>
                        </Col>
                      </Row>
                    </CommentCard>
                  ))}
                </CommentList>
              </CommentSection>
            </Col>
            <Col md={4}>
              <RelatedVideos>
                <h3>Vídeos Relacionados</h3>
                {relatedVideos.slice(0, visibleVideos).map(video => (
                  <RelatedVideoItem key={video.id} theme={theme}>
                    <Row noGutters>
                      <Col xs={4}>
                        <Image src={video.thumbnail} fluid />
                        <RelatedVideoDuration>{video.duration}</RelatedVideoDuration>
                      </Col>
                      <Col xs={8}>
                        <RelatedVideoInfo>
                          <RelatedVideoTitle>{video.title}</RelatedVideoTitle>
                          <RelatedVideoDate>{video.uploadDate}</RelatedVideoDate>
                        </RelatedVideoInfo>
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
