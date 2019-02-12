//Main NPM Imports
import React, { Component } from "react";
import axios from "axios";

//Material-UI Core Imports
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class TaskListForm extends Component {
  state = {
    open: false,
    task: {
      list_name: "",
      body: ""
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
      task: { ...this.state.task, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = () => {
    axios
      .post("/api/task", this.state.task)
      .then(res => {
        this.setState({
          task: { list_name: "", body: "" }
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
          Create new Task List
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Create a new Task List
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              margin="dense"
              name="list_name"
              label="Name of the List"
              type="text"
              fullWidth
              onChange={e => this.handleChange(e)}
            />
            <TextField
              margin="dense"
              name="body"
              label="Starter Tasks (There must be at least one task)"
              type="text"
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

export default TaskListForm;
