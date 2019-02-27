import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getSettings } from "../../../../ducks/reducer";
import { withStyles } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  settings: {
    background: "green",
    height: "42.5vh",
    width: "33vw"
  },
  formSelector: {
    display: "flex"
  }
});

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasktoggle: true,
      calendartoggle: true,
      contacttoggle: true
    };
  }

  componentDidMount = () => {
    this.setState({
      tasktoggle: this.props.settings.tasktoggle,
      calendartoggle: this.props.settings.calendartoggle,
      contacttoggle: this.props.settings.contacttoggle
    });
  };

  handleCheckChange = e => {
    console.log(e.target.checked);
    this.setState({ [e.target.value]: e.target.checked });
  };

  handleSubmit = () => {
    console.log(this.state);
    axios
      .put("/api/settings", { ...this.state, id: this.props.user.id })
      .then(res => this.props.getSettings(this.props.user.id));
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.settings}>
        <div className={classes.formSelector}>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.tasktoggle}
                onChange={e => this.handleCheckChange(e)}
                value="tasktoggle"
              />
            }
            label="Task Page"
          />
        </div>
        <div className={classes.formSelector}>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.calendartoggle}
                onChange={e => this.handleCheckChange(e)}
                value="calendartoggle"
              />
            }
            label="Calendar Page"
          />
        </div>
        <div className={classes.formSelector}>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.contacttoggle}
                onChange={e => this.handleCheckChange(e)}
                value="contacttoggle"
              />
            }
            label="Contact Page"
          />
        </div>
        <button onClick={() => this.handleSubmit()}>Update Settings</button>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    settings: state.settings
  };
};

export default connect(
  mapStateToProps,
  { getSettings }
)(withStyles(styles)(Settings));
