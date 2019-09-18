import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//  Stores
import SettingsStore from './stores/SettingsStore';

//  Utilities
import SettingsAPI from './utils/SettingsAPI';
import InfluxAPI from './utils/InfluxAPI';

//  Load the settings
SettingsAPI.getSettings();

//  If we have a server, get the initial list of databases from it:
if(!SettingsStore.needCurrentServer()){
    let currentServer = SettingsStore.getCurrentServer();
    InfluxAPI.getDatabaseList(currentServer.url, currentServer.username, currentServer.password);
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
