import styled from 'styled-components';
import { Card, Button, Image, Tab, Nav, ListGroup, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

export const CoverPhoto = styled.div`
  height: 300px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 20px 20px 0 0;
  position: relative;
`;

export const ProfilePhoto = styled(Image)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid #ffffff;
  position: absolute;
  bottom: -75px;
  left: 20px;
`;

export const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #ffffff;
  margin-top: 80px;
`;

export const PageCategory = styled.span`
  background-color: ${props => props.theme.primaryColor};
  color: #ffffff;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  margin-left: 10px;
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

export const Stat = styled.div`
  text-align: center;
`;

export const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
`;

export const StatLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`;

export const StyledNav = styled(Nav)`
  .nav-link {
    color: #ffffff;
    &:hover, &.active {
      color: ${props => props.theme.primaryColor};
    }
  }
`;

export const PostCard = styled(StyledCard)`
  margin-bottom: 20px;
`;

export const PostImage = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

export const PostActions = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
`;

export const ActionButton = styled(Button)`
  background: transparent;
  border: none;
  color: #ffffff;
  &:hover {
    color: ${props => props.theme.primaryColor};
  }
`;

export const CommentSection = styled.div`
  margin-top: 20px;
`;

export const Comment = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
`;

export const CommentAuthor = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

export const FollowerItem = styled(ListGroup.Item)`
  background: transparent;
  border: none;
  color: #ffffff;
  display: flex;
  align-items: center;
  padding: 15px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
  }
`;

export const FollowerAvatar = styled(Image)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
`;

export const ChatWindow = styled(Modal)`
  .modal-content {
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.18);
    color: #ffffff;
  }
`;

export const FeedContainer = styled.div`
  max-height: 600px;
  max-width: 800px;
  overflow-y: auto;
  padding-right: 15px;
  margin: 0 auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }
`;

export const StyledListGroup = styled(ListGroup)`
  background: transparent;
  border-radius: 15px;
  overflow: hidden;

  .list-group-item {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: #ffffff;
    transition: all 0.3s ease;
    padding: 20px;
    margin-bottom: 10px;
    border-radius: 10px;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

export const InfoIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  margin-right: 15px;
  color: ${props => props.theme.primaryColor};
`;
