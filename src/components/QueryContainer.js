//  React
import React, { Component } from 'react';

//  Components
import Main from './Main';

//  Stores
import SettingsStore from '../stores/SettingsStore';
import NavStore from '../stores/NavStore';

//  Utilities
import InfluxAPI from '../utils/InfluxAPI';

class QueryContainer extends Component {  

    constructor(props) {
        super(props);

        const { params } = props; 

        this.state = {
            needCurrentServer: SettingsStore.needCurrentServer(),      
            Servers: SettingsStore.getServerList() || [],
            CurrentServer: params.server || SettingsStore.getDefaultServerUrl(),
            CurrentDatabase: params.database || SettingsStore.getDefaultDatabaseForServer(params.server || SettingsStore.getDefaultServerUrl()),
            CurrentExpression: params.expression || "",
        };
    }

    componentDidMount(){    
        //  Add store listeners ... and notify ME of changes
        this.settingsListener = SettingsStore.addListener(this._onChange);
        this.navListener = NavStore.addListener(this._navChange);        

        this.ensureDatabasesHaveBeenLoaded();
    } 
  
    componentWillUnmount() {
        //  Remove store listeners
        this.settingsListener.remove();
        this.navListener.remove();        
    }

    render() {        
        
        //  Render out the child element
        return (
            <Main servers={this.state.Servers} currentServer={this.state.CurrentServer} currentDatabase={this.state.CurrentDatabase} currentExpression={this.state.CurrentExpression} />
        );
    }

    ensureDatabasesHaveBeenLoaded = () => {
        let currentServer = SettingsStore.getCurrentServer();

        //  - Start fetching the databases for the given server if we don't have a list:
        if(currentServer.databases.length < 1){            
            console.log("QueryContainer refreshing database list.  Missing databases for: ", currentServer.url);
            InfluxAPI.getDatabaseList(currentServer.url, currentServer.username, currentServer.password);
        }
    }

    //  Nav changed:
    _navChange = () => {    
        const { params } = this.props;

        this.setState({
            CurrentServer: params.server || SettingsStore.getDefaultServerUrl(),
            CurrentDatabase: params.database || SettingsStore.getDefaultDatabaseForServer(params.server || SettingsStore.getDefaultServerUrl()),   
            CurrentExpression: params.expression || "",                          
        });
    }

    //  Data changed:
  _onChange = () => {

    const { params } = this.props; 

    this.setState({
        needCurrentServer: SettingsStore.needCurrentServer(), 
        Servers: SettingsStore.getServerList() || [],
        CurrentServer: params.server || SettingsStore.getDefaultServerUrl(),
        CurrentDatabase: params.database || SettingsStore.getDefaultDatabaseForServer(params.server || SettingsStore.getDefaultServerUrl()),
        CurrentExpression: params.expression || "",
    });
  }
}

export default QueryContainer;