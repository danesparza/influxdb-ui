//  React
import React, { Component } from 'react';

//  Stores
import SettingsStore from '../stores/SettingsStore';

//  Utilities
import SettingsAPI from '../utils/SettingsAPI';
import InfluxAPI from '../utils/InfluxAPI';

class QueryContainer extends Component {  

    constructor(props) {
        super(props);
    
        this.state = {
          needCurrentServer: SettingsStore.needCurrentServer(),      
          Servers: SettingsStore.getServerList() || [],
          CurrentServer: SettingsStore.getCurrentServer(),                
        };
    }

    render() {
        //  This loads the current route component
        //  See App.js for more information
        const { children, params } = this.props;

        //  First, make sure we have a list of servers.  If we don't...
        //  Redirect to the settings screen
        //  If we need to setup a server, go to settings:
        if(this.state.needCurrentServer){
            window.location.hash = "#/settings";
            return null;
        }

        //  Track the current server from the url.
        let serverUrlParameter = params.server;
        let serverUrlFromState = this.state.CurrentServer.url;

        //  If we don't have a server from the url, but we have one stored
        //  as 'the current server' in state, then we need to redirect to a well-formed url
        //  that indicates it's the current server:
        if(!serverUrlParameter){
            window.location.hash = `#/query/${encodeURIComponent(serverUrlFromState)}`;
        }

        //  If the server in the url parameter doesn't match the current state,
        //  the url parameter wins.  Set it to current state
        if(serverUrlParameter !== serverUrlFromState){         
            console.log("QueryContainer refreshing server list");               
            SettingsAPI.setCurrentServer(serverUrlParameter);
        }

        //  - Start fetching the databases for the given server
        let currentServer = SettingsStore.getCurrentServer();
        console.log("QueryContainer refreshing database list");
        InfluxAPI.getDatabaseList(currentServer.url, currentServer.username, currentServer.password);

        //  Render out the child elements
        return (
            <div>
                { children }
            </div>
        );
    }
}

export default QueryContainer;