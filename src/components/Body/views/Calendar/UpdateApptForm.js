import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { updateApptToggle, getAppt } from "../../../../ducks/reducer";

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
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
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
    open: state.updateApptToggle,
    apptList: state.apptList,
    appt: state.appt
  };
};

export default connect(
  mapStateToProps,
  { updateApptToggle, getAppt }
)(UpdateApptForm);
