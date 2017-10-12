import { Store } from "flux/utils";
import AppDispatcher from "../dispatcher/AppDispatcher";
import ActionTypes from "../actions/ActionTypes";

//  QueryDataStore stores query results
class QueryDataStore extends Store {
  constructor() {
    super(AppDispatcher);

    //  The query results
    this.queryresults = [];
  }

  //  Get the query results
  getQueryResults() {
    return this.queryresults;
  }

  __onDispatch(action) {
    switch (action.actionType) {
      case ActionTypes.RECEIVE_QUERY_RESULTS:
        
        //  Set the query results
        console.log(action);
        this.queryresults = action.queryresults;
        this.__emitChange();
        break;

      default:
      // no op
    }
  }
}

export default new QueryDataStore();