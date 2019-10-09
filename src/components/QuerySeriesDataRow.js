//  React
import React, { Component } from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class QuerySeriesDataRow extends Component {  

  render() {
    //  Display data row:
    return (
      <TableRow>
          {this.props.datarow.map(function(item, index) {
              return <TableCell key={index}>{item}</TableCell>;
          })}                                  
      </TableRow>        
    );
  }

}

export default QuerySeriesDataRow;
