import React, { Component } from "react";

import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import AddBox from "@material-ui/icons/AddBox";
import Clear from "@material-ui/icons/Clear";

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
  }
});

class TaskList extends Component {
  constructor() {
    super();
    this.state = {
      taskLists: [
        { ToDo: [{ body: "I need to work" }, { body: "I hate working" }] },
        { Family: [{ body: "I need to work" }, { body: "I hate working" }] }
      ]
    };
  }

  addTask = () => {};

  deleteTask = () => {};

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this.state.taskLists.map((e, i) => {
          const key = Object.getOwnPropertyNames(e)[0];
          return (
            <Paper key={i} className={classes.background}>
              <div className={classes.items}>
                <h1 className={classes.leftSide}>
                  {Object.getOwnPropertyNames(e)[0]}
                </h1>
                <div className={classes.rightSide}>
                  <AddBox onClick={() => this.addTask()} />{" "}
                  <Clear onClick={() => this.deleteTask()} />
                </div>
              </div>
              <div className={classes.task}>
                {e[key].map((e, i) => {
                  return <p>{e.body}</p>;
                })}
              </div>
            </Paper>
          );
        })}
      </div>
    );
  }
}

export default withStyles(styles)(TaskList);
