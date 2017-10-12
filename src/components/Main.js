//  React
import React, { Component } from 'react';
import {
  Dropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem,
} from 'reactstrap';

//  Components
import Navbar from './NavBar';
import QueryResultList from './QueryResultList';
import QueryErrorDisplay from './QueryErrorDisplay';

//  Utilities
import InfluxAPI from '../utils/InfluxAPI';

//  Stores
import QueryDataStore from '../stores/QueryDataStore';

//  Stylesheets & images
import './../App.css';
import 'bootstrap/dist/css/bootstrap.css';

class Main extends Component {  

  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      queryText: "",
      QueryHasError: false,
      QueryResults: QueryDataStore.getQueryResults(),
      QueryError: QueryDataStore.getQueryError()
    };
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
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

    return (
        <div>
            <Navbar {...this.props} />

            <div className="container-fluid">
              <div className="row">
                <div className="col">
                  <form onSubmit={this._onQuerySubmit}>
                    <div id="influxQuery" className="input-group">
                      <span className="input-group-addon" id="basic-addon1">Query:</span>
                      <input autoFocus ref={(input) => { this.queryInput = input; }} type="text" value={this.state.queryText} onChange={this._onQueryChange} className="form-control" aria-label="Influx query" aria-describedby="basic-addon1"/>
                    </div>
                  </form>
                </div>
              </div>

              <div className="row">
                  <div className="col text-right">
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                      <DropdownToggle caret>
                        Query templates
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={this.showDatabasesText}>Show databases</DropdownItem>
                        <DropdownItem onClick={this.createDatabaseText}>Create database</DropdownItem>
                        <DropdownItem onClick={this.dropDatabasesText}>Drop database</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={this.showMeasurementsText}>Show measurements</DropdownItem>
                        <DropdownItem onClick={this.showTagKeysText}>Show tag keys</DropdownItem>
                        <DropdownItem onClick={this.showTagValuesText}>Show tag values</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={this.showRetentionPolicyText}>Show retention policies</DropdownItem>
                        <DropdownItem onClick={this.createRetentionPolicyText}>Create retention policy</DropdownItem>
                        <DropdownItem onClick={this.dropRetentionPolicyText}>Drop retention policy</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={this.showContinuousQueryText}>Show continuous queries</DropdownItem>
                        <DropdownItem onClick={this.createContinuousQueryText}>Create continuous query</DropdownItem>
                        <DropdownItem onClick={this.dropContinuousQueryText}>Drop continuous query</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={this.showUserText}>Show users</DropdownItem>
                        <DropdownItem onClick={this.createUserText}>Create user</DropdownItem>
                        <DropdownItem onClick={this.createAdminUserText}>Create admin user</DropdownItem>
                        <DropdownItem onClick={this.dropUserText}>Drop user</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={this.showStatsText}>Show stats</DropdownItem>
                        <DropdownItem onClick={this.showDiagnosticsText}>Show diagnostics</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
              </div>

              <div className="row">
                <div className="col">
                  <div id="queryResults">
                    <QueryErrorDisplay haserror={this.state.QueryHasError} error={this.state.QueryError} />
                    <QueryResultList results={this.state.QueryResults} />
                  </div>
                </div>
              </div>

            </div> 
        </div>
    );
  }

  _onQueryChange = (e) => {
    this.setState({
      queryText: e.target.value
    });
  }

  //  Show databases
  showDatabasesText = () => {
    this.setState({
      queryText: "SHOW DATABASES"
    });
    this.focusQueryInput();
  };

  //  Create database
  createDatabaseText = () => {
    this.setState({
      queryText: `CREATE DATABASE "db_name"`
    });
    this.focusQueryInput();
  };

  //  Drop database
  dropDatabasesText = () => {
    this.setState({
      queryText: `DROP DATABASE "db_name"`
    });
    this.focusQueryInput();
  };

  //  Show measurements
  showMeasurementsText = () => {
    this.setState({
      queryText: "SHOW MEASUREMENTS"
    });
    this.focusQueryInput();
  };

  //  Show tag keys
  showTagKeysText = () => {
    this.setState({
      queryText: `SHOW TAG KEYS FROM "measurement_name"`
    });
    this.focusQueryInput();
  };

  //  Show tag values
  showTagValuesText = () => {
    this.setState({
      queryText: `SHOW TAG VALUES FROM "measurement_name" WITH KEY = "tag_key"`
    });
    this.focusQueryInput();
  };

  //  Show retention policies
  showRetentionPolicyText = () => {
    this.setState({
      queryText: `SHOW RETENTION POLICIES ON "db_name"`
    });
    this.focusQueryInput();
  };

  //  Create retention policy
  createRetentionPolicyText = () => {
    this.setState({
      queryText: `CREATE RETENTION POLICY "rp_name" ON "db_name" DURATION 30d REPLICATION 1 DEFAULT`
    });
    this.focusQueryInput();
  };

  //  Drop retention policy
  dropRetentionPolicyText = () => {
    this.setState({
      queryText: `DROP RETENTION POLICY "rp_name" ON "db_name"`
    });
    this.focusQueryInput();
  };

  //  Show continuous queries
  showContinuousQueryText = () => {
    this.setState({
      queryText: `SHOW CONTINUOUS QUERIES`
    });
    this.focusQueryInput();
  };

  //  Create continuous query
  createContinuousQueryText = () => {
    this.setState({
      queryText: `CREATE CONTINUOUS QUERY "cq_name" ON "db_name" BEGIN SELECT min("field") INTO "target_measurement" FROM "current_measurement" GROUP BY time(30m) END`
    });
    this.focusQueryInput();
  };

  //  Drop continuous query
  dropContinuousQueryText = () => {
    this.setState({
      queryText: `DROP CONTINUOUS QUERY "cq_name" ON "db_name"`
    });
    this.focusQueryInput();
  };

  //  Show users
  showUserText = () => {
    this.setState({
      queryText: `SHOW USERS`
    });
    this.focusQueryInput();
  };

  //  Create user
  createUserText = () => {
    this.setState({
      queryText: `CREATE USER "username" WITH PASSWORD 'password'`
    });
    this.focusQueryInput();
  };

  //  Create admin user
  createAdminUserText = () => {
    this.setState({
      queryText: `CREATE USER "username" WITH PASSWORD 'password' WITH ALL PRIVILEGES`
    });
    this.focusQueryInput();
  };

  //  Drop user
  dropUserText = () => {
    this.setState({
      queryText: `DROP USER "username"`
    });
    this.focusQueryInput();
  };

  //  Show stats
  showStatsText = () => {
    this.setState({
      queryText: `SHOW STATS`
    });
    this.focusQueryInput();
  };

  //  Show diagnostics
  showDiagnosticsText = () => {
    this.setState({
      queryText: `SHOW DIAGNOSTICS`
    });
    this.focusQueryInput();
  };

  //  Form submission (or 'enter' press in the query field)
  _onQuerySubmit= (e) => {
    e.preventDefault();
    console.log("Submitting query..." + this.state.queryText);

    InfluxAPI.getQueryResults("telegraf", this.state.queryText);
  }

  //  Data changed:
  _onChange = () => {
    this.setState({
      QueryHasError: QueryDataStore.hasError(),
      QueryResults: QueryDataStore.getQueryResults(),
      QueryError: QueryDataStore.getQueryError()
    });
  }

  //  Focus input on the query textbox
  focusQueryInput = () => {
    this.queryInput.focus();
  };
}

export default Main;