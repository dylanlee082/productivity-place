//This is the pop-up for updating a contact

//Main NPM Imports
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  updateContactToggle,
  getContact
} from "../../../../ducks/reducers/contactReducer";
import NumberFormat from "react-number-format";

//Material-UI Core Imports
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class UpdateContactForm extends Component {
  constructor() {
    super();
    this.state = {
      contact: {
        name: "",
        number: "",
        address: ""
      }
    };
  }

  componentDidUpdate = prevProps => {
    if (this.props.contact.number !== prevProps.contact.number) {
      this.setState({ contact: this.props.contact });
    }
  };

  handleChange = e => {
    this.setState({
      contact: { ...this.state.contact, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = () => {
    let regexp = /[0-9+]+/g;
    let num = this.state.contact.number.match(regexp).join("");
    axios
      .put("/api/contact", { ...this.state.contact, number: num })
      .then(res => {
        this.props.updateContactToggle(this.props.open);
        this.props.getContact(this.state.contact.mortal_id);
      });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={() => this.props.updateContactToggle(this.props.open)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" disableTypography={true}>
            Update Contact
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Fill in the blanks to update the contact you have selected.
            </DialogContentText>
            <TextField
              margin="dense"
              label="Name"
              value={this.state.contact.name}
              type="text"
              name="name"
              fullWidth
              onChange={e => this.handleChange(e)}
            />
            <NumberFormat
              customInput={TextField}
              format="+# (###) ###-####"
              margin="dense"
              label="Phone Number"
              value={this.state.contact.number}
              type="text"
              name="number"
              fullWidth
              onChange={e => this.handleChange(e)}
            />
            <TextField
              margin="dense"
              label="Address"
              value={this.state.contact.address}
              type="text"
              name="address"
              fullWidth
              onChange={e => this.handleChange(e)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.props.updateContactToggle(this.props.open);
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
    open: state.contactReducer.updateContactToggle,
    contactList: state.contactReducer.contactList,
    contact: state.contactReducer.contact
  };
};

export default connect(
  mapStateToProps,
  { updateContactToggle, getContact }
)(UpdateContactForm);
