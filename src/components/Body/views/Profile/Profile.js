import React, { Component } from "react";
import { connect } from "react-redux";
import { getSettings } from "../../../../ducks/reducer";
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

import Settings from "./Settings";
import PersonalInfo from "./PersonalInfo";
import ProfileCard from "./ProfileCard";

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

  slogan: {
    background: "yellow",
    height: "30vh",
    width: "18vw"
  },
  goals: {
    background: "grey",
    height: "42.5vh",
    width: "33vw"
  }
});

class Profile extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = () => {
    this.props.getSettings(this.props.user.id);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.left}>
          <ProfileCard />
          <Paper className={classes.slogan}>
            <h2>Random Fact of the day</h2>
            <h2>The fact from an api?</h2>
          </Paper>
        </div>
        <PersonalInfo />
        <div className={classes.right}>
          <Settings />
          <Paper className={classes.goals}>Coming Soon analytics</Paper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { getSettings }
)(withStyles(styles)(Profile));
