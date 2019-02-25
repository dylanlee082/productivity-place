//Main NPM Imports
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  getTask,
  updateTaskToggle,
  updateTask
} from "../../../../ducks/reducer";

//Material-UI Core Imports
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

//Material-UI Icon Imports
import AddBox from "@material-ui/icons/AddBox";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";

import UpdateTaskForm from "./UpdateTaskForm";

//Material-UI Styling
const styles = theme => ({
  root: {
    display: "flex"
  },
  background: {
    background: "lightgrey",
    width: 300,
    display: "flex",
    flexDirection: "column"
  },
  items: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  leftSide: {
    fontSize: 20,
    marginLeft: 10
  },
  rightSide: {
    marginRight: 10
  },
  task: {
    margin: 10
  },
  innerItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

class TaskList extends Component {
  //On Mount get the list of tasks from database based on user ID
  componentDidMount = () => {
    const { user, getTask } = this.props;
    if (user.id) {
      getTask(user.id);
    }
  };

  //If the user refreshes the page this ensures that the user.id doesn't come back as undefined
  componentDidUpdate = prevProps => {
    if (prevProps.user.id !== this.props.user.id) {
      this.props.getTask(this.props.user.id);
    }
  };

  addTask = () => {};

  deleteTask = id => {
    const { user, getTask } = this.props;
    axios
      .delete(`/api/task/${id}`)
      .then(() => console.log("It worked"))
      .catch(err => console.log(err));
    getTask(user.id);
  };

  deleteTaskList = list_name => {
    const { user, getTask } = this.props;
    axios
      .delete(`/api/list/${list_name}`)
      .then(() => console.log("It worked"))
      .catch(err => console.log(err));
    getTask(user.id);
  };

  checkTask = list_name => {
    let arr = this.props.taskList.map((e, i) => {
      let p = "";
      if (e.list_name === list_name) {
        p = (
          <div className={this.props.classes.innerItem} key={e.body}>
            <p>{e.body}</p>
            <Clear onClick={() => this.deleteTask(e.task_id)} />
            <Edit
              onClick={() => {
                this.props.updateTaskToggle(this.props.open);
                this.props.updateTask(e);
              }}
            />
          </div>
        );
      }
      return p;
    });
    return arr;
  };

  render() {
    const { classes, taskList } = this.props;
    let arr = [];

    return (
      <div className={classes.root}>
        <UpdateTaskForm />
        {taskList.map((e, i) => {
          if (!arr.includes(e.list_name)) {
            arr.push(e.list_name);
            return (
              <Paper key={i} className={classes.background}>
                <div className={classes.items}>
                  <h1 className={classes.leftSide}>{e.list_name}</h1>
                  <div className={classes.rightSide}>
                    <AddBox onClick={() => this.addTask()} />
                    <Clear onClick={() => this.deleteTaskList(e.list_name)} />
                  </div>
                </div>
                <Paper className={classes.task}>
                  {this.checkTask(e.list_name)}
                </Paper>
              </Paper>
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    taskList: state.taskList,
    open: state.updateTaskToggle
  };
};

export default connect(
  mapStateToProps,
  { getTask, updateTaskToggle, updateTask }
)(withStyles(styles)(TaskList));
