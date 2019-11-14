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
  Grid,   
  Button
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
  addServerArea: {
    width: '100%',
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
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
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  addServerButton: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
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
        
        <Navbar />

        <main style={{ padding: 20}}>      

          <div className="classes.row">
                        
                <h2>Servers</h2>

                  <div>
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
                              <Button size="small" variant="contained" className={classes.button} onClick={() => this._onRemoveServerClick(server.name)}>
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

                  <Paper className={classes.addServerArea}>               
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="txtAddName"
                          name="txtAddName"
                          label="Server name"
                          fullWidth
                          autoFocus
                          inputRef = {this.state.addNameInput} 
                          value={this.state.AddServerName} 
                          onChange={this._onAddServerNameChange}
                          placeholder="Dev server"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          id="txtAddUrl"
                          name="txtAddUrl"
                          label="Server url"
                          fullWidth
                          value={this.state.AddServerUrl} 
                          onChange={this._onAddServerUrlChange} 
                          placeholder="http://dev.server:8086" 
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="txtAddUsername"
                          name="txtAddUsername"
                          label="Username"
                          fullWidth
                          value={this.state.AddServerUsername} 
                          onChange={this._onAddServerUsernameChange} 
                          placeholder="username" 
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="txtAddPassword"
                          name="txtAddPassword"
                          label="Password"
                          fullWidth
                          value={this.state.AddServerPassword} 
                          onChange={this._onAddServerPasswordChange} 
                          placeholder="password" 
                          autoComplete="off"
                        />
                      </Grid>
                      
                    </Grid>

                    <div className={classes.buttons}>                      
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this._onAddServerClick}
                        className={classes.addServerButton}
                      >
                        Add server
                      </Button>
                    </div>
                  </Paper>
                    
                  </form>

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

    let protocol = parser.protocol || "http:";
    let path = ""
    if(parser.pathname !== "/" || parser.hash !== "" || parser.search !== ""){
      path = parser.pathname + parser.hash + parser.search;
    }

    let serverUrl = `${protocol}//${parser.host}${path}`;

    //  Add the server
    console.log("Adding server..." + this.state.AddServerName);
    SettingsAPI.addServer(this.state.AddServerName, serverUrl, this.state.AddServerUsername, this.state.AddServerPassword);
    
    //  If we have a current server:
    if(SettingsStore.haveCurrentServer()){
      //  Get the current server:
      let currentServer = SettingsStore.getCurrentServer();

      //  Reset the database list:
      console.log("Settings page - server added, so refreshing datbase list");
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
  }

  _onRemoveServerClick(name) {
    console.log("Removing server..." + name);

    SettingsAPI.removeServer(name);

    if(SettingsStore.haveCurrentServer()){
      //  Get the current server:
      let currentServer = SettingsStore.getCurrentServer();

      //  Reset the database list:
      console.log("Settings page - server removed, so refreshing database list");
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

export default withStyles(styles)(Settings);
