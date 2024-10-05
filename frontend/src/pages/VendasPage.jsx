import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Form, InputGroup, Pagination, Modal, Carousel, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCamera, faTag, faHome, faUser, faGlobeAmericas, faUsers, faBars, faStar, faHeart, faFilter, faSortAmountDown, faAugmented, faBlockchain, faComments, faGavel, faShareAlt, faUserCheck, faRecycle, faTrendUp, faImage, faTruck, faBoxes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ContextTheme';
import { motion, AnimatePresence } from 'framer-motion';
import { GradientBackground, StyledCard, StyledButton, IconWrapper, GradientText, SidebarWrapper, Overlay, StyledSelect, StyledPagination, StyledFormControl, StyledModal, ProductCard, CategoryBadge } from '../styles/VendasStyle';
import { fetchProducts, handleEdit, handleDelete, handleAddProduct, paginate, scrollToTop, LeftColumn } from '../utils/VendasUtil';

function VendasPage() {
  const { theme } = useTheme();
  const [showSidebar, setShowSidebar] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    condition: '',
    category: '',
    images: []
  });
  const productsPerPage = 9;

  useEffect(() => {
    const fetchedProducts = fetchProducts();
    setProducts(fetchedProducts);
    setFilteredProducts(fetchedProducts);
  }, []);

  useEffect(() => {
    let result = products;

    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category) {
      result = result.filter(product => product.category === category);
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [products, searchTerm, category, sortBy]);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

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
                <h2 className="mb-4">Meus Anúncios</h2>
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                  <Form className="w-100 w-md-50 mb-3 mb-md-0">
                    <InputGroup>
                      <StyledFormControl
                        placeholder="Buscar produtos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <StyledButton variant="primary" theme={theme}>
                        <FontAwesomeIcon icon={faSearch} />
                      </StyledButton>
                    </InputGroup>
                  </Form>
                  <StyledButton onClick={() => setShowAddModal(true)} theme={theme} style={{marginTop:'20px'}}>
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Novo Anúncio
                  </StyledButton>
                </div>
                <div className="d-flex flex-wrap justify-content-between mb-4">
                  <StyledSelect 
                    onChange={(e) => setCategory(e.target.value)}
                    theme={theme}
                    className="mb-3 mb-md-0"
                  >
                    <option value="">Todas as categorias</option>
                    <option value="Eletrônicos">Eletrônicos</option>
                    <option value="Móveis">Móveis</option>
                    <option value="Esportes">Esportes</option>
                    <option value="Instrumentos Musicais">Instrumentos Musicais</option>
                  </StyledSelect>
                  <StyledSelect
                    onChange={(e) => setSortBy(e.target.value)}
                    theme={theme}
                  >
                    <option value="">Ordenar por</option>
                    <option value="price-asc">Preço: Menor para Maior</option>
                    <option value="price-desc">Preço: Maior para Menor</option>
                    <option value="name">Nome</option>
                  </StyledSelect>
                </div>
                <Row xs={1} md={2} lg={3} className="g-4">
                  <AnimatePresence>
                    {currentProducts.map((product) => (
                      <Col key={product.id}>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <ProductCard 
                            product={product} 
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            theme={theme}
                          />
                        </motion.div>
                      </Col>
                    ))}
                  </AnimatePresence>
                </Row>
                <StyledPagination className="mt-4 justify-content-center" theme={theme}>
                  {[...Array(Math.ceil(filteredProducts.length / productsPerPage))].map((_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => paginate(index + 1, setCurrentPage)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                </StyledPagination>
              </StyledCard>
            </Col>
          </Row>
        </Container>

        <StyledModal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>{newProduct.id ? 'Editar Anúncio' : 'Novo Anúncio'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nome do Produto</Form.Label>
                <StyledFormControl 
                  type="text" 
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descrição</Form.Label>
                <StyledFormControl 
                  as="textarea" 
                  rows={6} 
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Preço</Form.Label>
                <StyledFormControl 
                  type="number" 
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Condição</Form.Label>
                <StyledSelect
                  value={newProduct.condition}
                  onChange={(e) => setNewProduct({...newProduct, condition: e.target.value})}
                  theme={theme}
                >
                  <option value="">Selecione a condição</option>
                  <option value="Novo">Novo</option>
                  <option value="Usado">Usado</option>
                  <option value="Recondicionado">Recondicionado</option>
                </StyledSelect>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Categoria</Form.Label>
                <StyledSelect
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  theme={theme}
                >
                  <option value="">Selecione a categoria</option>
                  <option value="Eletrônicos">Eletrônicos</option>
                  <option value="Móveis">Móveis</option>
                  <option value="Esportes">Esportes</option>
                  <option value="Instrumentos Musicais">Instrumentos Musicais</option>
                </StyledSelect>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Imagens</Form.Label>
                <StyledFormControl 
                  type="file" 
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    const imageUrls = files.map(file => URL.createObjectURL(file));
                    setNewProduct({...newProduct, images: [...newProduct.images, ...imageUrls]});
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <StyledButton variant="secondary" onClick={() => setShowAddModal(false)} theme={theme}>
              Cancelar
            </StyledButton>
            <StyledButton variant="primary" onClick={() => handleAddProduct(newProduct, products, setProducts, setShowAddModal)} theme={theme}>
              {newProduct.id ? 'Salvar Alterações' : 'Adicionar Produto'}
            </StyledButton>
          </Modal.Footer>
        </StyledModal>
      </GradientBackground>
    </Layout>
  );
}

export default VendasPage;
