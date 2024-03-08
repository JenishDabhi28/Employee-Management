import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styled components for the navbar
const NavbarContainer = styled.nav`
  background-color: #333; /* Update background color to dark */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Update box shadow */
  padding: 20px 40px; /* Increase padding */
  display: flex; /* Make the navbar a flex container */
  justify-content: space-between; /* Space out the logo and nav links */
  align-items: center; /* Center align items vertically */

  @media screen and (max-width: 768px) {
    padding: 20px; /* Adjust padding for smaller screens */
    position: relative; /* Ensure relative positioning for absolute child */
  }
`;

const Logo = styled.div`
  font-size: 32px; /* Increase font size */
  font-weight: bold;
  color: #fff; /* Change color to white */

  @media screen and (max-width: 768px) {
    font-size: 28px; /* Adjust font size for smaller screens */
  }
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  @media screen and (max-width: 768px) {
    display: ${({ click }) => (click ? 'flex' : 'none')}; /* Show/hide menu based on click state */
    flex-direction: column; /* Stack nav items vertically for smaller screens */
    align-items: center; /* Center align items vertically */
    position: absolute;
    top: 100%; /* Adjust top spacing */
    left: 0;
    width: 100%;
    background-color: #444; /* Darken background color for better contrast */
    z-index: 10; /* Ensure menu appears on top of other elements */
  }
`;

const NavItem = styled.li`
  margin-right: 20px;

  @media screen and (max-width: 768px) {
    margin: 15px 0; /* Adjust margin for smaller screens */
  }
`;

const NavLink = styled(Link)`
  color: #fff; /* Change color to white */
  text-decoration: none;
  font-size: 18px; /* Increase font size */
  transition: color 0.3s ease;

  &:hover {
    color: #e0e0e0; /* Lighten color on hover */
  }

  @media screen and (max-width: 768px) {
    font-size: 16px; /* Adjust font size for smaller screens */
  }
`;

const BurgerMenu = styled.div`
  display: none; /* Hide burger menu by default */

  @media screen and (max-width: 768px) {
    display: block; /* Show burger menu on smaller screens */
    color: #fff; /* Change color to white */
    font-size: 24px; /* Increase font size */
    cursor: pointer;
    z-index: 20; /* Ensure menu appears on top of other elements */
  }
`;

const LogoutButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
`;

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <NavbarContainer>
      <Logo>Employee</Logo>
      <BurgerMenu onClick={handleClick}>{click ? 'X' : '☰'}</BurgerMenu>
      <NavMenu click={click}>
        <NavItem>
          <NavLink to="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/AddEmp">Add Employee</NavLink>
        </NavItem>
        {isLoggedIn ? (
          <NavItem>
            <LogoutButton onClick={onLogout}>Logout</LogoutButton>
          </NavItem>
        ) : (
          <>
            <NavItem>
              <NavLink to="/login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/signup">Sign up</NavLink>
            </NavItem>
          </>
        )}
      </NavMenu>
    </NavbarContainer>
  );
};

export default Navbar;