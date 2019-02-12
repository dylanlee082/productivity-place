//Main NPM Imports
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

//Material-UI Core Imports
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class ContactForm extends Component {
  state = {
    open: false,
    contact: {
      name: "",
      number: "",
      address: ""
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = e => {
    this.setState({
      contact: { ...this.state.contact, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = () => {
    axios
      .post("/api/contact", { ...this.state.contact, id: this.props.id })
      .then(res => {
        this.setState({
          contact: {
            name: "",
            number: "",
            address: ""
          }
        });
        this.handleClose();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Create a new Contact
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create a new Contact</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              onChange={e => this.handleChange(e)}
              margin="dense"
              name="name"
              label="Contact Name"
              type="text"
              fullWidth
            />
            <TextField
              onChange={e => this.handleChange(e)}
              margin="dense"
              name="number"
              label="Contact Number"
              type="text"
              fullWidth
            />
            <TextField
              onChange={e => this.handleChange(e)}
              margin="dense"
              name="address"
              label="Contact Address"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
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

const mapStateToProps = state => state;

export default connect(mapStateToProps)(ContactForm);
