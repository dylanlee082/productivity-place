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
import { updateTaskToggle, getTask } from "../../../../ducks/reducer";

class UpdateTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      task: {
        list_name: "",
        body: ""
      }
    };
  }

  componentDidUpdate = prevProps => {
    if (this.props.task.body !== prevProps.task.body) {
      this.setState({ task: this.props.task });
    }
  };

  handleChange = e => {
    this.setState({
      task: { ...this.state.task, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = () => {
    axios.put("/api/task", this.state.task).then(res => {
      this.props.updateTaskToggle(this.props.open);
      this.props.getTask(this.state.task.mortal_id);
    });
  };

  render() {
    console.log(this.state.task);
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={() => this.props.updateTaskToggle(this.props.open)}
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
              value={this.state.task.body}
              type="string"
              name="body"
              fullWidth
              onChange={e => this.handleChange(e)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.props.updateTaskToggle(this.props.open);
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
    open: state.updateTaskToggle,
    taskList: state.taskList,
    task: state.task
  };
};

export default connect(
  mapStateToProps,
  { updateTaskToggle, getTask }
)(UpdateTaskForm);
