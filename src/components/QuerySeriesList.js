//  React
import React, { Component } from 'react';

//  Components
import QuerySeries from './QuerySeries';

class QuerySeriesList extends Component {  

  render() {

    //  If we don't have any series, don't display anything
    if(!this.props.serieslist){
      return null;
    }

    //  Otherwise, loop through our series and show them:
    return (
        <div>
            {this.props.serieslist.map(function(seriesItem, index) {
                return <QuerySeries key={index} series={seriesItem}/>;
            })}
        </div>
    );
  }

}

export default QuerySeriesList;