import styled from 'styled-components';
import { Carousel } from 'react-bootstrap';

export const StyledCarousel = styled(Carousel)`
  margin-bottom: 20px;
`;

export const CarouselItem = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

export const CarouselCaption = styled(Carousel.Caption)`
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
`;
