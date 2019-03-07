//This is the form for creating a new calendar appt

//Main NPM Imports
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getAppt } from "../../../../ducks/reducers/apptReducer";

//Date-Fns Imports && Date Manipulation
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "material-ui-pickers";

//Material-UI Core Imports
import theme from "../../../../theme";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class CalendarForm extends Component {
  state = {
    open: false,
    appt: {
      date: new Date(),
      name: "",
      location: ""
    },
    selectedDate: new Date()
  };

  componentDidMount = () => {
    if (this.props.appt_id) {
      this.setState({
        date: this.props.date,
        name: this.props.name,
        location: this.props.location
      });
    }
  };

  handleDateChange = date => {
    this.setState({ appt: { ...this.state.appt, date: date } });
  };

  handleChange = e => {
    this.setState({
      appt: { ...this.state.appt, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = () => {
    axios
      .post("/api/appt", { ...this.state.appt, id: this.props.user.id })
      .then(res => {
        this.setState({
          appt: { date: new Date(), name: "", location: "" },
          selectedDate: new Date()
        });
        this.handleClose();
        this.props.getAppt(this.props.user.id);
      })
      .catch(err => console.log(err));
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button
          style={{ color: theme.palette.secondary.main }}
          variant="outlined"
          onClick={this.handleClickOpen}
        >
          Create a new calendar event
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Create a new calendar event
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              This form is for creating new appointments/meetings/events for
              your daily life. You can have multiple events on the same day, but
              you will need to submit a new form for each one.
            </DialogContentText>
            {/* Built using the advanced Material-UI Pickers */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                margin="normal"
                label="Date picker"
                value={this.state.appt.date}
                onChange={this.handleDateChange}
              />
              <TimePicker
                margin="normal"
                label="Time Picker"
                value={this.state.appt.date}
                onChange={this.handleDateChange}
              />
            </MuiPickersUtilsProvider>
            <TextField
              margin="dense"
              label="Who is the appointment with?"
              type="string"
              name="name"
              fullWidth
              onChange={e => this.handleChange(e)}
            />
            <TextField
              margin="dense"
              label="Where is the appointment at?"
              type="string"
              name="location"
              fullWidth
              onChange={e => this.handleChange(e)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
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
  { getAppt }
)(CalendarForm);
