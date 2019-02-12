//Main NPM imports
import React, { Component } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleOpen } from "../ducks/reducer";

//Other Components
import CalendarForm from "./Body/views/Calendar/CalendarForm";
import TaskListForm from "./Body/views/TaskList/TaskListForm";
import ContactForm from "./Body/views/Contact/ContactForm";

//Material-UI Core Imports
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";

//Material-UI Icon Imports
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import StarBorder from "@material-ui/icons/StarBorder";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  link: {
    textDecoration: "none"
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class Sidebar extends Component {
  state = {
    calendarOpen: false,
    taskOpen: false,
    contactOpen: false
  };

  handleLogout = () => {
    axios.get("/auth/logout").then(res => {
      this.props.history.push("/");
    });
  };

  handleCalendarClick = () => {
    this.setState({
      calendarOpen: !this.state.calendarOpen
    });
  };

  handleTaskClick = () => {
    this.setState({
      taskOpen: !this.state.taskOpen
    });
  };

  handleContactClick = () => {
    this.setState({
      contactOpen: !this.state.contactOpen
    });
  };

  render() {
    const { classes, theme, open, toggleOpen } = this.props;
    return (
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={() => toggleOpen(open)}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {/* The link for the task view */}
            <Link
              className={classes.link}
              to={"/main/tasks"}
              onClick={() => this.handleTaskClick()}
            >
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Tasks" />
                {this.state.taskOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            </Link>
            {/* The secondary links for task */}
            <Collapse in={this.state.taskOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <TaskListForm />
                </ListItem>
              </List>
            </Collapse>
            {/* The link for the calendar view */}
            <Link
              className={classes.link}
              to={"/main/calendar"}
              onClick={() => this.handleCalendarClick()}
            >
              <ListItem button>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText primary="Calendar" />
                {this.state.calendarOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            </Link>
            {/* The secondary links for the calendar view */}
            <Collapse in={this.state.calendarOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  {/* Appt form creator */}
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <CalendarForm />
                </ListItem>
                {/* Switch the view of the calendar to include a day view */}
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Day View" />
                </ListItem>
              </List>
            </Collapse>
            {/* The link for the contacts view */}
            <Link
              className={classes.link}
              to={"/main/contacts"}
              onClick={() => this.handleContactClick()}
            >
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Contacts" />
                {this.state.contactOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            </Link>
            {/* The secondary links for the contact view */}
            <Collapse in={this.state.contactOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  {/* Contact form creator */}
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ContactForm />
                </ListItem>
              </List>
            </Collapse>
            {/* The link for the settings view */}
            <Link className={classes.link} to={"/main/settings"}>
              <ListItem button>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
            </Link>
            {/* The link to logout of the site, back to the landing page */}
            <ListItem button onClick={() => this.handleLogout()}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.open
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { toggleOpen }
  )(withStyles(styles, { withTheme: true })(Sidebar))
);
