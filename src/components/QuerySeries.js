//  React
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//  Components
import QuerySeriesDataRow from './QuerySeriesDataRow';

const styles = theme => ({
    table: {
      minWidth: 650,
    },
});

class QuerySeries extends Component {  

  render() {

    const { classes} = this.props;

    let seriesName = this.props.series.name;
    
    //  Set datarows if we have them:
    let datarows = [];
    if(this.props.series.values){
        datarows = this.props.series.values;
    }

    //  Display series information:
    return (
        <div>
            <h3>{this.props.series.name}</h3>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {this.props.series.columns.map(function(col, index) {
                                return <TableCell key={index}>{col}</TableCell>;
                        })}                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {datarows.map(function(datarow, index) {
                        return <QuerySeriesDataRow key={seriesName + "-" + index} datarow={datarow} />;
                    })}
                </TableBody>
            </Table>            
        </div>
    );
  }

}

export default withStyles(styles)(QuerySeries);