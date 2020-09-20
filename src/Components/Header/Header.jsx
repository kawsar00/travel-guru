import React from 'react';
import './Header.css'
import { Navbar, Nav, Form } from 'react-bootstrap';
import { Input } from 'semantic-ui-react';
import logo from '../../Image/Logo.png'
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <Navbar expand="lg">
      <Navbar.Brand href="/home" className="py-4 navBar">
        <img src={logo} alt="" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Form inline>
        <Input size='big' iconPosition='left' icon='search' placeholder='Search your Destination...' />
      </Form>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav><Link to="/home" className="linkText">Home</Link > </Nav>
          <Nav><Link to="/destination" className="linkText">Destination</Link ></Nav>
          <Nav><Link to="/#" className="linkText">Blog</Link ></Nav>
          <Nav><Link to="/contact" className="linkText">Contact</Link ></Nav>
          <Link to="/login"> <button className="btn btn-warning text-dark ">Login</button></Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;