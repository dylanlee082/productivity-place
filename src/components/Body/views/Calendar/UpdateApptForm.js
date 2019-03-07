//This is the pop-up for updating a calendar appt

//Main NPM Imports
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  updateApptToggle,
  getAppt
} from "../../../../ducks/reducers/apptReducer";

//Material-UI Core Imports
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//Date-Fns Imports && Date Manipulation
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "material-ui-pickers";

class UpdateApptForm extends Component {
  constructor() {
    super();
    this.state = {
      appt: {
        appt_time: new Date(),
        name: "",
        location: ""
      }
    };
  }

  componentDidUpdate = prevProps => {
    if (this.props.appt.name !== prevProps.appt.name) {
      this.setState({ appt: this.props.appt });
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
    axios.put("/api/appt", this.state.appt).then(res => {
      this.props.updateApptToggle(this.props.open);
      this.props.getAppt(this.state.appt.mortal_id);
    });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={() => this.props.updateApptToggle(this.props.open)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" disableTypography={true}>
            Update Appointment
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Alter the fields you wish to change on your appointment and press
              submit to save the changes.
            </DialogContentText>
            {/* Built using the advanced Material-UI Pickers */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                margin="normal"
                label="Date picker"
                value={this.state.appt.appt_time}
                onChange={this.handleDateChange}
              />
              <TimePicker
                margin="normal"
                label="Time Picker"
                value={this.state.appt.appt_time}
                onChange={this.handleDateChange}
              />
            </MuiPickersUtilsProvider>
            <TextField
              margin="dense"
              label="Who is the appointment with?"
              value={this.state.appt.name}
              type="string"
              name="name"
              fullWidth
              onChange={e => this.handleChange(e)}
            />
            <TextField
              margin="dense"
              label="Where is the appointment at?"
              value={this.state.appt.location}
              type="string"
              name="location"
              fullWidth
              onChange={e => this.handleChange(e)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.props.updateApptToggle(this.props.open);
                console.log("hit");
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button onClick={() => this.handleSubmit()} color="primary">
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
    open: state.apptReducer.updateApptToggle,
    apptList: state.apptReducer.apptList,
    appt: state.apptReducer.appt
  };
};

export default connect(
  mapStateToProps,
  { updateApptToggle, getAppt }
)(UpdateApptForm);
