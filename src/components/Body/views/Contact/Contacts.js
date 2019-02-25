//Main NPM Imports
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  updateContactToggle,
  getContact,
  updateContact
} from "../../../../ducks/reducer";
import UpdateContactForm from "./UpdateContactForm";

//Material-UI Core Imports
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";

//Material-UI Icon Imports
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Clear from "@material-ui/icons/Clear";
import Edit from "@material-ui/icons/Edit";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  detail: {
    display: "flex",
    justifyContent: "space-between"
  }
});

class Contact extends Component {
  componentDidMount = () => {
    const { getContact, user } = this.props;
    getContact(user.id);
  };

  handleDelete = id => {
    axios
      .delete(`/api/contact/${id}`)
      .then(res => {
        console.log("Contact Deleted");
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <UpdateContactForm />
        {this.props.contactList.map((e, i) => {
          return (
            <ExpansionPanel key={i}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>{e.name}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.detail}>
                <Typography>
                  Number: {e.number}
                  Address: {e.address}
                </Typography>
                <div onClick={() => this.handleDelete(e.contact_id)}>
                  <Clear />
                </div>
                <Edit
                  onClick={() => {
                    this.props.updateContactToggle(this.props.open);
                    this.props.updateContact(e);
                  }}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    contactList: state.contactList,
    user: state.user,
    open: state.updateContactToggle
  };
};

export default connect(
  mapStateToProps,
  { getContact, updateContactToggle, updateContact }
)(withStyles(styles)(Contact));
