//  React
import React, { Component } from 'react';

class QuerySeriesDataRow extends Component {  

  render() {
    //  Display data row:
    return (
        <tr>
            {this.props.datarow.map(function(item, index) {
                return <td key={index}>{item}</td>;
            })}
        </tr>
    );
  }

}

export default QuerySeriesDataRow;
