import React, { Component, Fragment } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUser, loginFormToggle } from "../../ducks/reducer";
import { withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
      mode: "Register"
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLogin = () => {
    axios
      .post("/auth/login", this.state)
      .then(res => {
        this.props.getUser();
        this.props.history.push("/main/tasks");
        this.props.loginFormToggle(this.props.open);
      })
      .catch(err => console.log(err));
  };

  handleRegister = () => {
    axios
      .post("/auth/register", this.state)
      .then(res => {
        this.props.history.push("/main/tasks");
        this.props.getUser();
        this.props.loginFormToggle(this.props.open);
      })
      .catch(err => console.log(err));
  };

  handleFormSwitch = () => {
    if (this.state.mode === "Login") {
      this.setState({ mode: "Register" });
    } else {
      this.setState({ mode: "Login" });
    }
  };

  render() {
    const { classes, open, loginFormToggle } = this.props;
    return (
      <div>
        <Button
          onClick={() => loginFormToggle(open)}
          className={classes.button}
        >
          Register/Login
        </Button>
        <Dialog
          open={open}
          onClose={() => loginFormToggle(open)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.state.mode}</DialogTitle>
          {this.state.mode === "Register" ? (
            <Fragment>
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
    open: state.loginForm
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { getUser, loginFormToggle }
  )(withStyles(styles)(Login))
);
