import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Form, InputGroup, Button, ListGroup, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faHashtag, faImage, faVideo, faHome, faGlobeAmericas, faUsers, faBars } from '@fortawesome/free-solid-svg-icons';
import { GradientBackground, StyledCard, StyledButton, SearchResult, CountSpan, IconWrapper, GradientText, SidebarWrapper, Overlay } from '../styles/BuscaStyle';
import { useTheme } from '../context/ContextTheme';
import { mockResults } from '../utils/BuscaUtil';

function BuscaPage() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [showSidebar, setShowSidebar] = useState(false);

  const filteredResults = mockResults.filter(result => 
    searchType === 'all' || result.type === searchType
  );

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const LeftColumn = ({ theme }) => (
    <>
      <StyledCard className="text-center">
        <Card.Img variant="top" src="https://3.bp.blogspot.com/-SKgOrjUtWhE/UY2-87zw1PI/AAAAAAAAAH4/oSSr-Zh-6-8/s1600/Madara+Uchiha.jpg" style={{borderRadius: '20px 20px 0 0'}} />
        <Card.Body>
          <Card.Title style={{fontSize: '24px', fontWeight: 'bold'}}>
            <GradientText theme={theme}>Madara Uchiha</GradientText>
          </Card.Title>
          <Card.Text>
            Líder do <a href="#" style={{color: '#FF0080'}}>clã Uchiha</a>, fundador da aldeia da folha, segundo sábio dos seis caminhos.
          </Card.Text>
        </Card.Body>
      </StyledCard>
      <ListGroup className="mb-4">
        {[
          { icon: faHome, text: 'Feed', color: '#FF0080' },
          { icon: faUser, text: 'Conexões', color: '#7928CA' },
          { icon: faGlobeAmericas, text: 'Ultimas noticias', color: '#4a00e0' },
          { icon: faUsers, text: 'Grupos', color: '#8e2de2' }
        ].map((item, index) => (
          <ListGroup.Item key={index} className="border-0 d-flex align-items-center" style={{backgroundColor: 'transparent', color: '#ffffff', padding: '15px 0'}}>
            <IconWrapper theme={theme}>
              <FontAwesomeIcon icon={item.icon} style={{fontSize: '20px', color: '#ffffff'}} />
            </IconWrapper>
            <span style={{fontSize: '18px'}}>{item.text}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );

  return (
    <Layout>
      <GradientBackground theme={theme}>
        <Container>
          <Row>
            <Overlay show={showSidebar} onClick={toggleSidebar} />
            <Col lg={3}>
              <SidebarWrapper show={showSidebar}>
                <LeftColumn theme={theme} />
              </SidebarWrapper>
            </Col>
            <Col lg={9}>
              <StyledButton className="d-lg-none mb-3" onClick={toggleSidebar} theme={theme}>
                <FontAwesomeIcon icon={faBars} />
              </StyledButton>
              <StyledCard>
                <Card.Body>
                  <h2 className="mb-4">Busca</h2>
                  <Form>
                    <InputGroup className="mb-3">
                      <Form.Control
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{background: 'rgba(255,255,255,0.1)', color: '#ffffff', border: 'none'}}
                      />
                      <StyledButton variant="primary" theme={theme}>
                        <FontAwesomeIcon icon={faSearch} />
                      </StyledButton>
                    </InputGroup>
                    <div className="d-flex justify-content-between mb-4">
                      <StyledButton 
                        variant={searchType === 'all' ? 'primary' : 'outline-primary'} 
                        onClick={() => setSearchType('all')}
                        theme={theme}
                      >
                        Todos
                      </StyledButton>
                      <StyledButton 
                        variant={searchType === 'user' ? 'primary' : 'outline-primary'} 
                        onClick={() => setSearchType('user')}
                        theme={theme}
                      >
                        <FontAwesomeIcon icon={faUser} /> Usuários
                      </StyledButton>
                      <StyledButton 
                        variant={searchType === 'hashtag' ? 'primary' : 'outline-primary'} 
                        onClick={() => setSearchType('hashtag')}
                        theme={theme}
                      >
                        <FontAwesomeIcon icon={faHashtag} /> Hashtags
                      </StyledButton>
                      <StyledButton 
                        variant={searchType === 'image' ? 'primary' : 'outline-primary'} 
                        onClick={() => setSearchType('image')}
                        theme={theme}
                      >
                        <FontAwesomeIcon icon={faImage} /> Imagens
                      </StyledButton>
                      <StyledButton 
                        variant={searchType === 'video' ? 'primary' : 'outline-primary'} 
                        onClick={() => setSearchType('video')}
                        theme={theme}
                      >
                        <FontAwesomeIcon icon={faVideo} /> Vídeos
                      </StyledButton>
                    </div>
                  </Form>
                  <ListGroup>
                    {filteredResults.map((result, index) => (
                      <SearchResult key={index}>
                        {result.type === 'user' && (
                          <div className="d-flex align-items-center">
                            <Image src={result.image} roundedCircle style={{width: '40px', height: '40px', marginRight: '15px'}} />
                            <span>{result.name}</span>
                          </div>
                        )}
                        {result.type === 'hashtag' && (
                          <div className="d-flex justify-content-between align-items-center">
                            <span>{result.name}</span>
                            <CountSpan>{result.count} posts</CountSpan>
                          </div>
                        )}
                        {result.type === 'image' && (
                          <div className="d-flex align-items-center">
                            <Image src={result.image} style={{width: '50px', height: '50px', marginRight: '15px', objectFit: 'cover'}} />
                            <span>{result.name}</span>
                          </div>
                        )}
                        {result.type === 'video' && (
                          <div className="d-flex justify-content-between align-items-center">
                            <span>{result.name}</span>
                            <CountSpan>{result.duration}</CountSpan>
                          </div>
                        )}
                      </SearchResult>
                    ))}
                  </ListGroup>
                </Card.Body>
              </StyledCard>
            </Col>
          </Row>
        </Container>
      </GradientBackground>
    </Layout>
  );
}

export default BuscaPage;
