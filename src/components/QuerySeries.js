//  React
import React, { Component } from 'react';

//  Components
import QuerySeriesDataRow from './QuerySeriesDataRow';

class QuerySeries extends Component {  

  render() {
    let seriesName = this.props.series.name;

    //  Display series information:
    return (
        <div>
            <h1 className="display-4">{this.props.series.name}</h1>
            <table className="table table-striped table-sm">
                <thead className="thead-inverse">
                    <tr>
                        {this.props.series.columns.map(function(col) {
                            return <th key={col}>{col}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                {this.props.series.values.map(function(datarow, index) {
                    return <QuerySeriesDataRow key={seriesName + "-" + index} datarow={datarow} />;
                })}
                </tbody>
            </table>
        </div>
    );
  }

}

export default QuerySeries;