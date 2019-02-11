import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";

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
    height: "140px"
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
        <h1>{moment(this.state.currentMonth).format(dateFormat)}</h1>
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

  renderCells = classes => {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = moment(currentMonth).startOf("month");
    const monthEnd = moment(currentMonth).endOf("month");
    const startDate = moment(monthStart).startOf("week");
    const endDate = moment(monthEnd).endOf("week");

    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = moment(day).format(dateFormat);
        const cloneDay = day;
        days.push(
          <Grid item>
            <Paper className={classes.paper}>{formattedDate}</Paper>
          </Grid>
        );
        day = moment(day).add(1, "day");
      }
      rows.push(
        <Grid container item xs={12} className={classes.main}>
          {days}
        </Grid>
      );
      days = [];
    }
    return rows;
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
          {this.renderCells(classes)}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(TaskList);
