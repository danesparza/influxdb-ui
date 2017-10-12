//  React and reactstrap
import React, { Component } from 'react';
import {
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

//  Stylesheets & images
import './../App.css';
import 'bootstrap/dist/css/bootstrap.css';

class NavBar extends Component {  

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,     
    };    
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-print-none">
        <NavbarBrand href="/#/">InfluxDB UI</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/#/settings">Settings</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://docs.influxdata.com/influxdb/">Docs</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </nav>
    );
  }

}

export default NavBar;