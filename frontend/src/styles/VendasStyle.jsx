import styled from 'styled-components';
import { Card, Button, Form, Pagination, Modal } from 'react-bootstrap';

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
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
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

export const SidebarWrapper = styled.div`
  @media (max-width: 991px) {
    position: fixed;
    top: 0;
    left: ${props => props.show ? '0' : '-50%'};
    width: 50%;
    height: 100vh;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-right: 1px solid rgba(255,255,255,0.18);
    transition: left 0.3s ease-in-out;
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

export const StyledSelect = styled(Form.Select)`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #ffffff;
  border-radius: 25px;
  padding: 10px 20px;
  transition: all 0.3s ease;

  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.25);
  }

  option {
    background: ${props => props.theme.primaryColor};
    color: #ffffff;
  }
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

export const StyledFormControl = styled(Form.Control)`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #ffffff;
  border-radius: 25px;
  padding: 10px 20px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.25);
  }
`;

export const StyledModal = styled(Modal)`
  .modal-content {
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 20px;
    color: #ffffff;
  }

  .modal-header {
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }

  .modal-footer {
    border-top: 1px solid rgba(255,255,255,0.1);
  }
`;

export const ProductCard = styled(StyledCard)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const CategoryBadge = styled.span`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  color: #ffffff;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  margin-right: 5px;
`;
