//  React
import React, { Component } from 'react';

//  Components
import QuerySeriesList from './QuerySeriesList';

class QueryResultList extends Component {  

  render() {
    //  If we don't have results, don't show this
    if(this.props.results.length < 1) {
        return null;
    }

    //  Otherwise, loop through our results and show them:
    return (
        <div>
            {this.props.results.map(function(resultItem) {
                return <QuerySeriesList key={resultItem.statement_id} serieslist={resultItem.series}/>;
            })}
        </div>
    );
  }

}

export default QueryResultList;