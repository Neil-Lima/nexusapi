export const fetchProducts = () => {
    // Simulating API call to fetch products
    return [
      { id: 1, name: 'Smartphone XYZ', description: 'Último modelo com câmera de alta resolução', price: 1999.99, condition: 'Novo', category: 'Eletrônicos', images: ['https://picsum.photos/200/300?random=1'] },
      { id: 2, name: 'Sofá de Couro', description: 'Confortável sofá de 3 lugares', price: 2500, condition: 'Usado', category: 'Móveis', images: ['https://picsum.photos/200/300?random=2'] },
      { id: 3, name: 'Bicicleta Mountain Bike', description: 'Ideal para trilhas e aventuras', price: 1200, condition: 'Usado', category: 'Esportes', images: ['https://picsum.photos/200/300?random=3'] },
      { id: 4, name: 'Guitarra Elétrica', description: 'Excelente para iniciantes e intermediários', price: 800, condition: 'Usado', category: 'Instrumentos Musicais', images: ['https://picsum.photos/200/300?random=4'] },
      { id: 5, name: 'Notebook Ultrafino', description: 'Leve e potente para trabalho e estudo', price: 3500, condition: 'Novo', category: 'Eletrônicos', images: ['https://picsum.photos/200/300?random=5'] },
      { id: 6, name: 'Mesa de Jantar', description: 'Mesa extensível para 6 a 8 pessoas', price: 1800, condition: 'Usado', category: 'Móveis', images: ['https://picsum.photos/200/300?random=6'] },
      { id: 7, name: 'Raquete de Tênis', description: 'Raquete profissional com ótimo equilíbrio', price: 450, condition: 'Usado', category: 'Esportes', images: ['https://picsum.photos/200/300?random=7'] },
      { id: 8, name: 'Teclado Musical', description: 'Teclado de 88 teclas com peso de piano', price: 2200, condition: 'Novo', category: 'Instrumentos Musicais', images: ['https://picsum.photos/200/300?random=8'] },
      { id: 9, name: 'Smart TV 4K', description: 'TV de 55 polegadas com resolução 4K', price: 2800, condition: 'Novo', category: 'Eletrônicos', images: ['https://picsum.photos/200/300?random=9'] },
    ];
  };
  
  export const handleEdit = (product) => {
    console.log('Editing product:', product);
    // Implement edit logic here
  };
  
  export const handleDelete = (productId) => {
    console.log('Deleting product with id:', productId);
    // Implement delete logic here
  };
  
  export const handleAddProduct = (newProduct, products, setProducts, setShowAddModal) => {
    const updatedProducts = [...products, { ...newProduct, id: products.length + 1 }];
    setProducts(updatedProducts);
    setShowAddModal(false);
  };
  
  export const paginate = (pageNumber, setCurrentPage) => {
    setCurrentPage(pageNumber);
  };
  
  export const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  export const LeftColumn = ({ theme }) => (
    <>
      <h3 className="mb-4">Categorias</h3>
      <ul className="list-unstyled">
        {['Eletrônicos', 'Móveis', 'Esportes', 'Instrumentos Musicais'].map((category, index) => (
          <li key={index} className="mb-2">
            <a href="#" style={{ color: theme.textColor, textDecoration: 'none' }}>
              {category}
            </a>
          </li>
        ))}
      </ul>
      <h3 className="mt-5 mb-4">Filtros</h3>
      <ul className="list-unstyled">
        {['Preço', 'Condição', 'Localização'].map((filter, index) => (
          <li key={index} className="mb-2">
            <a href="#" style={{ color: theme.textColor, textDecoration: 'none' }}>
              {filter}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
  