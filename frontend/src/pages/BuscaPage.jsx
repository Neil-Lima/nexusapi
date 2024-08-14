import React, { useState } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Form, InputGroup, Button, ListGroup, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faHashtag, faImage, faVideo } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useTheme } from '../context/ContextTheme';

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

const SearchResult = styled(ListGroup.Item)`
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }
`;

const CountSpan = styled.span`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 0.8em;
`;

function BuscaPage() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('all');

  const mockResults = [
    { type: 'user', name: 'Naruto Uzumaki', image: 'https://picsum.photos/50/50?random=1' },
    { type: 'hashtag', name: '#shinobi', count: 1234 },
    { type: 'user', name: 'Sasuke Uchiha', image: 'https://picsum.photos/50/50?random=2' },
    { type: 'image', name: 'Konoha Village', image: 'https://picsum.photos/50/50?random=3' },
    { type: 'video', name: 'Ninja Techniques', duration: '5:30' },
  ];

  const filteredResults = mockResults.filter(result => 
    searchType === 'all' || result.type === searchType
  );

  return (
    <Layout>
      <GradientBackground theme={theme}>
        <Container>
          <Row>
            <Col lg={8} className="mx-auto">
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
