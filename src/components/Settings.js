//  React
import React, { Component } from 'react';

//  Components
import Navbar from './NavBar';

class Settings extends Component {

  constructor(){
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

              <p className="lead text-muted">Servers</p>
              <div className="rounded settings-group">

                <div className="form-group row">
                  <label htmlFor="txtServerName" className="col-sm-3 col-form-label font-weight-bold">ServerName</label>
                  <div className="col-sm-9">
                    <input id="txtServerName" className="form-control" type="text" maxLength="200" aria-describedby="txtServerNameHelp" />
                    <small id="txtServerNameHelp" className="text-muted">Used in the web display and notifications</small>
                  </div>
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