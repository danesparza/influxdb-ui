//  React
import React, { Component } from 'react';

//  Material-UI
import { withStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
  Paper, 
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField, 
  Button, 
  Menu, 
  MenuItem,
  Divider,
  FormControl,
  InputLabel,
  Select
} from '@material-ui/core';

//  Components
import Navbar from './NavBar';

//  Utils
import SettingsAPI from '../utils/SettingsAPI';
import InfluxAPI from '../utils/InfluxAPI';

//  Stores
import SettingsStore from '../stores/SettingsStore';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  table: {
    minWidth: 650,
  },
  spacer: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1),
  },
});

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
    const { classes } = this.props;
    
    return (
      <React.Fragment>
        <CssBaseline />
        
        <Navbar {...this.props} />

        <main style={{ padding: 20}}>      

          <div className="classes.row">
                        
                <h2>Servers</h2>
                <div className="rounded settings-group">

                  <div className="settings-explanation">
                    This is a list of InfluxDB servers you can connect to. 
                  </div>

                  <Paper className={classes.root}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Url</TableCell>
                          <TableCell>Username</TableCell>
                          <TableCell>Password</TableCell>
                          <TableCell align="right">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.Servers.map(server => (
                          <TableRow key={server.name}>
                            <TableCell component="th" scope="row">
                              {server.name}
                            </TableCell>
                            <TableCell>{server.url}</TableCell>
                            <TableCell>{server.username}</TableCell>
                            <TableCell>{server.password}</TableCell>
                            <TableCell align="right">
                              <Button size="small" variant="contained" className={classes.button}>
                                Remove
                              </Button>             
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>                  

                  <h3>Add a server</h3>                  
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
                        <label className="sr-only" htmlFor="txtAddUsername">Username</label>
                        <input type="text" className="form-control" id="txtAddUsername" value={this.state.AddServerUsername} onChange={this._onAddServerUsernameChange} placeholder="username" autoComplete="off"/>
                      </div>

                      <div className="col">
                        <label className="sr-only" htmlFor="txtAddPassword">Password</label>
                        <input type="password" className="form-control" id="txtAddPassword" value={this.state.AddServerPassword} onChange={this._onAddServerPasswordChange} placeholder="password" autoComplete="off"/>
                      </div>

                      <div className="col">
                        <button type="submit" className="btn btn-secondary">Add</button>
                      </div>
                    </div>
                    
                  </form>

                </div>

              

            </div>
          </main>
        </React.Fragment>     
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

  _onAddServerUsernameChange = (e) => {
    this.setState({
      AddServerUsername: e.target.value
    });
  }

  _onAddServerPasswordChange = (e) => {
    this.setState({
      AddServerPassword: e.target.value
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
    let path = ""
    if(parser.pathname !== "/" || parser.hash !== "" || parser.search !== ""){
      path = parser.pathname + parser.hash + parser.search;
    }

    let serverUrl = `${protocol}//${parser.hostname}:${port}${path}`;

    //  Add the server
    console.log("Adding server..." + this.state.AddServerName);
    SettingsAPI.addServer(this.state.AddServerName, serverUrl, this.state.AddServerUsername, this.state.AddServerPassword);
    
    //  If we have a current server:
    if(SettingsStore.haveCurrentServer()){
      //  Get the current server:
      let currentServer = SettingsStore.getCurrentServer();

      //  Reset the database list:
      InfluxAPI.getDatabaseList(currentServer.url, currentServer.username, currentServer.password);
    }

    //  Clear the add server fields:
    this.setState(
      {
        AddServerName: "",
        AddServerUrl: "",
        AddServerUsername: "",
        AddServerPassword: "",
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
      InfluxAPI.getDatabaseList(currentServer.url, currentServer.username, currentServer.password);
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

export default withStyles(styles)(Settings);
