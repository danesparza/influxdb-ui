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
                        Dropdown
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem disabled>Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Another Action</DropdownItem>
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