//  React
import React, { Component } from 'react';

//  Components
import QuerySeriesDataRow from './QuerySeriesDataRow';

class QuerySeries extends Component {  

  render() {
    let seriesName = this.props.series.name;
    
    //  Set datarows if we have them:
    let datarows = [];
    if(this.props.series.values){
        datarows = this.props.series.values;
    }

    //  Display series information:
    return (
        <div>
            <h1 className="display-4">{this.props.series.name}</h1>
            <table className="table table-striped table-sm">
                <thead className="thead-inverse">
                    <tr>
                        {this.props.series.columns.map(function(col, index) {
                            return <th key={index}>{col}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                {datarows.map(function(datarow, index) {
                    return <QuerySeriesDataRow key={seriesName + "-" + index} datarow={datarow} />;
                })}
                </tbody>
            </table>
        </div>
    );
  }

}

export default QuerySeries;