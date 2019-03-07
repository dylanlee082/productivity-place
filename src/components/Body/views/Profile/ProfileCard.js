//In the profile page this is the leftmost profile section

//Main NPM Imports
import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../../../ducks/reducers/generalReducer";
// import { DropzoneDialog } from "material-ui-dropzone";

//Material-UI Core Imports
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";

//Material-UI Styling
const styles = theme => ({
  profile: {
    height: "55vh",
    width: "18vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  avatar: {
    width: 100,
    height: 100
  }
});

class ProfileCard extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      img: ""
      // dropzoneOpen: false,
      // files: []
    };
  }

  componentDidMount = () => {
    if (this.props.settings.profile_img) {
      this.setState({ img: this.props.settings.profile_img });
    }
  };

  componentDidUpdate = prevProps => {
    if (this.props.settings !== prevProps.settings) {
      this.setState({ img: this.props.settings.profile_img });
    }
  };

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

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = () => {
    axios
      .put("/api/avatar", { img: this.state.img, id: this.props.user.id })
      .then(res => {
        getUser();
      });
  };

  // These handlers go along side the possible later inclusion of the dropzone component
  // handleDropzoneClose = () => {
  //   this.setState({ dropzoneOpen: false });
  // };

  // handleSave = files => {
  //   this.setState({
  //     files: files,
  //     dropzoneOpen: false
  //   });
  // };

  // handleDropzoneOpen = () => {
  //   this.setState({
  //     dropzoneOpen: true
  //   });
  // };

  render() {
    const { classes, user, settings } = this.props;
    return (
      <Paper className={classes.profile}>
        <h1>Your Profile</h1>
        <Avatar
          alt="Username"
          src={this.state.img}
          className={classes.avatar}
        />
        <h2>{settings.name}</h2>
        <Divider />
        <h2>{settings.funfact}</h2>
        <input
          type="text"
          value={this.state.img}
          name="img"
          onChange={e => this.handleChange(e)}
        />
        <button onClick={() => this.handleSubmit()}>
          Save Profile Picture
        </button>
        {/* Consider using this with amazon aws or google firebase at some point in the future, it's a cool effect */}
        {/* <Button onClick={this.handleDropzoneOpen}>Upload new avatar</Button>
        <DropzoneDialog
          open={this.state.dropzoneOpen}
          onSave={this.handleSave}
          acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
          showPreviews={true}
          maxFileSize={5000000}
          onClose={this.handleDropzoneClose}
        /> */}
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Delete Account
        </Button>
        {/* This is the dialog warning the user to make sure they actively want to delete there account */}
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
    user: state.generalReducer.user,
    settings: state.generalReducer.settings
  };
};

export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(ProfileCard))
);
