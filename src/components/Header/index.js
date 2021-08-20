import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "./../../actions/";

import "./style.css";

const Header = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(signOut());
  };

  // user has logged in
  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <span
            style={{ cursor: "pointer" }}
            onClick={logout}
            to="/signout"
            className="nav-link signout-custom"
          >
            Signout
          </span>
        </li>
      </Nav>
    );
  };
  // render when user yet login
  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <NavLink to="/signin" className="nav-link">
            Signin
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/signup" className="nav-link">
            Signup
          </NavLink>
        </li>
      </Nav>
    );
  };
  return (
    <Navbar
      fixed="top"
      collapseOnSelect
      className="Nav-custom"
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ zIndex: 1, boxShadow: "0px 2px 8px -2px #777" }}
    >
      <Container fluid>
        {/* <Navbar.Brand href="#home">Flipkart Admin Dashboard</Navbar.Brand> */}
        <Link
          to="/"
          style={{ color: "black", fontWeight: "bold" }}
          className="navbar-brand"
        >
          Flipkart Dashboard
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/*     <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown> */}
          </Nav>
          {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
