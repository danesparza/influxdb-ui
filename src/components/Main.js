//  React
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import {
  CssBaseline, 
  TextField, 
  Button, 
  Menu, 
  MenuItem
} from '@material-ui/core';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

//  Components
import Navbar from './NavBar';
import QueryResultList from './QueryResultList';
import QueryErrorDisplay from './QueryErrorDisplay';

//  Utilities
import InfluxAPI from '../utils/InfluxAPI';
import HistoryAPI from '../utils/HistoryAPI';

//  Stores
import QueryDataStore from '../stores/QueryDataStore';
import SettingsStore from '../stores/SettingsStore';

const styles = theme => ({
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
});

class Main extends Component {  

  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      dropdownOpen: false,
      needCurrentServer: SettingsStore.needCurrentServer(),
      server: SettingsStore.getCurrentServer(),
      database: SettingsStore.getCurrentDatabase(),
      queryText: QueryDataStore.getQueryRequest(),
      QueryHasError: false,
      QueryResults: QueryDataStore.getQueryResults(),
      QueryError: QueryDataStore.getQueryError()
    };
  }

  componentDidMount(){    
      //  Add store listeners ... and notify ME of changes
      this.queryDataListener = QueryDataStore.addListener(this._onChange);
      this.settingsListener = SettingsStore.addListener(this._onChange);
  }

  componentWillUnmount() {
      //  Remove store listeners
      this.queryDataListener.remove();
      this.settingsListener.remove();
  }

  render() {
    const { classes } = this.props;

    //  If we need to setup a server, go to settings:
    if(this.state.needCurrentServer){
      window.location.hash = "#/settings";
      return null;
    }

    return (
      <React.Fragment>        
        <CssBaseline />
        
        <Navbar {...this.props} />

        <main style={{ padding: 20}}>
          
          <form onSubmit={this._onQuerySubmit} className={classes.container} >
            <TextField
              id="influxQuery"
              label="Query"
              autoFocus
              className={classes.textField}
              value={this.state.queryText}
              onChange={this._onQueryChange}
              margin="normal"
              fullWidth
            />                               
          </form>
          
          <div className={classes.row}>
            <span className={classes.spacer} />

            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
              Query templates <ArrowDropDownIcon />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.showDatabasesText}>Show databases</MenuItem>
              <MenuItem onClick={this.createDatabaseText}>Create database</MenuItem>                
              <MenuItem onClick={this.dropDatabasesText}>Drop database</MenuItem>
              <MenuItem onClick={this.showMeasurementsText}>Show measurements</MenuItem>
              <hr />                
              <MenuItem onClick={this.showTagKeysText}>Show tag keys</MenuItem>
              <MenuItem onClick={this.showTagValuesText}>Show tag values</MenuItem>
              <hr />
              <MenuItem onClick={this.showRetentionPolicyText}>Show retention policies</MenuItem>
              <MenuItem onClick={this.createRetentionPolicyText}>Create retention policy</MenuItem>
              <MenuItem onClick={this.dropRetentionPolicyText}>Drop retention policy</MenuItem>
              <hr />
              <MenuItem onClick={this.showContinuousQueryText}>Show continuous queries</MenuItem>
              <MenuItem onClick={this.createContinuousQueryText}>Create continuous query</MenuItem>
              <MenuItem onClick={this.dropContinuousQueryText}>Drop continuous query</MenuItem>
              <hr />
              <MenuItem onClick={this.showUserText}>Show users</MenuItem>
              <MenuItem onClick={this.createUserText}>Create user</MenuItem>
              <MenuItem onClick={this.createAdminUserText}>Create admin user</MenuItem>
              <MenuItem onClick={this.dropUserText}>Drop user</MenuItem>
              <hr />
              <MenuItem onClick={this.showStatsText}>Show stats</MenuItem>
              <MenuItem onClick={this.showDiagnosticsText}>Show diagnostics</MenuItem>
            </Menu>
          </div>

          
            
          <div id="queryResults">
            <QueryErrorDisplay haserror={this.state.QueryHasError} error={this.state.QueryError} />
            <QueryResultList results={this.state.QueryResults} />
          </div>

        </main>        
      </React.Fragment>
    );
  }

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    });
  }

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  }

  _onQueryChange = (e) => {
    this.setState({
      queryText: e.target.value
    });
  }

  //  Show databases
  showDatabasesText = () => {
    this.setState({
      queryText: "SHOW DATABASES",
      anchorEl: null
    });
  };

  //  Create database
  createDatabaseText = () => {
    this.setState({
      queryText: `CREATE DATABASE "db_name"`,
      anchorEl: null
    });    
  };

  //  Drop database
  dropDatabasesText = () => {
    this.setState({
      queryText: `DROP DATABASE "db_name"`,
      anchorEl: null
    });
  };

  //  Show measurements
  showMeasurementsText = () => {
    this.setState({
      queryText: "SHOW MEASUREMENTS",
      anchorEl: null
    });
  };

  //  Show tag keys
  showTagKeysText = () => {
    this.setState({
      queryText: `SHOW TAG KEYS FROM "measurement_name"`,
      anchorEl: null
    });
  };

  //  Show tag values
  showTagValuesText = () => {
    this.setState({
      queryText: `SHOW TAG VALUES FROM "measurement_name" WITH KEY = "tag_key"`,
      anchorEl: null
    });
  };

  //  Show retention policies
  showRetentionPolicyText = () => {
    this.setState({
      queryText: `SHOW RETENTION POLICIES ON "db_name"`,
      anchorEl: null
    });
  };

  //  Create retention policy
  createRetentionPolicyText = () => {
    this.setState({
      queryText: `CREATE RETENTION POLICY "rp_name" ON "db_name" DURATION 30d REPLICATION 1 DEFAULT`,
      anchorEl: null
    });
  };

  //  Drop retention policy
  dropRetentionPolicyText = () => {
    this.setState({
      queryText: `DROP RETENTION POLICY "rp_name" ON "db_name"`,
      anchorEl: null
    });
  };

  //  Show continuous queries
  showContinuousQueryText = () => {
    this.setState({
      queryText: `SHOW CONTINUOUS QUERIES`,
      anchorEl: null
    });
  };

  //  Create continuous query
  createContinuousQueryText = () => {
    this.setState({
      queryText: `CREATE CONTINUOUS QUERY "cq_name" ON "db_name" BEGIN SELECT min("field") INTO "target_measurement" FROM "current_measurement" GROUP BY time(30m) END`,
      anchorEl: null
    });
  };

  //  Drop continuous query
  dropContinuousQueryText = () => {
    this.setState({
      queryText: `DROP CONTINUOUS QUERY "cq_name" ON "db_name"`,
      anchorEl: null
    });
  };

  //  Show users
  showUserText = () => {
    this.setState({
      queryText: `SHOW USERS`,
      anchorEl: null
    });
  };

  //  Create user
  createUserText = () => {
    this.setState({
      queryText: `CREATE USER "username" WITH PASSWORD 'password'`,
      anchorEl: null
    });
  };

  //  Create admin user
  createAdminUserText = () => {
    this.setState({
      queryText: `CREATE USER "username" WITH PASSWORD 'password' WITH ALL PRIVILEGES`,
      anchorEl: null
    });
  };

  //  Drop user
  dropUserText = () => {
    this.setState({
      queryText: `DROP USER "username"`,
      anchorEl: null
    });
  };

  //  Show stats
  showStatsText = () => {
    this.setState({
      queryText: `SHOW STATS`,
      anchorEl: null
    });
  };

  //  Show diagnostics
  showDiagnosticsText = () => {
    this.setState({
      queryText: `SHOW DIAGNOSTICS`,
      anchorEl: null
    });
  };

  //  Form submission (or 'enter' press in the query field)
  _onQuerySubmit= (e) => {
    e.preventDefault();

    const query = this.state.queryText;

    InfluxAPI.getQueryResults(this.state.server.url,this.state.server.username, this.state.server.password, this.state.database, query)
        .then(function () {
          // Remember the request
          HistoryAPI.rememberRequest(query);
        })
        .catch(function (err) {
          console.log('Fetch Error :-S', err);
        });
  }

  //  Data changed:
  _onChange = () => {
    this.setState({
      queryText: QueryDataStore.getQueryRequest(),
      QueryHasError: QueryDataStore.hasError(),
      QueryResults: QueryDataStore.getQueryResults(),
      QueryError: QueryDataStore.getQueryError(),
      needCurrentServer: SettingsStore.needCurrentServer(),
      server: SettingsStore.getCurrentServer(),
      database: SettingsStore.getCurrentDatabase()
    });
  }

  //  Focus input on the query textbox
  focusQueryInput = () => {
    this.influxQuery.focus();
  };
}

export default withStyles(styles)(Main);
