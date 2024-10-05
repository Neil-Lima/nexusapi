import styled from 'styled-components';
import { Card, Image, Button, Nav } from 'react-bootstrap';

export const GradientBackground = styled.div`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  min-height: 100vh;
  padding: 20px 0;
`;

export const StyledCard = styled(Card)`
  border-radius: 20px;
  border: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.18);
  color: #ffffff;
  overflow: hidden;
`;

export const ProfileHeader = styled.div`
  position: relative;
  height: 300px;
  background-image: url('https://picsum.photos/1000/300');
  background-size: cover;
  background-position: center;
  border-radius: 20px 20px 0 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const ProfileImage = styled(Image)`
  position: absolute;
  bottom: -75px;
  border: 4px solid #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

export const ProfileInfo = styled.div`
  padding: 80px 20px 20px;
  text-align: center;
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

export const PostImage = styled(Card.Img)`
  width: 100%;
  height: auto;
  object-fit: cover;
  max-height: 400px;
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

export const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.textColor || '#ffffff'};
  font-size: 0.9rem;
  padding: 5px 10px;
  margin-right: 15px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.primaryColor};
  }
`;

export const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
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

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover .overlay {
    opacity: 1;
  }
`;

export const FriendGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
`;

export const FriendItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 10px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  }

  .friend-name {
    font-weight: bold;
    color: ${props => props.theme.primaryColor};
    margin-bottom: 5px;
  }

  .friend-status {
    font-size: 0.8rem;
    color: #cccccc;
  }
`;
