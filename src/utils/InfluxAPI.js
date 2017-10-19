//  Actions
import QueryActions from '../actions/QueryActions';
import SettingsActions from '../actions/SettingsActions';

class InfluxAPI {
    
        // Executes a query and gets the results
        getQueryResults(serverurl, database, query){

            if(serverurl === "" || database === "")
            {
                console.log("Can't execute query: server or database is blank"); 
                return; 
            }

            //  Set the request
            QueryActions.receiveQueryRequest(query, serverurl, database);
            
            //  Encode and Interpolate the values
            let url = `${serverurl}/query?q=${encodeURIComponent(query)}&db=${database}`;
            url = url.replace(/%20/g, "+");

            fetch(url, 
            {
                mode: 'cors',
                method: 'get'
            })
            .then(
                function (response) {
                    // Receive system state
                    response.json().then(function (data) {
                        //  Pass data to the action
                        QueryActions.receiveQueryResults(data);               						
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
        }

        //  Gets the list of databases for the given server
        getDatabaseList(serverurl) {

            if(serverurl === "")
            {
                console.log("Can't execute query: server is blank"); 
                return; 
            }
            
            //  Encode and Interpolate the values
            let url = `${serverurl}/query?q=SHOW+DATABASES&db=`;
            url = url.replace(/%20/g, "+");

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
                console.log('Fetch Error :-S', err);
                SettingsActions.receiveDatabaseList(serverurl, {});
            });
        }
    
    }
    
    export default new InfluxAPI();