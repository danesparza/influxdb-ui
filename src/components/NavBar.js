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

//  Stores
import NavStore from '../stores/NavStore';

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

  constructor(props) {
    super(props);

    this.state = {
      AppLink: NavStore.getQueryLocation() || "/#/",
    };
}

  componentDidMount(){    
    //  Add store listeners ... and notify ME of changes
    this.navListener = NavStore.addListener(this._navChange);        
  } 

  componentWillUnmount() {
      //  Remove store listeners
      this.navListener.remove();        
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>

        <AppBar position="relative">
          <Toolbar>
            <ReceiptIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              <Link href={this.state.AppLink} className={classes.mainicon}>
                InfluxDB UI
              </Link>              
            </Typography>
            <Button className={classes.navbutton} href={this.state.AppLink}>
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

  //  Nav changed:
  _navChange = () => {    
    this.setState({
        AppLink: NavStore.getQueryLocation(),                          
    });
}

}

export default withStyles(styles)(NavBar);
