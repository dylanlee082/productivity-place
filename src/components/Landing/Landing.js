//This is the landing page for the site, when the user visits the site on a laptop/desktop this is what they will be greated with

//Main NPM Imports
import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getUser } from "../../ducks/reducers/generalReducer";
import Typed from "typed.js";

//Material-UI Core Imports
import { withStyles } from "@material-ui/core";
import picture1 from "../../imgs/alarm-clock-calendar-close-up-908298.jpg";
import TextField from "@material-ui/core/TextField";

//Material-UI Icon Imports
import LibraryBooks from "@material-ui/icons/LibraryBooks";

//Other Components
import styles from "./Landing.module.css";
import Login from "./Login";

//Material-UI Styling
const styled = theme => ({});

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      page: "",
      username: "",
      password: "",
      number: "",
      email: ""
    };
  }

  componentDidMount = () => {
    this.mounted = true;
    this.typing();
  };

  componentWillUnmount = () => {
    this.mounted = false;
    clearTimeout(this.timer);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //Register
  handleRegister = () => {
    axios
      .post("/auth/register", this.state)
      .then(res => {
        this.props.history.push("/main/tasks");
        this.props.getUser();
      })
      .catch(err => console.log(err));
  };

  //This renders the typing animation when the page first loads
  typing = () => {
    this.typed = new Typed("#innerOverlay", {
      strings: [
        "Do you want to change your life?",
        "Do you want to stop wasting your time?",
        "Do you want to be more productive without all the clutter?"
      ],
      typeSpeed: 50, //50
      startDelay: 500,
      fadeOut: true,
      fadeOutClass: styles.typedfadeout,
      fadeOutDelay: 1000, //1000
      onComplete: self => {
        this.timer = setTimeout(
          () => (this.mounted && this.typed.destroy()) || null,
          1500
        );
      },
      //This runs after all of the typing animation is complete
      onDestroy: self => {
        const { classes } = this.props;
        this.setState({
          page: (
            <div className={styles.finalPage}>
              <div className={styles.left}>
                <h1 className={styles.mainHeader}>
                  Welcome to the Productivity Place
                </h1>
                <p className={styles.mainParagraph}>
                  Here you will be able to make the most of your time in your
                  daily life and be more effective in the tasks you have before
                  you!
                </p>
              </div>
              <div className={styles.right}>
                <div className={styles.register}>
                  <h1>Sign Up Now!</h1>
                  <TextField
                    label="Username"
                    className={classes.textField}
                    type="text"
                    name="username"
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.handleChange(e)}
                  />
                  <TextField
                    label="Password"
                    className={classes.textField}
                    type="password"
                    name="password"
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.handleChange(e)}
                  />
                  <TextField
                    label="Phone"
                    className={classes.textField}
                    type="text"
                    name="number"
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.handleChange(e)}
                  />
                  <TextField
                    label="Email"
                    className={classes.textField}
                    type="text"
                    name="email"
                    margin="normal"
                    variant="outlined"
                    onChange={e => this.handleChange(e)}
                  />
                  <button
                    className={styles.mainBtn}
                    onClick={() => this.handleRegister()}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          )
        });
      }
    });
  };

  render() {
    return (
      <div className="root">
        <header className={styles.header}>
          <div className={styles.logo}>
            <h1>Productivity Place</h1>
            <LibraryBooks />
          </div>
          <nav className={styles.nav}>
            <Login />
          </nav>
        </header>
        <div className={styles.body}>
          <div className={styles.overlay}>
            <span id="innerOverlay" className={styles.text}>
              {this.state.page}
            </span>
          </div>
          <img className={styles.img1} src={picture1} alt="main pic" />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { getUser }
)(withStyles(styled)(Landing));
