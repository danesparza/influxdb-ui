import { Store } from "flux/utils";
import AppDispatcher from "../dispatcher/AppDispatcher";
import ActionTypes from "../actions/ActionTypes";

//  Use this to communicate that url navigation has changed
class NavStore extends Store {

  constructor() {
    super(AppDispatcher);

    //  The current location
    this.currentLocation = "";
  }

  //  Get the location
  getLocation() {
    return this.currentLocation;
  }

  __onDispatch(action) {
    
    switch (action.actionType) {
      case ActionTypes.RECEIVE_CURRENT_NAVLOCATION:
        console.log("Nav store event: ", action);
        
        this.currentLocation = action.location;

        this.__emitChange();
        break;
      default:
      // no op
    }
  }
}

export default new NavStore();