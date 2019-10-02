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

//  Stores
import SettingsStore from '../../stores/SettingsStore';

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

        //  Look up the current server:
        let selectedServer =  SettingsStore.getServer(currentServer);
        let serverDatabases = selectedServer.databases || [];

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
                value={currentDatabase}
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
        const { currentServer } = this.props;

        //  Change the database in the url:
        window.location.hash = `#/query/${encodeURIComponent(currentServer)}/${event.target.value}`; 
    };

    //  'Refresh' button clicked
    refreshDatabases = (event) => {
                
        const { currentServer } = this.props;

        //  Look up the current server:
        let selectedServer =  SettingsStore.getServer(currentServer);
        
        console.log("Database selector refreshing database list for: ", currentServer);
        InfluxAPI.getDatabaseList(selectedServer.url, selectedServer.username, selectedServer.password);
        
    }
}

export default withStyles(styles)(DatabaseSelector);