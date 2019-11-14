import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//  Utilities
import SettingsAPI from './utils/SettingsAPI';

//  Load the settings
console.log("Index - Calling getSettings to load all settings");
SettingsAPI.getSettings();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
