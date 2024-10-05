import styled from 'styled-components';
import { Card, Button, Form, ListGroup, Image } from 'react-bootstrap';

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

export const VideoPlayer = styled.div`
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  background: #000;
  border-radius: 20px;
  overflow: hidden;
`;

export const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

export const VideoInfo = styled.div`
  margin-top: 20px;
`;

export const VideoTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #ffffff;
`;

export const VideoDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
`;

export const InteractionBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const InteractionButton = styled(StyledButton)`
  padding: 8px 15px;
  font-size: 0.9rem;
`;

export const CommentSection = styled.div`
  margin-top: 30px;
`;

export const CommentForm = styled(Form)`
  margin-bottom: 20px;
`;

export const StyledTextArea = styled(Form.Control)`
  background: ${props => props.theme.inputBackground};
  border: 1px solid ${props => props.theme.borderColor};
  color: ${props => props.theme.textColor};
  border-radius: 10px;
  padding: 15px;
  resize: vertical;
  font-size: 1rem;
  min-height: 100px;

  &:focus {
    background: ${props => props.theme.inputBackgroundFocus};
    border-color: ${props => props.theme.primaryColor};
    box-shadow: 0 0 0 0.2rem ${props => props.theme.focusColor};
  }
`;

export const CommentList = styled(ListGroup)`
  .list-group-item {
    background: transparent;
    border-color: rgba(255, 255, 255, 0.1);
    color: #ffffff;
  }
`;

export const CommentCard = styled(Card)`
  background: ${props => props.theme.cardBackground};
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 15px;
`;

export const CommentAuthor = styled.h5`
  color: ${props => props.theme.primaryColor};
  margin-bottom: 5px;
`;

export const CommentDate = styled.small`
  color: ${props => props.theme.textColorMuted};
`;

export const CommentText = styled.p`
  color: #ffffff;
  margin-top: 10px;
  font-size: 1rem;
`;

export const CommentAvatar = styled(Image)`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;

export const RelatedVideos = styled.div`
  margin-top: 20px;
`;

export const RelatedVideoItem = styled(StyledCard)`
  margin-bottom: 15px;
  cursor: pointer;
  padding: 10px;
`;

export const RelatedVideoInfo = styled.div`
  padding: 10px;
`;

export const RelatedVideoTitle = styled.h6`
  font-size: 0.9rem;
  margin: 0 0 5px 0;
  color: #ffffff;
`;

export const RelatedVideoDate = styled.small`
  color: ${props => props.theme.textColorMuted};
  display: block;
  margin-bottom: 5px;
`;

export const RelatedVideoDuration = styled.span`
  position: absolute;
  bottom: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.7);
  color: #ffffff;
  padding: 2px 4px;
  border-radius: 2px;
  font-size: 0.8rem;
`;

export const LoadMoreButton = styled(StyledButton)`
  width: 100%;
  margin-top: 15px;
`;
