//  React and reactstrap
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import {
  AppBar, 
  Toolbar, 
  Typography, 
  Button,
  Link
} from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/Receipt';

const styles = theme => ({
  toolbarTitle: {
    flex: 1,
  },
  navbutton: {
    margin: theme.spacing(.5),
    color: "#efefef"
  },
  mainicon: {
    color: "#fff"
  },
});

class NavBar extends Component {

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>

        <AppBar position="relative">
          <Toolbar>
            <ReceiptIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              <Link href="/#/" className={classes.mainicon}>
                InfluxDB UI
              </Link>              
            </Typography>
            <Button className={classes.navbutton} href="/#/">
              Query
            </Button>
            <Button className={classes.navbutton} href="/#/history/">
              History
            </Button>
            <Button className={classes.navbutton} href="/#/settings/">
              Settings
            </Button>
            <Button className={classes.navbutton} href="https://docs.influxdata.com/influxdb/">
              Docs
            </Button>
          </Toolbar>
        </AppBar>
          
      </React.Fragment>
    );
  }

}

export default withStyles(styles)(NavBar);
