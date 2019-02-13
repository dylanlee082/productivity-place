//Main NPM Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleOpen, getUser } from "../../ducks/reducer";
import { Switch, Route } from "react-router-dom";

//Other Components
import Sidebar from "../Sidebar";
import TaskList from "./views/TaskList/TaskList";
import Calendar from "./views/Calendar/Calendar";
import Settings from "./views/Settings";
import Contacts from "./views/Contact/Contacts";

//Material-UI Core Imports
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
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
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
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
    const { classes, open, toggleOpen } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={() => toggleOpen(open)}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Productivity Place
            </Typography>
          </Toolbar>
        </AppBar>
        <Sidebar />
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <Switch>
            <Route path="/main/tasks" component={TaskList} />
            <Route path="/main/calendar" component={Calendar} />
            <Route path="/main/settings" component={Settings} />
            <Route path="/main/contacts" component={Contacts} />
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
  { toggleOpen, getUser }
)(withStyles(styles, { withTheme: true })(Body));
