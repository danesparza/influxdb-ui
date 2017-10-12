//  Actions
import QueryActions from '../actions/QueryActions';

class InfluxAPI {
    
        constructor(){
            //  Setup the base API url
            this.baseURL = "http://cdldtscapp1:8086";
        }
    
        // Executes a query and gets the results
        getQueryResults(database, query){
            if(database === "")
            {
                console.log("Can't execute query: database is blank"); 
                return; 
            }
            
            //  Encode and Interpolate the values
            let url = `${this.baseURL}/query?q=${encodeURIComponent(query)}&db=${database}`;
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
    
    }
    
    export default new InfluxAPI();