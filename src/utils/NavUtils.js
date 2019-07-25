
class NavUtils {

    //  Get the navbar opened/closed state
    isNavOpened() {
        return stringToBoolean(localStorage.navOpened);
    }

    //  Set the navbar opened/closed state
    setNavOpened(newState) {
        //  Store in local storage:
        localStorage.navOpened = newState;
    }

    gotoMainPage() {
        //  Redirect to the main page:
        window.location.hash = "#/";
    }

    gotoLoginPage() {
        //  Redirect to the login page:
        window.location.hash = "#/login";
    }

    gotoLogoutPage() {
        //  Redirect to the logout page:
        window.location.hash = "#/logout";
    }

    gotoUserList() {
        //  Redirect to the user list page:
        window.location.hash = "#/users/";
    }

}

function stringToBoolean(string){
    let stringtoeval = string || "";

    switch(stringtoeval.toLowerCase()) 
    {
        case "false": 
        case "no": 
        case "0": 
        case "": 
            return false; 
        default: 
            return true;
    }
}

export default new NavUtils();