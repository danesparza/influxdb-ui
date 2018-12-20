import { Store } from "flux/utils";
import AppDispatcher from "../dispatcher/AppDispatcher";
import ActionTypes from "../actions/ActionTypes";

//  QueryDataStore stores query results
class QueryDataStore extends Store {
  
  constructor() {
    super(AppDispatcher);

    //  The query results
    this.results = [];
    
    //  The error
    this.error = null;

    //  The query request
    this.request = "";
  }

  //  Get the query request
  getQueryRequest() {
    return this.request;
  }

  //  Get the query results
  getQueryResults() {
    return this.results;
  }

  //  Get the error information:
  getQueryError() {
    return this.error;
  }

  //  Return 'true' if there is an error:
  hasError() {
    let retval = false;

    if(this.error !== null){
      retval = true;
    }

    return retval;
  }

  __onDispatch(action) {

    switch (action.actionType) {
      case ActionTypes.RECEIVE_QUERY_RESULTS:
        
        //  Reset the internal state:
        this.error = null;
        this.results = [];

        //  Log the action data:
        //  console.log(action);

        //  Try to set the error
        try{
          if(action.queryresults.error) {
            this.error = action.queryresults.error;
          }
        } catch(e){/* No op */}

        //  Try to set the query results
        try{
          if(action.queryresults.results) {
            if (action.queryresults.results[0] !== undefined && action.queryresults.results[0].error !== undefined){
              //  There is error returned in results, needs to be parsed
              this.error = action.queryresults.results[0].error
            }else{
              //  Normal results will be set to results
              this.results = action.queryresults.results;
            }
          }          
        } catch(e){/* No op */}


        this.__emitChange();
        break;

      case ActionTypes.RECEIVE_QUERY_REQUEST:
        console.log(action);
        
        this.request = action.queryrequest;

        this.__emitChange();
        break;

      default:
      // no op
    }
  }
}

export default new QueryDataStore();
