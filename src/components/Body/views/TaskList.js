import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";

import CalendarForm from "./Calendar/CalendarForm";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    width: "230px",
    height: "150px"
  },
  header: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  main: {
    flexWrap: "nowrap"
  },
  days: {
    width: "230px",
    height: "40px",
    flexWrap: "nowrap"
  }
});

class TaskList extends Component {
  constructor() {
    super();
    this.state = {
      currentMonth: new Date(),
      currentDate: new Date()
    };
  }

  nextMonth = () => {
    this.setState({
      currentMonth: moment(this.state.currentMonth).add(1, "M")
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: moment(this.state.currentMonth).subtract(1, "M")
    });
  };

  renderHeader = classes => {
    const dateFormat = "MMMM YYYY";
    return (
      <Grid container item xs={12} className={classes.header}>
        <ChevronLeftIcon onClick={() => this.prevMonth()} />
        <CalendarForm />
        <span>{moment(this.state.currentMonth).format(dateFormat)}</span>
        <h1>Day View</h1>
        <ChevronRightIcon onClick={() => this.nextMonth()} />
      </Grid>
    );
  };

  renderDays = classes => {
    let days = [];
    for (let i = 0; i < 7; i++) {
      days.push(
        <Grid item>
          <Paper className={classes.days}>
            {moment()
              .weekday(i)
              .format("dddd")
              .toString()}
          </Paper>
        </Grid>
      );
    }
    return days;
  };

  formRow = classes => {
    return (
      <React.Fragment>
        <Grid item>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
      </React.Fragment>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.renderHeader(classes)}
        <Grid container spacing={8}>
          <Grid container item xs={12}>
            {this.renderDays(classes)}
          </Grid>
          <Grid container item xs={12} className={classes.main}>
            {this.formRow(classes)}
          </Grid>
          <Grid container item xs={12} className={classes.main}>
            {this.formRow(classes)}
          </Grid>
          <Grid container item xs={12} className={classes.main}>
            {this.formRow(classes)}
          </Grid>
          <Grid container item xs={12} className={classes.main}>
            {this.formRow(classes)}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(TaskList);
