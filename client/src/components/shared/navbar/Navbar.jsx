import React from 'react';
import { Container, Nav, Navbar as BNavbar } from 'react-bootstrap';
import Link from '../link/Link';
import navicon from './navicon.png';
import './Navbar.css';

function Navbar() {
  return (
    <BNavbar id="Navbar" expand="lg" className="bg-body-tertiary">
      <Container>
        <img
          alt=""
          src={navicon}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        {'   '}
        <BNavbar.Brand>Relationship Database</BNavbar.Brand>
        <Nav className="me-auto">
          <BNavbar.Text className="nav-link"><Link linkTo="friends">Friends</Link></BNavbar.Text>
          <BNavbar.Text className="nav-link"><Link linkTo="friend_groups">Friend Groups</Link></BNavbar.Text>
        </Nav>
      </Container>
    </BNavbar>
  );
}

export default Navbar;
