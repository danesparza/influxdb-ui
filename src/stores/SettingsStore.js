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
    
    //  Databases are now stored on the server 
    //  object as a .databases string array property

    //  The current server
    this.currentServer = {
      name: "",
      url: "",
      username: "",
      password: "",
      databases: [],
    };

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

  //  Get the database list for a given server url
  getDatabaseListForServer(serverUrl) {
    let retval = [];

    try{
      //  First, find the server
      let foundServer = this.serverList.filter(obj => {
        return obj.url === serverUrl
      });

      //  Return the databases found
      retval = foundServer.databases;
    }catch(e) {/* No op */}

    return retval;
  }

  //  Get the default server url
  getDefaultServerUrl() {
    let retval = "";

    //  Use the first in the list:
    try{
      if(this.serverList.length > 0) {
        retval = this.serverList[0].url;
      }
    }catch(e) {/* No op */}

    return retval;
  }

  //  Get the current server
  getCurrentServer() {
    let retval = {};
    retval.name = "Not available";
    retval.url = "";    
    retval.username = "";
    retval.password = "";
    retval.databases = [];

    //  If we have one explicitly set, use it
    if(!isEmpty(this.currentServer)){
      retval = this.currentServer;
    }

    //  If we don't have one explicitly set, use the first in the list:
    try{
      if(retval.url === "" && this.serverList.length > 0) {
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

    return retval[0];
  }

  //  Get the current database
  getCurrentDatabase() {
    let retval = "";

    //  If we have a database explicitly set, use it:
    if(this.currentDatabase !== ""){
      retval = this.currentDatabase;
    }

    //  If we don't have one explicitly set, default to the first in our list
    if(this.currentDatabase === "" && this.currentServer && this.currentServer.databases.length > 0){
      retval = this.currentServer.databases[0];
    }

    return retval;
  }

  //  Get the default database for the given server
  getDefaultDatabaseForServer(serverUrl) {
    let retval = "";

    let currentServer = this.getServer(serverUrl);
    
    //  Default to the first in our list
    if(currentServer && currentServer.databases.length > 0){
      retval = currentServer.databases[0];
    }

    return retval;
  }

  __onDispatch(action) {    
    switch (action.actionType) {
      case ActionTypes.RECEIVE_SERVER_LIST:
        console.log("Settings store event: ", action);

          action.servers = action.servers || [];

          this.serverList = action.servers.map(server => (
            {
              url: server.url,
              name: server.name,
              username: server.username,
              password: server.password,
              databases: server.databases || [],
            }
          ));               

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
        console.log("Settings store event: ", action);
        
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
        console.log("Settings store event: ", action);

        this.currentDatabase = action.database;

        this.__emitChange();
        break;
        
      case ActionTypes.RECEIVE_DATABASE_LIST:
        console.log("Settings store event: ", action);
        
        //  Reset the internal state:
        let serverDatabaseList = [];

        //  Try to set the database list
        try{
          if(action.databaselist.results[0].series[0].values) {
            serverDatabaseList = action.databaselist.results[0].series[0].values.map(function (item){
                return item[0];
            });
          }          
        } catch(e){/* No op */}

        console.log("Databases for " + action.serverurl, serverDatabaseList);

        //  Update the server list with the server object that contains its databases:
        this.serverList = this.serverList.map(p =>
          p.url === action.serverurl
            ? { ...p, databases: serverDatabaseList }
            : p
        );
        
        console.log("Updated server list: ", this.serverList);        

        this.__emitChange();
        break;

      default:
      // no op
    }
  }
}

export default new SettingsStore();