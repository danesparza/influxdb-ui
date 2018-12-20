//  React
import React, { Component } from 'react';

//  Components
import Navbar from './NavBar';

//  Utils
import SettingsAPI from '../utils/SettingsAPI';
import InfluxAPI from '../utils/InfluxAPI';

//  Stores
import SettingsStore from '../stores/SettingsStore';

class Settings extends Component {

  constructor(props) {
    super(props);

    this.state = {
      Servers: SettingsStore.getServerList() || [],
      AddServerName: "",
      AddServerUrl: "",
    };
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
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.Servers.map(function(server, index) {
                          return <tr key={index}><td>{server.name}</td><td>{server.url}</td><td><DeleteButton name={server.name} onDelete={this._onRemoveServerClick} /></td></tr>;
                      }, this)}
                    </tbody>
                  </table>

                  <h5>Add a server</h5>
                  <form onSubmit={this._onAddServerClick}>
                    <div className="form-row">
                      <div className="col">
                        <label className="sr-only" htmlFor="txtAddName">Server name</label>
                        <input type="text" autoFocus ref={(input) => { this.addName = input; }} className="form-control" id="txtAddName" value={this.state.AddServerName} onChange={this._onAddServerNameChange} placeholder="Dev server" required/>
                      </div>
                      
                      <div className="col">
                        <label className="sr-only" htmlFor="txtAddUrl">Server url</label>
                        <input type="url" className="form-control" id="txtAddUrl" value={this.state.AddServerUrl} onChange={this._onAddServerUrlChange} placeholder="http://dev.server:8086" required/>
                      </div>

                      <div className="col">
                        <button type="submit" className="btn btn-secondary">Add</button>
                      </div>
                    </div>
                  </form>

                </div>

              

            </div>
          </div>
        </div>
      </div>
    );
  }

  _onAddServerNameChange = (e) => {
    this.setState({
      AddServerName: e.target.value
    });
  }

  _onAddServerUrlChange = (e) => {
    this.setState({
      AddServerUrl: e.target.value
    });
  }

  _onAddServerClick = (e) => {
    e.preventDefault();

    //  Format the url
    //  See https://gist.github.com/jlong/2428561 for more information    
    let parser = document.createElement('a');
    parser.href = this.state.AddServerUrl;

    let port = parser.port || "80";
    let protocol = parser.protocol || "http:";
    let path = parser.pathname + parser.hash + parser.search || "";

    let serverUrl = `${protocol}//${parser.hostname}:${port}${path}`;

    //  Add the server
    console.log("Adding server..." + this.state.AddServerName);
    SettingsAPI.addServer(this.state.AddServerName, serverUrl);
    
    //  If we have a current server:
    if(SettingsStore.haveCurrentServer()){
      //  Get the current server:
      let currentServer = SettingsStore.getCurrentServer();

      //  Reset the database list:
      InfluxAPI.getDatabaseList(currentServer.url);
    }

    //  Clear the add server fields:
    this.setState(
      {
        AddServerName: "",
        AddServerUrl: ""
      }
    );

    //  Set focus to the name again:
    this.addName.focus();
  }

  _onRemoveServerClick = (name) => {
    console.log("Removing server..." + name);
    SettingsAPI.removeServer(name);

    if(SettingsStore.haveCurrentServer()){
      //  Get the current server:
      let currentServer = SettingsStore.getCurrentServer();

      //  Reset the database list:
      InfluxAPI.getDatabaseList(currentServer.url);
    }
  }

  //  Data changed:
  _onChange = () => {
    this.setState({
      Servers: SettingsStore.getServerList()
    });
  }

}

//  DeleteButton handles rendering of the server delete button and the associated click event
//  See https://stackoverflow.com/a/29810951/19020 for why this is a good idea
//  Also:  Notice the 'onDelete' prop is a function that will handle the delete
class DeleteButton extends Component {
  handleClick = (e) => {
    e.preventDefault();
    this.props.onDelete(this.props.name);
  }

  render() {
    return (
      <button className="btn btn-outline-danger btn-sm" onClick={this.handleClick}>Delete</button>
    );
  }
}

export default Settings;
