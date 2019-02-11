// Main NPM Imports
import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

//Redux
import { connect } from "react-redux";
import { toggleCalendarForm } from "../../../../ducks/reducer";

//Material-UI Imports
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Chip from "@material-ui/core/Chip";

//Other Components
import CalendarForm from "./CalendarForm";

//Material-UI Styling
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    width: "230px",
    height: "140px",
    display: "flex",
    flexDirection: "column"
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

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      currentMonth: new Date(),
      currentDate: new Date(),
      apptList: [],
      currentArr: [],
      form: "",
      formShow: false
    };
  }

  //On Mount get the list of Appt's from database
  componentDidMount = () => {
    axios
      .get("/api/appt")
      .then(res => {
        this.setState({ apptList: res.data });
        this.parseAppts(res.data);
      })
      .catch(err => console.log(err));
  };

  //When the month is changed reparse the appt list to get appts for that month
  componentDidUpdate = (prevProps, PrevState) => {
    if (this.state.currentMonth !== PrevState.currentMonth) {
      this.parseAppts(this.state.apptList);
    }
  };

  //Parse the appt list to make sure only the correct appt's are showing
  parseAppts = apptList => {
    console.log("Hi");
    let arr = [];
    for (let i = 0; i < apptList.length; i++) {
      if (
        //if database month is equal to current
        moment(apptList[i].appt_time).isSame(this.state.currentMonth, "month")
      ) {
        //arr of objects with each object having the appt day as the key and the appt info as the value
        let obj = {};
        let time = moment(apptList[i].appt_time).format("D");
        console.log(time);
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
        <h1>{moment(this.state.currentMonth).format(dateFormat)}</h1>
        <ChevronRightIcon onClick={() => this.nextMonth()} />
      </Grid>
    );
  };

  //Render the days of the week above the calendar
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

  handleDelete = id => {
    axios
      .delete(`/api/appt/${id}`)
      .then(() => console.log("It worked"))
      .catch(err => console.log(err));
  };

  handleEdit = obj => {
    this.props.toggleCalendarForm(this.props.open);
  };

  //Checks to see which days have appts on them (called in renderCells)
  isDate = currentDate => {
    const { currentArr } = this.state;
    let arr = [];
    for (let i = 0; i < currentArr.length; i++) {
      if (currentArr[i].hasOwnProperty(currentDate)) {
        arr.push(
          <Chip
            label={this.state.currentArr[i][currentDate].name}
            onClick={() => this.props.toggleCalendarForm(this.props.open)}
            onDelete={() =>
              this.handleDelete(currentArr[i][currentDate].appt_id)
            }
          />
        );
      }
    }
    return arr;
  };

  renderCells = classes => {
    const { currentMonth, selectedDate } = this.state;
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

    console.log(this.state.currentArr);
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        //gets the numbers only from the date
        formattedDate = moment(day).format(dateFormat);
        const cloneDay = day;
        //adds the days for this row
        days.push(
          <Grid item>
            <Paper className={classes.paper}>
              {formattedDate}
              {/* Checks to see if there are any appts for this day */}
              {this.isDate(formattedDate)}
            </Paper>
          </Grid>
        );
        day = moment(day).add(1, "day");
      }
      //pushs the individual cells into a container for the row
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
    const { form, formShow } = this.state;

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

const mapStateToProps = state => {
  return {
    open: state.open
  };
};

export default connect(
  mapStateToProps,
  { toggleCalendarForm }
)(withStyles(styles)(Calendar));
