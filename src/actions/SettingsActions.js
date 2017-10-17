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

	//	Updates the query store with the given database list
	receiveCurrentServer(server) {
		AppDispatcher.dispatch({
		  actionType: ActionTypes.RECEIVE_CURRENT_SERVER,
			server: server
		});
	}

	//	Updates the query store with the given database list
	receiveDatabaseList(serverurl, databaselist) {
		AppDispatcher.dispatch({
		  actionType: ActionTypes.RECEIVE_DATABASE_LIST,
			serverurl: serverurl,
			databaselist: databaselist
		});
	}

}

export default new SettingsActions();