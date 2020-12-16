//Main NPM Imports
import React, { useEffect } from "react";
import axios from "axios";
import { connect, useSelector } from "react-redux";
import {
  getTask,
  updateTaskToggle,
  updateTask,
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
const styles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    fontFamily: theme.typography.fontFamily,
  },
  background: {
    display: "flex",
    flexDirection: "column",
    width: "20vw",
  },
  items: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftSide: {
    fontSize: 20,
    marginLeft: 10,
  },
  rightSide: {
    marginRight: 10,
  },
  task: {
    margin: 10,
    display: "flex",
    flexDirection: "column",
    background: "grey",
  },
  innerItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  innerPaper: {
    background: "white",
    width: "17.5vw",
  },
  root2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

const TaskList = (props) => {
  const user = useSelector((state) => state.generalReducer.user);

  useEffect(() => {
    const { user, getTask } = props;
    if (user.id) {
      getTask(user.id);
    }
  }, [user.id]);

  const addTask = () => {};

  const deleteTask = (id) => {
    const { user, getTask } = this.props;
    axios
      .delete(`/api/task/${id}`)
      .then(() => console.log("It worked"))
      .catch((err) => console.log(err));
    getTask(user.id);
  };

  const deleteTaskList = (list_name) => {
    const { user, getTask } = this.props;
    axios
      .delete(`/api/list/${list_name}`)
      .then(() => console.log("It worked"))
      .catch((err) => console.log(err));
    getTask(user.id);
  };

  const determineListNames = (taskList) => {
    const check = [];
    const arr = [];
    // eslint-disable-next-line
    taskList.map((e) => {
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

  const { classes, taskList } = props;
  let names = determineListNames(taskList);
  return (
    <div className={classes.root}>
      <UpdateTaskForm />
      {names.map((e, i) => {
        return (
          <div className={classes.background} key={i}>
            <div className={classes.items}>
              <h1 className={classes.leftSide}>{e.name}</h1>
              <div className={classes.rightSide}>
                <AddBox onClick={() => addTask()} />
                <Clear onClick={() => deleteTaskList(e.name)} />
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
                          <Clear onClick={() => deleteTask(value.id)} />
                          <Edit
                            onClick={() => {
                              props.updateTaskToggle(props.open);
                              props.updateTask({
                                list_name: e.name,
                                body: value.body,
                                task_id: value.id,
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
};

const mapStateToProps = (state) => {
  return {
    user: state.generalReducer.user,
    taskList: state.taskReducer.taskList,
    open: state.taskReducer.updateTaskToggle,
  };
};

export default connect(
  mapStateToProps,
  { getTask, updateTaskToggle, updateTask }
)(withStyles(styles)(TaskList));
