import React from 'react';
import { Carousel } from 'react-bootstrap';
import { StyledCarousel, CarouselItem, CarouselCaption } from '../styles/CarrosselDestaquesStyle';

function CarrosselDestaquesComp() {
  const destaques = [
    { id: 1, title: 'Destaque 1', description: 'Descrição do destaque 1', image: 'https://picsum.photos/800/400?random=1' },
    { id: 2, title: 'Destaque 2', description: 'Descrição do destaque 2', image: 'https://picsum.photos/800/400?random=2' },
    { id: 3, title: 'Destaque 3', description: 'Descrição do destaque 3', image: 'https://picsum.photos/800/400?random=3' },
  ];

  return (
    <StyledCarousel>
      {destaques.map((destaque) => (
        <Carousel.Item key={destaque.id}>
          <CarouselItem src={destaque.image} alt={destaque.title} />
          <CarouselCaption>
            <h3>{destaque.title}</h3>
            <p>{destaque.description}</p>
          </CarouselCaption>
        </Carousel.Item>
      ))}
    </StyledCarousel>
  );
}

export default CarrosselDestaquesComp;
