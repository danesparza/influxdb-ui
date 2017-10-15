import store from 'store';

//  Actions
import SettingsActions from '../actions/SettingsActions';

class SettingsAPI {
    
        // Gets the current settings and updates the settings store
        getSettings(){
            let servers = store.get('servers');
            SettingsActions.receiveServerList(servers);
            
        }
    
    }
    
    export default new SettingsAPI();