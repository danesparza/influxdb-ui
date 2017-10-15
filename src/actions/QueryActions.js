import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from './ActionTypes';

class QueryActions {

	//	Updates the activity store with the given request
	receiveQueryRequest(request) {
		AppDispatcher.dispatch({
		  actionType: ActionTypes.RECEIVE_QUERY_REQUEST,
		  queryrequest: request
		});
	}

	//	Updates the activity store with the given query results
	receiveQueryResults(results) {
		AppDispatcher.dispatch({
		  actionType: ActionTypes.RECEIVE_QUERY_RESULTS,
		  queryresults: results
		});
	}	

}

export default new QueryActions();