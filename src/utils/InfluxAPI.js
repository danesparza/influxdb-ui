
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
            
            let url = `${this.baseURL}/query?q=${query}&db=${database}`;
            
            let apiHeaders = new Headers({
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "*/*",
            });
    
            fetch(url, 
            {
                mode: 'cors',
                method: 'get',
                headers: apiHeaders
            })
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                        return;
                    }
    
                    // Receive system state
                    response.json().then(function (data) {
                        //  Pass data to an action
                        console.log(data);                						
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
        }
    
    }
    
    export default new InfluxAPI();