import { Store } from "flux/utils";
import AppDispatcher from "../dispatcher/AppDispatcher";
import ActionTypes from "../actions/ActionTypes";

//  Utility function to see if an object is empty (or undefined)
function isEmpty(obj) {
  return Object.keys(obj || {}).length === 0;
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

    //  If we have one explicitly set, use it
    if(!isEmpty(this.currentServer)){
      retval = this.currentServer;
    }

    //  If we don't have one explicitly set, use the first in the list:
    try{
      if(isEmpty(retval) && this.serverList.length > 0) {
        retval = this.serverList[0];
      }
    }catch(e) {/* No op */}

    return retval;
  }

  //  Get the current database
  getCurrentDatabase() {
    let retval = "";

    //  If we have a database explicitly set, use it:
    if(this.currentDatabase !== ""){
      retval = this.currentDatabase;
    }

    //  If we don't have one explicitly set, default to the first in our list
    if(this.currentDatabase === "" && this.currentServerDBList.length > 0){
      retval = this.currentServerDBList[0];
    }

    return retval;
  }

  __onDispatch(action) {
    switch (action.actionType) {
      case ActionTypes.RECEIVE_SERVER_LIST:
        
        this.serverList = action.servers;
        console.log(action);

        this.__emitChange();
        break;

      case ActionTypes.RECEIVE_CURRENT_SERVER:
        
        //  Find the server name
        try{
          //  Try to set the current server:
          this.currentServer = this.serverList.find(function(item){
            return item.name === action.server || "";
          });
         } catch(e) { /* No op */ }

        console.log(action);

        this.__emitChange();
        break;

      case ActionTypes.RECEIVE_CURRENT_DATABASE:
        
        this.currentDatabase = action.database;
        console.log(action);

        this.__emitChange();
        break;
        
      case ActionTypes.RECEIVE_DATABASE_LIST:
        
        //  Reset the internal state:
        this.currentServerDBList = [];

        //  Log the action data:
        console.log(action);

        //  Try to set the database list
        try{
          if(action.databaselist.results[0].series[0].values) {
            this.currentServerDBList = action.databaselist.results[0].series[0].values.map(function (item){
                return item[0];
            });
          }          
        } catch(e){/* No op */}

        console.log("Databases for " + action.serverurl, this.currentServerDBList);

        this.__emitChange();
        break;

      default:
      // no op
    }
  }
}

export default new SettingsStore();