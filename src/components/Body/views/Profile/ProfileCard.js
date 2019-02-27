import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

const styles = theme => ({
  profile: {
    background: "red",
    height: "55vh",
    width: "18vw"
  }
});

class ProfileCard extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }
  handleDelete = id => {
    axios.delete(`/auth/delete/${id}`).then(res => {
      this.props.history.push("/");
    });
  };
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, user } = this.props;
    return (
      <Paper className={classes.profile}>
        <h1>Your Profile</h1>
        <h2>Profile Image</h2>
        <h2>{user.username}</h2>
        <h2>A fact about you?</h2>
        <button>Upload new avatar</button>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Delete Account
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete your account?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Completing this action will permanently delete your account. It is
              not possible to recover any of your information after this action
              is completed. If you do not want to delete your account please
              select the disagree option.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={() => this.handleDelete(user.id)} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(ProfileCard))
);
