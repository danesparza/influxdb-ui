import { Store } from "flux/utils";
import AppDispatcher from "../dispatcher/AppDispatcher";
import ActionTypes from "../actions/ActionTypes";

//  SettingsStore stores app settings
class SettingsStore extends Store {

  constructor() {
    super(AppDispatcher);

    //  The server list
    this.serverList = [];

    //  The database list for the current server
    this.currentServerDBList = [];
    
    //  The current server
    this.currentServer = "";

    //  The current database
    this.currentDatabase = "";
  }

  //  Get the server list
  getServerList() {
    return this.serverList;
  }

  //  Get the database list
  getDatabaseList() {
    return this.currentServerDBList;
  }

  //  Get the current server
  getCurrentServer() {
    let retval = this.currentServer;

    if(retval === "" && this.serverList.length > 0) {
      retval = this.serverList[0].name;
    }

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