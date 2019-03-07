//This is the overall contacts page

//Main NPM Imports
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  updateContactToggle,
  getContact,
  updateContact
} from "../../../../ducks/reducers/contactReducer";
import NumberFormat from "react-number-format";

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

//Other Components
import UpdateContactForm from "./UpdateContactForm";

//Material-UI Styling
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
  },
  right: {
    display: "flex"
  },
  left: {
    display: "flex",
    flexDirection: "column"
  },
  address: {
    textAlign: "left"
  }
});

class Contact extends Component {
  componentDidMount = () => {
    const { getContact, user } = this.props;
    if (user.id) {
      getContact(user.id);
    }
  };

  componentDidUpdate = prevProps => {
    if (prevProps.user.id !== this.props.user.id) {
      console.log("hit");
      console.log(this.props.user.id);
      this.props.getContact(this.props.user.id);
    }
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
    console.log(this.props.user);
    this.props.contactList.sort(function(a, b) {
      var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
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
                <div className={classes.left}>
                  <Typography>
                    Number:{" "}
                    <NumberFormat
                      value={e.number}
                      displayType={"text"}
                      format="+# (###) ###-####"
                    />
                  </Typography>
                  <Typography className={classes.address}>
                    Address: {e.address}
                  </Typography>
                </div>
                <div className={classes.right}>
                  <div onClick={() => this.handleDelete(e.contact_id)}>
                    <Clear />
                  </div>
                  <Edit
                    onClick={() => {
                      this.props.updateContactToggle(this.props.open);
                      this.props.updateContact(e);
                    }}
                  />
                </div>
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
    contactList: state.contactReducer.contactList,
    user: state.generalReducer.user,
    open: state.contactReducer.updateContactToggle
  };
};

export default connect(
  mapStateToProps,
  { getContact, updateContactToggle, updateContact }
)(withStyles(styles)(Contact));
