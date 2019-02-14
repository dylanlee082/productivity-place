import React, { Component } from "react";
import { CountryRegionData } from "react-country-region-selector";
import { withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    display: "flex"
  },
  left: {
    display: "flex",
    flexDirection: "column"
  },
  right: {
    display: "flex",
    flexDirection: "column"
  },
  profile: {
    background: "red",
    height: "55vh",
    width: "18vw"
  },
  slogan: {
    background: "yellow",
    height: "30vh",
    width: "18vw"
  },
  info: {
    height: "85vh",
    width: "33vw"
  },
  settings: {
    background: "green",
    height: "42.5vh",
    width: "33vw"
  },
  goals: {
    background: "grey",
    height: "42.5vh",
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

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      country: "",
      region: ""
    };
  }

  getRegions = country => {
    if (!country) {
      return [];
    }
    return country[2].split("|").map(regionPair => {
      let [regionName, regionShortCode = null] = regionPair.split("~");
      return regionName;
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.left}>
          <Paper className={classes.profile}>
            <h1>Your Profile</h1>
            <h2>Profile Image</h2>
            <h2>Name</h2>
            <h2>Some Kind of info</h2>
            <h2>Upload new avatar</h2>
            <h2>Delete Account</h2>
          </Paper>
          <Paper className={classes.slogan}>
            <h2>Your Slogan</h2>
            <h2>The slogan itself</h2>
          </Paper>
        </div>
        <Paper className={classes.info}>
          <h1>Edit Your Personal Information</h1>
          <Divider variant="middle" />
          <div className={classes.input}>
            <h2>Full Name</h2>
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Hello World"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div className={classes.input}>
            <h2>Title</h2>
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Hello World"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </div>
          <div className={classes.input}>
            <h2>Email</h2>
            <TextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Hello World"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </div>
          <Divider variant="middle" />
          <h2>Birthday</h2>
          <FormControl className={classes.formControl}>
            <Select
              value=""
              onChange={this.handleChange}
              displayEmpty
              name="age"
              className={classes.selectEmpty}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <FormHelperText>Day</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <Select
              value=""
              onChange={this.handleChange}
              displayEmpty
              name="age"
              className={classes.selectEmpty}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <FormHelperText>Month</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <Select
              value=""
              onChange={this.handleChange}
              displayEmpty
              name="age"
              className={classes.selectEmpty}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
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
              <h2>State</h2>
              <FormControl className={classes.formControl}>
                <Select
                  value={this.state.state}
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
          <div className={classes.location}>
            <div className={classes.country}>
              <h2>Postal Code</h2>
              <FormControl className={classes.formControl}>
                <Select
                  value=""
                  onChange={this.handleChange}
                  displayEmpty
                  name="age"
                  className={classes.selectEmpty}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>Year</FormHelperText>
              </FormControl>
            </div>
            <div className={classes.state}>
              <h2>Phone Number</h2>
              <FormControl className={classes.formControl}>
                <Select
                  value=""
                  onChange={this.handleChange}
                  displayEmpty
                  name="age"
                  className={classes.selectEmpty}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>Year</FormHelperText>
              </FormControl>
            </div>
          </div>
          <Divider variant="middle" />
          <button>Update Information</button>
        </Paper>
        <div className={classes.right}>
          <Paper className={classes.settings}>Personal Settings</Paper>
          <Paper className={classes.goals}>Your goals</Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Profile);
