import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHeart, faComment, faShare, faThLarge, faList } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ContextTheme';
import { GradientBackground, StyledCard, StyledButton, ViewToggleButton, GridView, ListView, ListCard } from '../styles/PaginasListaStyle';
import { fetchPages } from '../utils/PaginasListaUtil';

function PaginasListaPage() {
  const { theme } = useTheme();
  const [pages, setPages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    setPages(fetchPages());
  }, []);

  const filteredPages = pages.filter(page =>
    page.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const PageCard = ({ page }) => (
    <StyledCard>
      <Card.Img variant="top" src={page.coverPhoto} style={{borderRadius: '20px 20px 0 0'}} />
      <Card.Body>
        <Card.Title>{page.name}</Card.Title>
        <Card.Text>{page.description}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <FontAwesomeIcon icon={faHeart} className="me-2" />
            {page.likes}
            <FontAwesomeIcon icon={faComment} className="ms-3 me-2" />
            {page.comments}
          </div>
          <StyledButton variant="primary" theme={theme}>
            Ver Página
          </StyledButton>
        </div>
      </Card.Body>
    </StyledCard>
  );

  const ListPageCard = ({ page }) => (
    <ListCard>
      <Card.Img variant="top" src={page.coverPhoto} />
      <Card.Body>
        <Card.Title>{page.name}</Card.Title>
        <Card.Text>{page.description}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <FontAwesomeIcon icon={faHeart} className="me-2" />
            {page.likes}
            <FontAwesomeIcon icon={faComment} className="ms-3 me-2" />
            {page.comments}
          </div>
          <StyledButton variant="primary" theme={theme}>
            Ver Página
          </StyledButton>
        </div>
      </Card.Body>
    </ListCard>
  );

  return (
    <Layout>
      <GradientBackground theme={theme}>
        <Container>
          <h1 className="text-center text-white mb-4">Páginas</h1>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Form className="flex-grow-1 me-3">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Buscar páginas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <StyledButton variant="primary" theme={theme}>
                  <FontAwesomeIcon icon={faSearch} />
                </StyledButton>
              </InputGroup>
            </Form>
            <div>
              <ViewToggleButton
                active={viewMode === 'grid'}
                onClick={() => setViewMode('grid')}
                theme={theme}
              >
                <FontAwesomeIcon icon={faThLarge} />
              </ViewToggleButton>
              <ViewToggleButton
                active={viewMode === 'list'}
                onClick={() => setViewMode('list')}
                theme={theme}
              >
                <FontAwesomeIcon icon={faList} />
              </ViewToggleButton>
            </div>
          </div>
          {viewMode === 'grid' ? (
            <GridView>
              {filteredPages.map(page => (
                <PageCard key={page.id} page={page} />
              ))}
            </GridView>
          ) : (
            <ListView>
              {filteredPages.map(page => (
                <ListPageCard key={page.id} page={page} />
              ))}
            </ListView>
          )}
        </Container>
      </GradientBackground>
    </Layout>
  );
}

export default PaginasListaPage;
