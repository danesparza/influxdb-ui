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

    let currentServer = "Not setup";

    //  We'll need to create NavBarServerlist and NavBarDatabaseList components
    //  We can render those in the appropriate places.
    //  We need to do this so that when there are no servers (or only one server?) we can 
    //  make a decision to render the list or not
    
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light d-print-none">
        <NavbarBrand href="/#/">InfluxDB UI</NavbarBrand>
        <NavbarToggler onClick={this.navtoggle} />
        <Collapse isOpen={this.state.navisOpen} navbar>
          <Nav navbar>
            <NavDropdown isOpen={this.state.serverdropdownisOpen} toggle={this.serverdropdowntoggle}>
              <DropdownToggle nav caret>
                Server: {currentServer}
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