import styled from 'styled-components';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';

export const StyledNavbar = styled(Navbar)`
  background-color: ${props => props.theme.navbarBackground};
`;

export const StyledNavLink = styled(Nav.Link)`
  color: ${props => props.theme.navLinkColor} !important;
  margin-right: 15px;
  font-weight: bold;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.navLinkHoverColor} !important;
    border-bottom-color: ${props => props.theme.navLinkHoverColor};
  }
`;

export const StyledNavDropdown = styled(NavDropdown)`
  .dropdown-toggle {
    color: ${props => props.theme.navLinkColor} !important;
    font-weight: bold;
  }

  .dropdown-menu {
    background-color: ${props => props.theme.dropdownBackground};
  }

  .dropdown-item {
    color: ${props => props.theme.dropdownItemColor};

    &:hover {
      background-color: ${props => props.theme.dropdownItemHoverBackground};
      color: ${props => props.theme.dropdownItemHoverColor};
    }
  }
`;

export const NavItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledButton = styled(Button)`
  background-color: ${props => props.theme.buttonBackground};
  border-color: ${props => props.theme.buttonBorder};
  color: ${props => props.theme.buttonColor};

  &:hover {
    background-color: ${props => props.theme.buttonHoverBackground};
    border-color: ${props => props.theme.buttonHoverBorder};
    color: ${props => props.theme.buttonHoverColor};
  }
`;
