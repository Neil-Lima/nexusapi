import styled from 'styled-components';
import { Card, Button, Nav } from 'react-bootstrap';

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

export const GroupHeader = styled.div`
  position: relative;
  height: 300px;
  background-image: url(${props => props.coverImage});
  background-size: cover;
  background-position: center;
  border-radius: 20px 20px 0 0;
  display: flex;
  align-items: flex-end;
  padding: 20px;
`;

export const GroupInfo = styled.div`
  background: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 10px;
  width: 100%;
`;

export const GroupNav = styled(Nav)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0 0 20px 20px;
  padding: 10px;
  .nav-link {
    color: #ffffff;
    &:hover, &.active {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 10px;
    }
  }
`;

export const Post = styled(Card)`
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 15px;
`;

export const Member = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }
`;

export const Event = styled(Card)`
  margin-bottom: 15px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 15px;
`;

export const Discussion = styled(Card)`
  margin-bottom: 15px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 15px;
`;

export const MediaItem = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
  border-radius: 10px;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Comment = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
`;

export const EmojiPicker = styled.div`
  position: absolute;
  bottom: 100%;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  z-index: 1000;
`;

export const Poll = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 15px;
  margin-top: 15px;
`;

export const PollOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const PollBar = styled.div`
  height: 20px;
  background: ${props => `linear-gradient(to right, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  border-radius: 10px;
  margin-right: 10px;
`;
