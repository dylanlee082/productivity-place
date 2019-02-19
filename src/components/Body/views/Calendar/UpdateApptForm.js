import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { updateAppt } from "../../../../ducks/reducer";

//Date-Fns Imports && Date Manipulation
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from "material-ui-pickers";

class UpdateApptForm extends Component {
  constructor(props) {
    super();
    this.state = {
      appt: {
        date: new Date(),
        name: "",
        location: ""
      }
    };
  }

  componentDidMount = () => {};

  shouldComponentUpdate = nextProps => {
    return nextProps !== this.props;
  };

  handleDateChange = date => {
    this.setState({ appt: { ...this.state.appt, date: date } });
  };

  handleChange = e => {
    this.setState({
      appt: { ...this.state.appt, [e.target.name]: e.target.value }
    });
  };

  render() {
    console.log(this.state.appt);
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={() => this.props.updateAppt(this.props.open)}
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
              onClick={() => this.props.updateAppt(this.props.open)}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => this.props.updateAppt(this.props.open)}
              color="primary"
            >
              Subscribe
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
    appts: state.appts
  };
};

export default connect(
  mapStateToProps,
  { updateAppt }
)(UpdateApptForm);
