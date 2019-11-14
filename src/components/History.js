import React, {Component} from "react";

//  Material-UI
import { withStyles } from '@material-ui/core/styles';
import {
  CssBaseline,
  Paper
} from '@material-ui/core';

import Navbar from "./NavBar";

import HistoryAPI from "../utils/HistoryAPI";

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
        };
    }

    render() {
        const { classes } = this.props;
        
        //  Make sure we're showing items from history 2.0 (we switched to using several fields, including url):
        let historyitems = this.state.history.filter(item => item.hasOwnProperty('url'));

        return (
            <React.Fragment>
                <CssBaseline />
                
                <Navbar />

                <main style={{ padding: 20}}>      

                <div className="classes.row">
                        <h2>History</h2>

                        <Paper className={classes.root}>
                            {historyitems.length > 0
                                ? historyitems.map(function ({id, url, server, database, expression }) {
                                    return <p key={id} className="recent-request">
                                        <a href={url}><b>{server.name} / {database}</b> - {expression}</a>
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