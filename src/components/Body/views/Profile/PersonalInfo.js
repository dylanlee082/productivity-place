//This is the whole middle column of the profile page

// Main NPM Imports
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { CountryRegionData } from "react-country-region-selector";
import { getSettings } from "../../../../ducks/reducers/generalReducer";

// Material-UI Core Imports
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Divider from "@material-ui/core/Divider";

//Material-UI Styling
const styles = theme => ({
  info: {
    height: "85vh",
    width: "33vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
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
    justifyContent: "flex-end",
    fontSize: ".8em"
  },
  location: {
    display: "flex",
    justifyContent: "space-evenly"
  },
  locationSelector: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "15vw"
  },
  birthday: {
    display: "flex",
    flexDirection: "column"
  },
  birthdaySelectors: {
    display: "flex",
    justifyContent: "center"
  }
});

class PersonalInfo extends Component {
  constructor() {
    super();
    this.state = {
      country: "none",
      countryValue: "none",
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
      this.setState({
        fullname: this.props.settings.name,
        email: this.props.settings.email,
        number: this.props.settings.number,
        fact: this.props.settings.funfact,
        country: this.props.settings.country,
        countryValue: this.props.settings.country[0],
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
      this.setState({
        fullname: this.props.settings.name,
        email: this.props.settings.email,
        number: this.props.settings.number,
        fact: this.props.settings.funfact,
        country: this.props.settings.country,
        countryValue: this.props.settings.country[0],
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
    if (e.target.name === "country") {
      console.log(e.target.value);
      this.setState({
        country: e.target.value,
        countryValue: e.target.value[0]
      });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleSubmit = () => {
    let newBirth =
      this.state.year + "-" + this.state.month + "-" + this.state.day;
    this.setState({ birthday: newBirth }, () =>
      axios
        .put("/api/personal", { ...this.state, id: this.props.user.id })
        .then(res => {
          this.props.getSettings(this.props.user.id);
        })
    );
  };

  render() {
    const { classes } = this.props;
    //Loops for the menu item options for the birthday selectors
    const dayOptions = [];
    const monthOptions = [];
    const yearOptions = [];
    for (let i = 1; i <= 31; i++) {
      dayOptions.push(
        <MenuItem key={i} value={String(i).padStart(2, "0")}>
          {String(i).padStart(2, "0")}
        </MenuItem>
      );
    }
    for (let i = 1; i <= 12; i++) {
      monthOptions.push(
        <MenuItem key={i} value={String(i).padStart(2, "0")}>
          {String(i).padStart(2, "0")}
        </MenuItem>
      );
    }
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
        {/* Input fields for the main personal information */}
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

        {/* The birthday selector */}
        <div className={classes.birthday}>
          <h2>Birthday</h2>
          <div className={classes.birthdaySelectors}>
            {/* Month */}
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

            {/* Day */}
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

            {/* Year */}
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
          </div>
        </div>

        <Divider variant="middle" />

        {/* Country and region Selectors */}
        <div className={classes.location}>
          <div className={classes.locationSelector}>
            <h2>Country</h2>
            <FormControl className={classes.formControl}>
              <Select
                value={this.state.countryValue}
                onChange={e => this.handleChange(e)}
                name="country"
                className={classes.selectEmpty}
                autoWidth
              >
                {CountryRegionData.map((option, index) => (
                  <MenuItem key={option} value={option}>
                    {option[0]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className={classes.locationSelector}>
            <h2>State/Region</h2>
            <FormControl className={classes.formControl}>
              <Select
                value={this.state.region}
                onChange={e => this.handleChange(e)}
                name="region"
                className={classes.selectEmpty}
                autoWidth
              >
                {this.getRegions(this.state.country).map((option, index) => (
                  <MenuItem key={option} value={option[0]}>
                    {option[0]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <Divider variant="middle" />
        {/* Overall Sumbit button */}
        <button onClick={() => this.handleSubmit()}>Update Information</button>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    settings: state.generalReducer.settings,
    user: state.generalReducer.user
  };
};

export default connect(
  mapStateToProps,
  { getSettings }
)(withStyles(styles)(PersonalInfo));
