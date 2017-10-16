import store from 'store';

//  Actions
import SettingsActions from '../actions/SettingsActions';

class SettingsAPI {
    
        // Gets the current settings and updates the settings store
        getSettings(){
            let servers = store.get('servers');
            SettingsActions.receiveServerList(servers);
        }

        //  Adds a server to the list
        addServer(name, url) {
            //  First, get the current list of servers
            let servers = store.get('servers') || [];

            //  Next, add a server object to the list
            //  (as long as we have data)
            if(name.trim() !== "" && url.trim() !== ""){
                let newServer = {};
                newServer.name = name;
                newServer.url = url;
                servers.push(newServer);
            }

            //  Finally, store the list of servers again 
            //  and notify using SettingsActions
            store.set('servers', servers);
            SettingsActions.receiveServerList(servers);
        }

        //  Remove a server from the list
        removeServer(name) {
            //  First, get the current list of servers
            let servers = store.get('servers') || [];

            //  Find the server to remove and remove it
            let filteredlist = servers.filter(function(item){
                return item.name !== name;
            });

            //  Finally, store the list of servers again 
            //  and notify using SettingsActions
            store.set('servers', filteredlist);
            SettingsActions.receiveServerList(filteredlist);
        }
    
    }
    
    export default new SettingsAPI();