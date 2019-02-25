//Main NPM Imports
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getTask } from "../../../../ducks/reducer";

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
    inputList: [{ body: "" }],
    listName: ""
  };

  handleAdd = () => {
    this.setState(prevState => ({
      inputList: [...prevState.inputList, { body: "" }]
    }));
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      inputList: [{ body: "" }]
    });
  };

  handleChange = e => {
    if (e.target.name === "body") {
      let inputs = [...this.state.inputList];
      inputs[+e.target.id][e.target.name] = e.target.value;
      this.setState({ inputList: inputs });
    } else {
      this.setState({
        listName: e.target.value
      });
    }
  };

  handleSubmit = () => {
    const { user, getTask } = this.props;
    axios
      .post("/api/task", {
        listName: this.state.listName,
        inputs: this.state.inputList,
        id: user.id
      })
      .then(res => {
        this.setState({
          listName: "",
          inputList: [{ body: "" }]
        });
        this.handleClose();
        getTask(user.id);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Button variant="outlined" onClick={this.handleClickOpen}>
          Create new task list
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Create a new task list
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              This form will create a new task list. Please input a name and
              however many starter tasks you would like. You can create as many
              as you would like, but there must be at least one for the list to
              remain visible.
            </DialogContentText>
            <TextField
              margin="dense"
              name="list_name"
              label="Name of the List"
              type="text"
              fullWidth
              onChange={e => this.handleChange(e)}
            />
            <DialogContentText>
              Starter Tasks (There must be at least one task)
            </DialogContentText>
            {this.state.inputList.map((val, i) => {
              let label = `Task #${i + 1}`;
              return (
                <TextField
                  key={i}
                  margin="dense"
                  id={`${i}`}
                  name="body"
                  label={label}
                  type="text"
                  onChange={e => this.handleChange(e)}
                  fullWidth
                />
              );
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleAdd} color="primary">
              Add Task
            </Button>
            <Button onClick={() => this.handleClose()} color="primary">
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

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getTask }
)(TaskListForm);
