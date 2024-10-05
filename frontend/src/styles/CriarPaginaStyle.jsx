import styled from 'styled-components';
import { Card, Button, Form, Image } from 'react-bootstrap';

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

export const CoverPhotoUpload = styled.div`
  height: 200px;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const ProfilePhotoUpload = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: -60px auto 20px;
  border: 4px solid ${props => props.theme.primaryColor};
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const StyledForm = styled(Form)`
  .form-control, .form-select {
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;
    &:focus {
      background-color: rgba(255, 255, 255, 0.2);
      box-shadow: none;
      border-color: ${props => props.theme.primaryColor};
    }
  }
  .form-label {
    color: #ffffff;
  }
`;

export const PreviewCard = styled(Card)`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 15px;
  overflow: hidden;
`;

export const PreviewCoverPhoto = styled.div`
  height: 150px;
  background-color: #333;
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
`;

export const PreviewProfilePhoto = styled(Image)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #fff;
  margin-top: -40px;
  margin-left: 20px;
`;
