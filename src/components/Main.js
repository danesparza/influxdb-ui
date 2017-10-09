//  React
import React, { Component } from 'react';
import {
  Container,
  Dropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem,
} from 'reactstrap';

//  Components
import Navbar from './NavBar';

//  Stylesheets & images
import './../App.css';
import 'bootstrap/dist/css/bootstrap.css';

class Main extends Component {  

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,     
    };    
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {

    return (
        <div>
            <Navbar {...this.props} />

            <Container>
              <div className="row">
                <div className="col">
                  <div id="influxQuery" className="input-group">
                    <span className="input-group-addon" id="basic-addon1">Query:</span>
                    <input autoFocus type="text" className="form-control" aria-label="Influx query" aria-describedby="basic-addon1"/>
                  </div>
                </div>
              </div>
              <div className="row">
                  <div className="col text-right">
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                      <DropdownToggle caret>
                        Query templates
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>Show databases</DropdownItem>
                        <DropdownItem>Create database</DropdownItem>
                        <DropdownItem>Drop database</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Show measurements</DropdownItem>
                        <DropdownItem>Show tag keys</DropdownItem>
                        <DropdownItem>Show tag values</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Show retention policies</DropdownItem>
                        <DropdownItem>Create retention policy</DropdownItem>
                        <DropdownItem>Drop retention policy</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Show continuous queries</DropdownItem>
                        <DropdownItem>Create continuous query</DropdownItem>
                        <DropdownItem>Drop continuous query</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Show users</DropdownItem>
                        <DropdownItem>Create user</DropdownItem>
                        <DropdownItem>Create admin user</DropdownItem>
                        <DropdownItem>Drop user</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Show stats</DropdownItem>
                        <DropdownItem>Show diagnostics</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
              </div>

            </Container> 
        </div>
    );
  }
}

export default Main;