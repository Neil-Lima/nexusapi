import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Button, Form, InputGroup, ListGroup, Pagination, Badge, Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faClock, faEye, faTags, faEnvelope, faBookmark, faShare, faComment, faList, faThLarge, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ContextTheme';
import { motion, AnimatePresence } from 'framer-motion';
import { GradientBackground, StyledCard, CategoryBadge, FeaturedCarousel, NewsGrid, NewsList, AuthorInfo, InteractionBar, StyledForm, StyledListGroup, StyledPagination, Sidebar, BackToTopButton, RelatedNews, StyledButton } from '../styles/NoticiasStyle';
import { simulatedNews } from '../utils/NoticiasUtil';

function NoticiasPage() {
  const { theme } = useTheme();
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(6);
  const [viewMode, setViewMode] = useState('grid');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    setNews(simulatedNews);
    setCategories([...new Set(simulatedNews.map(item => item.category))]);

    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredNews = news.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || item.category === selectedCategory)
  );

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <GradientBackground theme={theme}>
        <Container>
          <h1 className="mb-4 text-center text-white">Últimas Notícias</h1>
          
          <Row className="mb-4">
            <Col md={8}>
              <StyledForm>
                <InputGroup>
                  <Form.Control
                    placeholder="Buscar notícias..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <StyledButton variant="primary" theme={theme}>
                    <FontAwesomeIcon icon={faSearch} />
                  </StyledButton>
                </InputGroup>
              </StyledForm>
            </Col>
            <Col md={4}>
              <div className="d-flex flex-wrap justify-content-end">
                {categories.map((category, index) => (
                  <CategoryBadge
                    key={index}
                    onClick={() => setSelectedCategory(category === selectedCategory ? '' : category)}
                    theme={theme}
                  >
                    {category}
                  </CategoryBadge>
                ))}
              </div>
            </Col>
          </Row>

          <FeaturedCarousel>
            {news.slice(0, 5).map((item, index) => (
              <Carousel.Item key={item.id}>
                <img
                  className="d-block w-100"
                  src={item.image}
                  alt={item.title}
                />
                <Carousel.Caption>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </FeaturedCarousel>

          <div className="mb-3">
            <StyledButton onClick={() => setViewMode('grid')} theme={theme} className="me-2">
              <FontAwesomeIcon icon={faThLarge} />
            </StyledButton>
            <StyledButton onClick={() => setViewMode('list')} theme={theme}>
              <FontAwesomeIcon icon={faList} />
            </StyledButton>
          </div>

          {viewMode === 'grid' ? (
            <NewsGrid>
              <AnimatePresence>
                {currentNews.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <StyledCard>
                      <Card.Img variant="top" src={item.image} />
                      <Card.Body>
                        <CategoryBadge theme={theme} className="mb-2">{item.category}</CategoryBadge>
                        <Card.Title>{item.title}</Card.Title>
                        <AuthorInfo>
                          <img src={`https://i.pravatar.cc/150?u=${item.id}`} alt={item.author} />
                          <div>
                            <div className="author-name">{item.author}</div>
                            <div className="publish-date">
                              <FontAwesomeIcon icon={faClock} className="me-1" />
                              {item.date}
                            </div>
                          </div>
                        </AuthorInfo>
                        <Card.Text>{item.summary}</Card.Text>
                        <InteractionBar theme={theme}>
                          <div className="interaction-item">
                            <FontAwesomeIcon icon={faEye} />
                            <span>{item.views}</span>
                          </div>
                          <div className="interaction-item">
                            <FontAwesomeIcon icon={faComment} />
                            <span>{item.comments}</span>
                          </div>
                          <div className="interaction-item">
                            <FontAwesomeIcon icon={faShare} />
                            <span>{item.shares}</span>
                          </div>
                          <div className="interaction-item">
                            <FontAwesomeIcon icon={faBookmark} />
                          </div>
                        </InteractionBar>
                        <StyledButton className="mt-3 w-100" theme={theme}>Leia Mais</StyledButton>
                      </Card.Body>
                    </StyledCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </NewsGrid>
          ) : (
            <NewsList>
              <AnimatePresence>
                {currentNews.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <StyledCard>
                      <Row>
                        <Col md={4}>
                          <Card.Img variant="top" src={item.image} />
                        </Col>
                        <Col md={8}>
                          <Card.Body>
                            <CategoryBadge theme={theme} className="mb-2">{item.category}</CategoryBadge>
                            <Card.Title>{item.title}</Card.Title>
                            <AuthorInfo>
                              <img src={`https://i.pravatar.cc/150?u=${item.id}`} alt={item.author} />
                              <div>
                                <div className="author-name">{item.author}</div>
                                <div className="publish-date">
                                  <FontAwesomeIcon icon={faClock} className="me-1" />
                                  {item.date}
                                </div>
                              </div>
                            </AuthorInfo>
                            <Card.Text>{item.summary}</Card.Text>
                            <InteractionBar theme={theme}>
                              <div className="interaction-item">
                                <FontAwesomeIcon icon={faEye} />
                                <span>{item.views}</span>
                              </div>
                              <div className="interaction-item">
                                <FontAwesomeIcon icon={faComment} />
                                <span>{item.comments}</span>
                              </div>
                              <div className="interaction-item">
                                <FontAwesomeIcon icon={faShare} />
                                <span>{item.shares}</span>
                              </div>
                              <div className="interaction-item">
                                <FontAwesomeIcon icon={faBookmark} />
                              </div>
                            </InteractionBar>
                            <StyledButton className="mt-3 w-100" theme={theme}>Leia Mais</StyledButton>
                          </Card.Body>
                        </Col>
                      </Row>
                    </StyledCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </NewsList>
          )}

          <StyledPagination className="mt-4 justify-content-center" theme={theme}>
            {[...Array(Math.ceil(filteredNews.length / newsPerPage))].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </StyledPagination>

          <Row className="mt-5">
            <Col md={4}>
              <Sidebar>
                <StyledCard>
                  <Card.Body>
                    <h4 className="mb-3">Mais Lidas</h4>
                    <StyledListGroup variant="flush">
                      {news.slice(0, 5).map((item, index) => (
                        <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                          <div>{item.title}</div>
                          <Badge bg="primary" pill>
                            <FontAwesomeIcon icon={faEye} className="me-1" />
                            {item.views}
                          </Badge>
                        </ListGroup.Item>
                      ))}
                    </StyledListGroup>
                  </Card.Body>
                </StyledCard>
              </Sidebar>
            </Col>
            <Col md={4}>
              <Sidebar>
                <StyledCard>
                  <Card.Body>
                    <h4 className="mb-3">Tags Populares</h4>
                    <div>
                      {categories.map((tag, index) => (
                        <CategoryBadge key={index} theme={theme} className="me-2 mb-2">
                          <FontAwesomeIcon icon={faTags} className="me-1" />
                          {tag}
                        </CategoryBadge>
                      ))}
                    </div>
                  </Card.Body>
                </StyledCard>
              </Sidebar>
            </Col>
            <Col md={4}>
              <Sidebar>
                <StyledCard>
                  <Card.Body>
                    <h4 className="mb-3">Newsletter</h4>
                    <StyledForm>
                      <Form.Group className="mb-3">
                        <Form.Control type="email" placeholder="Seu e-mail" />
                      </Form.Group>
                      <StyledButton type="submit" theme={theme} className="w-100">
                        <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                        Inscrever-se
                      </StyledButton>
                    </StyledForm>
                  </Card.Body>
                </StyledCard>
              </Sidebar>
            </Col>
          </Row>

          <RelatedNews>
            <h3 className="mb-3">Notícias Relacionadas</h3>
            <Row>
              {news.slice(0, 3).map((item) => (
                <Col md={4} key={item.id}>
                  <StyledCard>
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>{item.summary.substring(0, 100)}...</Card.Text>
                      <StyledButton theme={theme}>Leia Mais</StyledButton>
                    </Card.Body>
                  </StyledCard>
                </Col>
              ))}
            </Row>
          </RelatedNews>
        </Container>
      </GradientBackground>

      {showBackToTop && (
        <BackToTopButton onClick={scrollToTop} theme={theme}>
          <FontAwesomeIcon icon={faArrowUp} />
        </BackToTopButton>
      )}
    </Layout>
  );
}

export default NoticiasPage;
