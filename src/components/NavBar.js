//  React and reactstrap
import React, { Component } from 'react';
import {
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';

//  Stylesheets & images
import './../App.css';
import 'bootstrap/dist/css/bootstrap.css';

class NavBar extends Component {  

  constructor(props) {
    super(props);

    this.state = {
      navisOpen: false,
      serverdropdownisOpen: false,
      databasedropdownisOpen: false,
    };    
  }

  navtoggle = () => {
    this.setState({
      navisOpen: !this.state.navisOpen
    });
  }

  serverdropdowntoggle = () => {
    this.setState({
      serverdropdownisOpen: !this.state.serverdropdownisOpen
    });
  }

  databasedropdowntoggle = () => {
    this.setState({
      databasedropdownisOpen: !this.state.databasedropdownisOpen
    });
  }

  render() {
    
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light d-print-none">
        <NavbarBrand href="/#/">InfluxDB UI</NavbarBrand>
        <NavbarToggler onClick={this.navtoggle} />
        <Collapse isOpen={this.state.navisOpen} navbar>
          <Nav navbar>
            <NavDropdown isOpen={this.state.serverdropdownisOpen} toggle={this.serverdropdowntoggle}>
              <DropdownToggle nav caret>
                Server: Dev
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Dev</DropdownItem>
                <DropdownItem>Test</DropdownItem>
                <DropdownItem>Prod</DropdownItem>
              </DropdownMenu>
            </NavDropdown>
            <NavDropdown isOpen={this.state.databasedropdownisOpen} toggle={this.databasedropdowntoggle}>
              <DropdownToggle nav caret>
                Database: telegraf
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>_internal</DropdownItem>
                <DropdownItem>telegraf</DropdownItem>
                <DropdownItem>sensors</DropdownItem>
              </DropdownMenu>
            </NavDropdown>
          </Nav>
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