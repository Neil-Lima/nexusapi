import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faGlobeAmericas, faUsers } from '@fortawesome/free-solid-svg-icons';
import { IconWrapper } from '../styles/PaginasListaStyle';

export const LeftColumn = ({ theme }) => (
  <>
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

export const initialState = {
  pages: [],
  visiblePages: 6,
  loading: false,
  error: null,
  showSidebar: true,
};

export const loadMorePages = (state) => {
  return {
    ...state,
    visiblePages: state.visiblePages + 6,
  };
};

export const toggleSidebar = (state) => {
  return {
    ...state,
    showSidebar: !state.showSidebar,
  };
};

export const fetchPages = () => {
  // Simulando uma chamada de API para buscar páginas
  return [
    {
      id: 1,
      name: "Tecnologia Avançada",
      description: "Explorando as últimas inovações tecnológicas",
      coverPhoto: "https://picsum.photos/800/400?random=1",
      likes: 1500,
      comments: 230
    },
    {
      id: 2,
      name: "Viagens Exóticas",
      description: "Descubra destinos incríveis ao redor do mundo",
      coverPhoto: "https://picsum.photos/800/400?random=2",
      likes: 2300,
      comments: 450
    },
    {
      id: 3,
      name: "Culinária Gourmet",
      description: "Receitas sofisticadas para os amantes da boa comida",
      coverPhoto: "https://picsum.photos/800/400?random=3",
      likes: 1800,
      comments: 320
    },
    {
      id: 4,
      name: "Fitness e Bem-estar",
      description: "Dicas para uma vida saudável e equilibrada",
      coverPhoto: "https://picsum.photos/800/400?random=4",
      likes: 3500,
      comments: 680
    },
    {
      id: 5,
      name: "Arte Contemporânea",
      description: "Explorando as tendências da arte moderna",
      coverPhoto: "https://picsum.photos/800/400?random=5",
      likes: 1200,
      comments: 190
    },
    {
      id: 6,
      name: "Ciência e Descobertas",
      description: "As últimas novidades do mundo científico",
      coverPhoto: "https://picsum.photos/800/400?random=6",
      likes: 2800,
      comments: 520
    }
  ];
};
