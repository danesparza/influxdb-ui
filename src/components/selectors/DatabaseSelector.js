//  React
import React, { Component } from 'react';

//  Material-UI
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Button, 
  FormControl,
  InputLabel,
  Select
} from '@material-ui/core';

//  Icons
import RefreshIcon from '@material-ui/icons/Refresh';

//  Utilities
import InfluxAPI from './../../utils/InfluxAPI';

const styles = theme => ({    
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

class DatabaseSelector extends Component {      

    render() {
        const { classes, currentServer, currentDatabase } = this.props;

        let selectedDatabase = currentDatabase || "";
        let serverDatabases = currentServer.databases || [];

        //  If we have no databases, display a message and give the ability to refresh
        if(serverDatabases.length < 1)
        {
            return (
            <FormControl>No databases found.  
                <Button size="small" variant="contained" onClick={this.refreshDatabases}>
                    <RefreshIcon className={clsx(classes.leftIcon, classes.iconSmall)} /> Refresh
                </Button>   
            </FormControl>
            );
        }
        else 
        {
            return (
            <FormControl>
                <InputLabel htmlFor="selDatabase">Database</InputLabel>              
                <Select
                native
                value={selectedDatabase}
                onChange={this.handleDatabaseSelect}
                inputProps={{
                    name: 'selDatabase',
                    id: 'selDatabase',
                }}
                >
                {serverDatabases.map(database => (
                    <option key={database} value={database}>{database}</option>                    
                ))}
                </Select>
            </FormControl>
            
            );
        }
    }

    //  Database selection changed
    handleDatabaseSelect = (event) => {  
        const { params } = this.props;
        let selectedServer = params.server || this.state.CurrentServer.url;

        //  Change the url hash:
        if(params.expression)
        {
            window.location.hash = `#/query/${encodeURIComponent(selectedServer)}/${event.target.value}/${params.expression}`;
        }
        else 
        {
            //  Just switch the database:
            window.location.hash = `#/query/${encodeURIComponent(selectedServer)}/${event.target.value}`;
        }    
    };

    //  'Refresh' button clicked
    refreshDatabases = (event) => {
                
        let currentServer = this.props.currentServer;

        console.log("Database selector refreshing database list for: ", currentServer);
        InfluxAPI.getDatabaseList(currentServer.url, currentServer.username, currentServer.password);
        
    }
}

export default withStyles(styles)(DatabaseSelector);