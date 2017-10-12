//  React
import React, { Component } from 'react';

class QueryErrorDisplay extends Component {  

  render() {
    //  If we don't have an error, don't show this
    if(this.props.haserror === false) {
        return null;
    }

    //  Otherwise, display our error
    return (
        <div className="alert alert-warning" role="alert">
            Error: {this.props.error}
        </div>
    );
  }

}

export default QueryErrorDisplay;