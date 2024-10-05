import styled from 'styled-components';
import { Card, Button, Form, ListGroup, Pagination, Badge, Carousel } from 'react-bootstrap';

export const GradientBackground = styled.div`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  min-height: 100vh;
  padding: 20px 0;
`;

export const StyledCard = styled(Card)`
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

export const StyledButton = styled(Button)`
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

export const CategoryBadge = styled(Badge)`
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

export const FeaturedCarousel = styled(Carousel)`
  margin-bottom: 30px;
  .carousel-item {
    height: 400px;
  }
  img {
    object-fit: cover;
    height: 100%;
  }
`;

export const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

export const NewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const AuthorInfo = styled.div`
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

export const InteractionBar = styled.div`
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

export const StyledForm = styled(Form)`
  .form-control {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: #ffffff;
    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }
`;

export const StyledListGroup = styled(ListGroup)`
  .list-group-item {
    background: transparent;
    border-color: rgba(255, 255, 255, 0.1);
    color: #ffffff;
  }
`;

export const StyledPagination = styled(Pagination)`
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

export const Sidebar = styled.div`
  position: sticky;
  top: 20px;
`;

export const BackToTopButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

export const RelatedNews = styled.div`
  margin-top: 30px;
`;

