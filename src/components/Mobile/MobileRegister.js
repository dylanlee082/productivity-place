//This will only show up on mobile devices and is the registration specific to mobile registration. It is similar to the one for laptop/desktop, but does not offer login functionality

//Main NPM Imports
import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUser, loginFormToggle } from "../../ducks/reducers/generalReducer";

//Material-UI Core Imports
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//Material-UI Styling
const styles = theme => ({
  button: {
    color: theme.palette.secondary.main,
    fontSize: "1.2em",
    border: `2px ${theme.palette.secondary.main} solid`
  },
  linkbtn: {
    margin: "0",
    padding: "0"
  }
});

class MobileRegister extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleRegister = () => {
    axios
      .post("/auth/register", this.state)
      .then(res => {
        this.props.getUser();
        this.props.loginFormToggle(this.props.open);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes, open, loginFormToggle } = this.props;
    return (
      <div>
        <Button
          onClick={() => loginFormToggle(open)}
          className={classes.button}
        >
          Register
        </Button>
        <Dialog
          open={open}
          onClose={() => loginFormToggle(open)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" disableTypography={true}>
            Register
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill out the information below to create an account. It is
              very important that your phone number is correctly inputted
              otherwise we will not be able to contact you through sms.
            </DialogContentText>
            <TextField
              required
              margin="dense"
              name="username"
              label="Username"
              type="text"
              fullWidth
              onChange={e => this.handleChange(e)}
            />
            <TextField
              required
              margin="dense"
              name="password"
              label="Password"
              type="password"
              fullWidth
              onChange={e => this.handleChange(e)}
            />
            <TextField
              required
              margin="dense"
              name="number"
              label="Phone Number"
              type="text"
              fullWidth
              onChange={e => this.handleChange(e)}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="text"
              fullWidth
              onChange={e => this.handleChange(e)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleRegister()} color="primary">
              Register
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.loginForm
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { getUser, loginFormToggle }
  )(withStyles(styles)(MobileRegister))
);
