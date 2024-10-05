import styled from 'styled-components';
import { Button, Card, Form, Modal, Pagination, ListGroup, Tabs, Badge  } from 'react-bootstrap';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';

export const GradientBackground = styled.div`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  min-height: 100vh;
  padding: 20px 0;
`;

export const StyledCard = styled(motion.div)`
  border-radius: 15px;
  border: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  color: #ffffff;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
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

export const SearchBar = styled(Form)`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  padding: 10px;
  margin-bottom: 20px;
`;

export const FilterSection = styled(StyledCard)`
  padding: 20px;
  margin-bottom: 20px;
`;

export const JobCard = styled(StyledCard)`
  padding: 20px;
`;

export const JobTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #ffffff;
`;

export const JobInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  color: #ffffff;

  svg {
    margin-right: 10px;
    color: ${props => props.theme.secondaryColor};
  }
`;

export const StyledBadge = styled(Badge)`
  margin-right: 10px;
  font-size: 0.9rem;
  padding: 8px 12px;
  border-radius: 20px;
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  color: #ffffff;
`;

export const ProfileSection = styled(StyledCard)`
  padding: 20px;
`;

export const ProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 15px;
  border: 3px solid ${props => props.theme.primaryColor};
`;

export const StyledModal = styled(Modal)`
  .modal-content {
    background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
    color: #ffffff;
  }

  .modal-header, .modal-footer {
    border-color: rgba(255, 255, 255, 0.1);
  }

  .close {
    color: #ffffff;
  }
`;

export const StyledListGroup = styled(ListGroup)`
  .list-group-item {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border: none;
    margin-bottom: 10px;
    border-radius: 10px;
  }
`;

export const StyledTabs = styled(Tabs)`
  .nav-link {
    color: #ffffff;
    &.active {
      background-color: ${props => props.theme.primaryColor};
      color: #ffffff;
    }
  }
`;

export const StyledPagination = styled(Pagination)`
  .page-item .page-link {
    background-color: ${props => props.theme.primaryColor};
    border-color: ${props => props.theme.secondaryColor};
    color: #ffffff;
  }

  .page-item.active .page-link {
    background-color: ${props => props.theme.secondaryColor};
    border-color: ${props => props.theme.primaryColor};
  }
`;

export const StyledDatePicker = styled(DatePicker)`
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid ${props => props.theme.primaryColor};
  border-radius: 5px;
  color: #ffffff;
  padding: 10px;
  width: 100%;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.secondaryColor};
  }
`;

export const StyledForm = styled(Form)`
  .form-control, .form-select {
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid ${props => props.theme.primaryColor};
    color: #ffffff;

    &:focus {
      background-color: rgba(255, 255, 255, 0.2);
      box-shadow: 0 0 0 2px ${props => props.theme.secondaryColor};
    }
  }

  .form-label {
    color: #ffffff;
  }
`;

export const StyledSelect = styled(Form.Select)`
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid ${props => props.theme.primaryColor};
  color: #ffffff;
  padding: 10px;

  &:focus {
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 0 2px ${props => props.theme.secondaryColor};
  }

  option {
    background-color: ${props => props.theme.primaryColor};
    color: #ffffff;
  }
`;
