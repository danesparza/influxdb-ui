import humanizeDuration from 'humanize-duration';

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

            let startTime, endTime;

            //  Set the request
            QueryActions.receiveQueryRequest(query, serverurl, database);

            //  Encode and Interpolate the values
            let url = `${serverurl}/query?q=${encodeURIComponent(query)}&db=${database}`;
            url = url.replace(/%20/g, "+");

            let headers = new Headers();

            // Set basic authorization header if neccessary
            if (username !== undefined && username !== "" && password !== undefined && username !== "") {
                headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
            }
            
            startTime = new Date();

            return fetch(url,
            {
                mode: 'cors',
                method: 'get',
                headers: headers
            })
                .then(function (response) {
                    // Receive system state
                    return response.json();
                })
                .then(function (data) {
                    endTime = new Date();
                    let  timeDiff = endTime - startTime; //in ms
                    
                    //  Pass data to the action
                    QueryActions.receiveQueryResults(data, humanizeDuration(timeDiff));
                });
        }

        //  Gets the list of databases for the given server
        getDatabaseList(serverurl, username, password) {

            if(!serverurl)
            {
                console.log("Can't execute query 'getDatabaseList': server is blank"); 
                return; 
            }
            
            //  Encode and Interpolate the values
            let url = `${serverurl}/query?q=SHOW+DATABASES&db=`;
            url = url.replace(/%20/g, "+");

            let headers = new Headers();

            // Set basic authorization header if neccessary
            if (username !== undefined && username !== "" && password !== undefined && username !== "") {
                headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
            }

            fetch(url, 
            {
                mode: 'cors',
                method: 'get',
                headers: headers
            })
            .then(
                function (response) {
                    console.log("getDatabaseList response: ", response);
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
