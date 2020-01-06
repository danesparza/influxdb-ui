//  React
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

//  Components
import MuiVirtualizedTable from './MuiVirtualizedTable';

//  Styles

const styles = theme => ({
    resultHeading: {
       paddingTop: 5,
       paddingLeft: 15,
       marginBottom: 0,
    },
    resultMeta: {
        paddingLeft: 15,
        paddingBottom: 5,
        color: "silver",
    }
});

class QuerySeries extends Component {  

  render() {

    const { classes} = this.props;

    let seriesName = this.props.series.name;
    let elapsedTime = this.props.resulttime;

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
        <React.Fragment>
            <h2 className={classes.resultHeading}>{seriesName} </h2>            
            <div className={classes.resultMeta}> {datarows.length} results in {elapsedTime}</div>

            <MuiVirtualizedTable 
                rowCount={datarows.length}
                rowGetter={({ index }) => datarows[index]}
                columns={datacolumns}
                className="queryresultrow"
            />

        </React.Fragment>
    );
  }

}

export default withStyles(styles)(QuerySeries);