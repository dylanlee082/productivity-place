import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
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
  constructor() {
    super();
    this.state = {
      taskPage: true,
      calendarPage: true,
      contactPage: true
    };
  }
  handleCheckChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.settings}>
        <div className={classes.formSelector}>
          <h3>Task Page</h3>
          <Checkbox
            checked={this.state.taskPage}
            onChange={this.handleCheckChange("taskPage")}
            value="checkedA"
          />
        </div>
        <div className={classes.formSelector}>
          <h3>Calendar Page</h3>
          <Checkbox
            checked={this.state.calendarPage}
            onChange={this.handleCheckChange("calendarPage")}
            value="checkedA"
          />
        </div>
        <div className={classes.formSelector}>
          <h3>Contact Page</h3>
          <Checkbox
            checked={this.state.contactPage}
            onChange={this.handleCheckChange("contactPage")}
            value="checkedA"
          />
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(Settings);
