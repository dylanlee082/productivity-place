import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../ducks/reducer";
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
  }
});

class Login extends Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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
      })
      .catch(err => console.log(err));
  };

  handleRegister = () => {
    axios
      .post("/auth/register", this.state)
      .then(res => {
        this.props.history.push("/");
        this.props.getUser();
        this.handleClose();
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button onClick={this.handleClickOpen} className={classes.button}>
          Login/Register
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Login/Register</DialogTitle>
          <DialogContent>
            <DialogContentText>
              If you already have an account just enter your info and login, if
              it is your first time here with us and would like to create an
              account simply fill out the information to register!
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
            <TextField
              margin="dense"
              name="number"
              label="number"
              type="text"
              fullWidth
              onChange={e => this.handleChange(e)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleLogin()} color="primary">
              Login
            </Button>
            <Button onClick={() => this.handleRegister()} color="primary">
              Register
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(
    mapStateToProps,
    { getUser }
  )(withStyles(styles)(Login))
);
