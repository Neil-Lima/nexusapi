import React from 'react';
import { Carousel } from 'react-bootstrap';
import { StyledCarousel, CarouselItem, CarouselCaption } from '../styles/CarrosselDestaquesStyle';
import { destaques } from '../utils/CarrosselDestaquesUtil';

function CarrosselDestaquesComp() {
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
