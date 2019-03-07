//This is the login modal that pops up for the user to either register for an account or sign into an existing account

// Main NPM Imports
import React, { Component, Fragment } from "react";
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
    color: "black",
    fontSize: "1.2em"
  },
  linkbtn: {
    margin: "0",
    padding: "0"
  }
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      mode: "Login"
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //Login
  handleLogin = () => {
    axios
      .post("/auth/login", this.state)
      .then(res => {
        this.props.getUser();
        this.props.history.push("/main/tasks");
        this.props.loginFormToggle(this.props.loginForm);
      })
      .catch(err => console.log(err));
  };

  //Register
  handleRegister = () => {
    axios
      .post("/auth/register", this.state)
      .then(res => {
        this.props.history.push("/main/tasks");
        this.props.getUser();
        this.props.loginFormToggle(this.props.loginForm);
      })
      .catch(err => console.log(err));
  };

  //This toggle's between the two sides of the form
  handleFormSwitch = () => {
    if (this.state.mode === "Login") {
      this.setState({ mode: "Register" });
    } else {
      this.setState({ mode: "Login" });
    }
  };

  render() {
    const { classes, loginForm, loginFormToggle } = this.props;
    return (
      <div>
        {/* Button that is displayed for the component */}
        <Button
          onClick={() => loginFormToggle(loginForm)}
          className={classes.button}
        >
          Login/Register
        </Button>
        {/* Modal that pops up on click */}
        <Dialog
          open={loginForm}
          onClose={() => loginFormToggle(loginForm)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.state.mode}</DialogTitle>
          {this.state.mode === "Register" ? (
            <Fragment>
              {/* Register Side */}
              <DialogContent>
                <DialogContentText>
                  If this is your first time here please fill out the
                  information to create your account! If you already have an
                  account please click down below to change to the login page.
                </DialogContentText>
                <TextField
                  margin="dense"
                  name="username"
                  label="Username"
                  type="text"
                  fullWidth
                  onChange={e => this.handleChange(e)}
                />
                <TextField
                  margin="dense"
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  onChange={e => this.handleChange(e)}
                />
                <TextField
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
                <Button onClick={() => this.handleFormSwitch()} color="primary">
                  Login
                </Button>
                <Button onClick={() => this.handleRegister()} color="primary">
                  Register
                </Button>
              </DialogActions>{" "}
            </Fragment>
          ) : (
            <Fragment>
              {/* Login Side */}
              <DialogContent>
                <DialogContentText>
                  Please enter your account information to login to your
                  account. If you by chance have accidentally selected the login
                  and wish to register simply select the register button at the
                  bottom of the form.
                </DialogContentText>
                <TextField
                  margin="dense"
                  name="username"
                  label="username"
                  type="text"
                  fullWidth
                  onChange={e => this.handleChange(e)}
                />
                <TextField
                  margin="dense"
                  name="password"
                  label="password"
                  type="password"
                  fullWidth
                  onChange={e => this.handleChange(e)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => this.handleLogin()} color="primary">
                  Login
                </Button>
                <Button onClick={() => this.handleFormSwitch()} color="primary">
                  Register
                </Button>
              </DialogActions>
            </Fragment>
          )}
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginForm: state.generalReducer.loginForm
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { getUser, loginFormToggle }
  )(withStyles(styles)(Login))
);
