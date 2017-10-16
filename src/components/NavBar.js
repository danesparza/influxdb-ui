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

//  Stores
import SettingsStore from '../stores/SettingsStore';

//  Stylesheets & images
import './../App.css';
import 'bootstrap/dist/css/bootstrap.css';

class NavBar extends Component {  

  constructor(props) {
    super(props);

    this.state = {
      navisOpen: false,
      Servers: SettingsStore.getServerList() || [],
      CurrentServer: SettingsStore.getCurrentServer() || "",
      serverdropdownisOpen: false,
      databasedropdownisOpen: false,
    };    
  }

  navtoggle = () => {
    this.setState({
      navisOpen: !this.state.navisOpen
    });
  }

  databasedropdowntoggle = () => {
    this.setState({
      databasedropdownisOpen: !this.state.databasedropdownisOpen
    });
  }

  componentDidMount(){    
    //  Add store listeners ... and notify ME of changes
    this.settingsListener = SettingsStore.addListener(this._onChange);
  }

  componentWillUnmount() {
      //  Remove store listeners
      this.settingsListener.remove();
  }

  render() {

    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light d-print-none">
        <NavbarBrand href="/#/">InfluxDB UI</NavbarBrand>
        <NavbarToggler onClick={this.navtoggle} />
        <Collapse isOpen={this.state.navisOpen} navbar>
          <Nav navbar>
            <NavServerList servers={this.state.Servers} currentserver={this.state.CurrentServer} />
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

  //  Data changed:
  _onChange = () => {
    this.setState({
      Servers: SettingsStore.getServerList() || [],
      CurrentServer: SettingsStore.getCurrentServer() || "",
    });
  }

}

//  NavServerList Displays the server list dropdown in the NavBar
class NavServerList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      serverdropdownisOpen: false,
      databasedropdownisOpen: false,
    };    
  }

  render() {
    //  If we don't have a list of servers, don't return anything:
    if(this.props.servers.length <= 1) {
      return null;
    }

    let currentServer = this.props.currentserver || "Not set";

    return (
      <NavDropdown isOpen={this.state.serverdropdownisOpen} toggle={this.serverdropdowntoggle}>
        <DropdownToggle nav caret>
          Server: {currentServer}
        </DropdownToggle>
        <DropdownMenu>
          {this.props.servers.map(function(server, index) {
              return <DropdownItem key={index}>{server.name}</DropdownItem>;
          }, this)}
        </DropdownMenu>
      </NavDropdown>
    );
  }

  serverdropdowntoggle = () => {
    this.setState({
      serverdropdownisOpen: !this.state.serverdropdownisOpen
    });
  }
}

export default NavBar;