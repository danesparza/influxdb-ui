//  React
import React, { Component } from 'react';

//  Stores
import SettingsStore from '../stores/SettingsStore';

//  Utilities
import SettingsAPI from '../utils/SettingsAPI';
import InfluxAPI from '../utils/InfluxAPI';

class QueryContainer extends Component {  
    render() {
        //  This loads the current route component
        //  See App.js for more information
        const { children, params } = this.props;

        //  First, make sure we have a list of servers.  If we don't...
        //  Redirect to the settings screen
        //  If we need to setup a server, go to settings:
        if(SettingsStore.needCurrentServer()){
            console.log("QueryContainer redirecting to settings - we don't have any servers");
            window.location.hash = "#/settings";
            return null;
        }

        //  Track the current server from the url.
        let serverUrlParameter = params.server;
        let serverUrlFromState = SettingsStore.getCurrentServer().url;
        let databaseParameter = params.database;
        let databaseFromState = SettingsStore.getCurrentDatabase();

        //  If we don't have a server from the url, but we have one stored
        //  as 'the current server' in state (like if we have picked a default server), 
        //  then we need to redirect to a well-formed url that indicates it's the current server:
        if(!serverUrlParameter){
            console.log("QueryContainer redirecting (default server?) to query url for server: ", serverUrlFromState);
            window.location.hash = `#/query/${encodeURIComponent(serverUrlFromState)}`;
            return null;
        }

        //  If the server in the url parameter doesn't match the current state,
        //  the url parameter wins.  Set it to current state
        if(serverUrlParameter !== serverUrlFromState){         
            console.log("QueryContainer setting current server to: " + serverUrlParameter);               
            SettingsAPI.setCurrentServer(serverUrlParameter);                         
        }

        //  If the database in the url parameter doesn't match the current state, 
        //  the url parameter wins.  Set it to current state
        if(databaseParameter !== databaseFromState){
            console.log("QueryContainer setting current database to: " + databaseParameter);
            SettingsAPI.setCurrentDatabase(databaseParameter);
        }

        let currentServer = SettingsStore.getCurrentServer();

        //  - Start fetching the databases for the given server if we don't have a list:
        if(currentServer.databases.length < 1){            
            console.log("QueryContainer refreshing database list.  Missing databases for: ", currentServer.url);
            InfluxAPI.getDatabaseList(currentServer.url, currentServer.username, currentServer.password);
        }   

        //  Render out the child elements
        return (
            <div>
                { children }
            </div>
        );
    }
}

export default QueryContainer;