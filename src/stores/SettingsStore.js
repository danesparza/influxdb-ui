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

  //  Returns 'true' if we don't have a current server
  needCurrentServer() {
    return isEmpty(this.getCurrentServer());
  }

  //  Returns 'true' if we have a current server
  haveCurrentServer() {
    return isEmpty(this.getCurrentServer()) === false;
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

  //  Get the server information for the given url
  getServer(serverUrl) {
    let retval = {};

    try{
      retval = this.serverList.filter(obj => {
        return obj.url === serverUrl
      });
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
    console.log("Settings event: ", action);

    switch (action.actionType) {
      case ActionTypes.RECEIVE_SERVER_LIST:
        
        this.serverList = action.servers || [];        

        //  If this list is now blank, we should reset
        //  current database
        //  list of databases
        //  current server
        try{
          if(this.serverList.length < 1){
            this.currentDatabase = "";
            this.currentServerDBList = [];
            this.currentServer = {};
          }
        } catch(e) { /* No op */}

        this.__emitChange();
        break;

      case ActionTypes.RECEIVE_CURRENT_SERVER:
        
        //  Find the server name
        try{
          //  Try to set the current server:
          this.currentServer = this.serverList.find(function(item){
            return item.url === action.server || "";
          });
         } catch(e) { /* No op */ }
        
         console.log("Current server set to: ", this.currentServer);

        this.__emitChange();
        break;

      case ActionTypes.RECEIVE_CURRENT_DATABASE:
        
        this.currentDatabase = action.database;

        this.__emitChange();
        break;
        
      case ActionTypes.RECEIVE_DATABASE_LIST:
        
        //  Reset the internal state:
        this.currentServerDBList = [];

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