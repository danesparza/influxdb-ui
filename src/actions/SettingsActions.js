import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from './ActionTypes';

class SettingsActions {

	//	Updates the settings store with the given server list
	receiveServerList(servers) {
		AppDispatcher.dispatch({
		  actionType: ActionTypes.RECEIVE_SERVER_LIST,
		  servers: servers
		});
	}

}

export default new SettingsActions();