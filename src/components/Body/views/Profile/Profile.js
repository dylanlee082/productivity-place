//This is the container component for the overall profile, all of the other profile components are stitched together here

//Main NPM Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { getSettings } from "../../../../ducks/reducers/generalReducer";

//Material-UI Styling
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

//Other Components
import Settings from "./Settings";
import PersonalInfo from "./PersonalInfo";
import ProfileCard from "./ProfileCard";

//Material-UI Styling
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
    background: "white",
    height: "30vh",
    width: "18vw"
  },
  analytics: {
    backgroundImage: `url("https://st2.depositphotos.com/1001599/7978/v/950/depositphotos_79785186-stock-illustration-pie-chart-sketch-icon.jpg")`,
    backgroundSize: "33vw 42.5vh",
    height: "42.5vh",
    width: "33vw",
    fontSize: "2em"
  }
});

class Profile extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount = () => {
    if (this.props.user.id) {
      this.props.getSettings(this.props.user.id);
    }
  };

  componentDidUpdate = prevProps => {
    if (this.props.user.id !== prevProps.user.id) {
      this.props.getSettings(this.props.user.id);
    }
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
          <Paper className={classes.analytics}>Coming Soon Analytics</Paper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.generalReducer.user
  };
};

export default connect(
  mapStateToProps,
  { getSettings }
)(withStyles(styles)(Profile));
