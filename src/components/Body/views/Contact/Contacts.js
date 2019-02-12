import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Clear from "@material-ui/icons/Clear";

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
  constructor() {
    super();
    this.state = {
      contacts: []
    };
  }

  componentDidMount = () => {
    axios.get("/api/contact").then(res => {
      this.setState({
        contacts: res.data
      });
    });
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
        {this.state.contacts.map((e, i) => {
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
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        })}
      </div>
    );
  }
}

export default withStyles(styles)(Contact);
