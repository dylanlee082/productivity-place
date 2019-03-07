//Main NPM Imports
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  getTask,
  updateTaskToggle,
  updateTask
} from "../../../../ducks/reducers/taskReducer";

//Material-UI Core Imports
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

//Material-UI Icon Imports
import AddBox from "@material-ui/icons/AddBox";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import UpdateTaskForm from "./UpdateTaskForm";

//Material-UI Styling
const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    fontFamily: theme.typography.fontFamily
  },
  background: {
    display: "flex",
    flexDirection: "column",
    width: "20vw"
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
    margin: 10,
    display: "flex",
    flexDirection: "column",
    background: "grey"
  },
  innerItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  innerPaper: {
    background: "white",
    width: "17.5vw"
  },
  root2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly"
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

  determineListNames = taskList => {
    const check = [];
    const arr = [];
    // eslint-disable-next-line
    taskList.map(e => {
      if (!check.includes(e.list_name)) {
        check.push(e.list_name);
        arr.push({ name: e.list_name, values: [] });
      }
      for (let i = 0; i < arr.length; i++) {
        if (e.list_name === arr[i].name) {
          arr[i].values.push({ id: e.task_id, body: e.body });
        }
      }
    });
    return arr;
  };

  render() {
    const { classes, taskList } = this.props;
    let names = this.determineListNames(taskList);
    return (
      <div className={classes.root}>
        <UpdateTaskForm />
        {names.map((e, i) => {
          return (
            <div className={classes.background} key={i}>
              <div className={classes.items}>
                <h1 className={classes.leftSide}>{e.name}</h1>
                <div className={classes.rightSide}>
                  <AddBox onClick={() => this.addTask()} />
                  <Clear onClick={() => this.deleteTaskList(e.name)} />
                </div>
              </div>
              <Divider />
              <Paper className={classes.task}>
                <List dense className={classes.root2}>
                  {e.values.map((value, i) => {
                    return (
                      <Paper key={i} className={classes.innerPaper}>
                        <ListItem button>
                          <ListItemText primary={value.body} />
                          <ListItemSecondaryAction>
                            <Clear onClick={() => this.deleteTask(value.id)} />
                            <Edit
                              onClick={() => {
                                this.props.updateTaskToggle(this.props.open);
                                this.props.updateTask({
                                  list_name: e.name,
                                  body: value.body,
                                  task_id: value.id
                                });
                              }}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      </Paper>
                    );
                  })}
                </List>
              </Paper>
            </div>
          );
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
