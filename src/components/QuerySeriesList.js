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

    let resulttime = this.props.resulttime;

    //  Otherwise, loop through our series and show them:
    return (
        <React.Fragment>
            {this.props.serieslist.map(function(seriesItem, index) {
                return <QuerySeries key={index} series={seriesItem} resulttime={resulttime}/>;
            })}
        </React.Fragment>
    );
  }

}

export default QuerySeriesList;