import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'react-bootstrap';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Navigation</a>
          </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );
  }
}
