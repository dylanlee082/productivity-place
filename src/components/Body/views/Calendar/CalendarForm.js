import "date-fns";
import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import axios from "axios";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "material-ui-pickers";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = theme => ({
  form: {
    fontSize: 13,
    width: "auto",
    color: "black"
  }
});

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
      .post("/api/appt", this.state.appt)
      .then(res => {
        this.setState({
          appt: { date: new Date(), name: "", location: "" },
          selectedDate: new Date()
        });
        this.handleClose();
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
    const { classes } = this.props;
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
          className={classes.form}
        >
          Create New Form
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
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

export default withStyles(styles)(CalendarForm);
