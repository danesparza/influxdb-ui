//  React
import React, { Component } from 'react';

//  Components
import Navbar from './NavBar';

class Settings extends Component {

  constructor() {
    super();
    this.state = {
      ServerName: "",
      ServerURL: ""
    };
  }

  render() {
    //  Look at something like Github email address list for UI example of 
    //  something that might work as a 'server list'

    return (
      <div>
        <Navbar {...this.props} />

        <div className="container">
          <div className="row">
            <div className="col">

              <p className="lead text-muted settings-header">Servers</p>
              <div className="rounded settings-group">

                <small>This is a list of InfluxDB servers you can connect to.  Remove any servers you don't recognize.</small>

                <div className="list-group">
                  <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">Dev</h5>
                      <button className="btn btn-outline-danger btn-sm">Delete</button>
                    </div>
                    <p className="mb-1">http://chile.lan:8086</p>
                  </a>
                  <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">Test</h5>
                      <button className="btn btn-outline-danger btn-sm">Delete</button>
                    </div>
                    <p className="mb-1">http://testserver:8086</p>
                  </a>
                  <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">Prod</h5>
                      <button className="btn btn-outline-danger btn-sm">Delete</button>
                    </div>
                    <p className="mb-1">http://prodserver:8086</p>
                  </a>
                </div>

              </div>


            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Settings;