import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { Container, Row, Col, Card, Button, Form, InputGroup, ListGroup, Pagination, Modal, Carousel, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCamera, faTag, faHome, faUser, faGlobeAmericas, faUsers, faBars, faStar, faHeart, faFilter, faSortAmountDown, faAugmented, faBlockchain, faComments, faGavel, faShareAlt, faUserCheck, faRecycle, faTrendUp, faImage, faTruck, faBoxes, faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useTheme } from '../context/ContextTheme';
import { motion, AnimatePresence } from 'framer-motion';

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
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;
const StyledTextArea = styled(Form.Control)`
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.18);
  color: #ffffff;
  border-radius: 15px;
  padding: 10px 15px;
  transition: all 0.3s ease;
  resize: vertical;
  min-height: 100px;
  max-height: 300px;
  width: 100%;

  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(255,255,255,0.25);
    background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
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

const IconWrapper = styled.div`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
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
    left: ${props => props.show ? '0' : '-100%'};
    width: 100%;
    height: 100vh;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-right: 1px solid rgba(255,255,255,0.18);
    transition: left 0.3s ease-in-out;
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

const StyledSelect = styled(Form.Select)`
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.18);
  color: #ffffff;
  border-radius: 25px;
  padding: 10px 20px;
  transition: all 0.3s ease;
  width: auto;
  max-width: 200px;

  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(255,255,255,0.25);
  }

  option {
    background: ${props => props.theme.primaryColor};
    color: #ffffff;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
    margin-bottom: 10px;
  }
`;

const StyledPagination = styled(Pagination)`
  .page-item .page-link {
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.18);
    color: #ffffff;
    transition: all 0.3s ease;
  }

  .page-item.active .page-link {
    background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
    border-color: ${props => props.theme.primaryColor};
  }
`;

const StyledFormControl = styled(Form.Control)`
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.18);
  color: #ffffff;
  border-radius: 25px;
  padding: 10px 20px;
  transition: all 0.3s ease;

  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(255,255,255,0.25);
    background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
  }
`;

const StyledModal = styled(Modal)`
  .modal-content {
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.18);
    color: #ffffff;
  }

  .modal-header, .modal-footer {
    border-color: rgba(255,255,255,0.18);
  }

  .form-label {
    color: #ffffff;
  }
`;

const ProductCard = ({ product, handleEdit, handleDelete }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <StyledCard as={motion.div} whileHover={{ scale: 1.05 }}>
        <Card.Img variant="top" src={product.images[0]} onClick={() => setShowModal(true)} style={{ cursor: 'pointer', height: '200px', objectFit: 'cover' }} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description.substring(0, 100)}...</Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <strong>${product.price.toFixed(2)}</strong>
            <Badge bg="primary">{product.condition}</Badge>
          </div>
          <div className="mt-3">
            <StyledButton onClick={() => handleEdit(product)} className="me-2">
              Editar
            </StyledButton>
            <StyledButton variant="danger" onClick={() => handleDelete(product.id)}>
              Excluir
            </StyledButton>
          </div>
        </Card.Body>
      </StyledCard>

      <StyledModal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {product.images.map((image, index) => (
              <Carousel.Item key={index}>
                <img className="d-block w-100" src={image} alt={`${product.name} - ${index + 1}`} style={{ height: '400px', objectFit: 'cover' }} />
              </Carousel.Item>
            ))}
          </Carousel>
          <h4 className="mt-3">${product.price.toFixed(2)}</h4>
          <p>{product.description}</p>
          <p><strong>Condição:</strong> {product.condition}</p>
          <p><strong>Categoria:</strong> {product.category}</p>
        </Modal.Body>
        <Modal.Footer>
          <StyledButton onClick={() => handleEdit(product)}>
            Editar Anúncio
          </StyledButton>
        </Modal.Footer>
      </StyledModal>
    </>
  );
};

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
    const mockProducts = [
      { id: 1, name: 'iPhone 12 Pro', description: 'Smartphone em excelente estado, pouco uso. Acompanha todos os acessórios originais.', price: 799.99, condition: 'Usado', category: 'Eletrônicos', images: ['https://picsum.photos/300/200?random=1', 'https://picsum.photos/300/200?random=2'] },
      { id: 2, name: 'Bicicleta Mountain Bike', description: 'Bicicleta aro 29, 21 marchas, freio a disco. Ideal para trilhas e uso urbano.', price: 350.00, condition: 'Usado', category: 'Esportes', images: ['https://picsum.photos/300/200?random=3', 'https://picsum.photos/300/200?random=4'] },
      { id: 3, name: 'Sofá de Couro', description: 'Sofá de 3 lugares em couro legítimo. Confortável e elegante, combina com qualquer decoração.', price: 599.99, condition: 'Usado', category: 'Móveis', images: ['https://picsum.photos/300/200?random=5', 'https://picsum.photos/300/200?random=6'] },
      { id: 4, name: 'Câmera DSLR Canon', description: 'Câmera profissional Canon EOS 80D. Acompanha lente 18-55mm e bolsa de transporte.', price: 899.99, condition: 'Usado', category: 'Eletrônicos', images: ['https://picsum.photos/300/200?random=7', 'https://picsum.photos/300/200?random=8'] },
      { id: 5, name: 'Violão Acústico', description: 'Violão acústico da marca Takamine. Som cristalino e excelente para iniciantes e intermediários.', price: 250.00, condition: 'Usado', category: 'Instrumentos Musicais', images: ['https://picsum.photos/300/200?random=9', 'https://picsum.photos/300/200?random=10'] },
      { id: 6, name: 'Notebook Dell', description: 'Notebook Dell Inspiron, 8GB RAM, SSD 256GB, processador i5. Ideal para trabalho e estudos.', price: 650.00, condition: 'Usado', category: 'Eletrônicos', images: ['https://picsum.photos/300/200?random=11', 'https://picsum.photos/300/200?random=12'] },
    ];
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
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

  const handleEdit = (product) => {
    setNewProduct(product);
    setShowAddModal(true);
  };

  const handleDelete = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const handleAddProduct = () => {
    if (newProduct.id) {
      setProducts(products.map(product => product.id === newProduct.id ? newProduct : product));
    } else {
      setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    }
    setShowAddModal(false);
    setNewProduct({ name: '', description: '', price: '', condition: '', category: '', images: [] });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))}
                  </StyledPagination>
                </Card.Body>
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
                  cols={45}                 
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
            <StyledButton variant="primary" onClick={handleAddProduct} theme={theme}>
              {newProduct.id ? 'Salvar Alterações' : 'Adicionar Produto'}
            </StyledButton>
          </Modal.Footer>
        </StyledModal>
      </GradientBackground>
    </Layout>
  );
}

export default VendasPage;
