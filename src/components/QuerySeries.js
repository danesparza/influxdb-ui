//  React
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

//  Components
import MuiVirtualizedTable from './MuiVirtualizedTable';
import QuerySeriesDataRow from './QuerySeriesDataRow';
import { Paper } from '@material-ui/core';

const styles = theme => ({
    table: {
       minWidth: 650,
    },
    resultHeading: {
       paddingTop: 5,
       paddingBottom: 5,
       paddingLeft: 15,
    }
});

const sample = [
    ['Frozen yoghurt', 159, 6.0, 24, 4.0],
    ['Ice cream sandwich', 237, 9.0, 37, 4.3],
    ['Eclair', 262, 16.0, 24, 6.0],
    ['Cupcake', 305, 3.7, 67, 4.3],
    ['Gingerbread', 356, 16.0, 49, 3.9],
  ];
  
  function createData(id, dessert, calories, fat, carbs, protein) {
    return { id, dessert, calories, fat, carbs, protein };
  }
    

class QuerySeries extends Component {  

  render() {

    const rows = [];
  
    for (let i = 0; i < 200; i += 1) {
        const randomSelection = sample[Math.floor(Math.random() * sample.length)];
        rows.push(createData(i, ...randomSelection));
    }

    const { classes} = this.props;

    let seriesName = this.props.series.name;

    //  Set column information if we have it:
    let columns = this.props.series.columns;
    let datacolumns = [];
    datacolumns = columns.map(function(col, index) {
        return {
            label: col,
            dataKey: col,
            width: 200
        };
    });
    
    //  Set datarows if we have them:
    //  Need to try using this method here: https://stackoverflow.com/a/42974762/19020 
    //  to see if we can get an array of JSON objects (with properly formatted key names based on columns)
    let datarows = [];
    if(this.props.series.values){

        //  For each of the rows
        datarows = this.props.series.values.map(function(row, rowindex) {

            //  Create a new object
            let obj = {};

            //  Cycle through each column and update the object
            for (let colindex = 0; colindex < columns.length; colindex++) {
                
                //  Get the actual column name to use as a property
                let col = columns[colindex];        

                //  Set the new object property to be the value of the appropriate row 'field'
                obj[col] = row[colindex];                    
            }

            //  Add the object to datarows
            return obj;
        });        
    }

    //  Display series information:
    return (
        <Paper style={{ height: 600, width: '100%' }}>
            <h2 className={classes.resultHeading}>{seriesName}</h2>
            
            <MuiVirtualizedTable 
                rowCount={datarows.length}
                rowGetter={({ index }) => datarows[index]}
                columns={datacolumns}
            />

        </Paper>
    );
  }

}

export default withStyles(styles)(QuerySeries);