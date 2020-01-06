//  React
import React, { Component } from 'react';

//  Material-UI
import { withStyles } from '@material-ui/core/styles';
import {
  CssBaseline, 
  Paper, 
  TextField, 
  Button, 
  Menu, 
  MenuItem,
  Divider,
  FormControl,
  InputLabel,
  Select
} from '@material-ui/core';

//  Icons
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

//  Actions
import NavActions from '../actions/NavActions';

//  Components
import Navbar from './NavBar';
import QueryResultList from './QueryResultList';
import QueryErrorDisplay from './QueryErrorDisplay';
import DatabaseSelector from './selectors/DatabaseSelector';
import ErrorBoundary from './ErrorBoundary';

//  Utilities
import InfluxAPI from '../utils/InfluxAPI';
import HistoryAPI from '../utils/HistoryAPI';

//  Stores
import QueryDataStore from '../stores/QueryDataStore';
import SettingsStore from '../stores/SettingsStore';

const styles = theme => ({  
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
});

class Main extends Component {  

  constructor(props) {
    super(props);

    this.state = {
      queryText: props.currentExpression || "",
      QueryHasError: false,
      QueryResults: QueryDataStore.getQueryResults(),
      QueryTime: QueryDataStore.getQueryElapsedTime(),
      QueryError: QueryDataStore.getQueryError(),      
    };
  }

  componentDidMount(){    
      //  Add store listeners ... and notify ME of changes
      this.queryDataListener = QueryDataStore.addListener(this._onChange);
  }

  componentWillUnmount() {
      //  Remove store listeners
      this.queryDataListener.remove();
  }

  render() {
    const { classes, servers, currentServer, currentDatabase } = this.props;

    return (      
      <React.Fragment>        
        <CssBaseline />
        
        <Navbar />

        <main style={{ padding: 20}}>      

          <div id="queryservers">
            <FormControl style={{marginRight: 20}}>
              <InputLabel htmlFor="selServer">Server</InputLabel>
              <Select
                native
                value={currentServer}
                onChange={this.handleServerSelect}
                inputProps={{
                  name: 'selServer',
                  id: 'selServer',
                }}
              >
                {servers.map(server => (
                  <option key={server.url} value={server.url}>{server.name}</option>                    
                ))}
              </Select>
            </FormControl>

            <ErrorBoundary>
              <DatabaseSelector servers={servers} currentServer={currentServer} currentDatabase={currentDatabase} />
            </ErrorBoundary>            

          </div>
          
          <Paper id="queryinputpaper">
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
            
            <div id="queryinput">
              <span className="spacer" />

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
                <Divider/>                
                <MenuItem onClick={this.showMeasurementsText}>Show measurements</MenuItem>
                <MenuItem onClick={this.showTagKeysText}>Show tag keys</MenuItem>
                <MenuItem onClick={this.showTagValuesText}>Show tag values</MenuItem>
                <Divider/>      
                <MenuItem onClick={this.showRetentionPolicyText}>Show retention policies</MenuItem>
                <MenuItem onClick={this.createRetentionPolicyText}>Create retention policy</MenuItem>
                <MenuItem onClick={this.dropRetentionPolicyText}>Drop retention policy</MenuItem>
                <Divider/>      
                <MenuItem onClick={this.showContinuousQueryText}>Show continuous queries</MenuItem>
                <MenuItem onClick={this.createContinuousQueryText}>Create continuous query</MenuItem>
                <MenuItem onClick={this.dropContinuousQueryText}>Drop continuous query</MenuItem>
                <Divider/>      
                <MenuItem onClick={this.showUserText}>Show users</MenuItem>
                <MenuItem onClick={this.createUserText}>Create user</MenuItem>
                <MenuItem onClick={this.createAdminUserText}>Create admin user</MenuItem>
                <MenuItem onClick={this.dropUserText}>Drop user</MenuItem>
                <Divider/>      
                <MenuItem onClick={this.showStatsText}>Show stats</MenuItem>
                <MenuItem onClick={this.showDiagnosticsText}>Show diagnostics</MenuItem>
              </Menu>
            </div>
          </Paper>
          
            
          <div id="queryresults">
            <QueryErrorDisplay haserror={this.state.QueryHasError} error={this.state.QueryError} />
            <QueryResultList results={this.state.QueryResults} resulttime={this.state.QueryTime} />
          </div>

        </main>        
      </React.Fragment>
    );
  }

  handleServerSelect = (event) => {  

    console.log("Main - Adjusting URI to use the server url: ", event.target.value);

    //  Switch the server through the url:
    window.location.hash = `#/query/${encodeURIComponent(event.target.value)}`;

  };

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    });
    event.stopPropagation();
  }

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  }

  _onQueryChange = (e) => {
    e.stopPropagation();
    this.setState({
      queryText: e.target.value
    });
  }

  //  Show databases
  showDatabasesText = (e) => {
    this.setState({
      queryText: "SHOW DATABASES",
      anchorEl: null
    });
    e.stopPropagation();
  };

  //  Create database
  createDatabaseText = (e) => {
    this.setState({
      queryText: `CREATE DATABASE "db_name"`,
      anchorEl: null
    });    
    e.stopPropagation();
  };

  //  Drop database
  dropDatabasesText = (e) => {
    this.setState({
      queryText: `DROP DATABASE "db_name"`,
      anchorEl: null
    });
    e.stopPropagation();
  };

  //  Show measurements
  showMeasurementsText = (e) => {
    this.setState({
      queryText: "SHOW MEASUREMENTS",
      anchorEl: null
    });
    e.stopPropagation();
  };

  //  Show tag keys
  showTagKeysText = (e) => {
    this.setState({
      queryText: `SHOW TAG KEYS FROM "measurement_name"`,
      anchorEl: null
    });
    e.stopPropagation();
  };

  //  Show tag values
  showTagValuesText = (e) => {
    this.setState({
      queryText: `SHOW TAG VALUES FROM "measurement_name" WITH KEY = "tag_key"`,
      anchorEl: null
    });
    e.stopPropagation();
  };

  //  Show retention policies
  showRetentionPolicyText = (e) => {
    this.setState({
      queryText: `SHOW RETENTION POLICIES ON "db_name"`,
      anchorEl: null
    });
    e.stopPropagation();
  };

  //  Create retention policy
  createRetentionPolicyText = (e) => {
    this.setState({
      queryText: `CREATE RETENTION POLICY "rp_name" ON "db_name" DURATION 30d REPLICATION 1 DEFAULT`,
      anchorEl: null
    });
    e.stopPropagation();
  };

  //  Drop retention policy
  dropRetentionPolicyText = (e) => {
    this.setState({
      queryText: `DROP RETENTION POLICY "rp_name" ON "db_name"`,
      anchorEl: null
    });
    e.stopPropagation();
  };

  //  Show continuous queries
  showContinuousQueryText = (e) => {
    this.setState({
      queryText: `SHOW CONTINUOUS QUERIES`,
      anchorEl: null
    });
    e.stopPropagation();
  };

  //  Create continuous query
  createContinuousQueryText = (e) => {
    this.setState({
      queryText: `CREATE CONTINUOUS QUERY "cq_name" ON "db_name" BEGIN SELECT min("field") INTO "target_measurement" FROM "current_measurement" GROUP BY time(30m) END`,
      anchorEl: null
    });
    e.stopPropagation();
  };

  //  Drop continuous query
  dropContinuousQueryText = (e) => {
    this.setState({
      queryText: `DROP CONTINUOUS QUERY "cq_name" ON "db_name"`,
      anchorEl: null
    });
    e.stopPropagation();
  };

  //  Show users
  showUserText = (e) => {
    this.setState({
      queryText: `SHOW USERS`,
      anchorEl: null
    });
    e.stopPropagation();
  };

  //  Create user
  createUserText = (e) => {
    this.setState({
      queryText: `CREATE USER "username" WITH PASSWORD 'password'`,
      anchorEl: null
    });
    e.stopPropagation();
  };

  //  Create admin user
  createAdminUserText = (e) => {
    this.setState({
      queryText: `CREATE USER "username" WITH PASSWORD 'password' WITH ALL PRIVILEGES`,
      anchorEl: null
    });
    e.stopPropagation();
  };

  //  Drop user
  dropUserText = (e) => {
    this.setState({
      queryText: `DROP USER "username"`,
      anchorEl: null
    });
    e.stopPropagation();
  };

  //  Show stats
  showStatsText = (e) => {
    this.setState({
      queryText: `SHOW STATS`,
      anchorEl: null
    });
    e.stopPropagation();
  };

  //  Show diagnostics
  showDiagnosticsText = (e) => {
    this.setState({
      queryText: `SHOW DIAGNOSTICS`,
      anchorEl: null
    });
    e.stopPropagation();
  };

  //  Form submission (or 'enter' press in the query field)
  _onQuerySubmit= (e) => {
    e.preventDefault();
    e.stopPropagation();

    const expression = this.state.queryText;
    const { currentServer, currentDatabase } = this.props;

    //  Format our new url:
    let newUrl = `#/query/${encodeURIComponent(currentServer)}/${encodeURIComponent(currentDatabase)}/${encodeURIComponent(expression)}`;    

    //  Look up the current server:
    let selectedServer =  SettingsStore.getServer(currentServer);

    //  Start the ball rolling to get our results...
    InfluxAPI.getQueryResults(currentServer, selectedServer.username, selectedServer.password, currentDatabase, expression)
        .then(function () {
          
          // Remember the request (we should change this to remember the entire url):
          HistoryAPI.rememberRequest(newUrl, selectedServer, currentDatabase, expression);

        })
        .catch(function (err) {
          console.log('Fetch Error :-S', err);
        });    

    //  Update the query location:
    NavActions.receiveQueryLocation(newUrl);

    //  Change our url
    window.location.hash = newUrl;
  }

  //  Data changed:
  _onChange = () => {
    this.setState({
      QueryHasError: false,
      QueryResults: QueryDataStore.getQueryResults(),
      QueryTime: QueryDataStore.getQueryElapsedTime(),
      QueryError: QueryDataStore.getQueryError(),          
    });
  }

  //  Focus input on the query textbox
  focusQueryInput = () => {
    this.influxQuery.focus();
  };
}

export default withStyles(styles)(Main);
