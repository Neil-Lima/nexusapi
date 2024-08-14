import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, ListGroup, InputGroup, FormControl, Button, Image, Popover, OverlayTrigger, Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faGlobeAmericas, faUsers, faImage, faVideo, faCalendarAlt, faSmile, faStar, faComment, faShareAlt, faPlusCircle, faBars, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import MessengerWindowComp from '../components/MessengerWindowComp';
import EmojiSelectorComp from '../components/EmojiSelectorComp';
import { useTheme } from '../context/ContextTheme';
import NavMenuComp from '../components/NavMenuComp';

const GradientBackground = styled.div`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  min-height: 100vh;
  padding: 20px 0;
`;

const StyledCard = styled(Card)`
  border-radius: ${props => props.theme.borderRadius};
  border: none;
  box-shadow: ${props => props.theme.boxShadow};
  margin-bottom: 20px;
  background: ${props => props.theme.cardBackground};
  color: ${props => props.theme.textColor};
  overflow: hidden;
`;

const StyledButton = styled(Button)`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-weight: bold;
  transition: ${props => props.theme.transition};
  color: ${props => props.theme.textColor};
  &:hover {
    transform: ${props => props.theme.buttonHoverTransform};
    box-shadow: ${props => props.theme.boxShadow};
    background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.secondaryColor}, ${props.theme.primaryColor})`};
  }
`;

const StoryContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StoryItem = styled.div`
  width: 120px;
  height: 200px;
  border-radius: ${props => props.theme.borderRadius};
  margin-right: 15px;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 15px;
  color: ${props => props.theme.textColor};
  font-weight: bold;
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.theme.boxShadow};
  transition: ${props => props.theme.transition};
  &:hover {
    transform: scale(1.05);
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
  }
`;

const IconWrapper = styled.div`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  box-shadow: ${props => props.theme.boxShadow};
`;

const GradientText = styled.span`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`;

const SidebarWrapper = styled.div`
  @media (max-width: 991px) {
    position: fixed;
    top: 0;
    left: ${props => props.show ? '0' : '-50%'};
    width: 50%;
    height: 100vh;
    background: ${props => props.theme.cardBackground};
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-right: 1px solid rgba(255,255,255,0.18);
    transition: ${props => props.theme.transition};
    z-index: 1000;
    overflow-y: auto;
    padding: 20px;
  }
`;

const Overlay = styled.div`
  @media (max-width: 991px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: ${props => props.show ? 'block' : 'none'};
    z-index: 999;
  }
`;

const StyledCarousel = styled(Carousel)`
  .carousel-item {
    height: 300px;
  }
  .carousel-caption {
    background: rgba(0, 0, 0, 0.6);
    border-radius: 10px;
    padding: 20px;
  }
`;

const HighlightCard = styled(Card)`
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  overflow: hidden;
  box-shadow: ${props => props.theme.boxShadow};
  transition: ${props => props.theme.transition};
  &:hover {
    transform: translateY(-5px);
  }
`;

const HighlightImage = styled.img`
  height: 200px;
  object-fit: cover;
`;

function Home() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { theme } = useTheme();

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <Layout>
      <GradientBackground theme={theme}>       
        <Container>
          <Row>
            <Overlay show={showSidebar} onClick={toggleSidebar} />
            <Col lg={3}>
              <SidebarWrapper show={showSidebar} theme={theme}>
                <LeftColumn theme={theme} />
              </SidebarWrapper>
            </Col>
            <Col lg={6} md={12}>
              <StyledButton className="d-lg-none mb-3" onClick={toggleSidebar} theme={theme}>
                <FontAwesomeIcon icon={faBars} />
              </StyledButton>
              <MainColumn theme={theme} />
            </Col>
            <Col lg={3} className="d-none d-lg-block">
              <RightColumn theme={theme} />
            </Col>
          </Row>
        </Container>
        <MessengerWindowComp />
      </GradientBackground>
    </Layout>
  );
}

const LeftColumn = ({ theme }) => (
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

const MainColumn = ({ theme }) => {
  const [showEmojis, setShowEmojis] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Madara Uchiha',
      content: 'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam.',
      image: 'https://cdn.idntimes.com/content-images/duniaku/post/20230528/madara-edo-tensei-b2b153d633d611fc7df190a436638d7d.jpg',
      likes: 1200,
      comments: 348,
      shares: 56
    },
    // Add more initial posts here
  ]);
  const [loading, setLoading] = useState(false);

  const handleEmojiSelect = (emoji) => {
    console.log('Emoji selecionado:', emoji.native);
    setShowEmojis(false);
  };

  const emojiPopover = (
    <Popover id="emoji-popover" style={{ maxWidth: 'none' }}>
      <Popover.Body>
        <EmojiSelectorComp onEmojiSelect={handleEmojiSelect} />
      </Popover.Body>
    </Popover>
  );

  const loadMorePosts = () => {
    setLoading(true);
    // Simular carregamento de mais posts
    setTimeout(() => {
      const newPosts = [
        {
          id: posts.length + 1,
          author: 'Novo Usuário',
          content: 'Conteúdo do novo post.',
          image: `https://picsum.photos/800/400?random=${posts.length + 1}`,
          likes: Math.floor(Math.random() * 1000),
          comments: Math.floor(Math.random() * 100),
          shares: Math.floor(Math.random() * 50)
        },
        // Add more new posts here
      ];
      setPosts([...posts, ...newPosts]);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <StyledCard theme={theme}>
        <Card.Body>
          <h5 className="mb-3" style={{color: theme.highlightColor}}>Stories</h5>
          <StoryContainer>
            {['Create Story', 'John', 'Jenni', 'Sagarika'].map((name, index) => (
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
            ))}
          </StoryContainer>
        </Card.Body>
      </StyledCard>
      
      <StyledCard theme={theme}>
        <Card.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text className="bg-transparent border-0">
              <Image src="https://3.bp.blogspot.com/-SKgOrjUtWhE/UY2-87zw1PI/AAAAAAAAAH4/oSSr-Zh-6-8/s1600/Madara+Uchiha.jpg" roundedCircle style={{width: '40px', height: '40px'}} />
            </InputGroup.Text>
            <FormControl placeholder="Compartilhe seus pensamentos" className="border-0 bg-transparent" style={{color: theme.textColor}} />
          </InputGroup>
          <div className="d-flex justify-content-between">
            <StyledButton variant="light" className="flex-grow-1 me-2" theme={theme}><FontAwesomeIcon icon={faImage} className="me-2" /> Foto</StyledButton>
            <StyledButton variant="light" className="flex-grow-1 me-2" theme={theme}><FontAwesomeIcon icon={faVideo} className="me-2" /> Video</StyledButton>
            <OverlayTrigger
              trigger="click"
              placement="top"
              overlay={emojiPopover}
              show={showEmojis}
              onToggle={() => setShowEmojis(!showEmojis)}
            >
              <StyledButton variant="light" className="flex-grow-1" theme={theme}>
                <FontAwesomeIcon icon={faSmile} className="me-2" /> Sentimento
              </StyledButton>
            </OverlayTrigger>
          </div>
        </Card.Body>
      </StyledCard>
      
      {posts.map((post, index) => (
        <StyledCard key={post.id} theme={theme}>
          <Card.Body>
            <div className="d-flex align-items-center mb-3">
              <Image src="https://3.bp.blogspot.com/-SKgOrjUtWhE/UY2-87zw1PI/AAAAAAAAAH4/oSSr-Zh-6-8/s1600/Madara+Uchiha.jpg" roundedCircle style={{width: '50px', height: '50px', marginRight: '10px'}} />
              <div>
                <h6 className="mb-0"><GradientText theme={theme}>{post.author}</GradientText></h6>
                <small style={{color: theme.highlightColor}}>2 horas atrás</small>
              </div>
            </div>
            <Card.Text>{post.content}</Card.Text>
            <Card.Img src={post.image} className="mb-3 rounded" style={{boxShadow: theme.boxShadow}} />
            <div className="d-flex justify-content-between">
              <StyledButton variant="light" theme={theme}><FontAwesomeIcon icon={faStar} className="me-1" style={{color: theme.highlightColor}} /> {post.likes}</StyledButton>
              <StyledButton variant="light" theme={theme}><FontAwesomeIcon icon={faComment} className="me-1" style={{color: theme.secondaryHighlightColor}} /> {post.comments}</StyledButton>
              <StyledButton variant="light" theme={theme}><FontAwesomeIcon icon={faShareAlt} className="me-1" style={{color: theme.primaryColor}} /> {post.shares}</StyledButton>
            </div>
          </Card.Body>
        </StyledCard>
      ))}

      <StyledButton 
        onClick={loadMorePosts} 
        disabled={loading}
        theme={theme}
        className="w-100 mb-4"
      >
        {loading ? 'Carregando...' : (
          <>
            Mostrar mais <FontAwesomeIcon icon={faChevronDown} />
          </>
        )}
      </StyledButton>
    </>
  );
};

const RightColumn = ({ theme }) => (
  <>
    <StyledCard theme={theme}>
      <Card.Body>
        <h5 className="mb-3" style={{color: theme.highlightColor}}>Destaques</h5>
        <StyledCarousel>
          {['Novo recurso lançado!', 'Evento ao vivo hoje às 19h', 'Desafio semanal: Compartilhe sua melhor foto'].map((item, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={`https://picsum.photos/800/400?random=${index}`}
                alt={`Slide ${index}`}
              />
              <Carousel.Caption>
                <h3>{item}</h3>
                <p>Clique para saber mais</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </StyledCarousel>
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

export default Home;
