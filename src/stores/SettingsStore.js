import { Store } from "flux/utils";
import AppDispatcher from "../dispatcher/AppDispatcher";
import ActionTypes from "../actions/ActionTypes";

//  Utility function to see if an object is empty
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

//  SettingsStore stores app settings
class SettingsStore extends Store {

  constructor() {
    super(AppDispatcher);

    //  The server list
    this.serverList = [];

    //  The database list for the current server
    this.currentServerDBList = [];
    
    //  The current server
    this.currentServer = {};

    //  The current database
    this.currentDatabase = "";
  }

  //  Get the server list
  getServerList() {
    return this.serverList;
  }

  //  Returns 'true' if we have a current server
  needCurrentServer() {
    return isEmpty(this.getCurrentServer());
  }

  //  Get the database list
  getDatabaseList() {
    return this.currentServerDBList;
  }

  //  Get the current server
  getCurrentServer() {
    let retval = {};

    if(!isEmpty(this.currentServer)){
      retval = this.currentServer;
    }

    try{
      if(isEmpty(retval) && this.serverList.length > 0) {
        retval = this.serverList[0];
      }
    }catch(e) {/* No op */}

    return retval;
  }

  //  Get the current database
  getCurrentDatabase() {
    return this.currentDatabase;
  }

  __onDispatch(action) {
    switch (action.actionType) {
      case ActionTypes.RECEIVE_SERVER_LIST:
        
        this.serverList = action.servers;
        console.log(action);

        this.__emitChange();
        break;

      default:
      // no op
    }
  }
}

export default new SettingsStore();