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

}

export default new NavActions();