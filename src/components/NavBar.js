//  React and reactstrap
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import {
  AppBar, 
  Toolbar, 
  Typography, 
  Button
} from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/Receipt';

//  Stores
import SettingsStore from '../stores/SettingsStore';

//  Actions
import SettingsAPI from '../utils/SettingsAPI';
import InfluxAPI from '../utils/InfluxAPI';

const styles = theme => ({
  toolbarTitle: {
    flex: 1,
  },
  navbutton: {
    margin: theme.spacing(.5),
    color: "#efefef"
  },
});

class NavBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      Servers: SettingsStore.getServerList() || [],
      DatabaseList: SettingsStore.getDatabaseList() || [],
      CurrentServer: SettingsStore.getCurrentServer(),
      CurrentDatabase: SettingsStore.getCurrentDatabase(),
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

        <AppBar position="relative">
          <Toolbar>
            <ReceiptIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              InfluxDB UI
            </Typography>
            <Button className={classes.navbutton} href="/#/">
              Query
            </Button>
            <Button className={classes.navbutton} href="/#/history/">
              History
            </Button>
            <Button className={classes.navbutton} href="/#/settings/">
              Settings
            </Button>
            <Button className={classes.navbutton} href="https://docs.influxdata.com/influxdb/">
              Docs
            </Button>
          </Toolbar>
        </AppBar>
          
      </React.Fragment>
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
      <div>Server list</div>
    );
  }

  serverdropdowntoggle = () => {
    this.setState({
      serverdropdownisOpen: !this.state.serverdropdownisOpen
    });
  }

  itemclick = (e) => {
    SettingsAPI.setCurrentServer(e.target.innerText);

    //  Get the current server:
    let currentServer = SettingsStore.getCurrentServer();
    console.log(currentServer);

    //  Reset the database list:
    InfluxAPI.getDatabaseList(currentServer.url, currentServer.username, currentServer.password);
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
        <div>Database list</div>
      );
    }

    dbdropdowntoggle = () => {
      this.setState({
        databasedropdownisOpen: !this.state.databasedropdownisOpen
      });
    }

    itemclick = (e) => {
      SettingsAPI.setCurrentDatabase(e.target.innerText);
    }
  }

export default withStyles(styles)(NavBar);
