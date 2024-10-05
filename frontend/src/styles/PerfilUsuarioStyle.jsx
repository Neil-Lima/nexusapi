import styled from 'styled-components';
import { Card, Button, Image, Nav } from 'react-bootstrap';

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
  margin-bottom: 20px;
`;

export const ProfileHeader = styled.div`
  position: relative;
  height: 350px;
  background-image: url(${props => props.coverImage});
  background-size: cover;
  background-position: center;
  border-radius: 20px 20px 0 0;
`;

export const ProfileImage = styled(Image)`
  width: 200px;
  height: 200px;
  border: 5px solid #fff;
  position: absolute;
  bottom: -100px;
  left: 50px;
  z-index: 2;
  object-fit: cover;
`;

export const ProfileInfo = styled.div`
  padding-top: 120px;
  padding-left: 20px;
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

export const StyledNav = styled(Nav)`
  .nav-link {
    color: #ffffff;
    font-weight: bold;
    &:hover, &.active {
      color: ${props => props.theme.primaryColor};
    }
  }
`;

export const PostCard = styled(StyledCard)`
  margin-bottom: 20px;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px);
  }

  svg {
    margin-right: 15px;
    color: ${props => props.theme.primaryColor};
    font-size: 1.5em;
  }

  .info-content {
    flex-grow: 1;
  }

  .info-title {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .info-detail {
    font-size: 0.9em;
    opacity: 0.8;
  }
`;

export const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

export const PhotoItem = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const FriendGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`;

export const FriendItem = styled.div`
  text-align: center;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
  }
`;

export const TestimonialCard = styled(StyledCard)`
  margin-bottom: 20px;
`;
