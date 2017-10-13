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

                <table className="table table-responsive">
                  <thead className="thead-default">
                    <tr>
                      <th>Name</th>
                      <th>Url</th>
                      <th>Default</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        Dev
                      </td>
                      <td>
                        http://chile.lan:8086
                      </td>
                      <td>
                        <span className="badge badge-success">Default</span>
                      </td>
                      <td>
                        <button className="btn btn-outline-danger btn-sm">Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Test
                      </td>
                      <td>
                        http://Testserver:8086
                      </td>
                      <td>
                        
                      </td>
                      <td>
                        <button className="btn btn-outline-danger btn-sm">Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Prod
                      </td>
                      <td>
                        http://prodserver:8086
                      </td>
                      <td>
                        
                      </td>
                      <td>
                        <button className="btn btn-outline-danger btn-sm">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <h5>Add a server</h5>
                Form body here

              </div>


            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Settings;