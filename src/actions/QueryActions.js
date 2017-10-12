import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from './ActionTypes';

class QueryActions {

	//	Updates the activity store with the given activity list
	receiveQueryResults(results) {
		AppDispatcher.dispatch({
		  actionType: ActionTypes.RECEIVE_QUERY_RESULTS,
		  queryresults: results
		});
	}	

}

export default new QueryActions();