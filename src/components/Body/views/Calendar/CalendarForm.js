import "date-fns";
import React, { Component } from "react";
import axios from "axios";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "material-ui-pickers";
import { connect } from "react-redux";
import { toggleCalendarForm } from "../../../../ducks/reducer";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class FormDialog extends Component {
  state = {
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
      .post("/api/appt", this.state.appt)
      .then(res => {
        this.props.toggleCalendarForm();
        this.setState({
          appt: { date: new Date(), name: "", location: "" },
          selectedDate: new Date()
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => this.props.toggleCalendarForm(this.props.open)}
        >
          Open form dialog
        </Button>
        <Dialog
          open={this.props.open}
          onClose={() => this.props.toggleCalendarForm(this.props.open)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Create a new appointment
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
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
              autoFocus
              margin="dense"
              label="Who is the appointment with?"
              type="string"
              name="name"
              fullWidth
              onChange={e => this.handleChange(e)}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Where is the appointment at?"
              type="string"
              name="location"
              fullWidth
              onChange={e => this.handleChange(e)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.props.toggleCalendarForm(this.props.open)}
              color="primary"
            >
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
    open: state.calendarForm
  };
};

export default connect(
  mapStateToProps,
  { toggleCalendarForm }
)(FormDialog);
