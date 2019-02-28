import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { CountryRegionData } from "react-country-region-selector";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import { getSettings } from "../../../../ducks/reducer";

const styles = theme => ({
  info: {
    height: "85vh",
    width: "33vw"
  },
  textField: {
    height: "4vh",
    width: "20vw",
    marginLeft: "1vw"
  },
  input: {
    display: "flex",
    alignItems: "center",
    marginRight: "2vw",
    justifyContent: "flex-end"
  },
  location: {
    display: "flex",
    justifyContent: "space-evenly"
  },
  country: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "15vw"
  },
  state: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "15vw"
  }
});

class PersonalInfo extends Component {
  constructor() {
    super();
    this.state = {
      country: "",
      region: "",
      fullname: "",
      email: "",
      number: "",
      fact: "",
      birthday: "",
      day: 0,
      month: 0,
      year: 0
    };
  }

  componentDidMount = () => {
    if (this.props.settings.birthday) {
      const birth = {
        year: this.props.settings.birthday.substring(0, 4),
        month: this.props.settings.birthday.substring(5, 7),
        day: this.props.settings.birthday.substring(8, 10)
      };
      console.log(birth);
      this.setState({
        fullname: this.props.settings.name,
        email: this.props.settings.email,
        number: this.props.settings.number,
        fact: this.props.settings.funfact,
        country: this.props.settings.country,
        region: this.props.settings.region,
        birthday: this.props.settings.birthday,
        day: birth.day,
        month: birth.month,
        year: birth.year
      });
    }
  };

  componentDidUpdate = prevProps => {
    if (this.props.settings !== prevProps.settings) {
      const birth = {
        year: this.props.settings.birthday.substring(0, 4),
        month: this.props.settings.birthday.substring(5, 7),
        day: this.props.settings.birthday.substring(8, 10)
      };
      console.log(birth);
      this.setState({
        fullname: this.props.settings.name,
        email: this.props.settings.email,
        number: this.props.settings.number,
        fact: this.props.settings.funfact,
        country: this.props.settings.country,
        region: this.props.settings.region,
        birthday: this.props.settings.birthday,
        day: birth.day,
        month: birth.month,
        year: birth.year
      });
    }
  };

  getRegions = country => {
    if (!country) {
      return [];
    }
    return country[2].split("|").map(regionPair => {
      let regionName = regionPair.split("~");
      return regionName;
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = () => {
    axios.put("/api/personal", this.state).then(res => {
      console.log("hit");
      this.props.getSettings(this.props.user.id);
    });
  };

  render() {
    const { classes } = this.props;
    const dayOptions = [];
    for (let i = 1; i <= 31; i++) {
      dayOptions.push(
        <MenuItem key={i} value={String(i).padStart(2, "0")}>
          {String(i).padStart(2, "0")}
        </MenuItem>
      );
    }
    const monthOptions = [];
    for (let i = 1; i <= 12; i++) {
      monthOptions.push(
        <MenuItem key={i} value={String(i).padStart(2, "0")}>
          {String(i).padStart(2, "0")}
        </MenuItem>
      );
    }
    const yearOptions = [];
    for (let i = 1920; i < 2025; i++) {
      yearOptions.push(
        <MenuItem key={i} value={i}>
          {i}
        </MenuItem>
      );
    }
    return (
      <Paper className={classes.info}>
        <h1>Edit Your Personal Information</h1>
        <Divider variant="middle" />
        <div className={classes.input}>
          <h2>Full Name</h2>
          <TextField
            id="outlined"
            name="fullname"
            value={this.state.fullname}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={e => this.handleChange(e)}
          />
        </div>
        <div className={classes.input}>
          <h2>Email</h2>
          <TextField
            id="outlined"
            name="email"
            value={this.state.email}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={e => this.handleChange(e)}
          />
        </div>
        <div className={classes.input}>
          <h2>Phone Number</h2>
          <TextField
            id="outlined"
            name="number"
            value={this.state.number}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={e => this.handleChange(e)}
          />
        </div>
        <div className={classes.input}>
          <h2>A fact about you</h2>
          <TextField
            id="outlined"
            name="fact"
            value={this.state.fact}
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={e => this.handleChange(e)}
          />
        </div>
        <Divider variant="middle" />
        <h2>Birthday</h2>
        <FormControl className={classes.formControl}>
          <Select
            value={this.state.day}
            onChange={e => this.handleChange(e)}
            displayEmpty
            name="day"
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {dayOptions.map(e => e)}
          </Select>
          <FormHelperText>Day</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Select
            value={this.state.month}
            onChange={e => this.handleChange(e)}
            displayEmpty
            name="month"
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {monthOptions.map(e => e)}
          </Select>
          <FormHelperText>Month</FormHelperText>
        </FormControl>
        <FormControl className={classes.formControl}>
          <Select
            value={this.state.year}
            onChange={e => this.handleChange(e)}
            displayEmpty
            name="year"
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {yearOptions.map(e => e)}
          </Select>
          <FormHelperText>Year</FormHelperText>
        </FormControl>
        <Divider variant="middle" />
        <div className={classes.location}>
          <div className={classes.country}>
            <h2>Country</h2>
            <FormControl className={classes.formControl}>
              <Select
                value={this.state.country}
                onChange={this.handleChange}
                displayEmpty
                name="country"
                className={classes.selectEmpty}
              >
                {CountryRegionData.map((option, index) => (
                  <MenuItem key={option[0]} value={option}>
                    {option[0]}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Year</FormHelperText>
            </FormControl>
          </div>
          <div className={classes.state}>
            <h2>State/Region</h2>
            <FormControl className={classes.formControl}>
              <Select
                value={this.state.region}
                onChange={this.handleChange}
                displayEmpty
                name="state"
                className={classes.selectEmpty}
              >
                {this.getRegions(this.state.country).map((option, index) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Year</FormHelperText>
            </FormControl>
          </div>
        </div>
        <Divider variant="middle" />
        <button onClick={() => this.handleSubmit()}>Update Information</button>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    settings: state.settings,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { getSettings }
)(withStyles(styles)(PersonalInfo));
