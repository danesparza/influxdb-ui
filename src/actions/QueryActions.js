import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from './ActionTypes';

class QueryActions {

	//	Updates the query store with the given request
	receiveQueryRequest(request, server, database) {
		AppDispatcher.dispatch({
		  actionType: ActionTypes.RECEIVE_QUERY_REQUEST,
			queryrequest: request,
			server: server,
			database: database
		});
	}

	//	Updates the query store with the given results
	receiveQueryResults(results, elapsedtime) {
		AppDispatcher.dispatch({
		  actionType: ActionTypes.RECEIVE_QUERY_RESULTS,
		  queryresults: results,
		  elapsedtime: elapsedtime
		});
	}

}

export default new QueryActions();