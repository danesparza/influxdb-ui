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

//  Actions
import SettingsAPI from '../utils/SettingsAPI';

//  Stylesheets & images
import './../App.css';
import 'bootstrap/dist/css/bootstrap.css';

class NavBar extends Component {  

  constructor(props) {
    super(props);

    this.state = {
      navisOpen: false,
      Servers: SettingsStore.getServerList() || [],
      DatabaseList: SettingsStore.getDatabaseList() || [],
      CurrentServer: SettingsStore.getCurrentServer(),
      CurrentDatabase: SettingsStore.getCurrentDatabase(),
    };    
  }

  navtoggle = () => {
    this.setState({
      navisOpen: !this.state.navisOpen
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
            <NavDatabaseList databases={this.state.DatabaseList} currentdatabase={this.state.CurrentDatabase} />
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
      DatabaseList: SettingsStore.getDatabaseList() || [],
      CurrentServer: SettingsStore.getCurrentServer() || "",
      CurrentDatabase: SettingsStore.getCurrentDatabase() || "",
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

    let currentServer = this.props.currentserver.name;

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

//  NavDatabaseList Displays the database list dropdown in the NavBar
class NavDatabaseList extends Component {
  
    constructor(props) {
      super(props);
  
      this.state = {
        databasedropdownisOpen: false
      };    
    }
  
    render() {
      //  If we don't have a list of databases, don't return anything:
      if(this.props.databases.length <= 1) {
        return null;
      }
  
      let currentDatabase = this.props.currentdatabase;
  
      return (
        <NavDropdown isOpen={this.state.databasedropdownisOpen} toggle={this.dbdropdowntoggle}>
          <DropdownToggle nav caret>
            Database: {currentDatabase}
          </DropdownToggle>
          <DropdownMenu>
            {this.props.databases.map(function(database, index) {
                return <DropdownItem key={index} onClick={this.dbitemclick}>{database}</DropdownItem>;
            }, this)}
          </DropdownMenu>
        </NavDropdown>
      );
    }
  
    dbdropdowntoggle = () => {
      this.setState({
        databasedropdownisOpen: !this.state.databasedropdownisOpen
      });
    }

    dbitemclick = (e) => {
      SettingsAPI.setCurrentDatabase(e.target.innerText);
    }
  }

export default NavBar;