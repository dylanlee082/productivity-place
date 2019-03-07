//This is the sidebar that shows on all pages in the main part of the application and is the main navigation throughout the app

//Main NPM imports
import React, { Component, Fragment } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleOpen } from "../ducks/reducers/generalReducer";

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
import Collapse from "@material-ui/core/Collapse";

//Material-UI Icon Imports
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import StarBorder from "@material-ui/icons/StarBorder";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const drawerWidth = 240;

//Material-UI Styling
const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.primary.main
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
    marginLeft: "3vw"
  },
  link: {
    textDecoration: "none"
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  primary: {
    color: theme.palette.secondary.main
  }
});

class Sidebar extends Component {
  state = {
    calendarOpen: false,
    taskOpen: false,
    contactOpen: false,
    profileOpen: false
  };

  handleLogout = () => {
    axios.get("/auth/logout").then(res => {
      this.props.history.push("/");
    });
  };

  //Handlers for the sidebar to open and close
  handleCalendarClick = () => {
    this.setState({
      calendarOpen: !this.state.calendarOpen,
      taskOpen: false,
      contactOpen: false,
      profileOpen: false
    });
  };

  handleProfileClick = () => {
    this.setState({
      profileOpen: !this.state.profileOpen,
      taskOpen: false,
      contactOpen: false,
      calendarOpen: false
    });
  };

  handleTaskClick = () => {
    this.setState({
      taskOpen: !this.state.taskOpen,
      calendarOpen: false,
      contactOpen: false,
      profileOpen: false
    });
  };

  handleContactClick = () => {
    this.setState({
      contactOpen: !this.state.contactOpen,
      calendarOpen: false,
      taskOpen: false,
      profileOpen: false
    });
  };

  render() {
    const { classes, settings } = this.props;
    return (
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={true}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader} />
          <Divider />
          <List>
            <Link
              to={"/main/profile"}
              className={classes.link}
              onClick={() => this.handleProfileClick()}
            >
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon color="secondary" />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.primary }}
                  primary="Profile"
                />
              </ListItem>
            </Link>
            {/* The link for the task view */}
            {settings.tasktoggle ? (
              <Fragment>
                <Link
                  className={classes.link}
                  to={"/main/tasks"}
                  onClick={() => this.handleTaskClick()}
                >
                  <ListItem button>
                    <ListItemIcon>
                      <InboxIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      classes={{ primary: classes.primary }}
                      primary="Tasks"
                    />
                    {this.state.taskOpen ? (
                      <ExpandLess color="secondary" />
                    ) : (
                      <ExpandMore color="secondary" />
                    )}
                  </ListItem>
                </Link>
                {/* The secondary links for task */}
                <Collapse in={this.state.taskOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <StarBorder color="secondary" />
                      </ListItemIcon>
                      <TaskListForm />
                    </ListItem>
                  </List>
                </Collapse>
              </Fragment>
            ) : null}
            {/* The link for the calendar view */}
            {settings.calendartoggle ? (
              <Fragment>
                <Link
                  className={classes.link}
                  to={"/main/calendar"}
                  onClick={() => this.handleCalendarClick()}
                >
                  <ListItem button>
                    <ListItemIcon>
                      <MailIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      classes={{ primary: classes.primary }}
                      primary="Calendar"
                    />
                    {this.state.calendarOpen ? (
                      <ExpandLess color="secondary" />
                    ) : (
                      <ExpandMore color="secondary" />
                    )}
                  </ListItem>
                </Link>
                {/* The secondary links for the calendar view */}
                <Collapse
                  in={this.state.calendarOpen}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                      {/* Appt form creator */}
                      <ListItemIcon>
                        <StarBorder color="secondary" />
                      </ListItemIcon>
                      <CalendarForm />
                    </ListItem>
                    {/* Switch the view of the calendar to include a day view */}
                    {/* <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <StarBorder color="secondary" />
                      </ListItemIcon>
                      <ListItemText
                        classes={{ primary: classes.primary }}
                        primary="Day View"
                      />
                    </ListItem> */}
                  </List>
                </Collapse>
              </Fragment>
            ) : null}
            {/* The link for the contacts view */}
            {settings.contacttoggle ? (
              <Fragment>
                <Link
                  className={classes.link}
                  to={"/main/contacts"}
                  onClick={() => this.handleContactClick()}
                >
                  <ListItem button>
                    <ListItemIcon>
                      <InboxIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      classes={{ primary: classes.primary }}
                      primary="Contacts"
                    />
                    {this.state.contactOpen ? (
                      <ExpandLess color="secondary" />
                    ) : (
                      <ExpandMore color="secondary" />
                    )}
                  </ListItem>
                </Link>
                {/* The secondary links for the contact view */}
                <Collapse
                  in={this.state.contactOpen}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                      {/* Contact form creator */}
                      <ListItemIcon>
                        <StarBorder color="secondary" />
                      </ListItemIcon>
                      <ContactForm />
                    </ListItem>
                  </List>
                </Collapse>{" "}
              </Fragment>
            ) : null}

            {/* The link to logout of the site, back to the landing page */}
            <ListItem button onClick={() => this.handleLogout()}>
              <ListItemIcon>
                <InboxIcon color="secondary" />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                primary="Logout"
              />
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.generalReducer.open,
    user: state.generalReducer.user,
    settings: state.generalReducer.settings
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { toggleOpen }
  )(withStyles(styles, { withTheme: true })(Sidebar))
);
