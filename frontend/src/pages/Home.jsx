import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import MessengerWindowComp from '../components/MessengerWindowComp';
import { useTheme } from '../context/ContextTheme';
import { GradientBackground, StyledCard, StyledButton, StoryContainer, SidebarWrapper, Overlay } from '../styles/HomeStyles';
import { LeftColumn, RightColumn, renderStories, initializeSession, fetchPosts, loadMorePosts } from '../utils/HomeUtil';
import BotaoCarregarMaisComp from '../components/BotaoCarregarMaisComp';
import CarrosselDestaquesComp from '../components/CarrosselDestaquesComp';
import CriarPostCardComp from '../components/CriarPostCardComp';
import SugestoesAmizadeComp from '../components/SugestoesAmizadeComp';
import UltimasNoticiasComp from '../components/UltimasNoticiasComp';
import CardPostComp from '../components/CardPostComp';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [showSidebar, setShowSidebar] = useState(false);
  const { theme } = useTheme();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    initializeSession(setUserData, () => fetchPosts(setPosts, setLoading), navigate);
  }, [navigate]);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleLoadMorePosts = () => loadMorePosts(posts, setPosts, setLoading);

  return (
    <Layout>
      <GradientBackground theme={theme}>       
        <Container>
          <Row>
            <Overlay show={showSidebar} onClick={toggleSidebar} />
            <Col lg={3}>
              <SidebarWrapper show={showSidebar}>
                <LeftColumn theme={theme} userData={userData} />
              </SidebarWrapper>
            </Col>
            <Col lg={6} md={12}>
              <StyledButton className="d-lg-none mb-3" onClick={toggleSidebar} theme={theme}>
                <FontAwesomeIcon icon={faBars} />
              </StyledButton>
              <MainColumn theme={theme} posts={posts} setPosts={setPosts} userData={userData} />
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

const MainColumn = ({ theme, posts, setPosts, userData }) => {
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

      <CriarPostCardComp theme={theme} userData={userData} setPosts={setPosts} />      

      {posts.map((post) => (
        <CardPostComp key={post.id} post={post} theme={theme} />
      ))}
      
      <BotaoCarregarMaisComp 
        onClick={handleLoadMorePosts}
        disabled={loading}
        loading={loading}
      />
    </>
  );
};

export default Home;
