import React, {Component} from "react";

import Navbar from "./NavBar";

import HistoryAPI from "../utils/HistoryAPI"
import QueryActions from "../actions/QueryActions";
import SettingsStore from "../stores/SettingsStore";

class History extends Component {
    constructor(props) {
        super(props);

        this.state = {
            history: HistoryAPI.getRecentRequests(),
            server: SettingsStore.getCurrentServer(),
            database: SettingsStore.getCurrentDatabase(),
        };

        this.makeOnClickHandler = this.makeOnClickHandler.bind(this);
    }

    makeOnClickHandler(query) {
        return function () {
            //  Set the request
            QueryActions.receiveQueryRequest(query, this.state.serverurl, this.state.database);
        }.bind(this)
    }

    render() {
        const makeOnClickHandler = this.makeOnClickHandler;

        return (
            <div>
                <Navbar {...this.props} />

                <div className="container">

                    <div className="col">
                        <p className="lead text-muted settings-header">History</p>

                        <div className="rounded history-list">
                            {this.state.history.length > 0
                                ? this.state.history.map(function ({id, query}) {
                                    return <p key={id} className="recent-request">
                                        <a className="link" href="#/" onClick={makeOnClickHandler(query)}>{query}</a>
                                    </p>
                                })
                                : <p className="recent-request">
                                    No requests yet
                                </p>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default History;