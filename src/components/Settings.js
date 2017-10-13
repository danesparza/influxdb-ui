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

                <div className="settings-explanation">
                  This is a list of InfluxDB servers you can connect to. 
                </div>

                <ul className="list-group">
                  <li className="d-flex list-group-item justify-content-start flex-wrap">
                    <div className="p-2"><h5>Dev</h5>http://chile.lan:8086 <span className="badge badge-success">Default</span></div>
                    <div className="ml-auto p-2"><button className="btn btn-outline-danger btn-sm">Delete</button></div>
                  </li>
                  <li className="d-flex list-group-item justify-content-start flex-wrap">
                  <div className="p-2"><h5>Test</h5>http://testserver:8086</div>
                    <div className="ml-auto p-2"><button className="btn btn-outline-danger btn-sm">Delete</button></div>
                  </li>
                  <li className="d-flex list-group-item justify-content-start flex-wrap">
                    <div className="p-2"><h5>Prod</h5>http://prodserver:8086</div>
                    <div className="ml-auto p-2"><button className="btn btn-outline-danger btn-sm">Delete</button></div>
                  </li>
                </ul>

              </div>


            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Settings;