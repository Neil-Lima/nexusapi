import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Button, Form, InputGroup, ListGroup, Pagination, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faClock, faEye, faTags, faEnvelope, faBookmark, faShare, faComment, faList, faThLarge, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useTheme } from '../context/ContextTheme';
import { motion, AnimatePresence } from 'framer-motion';
import Carousel from 'react-bootstrap/Carousel';

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

const CategoryBadge = styled(Badge)`
  font-size: 0.9rem;
  padding: 8px 15px;
  margin: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

const FeaturedCarousel = styled(Carousel)`
  margin-bottom: 30px;
  .carousel-item {
    height: 400px;
  }
  img {
    object-fit: cover;
    height: 100%;
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const NewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .author-name {
    font-weight: bold;
  }

  .publish-date {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.7);
  }
`;

const InteractionBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  font-size: 0.9rem;

  .interaction-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      color: ${props => props.theme.primaryColor};
    }

    svg {
      margin-right: 5px;
    }
  }
`;

const StyledForm = styled(Form)`
  .form-control {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: #ffffff;
    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }
`;

const StyledListGroup = styled(ListGroup)`
  .list-group-item {
    background: transparent;
    border-color: rgba(255, 255, 255, 0.1);
    color: #ffffff;
  }
`;

const StyledPagination = styled(Pagination)`
  .page-item .page-link {
    background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
    border-color: transparent;
    color: #ffffff;
  }

  .page-item.active .page-link {
    background: #ffffff;
    color: ${props => props.theme.primaryColor};
  }
`;

const Sidebar = styled.div`
  position: sticky;
  top: 20px;
`;

const BackToTopButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const RelatedNews = styled.div`
  margin-top: 30px;
`;

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
    const simulatedNews = [
      {
        id: 1,
        title: "Nova tecnologia revoluciona indústria de smartphones",
        summary: "Uma inovação recente promete aumentar a duração da bateria em 300%, transformando a forma como usamos nossos dispositivos móveis.",
        image: "https://picsum.photos/800/400?random=1",
        category: "Tecnologia",
        date: "2023-06-15",
        views: 1500,
        author: "João Silva",
        comments: 45,
        shares: 120
      },
      {
        id: 2,
        title: "Descoberta arqueológica revela cidade perdida",
        summary: "Arqueólogos encontram ruínas de uma civilização antiga no deserto do Saara, lançando luz sobre uma cultura até então desconhecida.",
        image: "https://picsum.photos/800/400?random=2",
        category: "História",
        date: "2023-06-14",
        views: 2300,
        author: "Maria Santos",
        comments: 67,
        shares: 89
      },
      {
        id: 3,
        title: "Novo estudo liga dieta mediterrânea a longevidade",
        summary: "Pesquisadores confirmam benefícios da dieta para saúde e longevidade, sugerindo que pode adicionar até 10 anos à expectativa de vida.",
        image: "https://picsum.photos/800/400?random=3",
        category: "Saúde",
        date: "2023-06-13",
        views: 1800,
        author: "Carlos Oliveira",
        comments: 34,
        shares: 56
      },
      {
        id: 4,
        title: "Empresa de carros elétricos anuncia modelo revolucionário",
        summary: "Novo veículo promete autonomia de 1000 km com uma única carga, desafiando os limites da tecnologia de baterias atual.",
        image: "https://picsum.photos/800/400?random=4",
        category: "Tecnologia",
        date: "2023-06-12",
        views: 3500,
        author: "Ana Rodrigues",
        comments: 89,
        shares: 145
      },
      {
        id: 5,
        title: "Cientistas descobrem novo planeta potencialmente habitável",
        summary: "Exoplaneta a 40 anos-luz da Terra apresenta condições similares ao nosso planeta, aumentando as esperanças de vida extraterrestre.",
        image: "https://picsum.photos/800/400?random=5",
        category: "Ciência",
        date: "2023-06-11",
        views: 4200,
        author: "Pedro Almeida",
        comments: 112,
        shares: 201
      },
      {
        id: 6,
        title: "Nova lei de proteção ambiental é aprovada",
        summary: "Legislação visa reduzir emissões de carbono em 50% até 2030, estabelecendo metas ambiciosas para combater as mudanças climáticas.",
        image: "https://picsum.photos/800/400?random=6",
        category: "Política",
        date: "2023-06-10",
        views: 1200,
        author: "Luísa Ferreira",
        comments: 56,
        shares: 78
      },
      {
        id: 7,
        title: "Artista usa IA para criar obras de arte surpreendentes",
        summary: "Exposição com pinturas geradas por inteligência artificial causa polêmica no mundo da arte, questionando o papel da criatividade humana.",
        image: "https://picsum.photos/800/400?random=7",
        category: "Arte",
        date: "2023-06-09",
        views: 2800,
        author: "Rafael Costa",
        comments: 78,
        shares: 134
      },
      {
        id: 8,
        title: "Novo tratamento promete cura para diabetes tipo 1",
        summary: "Terapia celular mostra resultados promissores em testes clínicos, oferecendo esperança para milhões de pessoas afetadas pela doença.",
        image: "https://picsum.photos/800/400?random=8",
        category: "Saúde",
        date: "2023-06-08",
        views: 3100,
        author: "Camila Sousa",
        comments: 91,
        shares: 167
      },
      {
        id: 9,
        title: "Startup desenvolve tecnologia de teletransporte quântico",
        summary: "Cientistas afirmam ter realizado o primeiro teletransporte quântico bem-sucedido de partículas em escala macroscópica.",
        image: "https://picsum.photos/800/400?random=9",
        category: "Tecnologia",
        date: "2023-06-07",
        views: 5600,
        author: "Fernando Gomes",
        comments: 203,
        shares: 456
      }
    ];

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
                 
