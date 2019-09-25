//  Actions
import QueryActions from '../actions/QueryActions';
import SettingsActions from '../actions/SettingsActions';

class InfluxAPI {
    
        // Executes a query and gets the results
        getQueryResults(serverurl,username, password, database, query){

            if(serverurl === "" || database === "")
            {
                console.log("Can't execute query: server or database is blank"); 
                return Promise.resolve();
            }

            //  Set the request
            QueryActions.receiveQueryRequest(query, serverurl, database);
            
            // build auth query params
            let auth = "";
            if (username !== undefined && username !== "" && password !== undefined && username !== "") {
                auth = "&u=" + username + "&p=" + password
            }

            //  Encode and Interpolate the values
            let url = `${serverurl}/query?q=${encodeURIComponent(query)}`+auth+`&db=${database}`;
            url = url.replace(/%20/g, "+");

            return fetch(url,
            {
                mode: 'cors',
                method: 'get'
            })
                .then(function (response) {
                    // Receive system state
                    return response.json();
                })
                .then(function (data) {
                    //  Pass data to the action
                    QueryActions.receiveQueryResults(data);
                });
        }

        //  Gets the list of databases for the given server
        getDatabaseList(serverurl, username, password) {

            if(!serverurl)
            {
                console.log("Can't execute query 'getDatabaseList': server is blank"); 
                return; 
            }

            // build auth query params
            let auth = ""
            if(username !== undefined && password !== undefined){
                auth = "&u="+username+"&p="+password
            }
            
            //  Encode and Interpolate the values
            let url = `${serverurl}/query?q=SHOW+DATABASES`+auth+`&db=`;
            url = url.replace(/%20/g, "+");

            console.log("Fetching: ", url);

            fetch(url, 
            {
                mode: 'cors',
                method: 'get'
            })
            .then(
                function (response) {
                    console.log(response);
                    // Receive system state
                    response.json().then(function (data) {
                        //  Pass data to the action
                        SettingsActions.receiveDatabaseList(serverurl, data);            						
                    });
                }
            )
            .catch(function (err) {
                console.log('getDatabaseList Fetch Error: ', err);
                SettingsActions.receiveDatabaseList(serverurl, {});
            });
        }
    
    }
    
    export default new InfluxAPI();
