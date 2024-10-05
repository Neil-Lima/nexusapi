import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import MessengerWindowComp from '../components/MessengerWindowComp';
import { useTheme } from '../context/ContextTheme';
import { GradientBackground, StyledCard, StyledButton, StoryContainer, SidebarWrapper, Overlay, GradientText } from '../styles/HomeStyles';
import { LeftColumn, renderStories } from '../utils/HomeUtil';
import BotaoCarregarMaisComp from '../components/BotaoCarregarMaisComp';
import CarrosselDestaquesComp from '../components/CarrosselDestaquesComp';
import CriarPostCardComp from '../components/CriarPostCardComp';
import SugestoesAmizadeComp from '../components/SugestoesAmizadeComp';
import UltimasNoticiasComp from '../components/UltimasNoticiasComp';
import CardPostComp from '../components/CardPostComp';

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

const MainColumn = ({ theme }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      autor: 'Madara Uchiha',
      conteudo: 'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam.',
      imagem: 'https://cdn.idntimes.com/content-images/duniaku/post/20230528/madara-edo-tensei-b2b153d633d611fc7df190a436638d7d.jpg',
      curtidas: 1200,
      comentarios: 348,
      compartilhamentos: 56
    },
  ]);
  const [loading, setLoading] = useState(false);

  const loadMorePosts = () => {
    setLoading(true);
    setTimeout(() => {
      const newPosts = [
        {
          id: posts.length + 1,
          autor: 'Novo Usuário',
          conteudo: 'Conteúdo do novo post.',
          imagem: `https://picsum.photos/800/400?random=${posts.length + 1}`,
          curtidas: Math.floor(Math.random() * 1000),
          comentarios: Math.floor(Math.random() * 100),
          compartilhamentos: Math.floor(Math.random() * 50)
        },
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
            {renderStories(theme)}
          </StoryContainer>
        </Card.Body>
      </StyledCard>   

      <CriarPostCardComp theme={theme} />      

      {posts.map((post) => (
        <CardPostComp key={post.id} post={post} theme={theme} />
      ))}
      
      <BotaoCarregarMaisComp 
        onClick={loadMorePosts}
        disabled={loading}
        loading={loading}
      />
    </>
  );
};

const RightColumn = ({ theme }) => (
  <>
    <StyledCard theme={theme}>
      <Card.Body>
        <h5 className="mb-3" style={{color: theme.highlightColor}}>Destaques</h5>
        <CarrosselDestaquesComp />
      </Card.Body>
    </StyledCard>    
    <SugestoesAmizadeComp />    
    <UltimasNoticiasComp theme={theme} />
  </>
);

export default Home;
