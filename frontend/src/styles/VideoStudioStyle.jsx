import styled from 'styled-components';
import { Card, Button, Form, Tabs, Dropdown } from 'react-bootstrap';
import { motion } from 'framer-motion';

export const GradientBackground = styled.div`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  min-height: 100vh;
  padding: 20px 0;
`;

export const StudioCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

export const StyledButton = styled(Button)`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 5px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

export const VideoPreview = styled.video`
  width: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const StyledTabs = styled(Tabs)`
  .nav-link {
    color: white;
    &.active {
      background-color: rgba(255, 255, 255, 0.2);
      border-color: transparent;
    }
  }
`;

export const StyledForm = styled(Form)`
  .form-control {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
  }
`;

export const EditingTools = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const TimelineContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  height: 100px;
  margin-top: 20px;
`;

export const CaptionContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
`;

export const CustomizationContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const StyledDropdown = styled(Dropdown)`
  .dropdown-toggle {
    background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
    border: none;
    border-radius: 25px;
    padding: 10px 20px;
    color: white;
    font-weight: bold;
  }

  .dropdown-menu {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }

  .dropdown-item {
    color: white;
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin-top: 10px;
  overflow: hidden;
`;

export const Progress = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background-color: ${props => props.theme.primaryColor};
  transition: width 0.3s ease;
`;

export const TextFormatting = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

export const FormatButton = styled(Button)`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;
