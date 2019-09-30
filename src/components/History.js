import React, {Component} from "react";

//  Material-UI
import { withStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
  Paper
} from '@material-ui/core';

import Navbar from "./NavBar";

import HistoryAPI from "../utils/HistoryAPI"
import QueryActions from "../actions/QueryActions";
import SettingsStore from "../stores/SettingsStore";

const styles = theme => ({
    root: {
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
  });

class History extends Component {
    constructor(props) {
        super(props);

        this.state = {
            history: HistoryAPI.getRecentRequests(),
            server: SettingsStore.getCurrentServer(),
            database: SettingsStore.getCurrentDatabase(),
        };

        this.makeOnClickHandler = this.makeOnClickHandler.bind(this);
    }

    makeOnClickHandler(query) {
        return function () {
            //  Set the request
            QueryActions.receiveQueryRequest(query, this.state.serverurl, this.state.database);
        }.bind(this)
    }

    render() {
        const { classes } = this.props;
        const makeOnClickHandler = this.makeOnClickHandler;

        return (
            <React.Fragment>
                <CssBaseline />
                
                <Navbar />

                <main style={{ padding: 20}}>      

                <div className="classes.row">
                        <h2>History</h2>

                        <Paper className={classes.root}>
                            {this.state.history.length > 0
                                ? this.state.history.map(function ({id, query}) {
                                    return <p key={id} className="recent-request">
                                        <a href="#/" onClick={makeOnClickHandler(query)}>{query}</a>
                                    </p>
                                })
                                : <p className="recent-request">
                                    No requests yet
                                </p>}
                        </Paper>

                    </div>
                </main>
            </React.Fragment>  
        )
    }
}

export default withStyles(styles)(History);