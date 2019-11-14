import store from 'store';

class HistoryAPI {

    // Gets the requests' history from the store
    getRecentRequests(){
        return store.get('history') || [];
    }

    // Saves the request in the history store
    rememberRequest(url, server, database, expression) {
        let history = this.getRecentRequests() || [];
        const requestId = new Date().getTime().toString(16);

        history.unshift({
            id: requestId,            
            url,
            server,
            database,
            expression,
        });

        if (history.length >= HistoryAPI.historySize) {
            history = history.slice(0, HistoryAPI.historySize)
        }

        store.set('history', history);
    }

}

HistoryAPI.historySize = 50;

export default new HistoryAPI();
