import styled from "styled-components";

//NavMenuComp.jsx
export const StyledNavbar = styled(Navbar)`
  background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 1rem;
`;

export const StyledNavLink = styled(Nav.Link)`
  color: #ffffff !important;
  text-decoration: none !important;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  &:hover {
    color: #FF0080 !important;
  }
`;

export const StyledNavDropdown = styled(NavDropdown)`
  .dropdown-toggle {
    color: #ffffff !important;
    display: flex;
    align-items: center;
    &:hover {
      color: #FF0080 !important;
    }
  }
  .dropdown-menu {
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.18);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  }
  .dropdown-item {
    color: #ffffff;
    &:hover {
      background: ${props => `linear-gradient(${props.theme.gradientDirection}, ${props.theme.primaryColor}, ${props.theme.secondaryColor})`};
      color: #ffffff;
    }
  }
`;

export const NavItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;
