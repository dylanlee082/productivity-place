// Main NPM Imports
import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import {
  getAppt,
  updateAppt,
  updateApptToggle
} from "../../../../ducks/reducer";

//Material-UI Core Imports
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";

//Material-UI Icon Imports
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

//Other Components
import UpdateApptForm from "./UpdateApptForm";

//Material-UI Styling
const styles = theme => ({
  paper: {
    width: "12vw",
    height: "14.5vh",
    display: "flex",
    flexDirection: "column"
  },
  smallPaper: {
    width: "12vw",
    height: "12vh",
    display: "flex",
    flexDirection: "column"
  },
  disabled: {
    width: "12vw",
    height: "14.5vh",
    display: "flex",
    flexDirection: "column",
    background: "grey"
  },
  smallDisabled: {
    width: "12vw",
    height: "12vh",
    display: "flex",
    flexDirection: "column",
    background: "grey"
  },
  header: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: "2.5vh",
    marginTop: "1vh"
  },
  headerMonth: {
    fontSize: "1.5em"
  },
  main: {
    display: "flex",
    flexWrap: "nowrap",
    maxWidth: "100vw",
    maxHeight: "100vh"
  },
  days: {
    width: "12vw",
    height: "4vh",
    flexWrap: "nowrap",
    lineHeight: "4vh"
  },
  cellDate: {
    textAlign: "right",
    paddingRight: "1vw",
    paddingTop: "1vh"
  },
  apptChip: {
    border: "1px solid black",
    background: theme.palette.secondary.main,
    display: "flex",
    justifyContent: "space-between",
    width: "11vw"
  },
  outerChip: {
    display: "flex",
    justifyContent: "center",
    width: "12vw"
  }
});

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      currentMonth: new Date(),
      currentDate: new Date(),
      currentArr: []
    };
  }

  //On Mount get the list of Appt's from database based on user ID
  componentDidMount = () => {
    const { user, getAppt } = this.props;
    if (user.id) {
      getAppt(user.id).then(res => {
        if (res) {
          this.parseAppts(res.value.data);
        }
      });
    }
  };

  //When the month is changed reparse the appt list to get appts for that month
  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.currentMonth !== prevState.currentMonth) {
      this.parseAppts(this.props.apptList);
    }
    if (prevProps.user.id !== this.props.user.id) {
      this.props.getAppt(this.props.user.id).then(res => {
        if (res) {
          this.parseAppts(res.value.data);
        }
      });
    }
    if (prevProps.apptList !== this.props.apptList) {
      this.parseAppts(this.props.apptList);
    }
  };

  //Parse the appt list to make sure only the correct appt's are showing
  parseAppts = apptList => {
    let arr = [];
    for (let i = 0; i < apptList.length; i++) {
      if (
        //if database month is equal to current
        moment(apptList[i].appt_time).isSame(this.state.currentMonth, "month")
      ) {
        //arr of objects with each object having the appt day as the key and the appt info as the value
        let obj = {};
        let time = moment(apptList[i].appt_time).format("D");
        obj[time] = apptList[i];
        arr.push(obj);
      }
    }
    this.setState({ currentArr: arr });
  };

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

  //Render the month and next/prev btns
  renderHeader = classes => {
    const dateFormat = "MMMM YYYY";
    return (
      <Grid container item xs={12} className={classes.header}>
        <ChevronLeftIcon onClick={() => this.prevMonth()} />
        <h1 className={classes.headerMonth}>
          {moment(this.state.currentMonth).format(dateFormat)}
        </h1>
        <ChevronRightIcon onClick={() => this.nextMonth()} />
      </Grid>
    );
  };

  //Render the days of the week above the calendar
  renderDays = classes => {
    let days = [];
    for (let i = 0; i < 7; i++) {
      days.push(
        <Grid key={i} item>
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

  handleDelete = id => {
    const { user, getAppt } = this.props;
    axios
      .delete(`/api/appt/${id}`)
      .then(() => getAppt(user.id))
      .catch(err => console.log(err));
  };

  //Checks to see which days have appts on them (called in renderCells)
  isDate = (currentDate, day, monthStart, classes) => {
    const { currentArr } = this.state;
    let arr = [];
    for (let i = 0; i < currentArr.length; i++) {
      if (
        moment(day).isSame(monthStart, "month") &&
        currentArr[i].hasOwnProperty(currentDate)
      ) {
        arr.push(
          <div key={i} className={classes.outerChip}>
            <Chip
              label={this.state.currentArr[i][currentDate].name}
              onDelete={() =>
                this.handleDelete(currentArr[i][currentDate].appt_id)
              }
              onClick={() => {
                this.props.updateApptToggle(this.props.open);
                this.props.updateAppt(currentArr[i][currentDate]);
              }}
              className={classes.apptChip}
            />
          </div>
        );
      }
    }
    return arr;
  };

  renderCells = classes => {
    const { currentMonth } = this.state;
    //These first two give you the start and end date of that specific month
    const monthStart = moment(currentMonth).startOf("month");
    const monthEnd = moment(currentMonth).endOf("month");
    //These second two give you the start and end date of the weeks, this allows for the overlay on the calendar between months
    const startDate = moment(monthStart).startOf("week");
    const endDate = moment(monthEnd).endOf("week");
    const dateFormat = "D";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";
    let classed = "";
    let regular = "";
    let disabled = "";
    let formatStart = +moment(startDate).format(dateFormat);
    let formatEnd = +moment(endDate).format(dateFormat);
    //The next time this complex for loop will need to be updated in before March 2025, otherwise this works for all months until then
    if (
      (formatEnd > 5 && formatEnd < 10 && formatStart !== 31) ||
      (formatEnd === 5 && (formatStart === 26 || formatStart === 25))
    ) {
      regular = "smallPaper";
      disabled = "smallDisabled";
    } else {
      regular = "paper";
      disabled = "disabled";
    }
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        //gets the numbers only from the date
        formattedDate = moment(day).format(dateFormat);
        //adds the days for this row
        classed = moment(day).isSame(monthStart, "month") ? regular : disabled;
        days.push(
          <Grid key={i} item>
            <Paper className={classes[classed]}>
              <p className={classes.cellDate}>{formattedDate}</p>
              {/* Checks to see if there are any appts for this day */}
              {this.isDate(formattedDate, day, monthStart, classes)}
            </Paper>
          </Grid>
        );
        day = moment(day).add(1, "day");
      }
      //pushs the individual cells into a container for the row
      rows.push(
        <Grid key={day} container item xs={12} className={classes.main}>
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
      <div>
        <UpdateApptForm />
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

const mapStateToProps = state => {
  return {
    user: state.user,
    appt: state.appt,
    open: state.updateApptToggle,
    apptList: state.apptList
  };
};

export default connect(
  mapStateToProps,
  { getAppt, updateAppt, updateApptToggle }
)(withStyles(styles)(Calendar));
