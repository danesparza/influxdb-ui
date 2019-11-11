import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from './ActionTypes';

class NavActions {

	//	Updates the nav store with the current url location
	receiveCurrentLocation(location) {
		AppDispatcher.dispatch({
		  actionType: ActionTypes.RECEIVE_CURRENT_NAVLOCATION,
			location: location
		});
	}

	//	Updates the nav store with the current url location (if it's a query update)
	receiveQueryLocation(location) {
		AppDispatcher.dispatch({
		  actionType: ActionTypes.RECEIVE_CURRENT_NAVQUERYLOCATION,
			location: location
		});
	}

}

export default new NavActions();