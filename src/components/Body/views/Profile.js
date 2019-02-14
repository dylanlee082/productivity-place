import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    display: "flex"
  },
  left: {
    display: "flex",
    flexDirection: "column"
  },
  right: {
    display: "flex",
    flexDirection: "column"
  },
  profile: {
    background: "red",
    height: "55vh",
    width: "18vw"
  },
  slogan: {
    background: "yellow",
    height: "30vh",
    width: "18vw"
  },
  info: {
    background: "blue",
    height: "85vh",
    width: "33vw"
  },
  settings: {
    background: "green",
    height: "42.5vh",
    width: "33vw"
  },
  goals: {
    background: "grey",
    height: "42.5vh",
    width: "33vw"
  }
});

class Profile extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.left}>
          <Paper className={classes.profile}>
            <h1>Your Profile</h1>
            <h2>Profile Image</h2>
            <h2>Name</h2>
            <h2>Some Kind of info</h2>
            <h2>Upload new avatar</h2>
            <h2>Delete Account</h2>
          </Paper>
          <Paper className={classes.slogan}>
            <h2>Your Slogan</h2>
            <h2>The slogan itself</h2>
          </Paper>
        </div>
        <div className={classes.info}>
          <Paper>
            <h1>Edit Your Personal Information</h1>
          </Paper>
          <Paper>
            <h2>Full Name</h2>
            <h2>Title</h2>
            <h2>Email</h2>
          </Paper>
          <Paper>
            <h2>Birthday</h2>
          </Paper>
          <Paper>
            <h2>Country</h2>
            <h2>State</h2>
          </Paper>
          <Paper>
            <h2>Postal Code</h2>
            <h2>Phone Number</h2>
          </Paper>
          <Paper>
            <h2>Update Information</h2>
          </Paper>
        </div>
        <div className={classes.right}>
          <Paper className={classes.settings}>Personal Settings</Paper>
          <Paper className={classes.goals}>Your goals</Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Profile);
