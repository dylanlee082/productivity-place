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
import { updateContactToggle, getContact } from "../../../../ducks/reducer";

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
    axios.put("/api/contact", this.state.contact).then(res => {
      this.props.updateContactToggle(this.props.open);
      this.props.getContact(this.state.contact.mortal_id);
    });
  };

  render() {
    console.log(this.state.contact);
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={() => this.props.updateContactToggle(this.props.open)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              margin="dense"
              label="What is this task?"
              value={this.state.contact.name}
              type="string"
              name="name"
              fullWidth
              onChange={e => this.handleChange(e)}
            />
            <TextField
              margin="dense"
              label="What is this task?"
              value={this.state.contact.number}
              type="string"
              name="number"
              fullWidth
              onChange={e => this.handleChange(e)}
            />
            <TextField
              margin="dense"
              label="What is this task?"
              value={this.state.contact.address}
              type="string"
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
    open: state.updateContactToggle,
    contactList: state.contactList,
    contact: state.contact
  };
};

export default connect(
  mapStateToProps,
  { updateContactToggle, getContact }
)(UpdateContactForm);
