import styled from 'styled-components';
import { Card, Button, Pagination } from 'react-bootstrap';

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
  transition: all 0.3s ease;
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

export const PageImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 20px 20px 0 0;
`;

export const PageTitle = styled.h3`
  font-size: 1.5rem;
  margin-top: 15px;
  color: #ffffff;
`;

export const PageCategory = styled.p`
  color: ${props => props.theme.primaryColor};
  font-weight: bold;
`;

export const StyledPagination = styled(Pagination)`
  .page-item .page-link {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    color: #ffffff;
  }

  .page-item.active .page-link {
    background-color: ${props => props.theme.primaryColor};
    border-color: ${props => props.theme.primaryColor};
  }
`;

export const IconWrapper = styled.div`
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

export const GradientText = styled.span`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`;

export const ViewToggleButton = styled(Button)`
  background: ${props => props.active ? props.theme.primaryColor : 'transparent'};
  border: 1px solid ${props => props.theme.primaryColor};
  color: ${props => props.active ? '#ffffff' : props.theme.primaryColor};
  margin-left: 10px;
  
  &:hover {
    background: ${props => props.theme.primaryColor};
    color: #ffffff;
  }
`;

export const GridView = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

export const ListView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ListCard = styled(StyledCard)`
  flex-direction: row;
  align-items: center;

  .card-img-top {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 20px 0 0 20px;
  }

  .card-body {
    flex: 1;
  }
`;
