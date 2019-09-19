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

//  Stores
import SettingsStore from './../../stores/SettingsStore';

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

    constructor(props) {
        super(props);

        this.state = {
            needCurrentServer: SettingsStore.needCurrentServer(),      
            Servers: SettingsStore.getServerList() || [],
            CurrentServer: SettingsStore.getCurrentServer(),
            DatabaseList: SettingsStore.getDatabaseList() || [],
            CurrentDatabase: SettingsStore.getCurrentDatabase() || "",          
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
        const { classes, params } = this.props;

        let selectedDatabase = params.database || this.state.DatabaseList[0] || "";

        //  If we have no databases, display a message and give the ability to refresh
        if(this.state.DatabaseList.length < 1)
        {
            return (
            <FormControl>No databases found.  
                <Button size="small" variant="contained">
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
                {this.state.DatabaseList.map(database => (
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
        let selectedServer = params.server || this.state.CurrentServer.name;

        //  Change the url hash:
        if(params.expression)
        {
            window.location.hash = `#/query/${selectedServer}/${event.target.value}/${params.expression}`;
        }
        else 
        {
            //  Just switch the database:
            window.location.hash = `#/query/${selectedServer}/${event.target.value}`;
        }    
    };

    //  Data changed:
    _onChange = () => {
        this.setState({
        needCurrentServer: SettingsStore.needCurrentServer(),
        Servers: SettingsStore.getServerList() || [],
        CurrentServer: SettingsStore.getCurrentServer() || "",
        DatabaseList: SettingsStore.getDatabaseList() || [],      
        CurrentDatabase: SettingsStore.getCurrentDatabase() || "",
        });
    }

}

export default withStyles(styles)(DatabaseSelector);