import styled from 'styled-components';
import { Card, Button, Carousel } from 'react-bootstrap';

export const GradientBackground = styled.div`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  min-height: 100vh;
  padding: 20px 0;
`;

export const StyledCard = styled(Card)`
  border-radius: ${props => props.theme.borderRadius};
  border: none;
  box-shadow: ${props => props.theme.boxShadow};
  margin-bottom: 20px;
  background: ${props => props.theme.cardBackground};
  color: ${props => props.theme.textColor};
  overflow: hidden;
`;

export const StyledButton = styled(Button)`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-weight: bold;
  transition: ${props => props.theme.transition};
  color: ${props => props.theme.textColor};
  &:hover {
    transform: ${props => props.theme.buttonHoverTransform};
    box-shadow: ${props => props.theme.boxShadow};
    background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.secondaryColor}, ${props.theme.primaryColor})`};
  }
`;

export const StoryContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StoryItem = styled.div`
  width: 120px;
  height: 200px;
  border-radius: ${props => props.theme.borderRadius};
  margin-right: 15px;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 15px;
  color: ${props => props.theme.textColor};
  font-weight: bold;
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.theme.boxShadow};
  transition: ${props => props.theme.transition};
  &:hover {
    transform: scale(1.05);
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
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
  box-shadow: ${props => props.theme.boxShadow};
`;

export const GradientText = styled.span`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`;

export const SidebarWrapper = styled.div`
  @media (max-width: 991px) {
    position: fixed;
    top: 0;
    left: ${props => props.show ? '0' : '-50%'};
    width: 50%;
    height: 100vh;
    background: ${props => props.theme.cardBackground};
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-right: 1px solid rgba(255,255,255,0.18);
    transition: ${props => props.theme.transition};
    z-index: 1000;
    overflow-y: auto;
    padding: 20px;
  }
`;

export const Overlay = styled.div`
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

export const StyledCarousel = styled(Carousel)`
  .carousel-item {
    height: 300px;
  }
  .carousel-caption {
    background: rgba(0, 0, 0, 0.6);
    border-radius: 10px;
    padding: 20px;
  }
`;

export const HighlightCard = styled(Card)`
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  overflow: hidden;
  box-shadow: ${props => props.theme.boxShadow};
  transition: ${props => props.theme.transition};
  &:hover {
    transform: translateY(-5px);
  }
`;

export const HighlightImage = styled.img`
  height: 200px;
  object-fit: cover;
`;
