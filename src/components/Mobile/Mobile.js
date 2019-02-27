import React, { Component } from "react";
import MobileRegister from "./MobileRegister";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    background: theme.palette.primary.main
  },
  header: {
    textAlign: "center",
    color: theme.palette.secondary.main
  },
  body: {
    textAlign: "center",
    color: theme.palette.secondary.main,
    width: "80vw",
    marginBottom: "5vh"
  }
});

class Mobile extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h1 className={classes.header}>Welcome to the Productivity Place</h1>
        <p className={classes.body}>
          We currently do not support mobile views as this application is
          intended to be interacted with through sms messaging rather than a
          traditional browser. If you would like to create an account in order
          to use the sms services please continue below. Otherwise we would love
          to have you visit our website in a larger window.
        </p>
        <MobileRegister />
      </div>
    );
  }
}

export default withStyles(styles)(Mobile);
