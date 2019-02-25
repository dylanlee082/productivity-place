//Main NPM Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../ducks/reducer";
import { Switch, Route } from "react-router-dom";

//Other Components
import Sidebar from "../Sidebar";
import TaskList from "./views/TaskList/TaskList";
import Calendar from "./views/Calendar/Calendar";
import Contacts from "./views/Contact/Contacts";
import Profile from "./views/Profile";

//Material-UI Core Imports
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex",
    background: theme.palette.secondary.main,
    height: "100vh",
    zIndex: "-5"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    marginLeft: 0
  }
});

class Body extends Component {
  componentDidMount = () => {
    this.props.getUser().then(res => {
      if (!res.value.data) {
        this.props.history.push("/");
      }
    });
  };

  render() {
    const { classes, open } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar disableGutters={!open}>
            <Typography variant="h6" color="secondary" noWrap>
              Productivity Place
            </Typography>
          </Toolbar>
        </AppBar>
        <Sidebar />
        <main className={classes.content}>
          <div className={classes.drawerHeader} />
          <Switch>
            <Route exact path="/main/tasks" component={TaskList} />
            <Route exact path="/main/calendar" component={Calendar} />
            <Route exact path="/main/profile" component={Profile} />
            <Route exact path="/main/contacts" component={Contacts} />
          </Switch>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.open,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { getUser }
)(withStyles(styles, { withTheme: true })(Body));
