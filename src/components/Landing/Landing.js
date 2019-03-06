import React, { Component } from "react";
import Typed from "typed.js";
import Login from "./Login";
import { connect } from "react-redux";
import { getUser, loginFormToggle } from "../../ducks/reducer";
import styles from "./Landing.module.css";
import picture1 from "../../imgs/alarm-clock-calendar-close-up-908298.jpg";
import LibraryBooks from "@material-ui/icons/LibraryBooks";

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      page: ""
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

  typing = () => {
    this.typed = new Typed("#innerOverlay", {
      strings: [
        "Do you want to change your life?",
        "Do you want to stop wasting your time?",
        "Do you want to be more productive without all the clutter?"
      ],
      typeSpeed: 50,
      startDelay: 500,
      fadeOut: true,
      fadeOutClass: styles.typedfadeout,
      fadeOutDelay: 1000,
      onComplete: self => {
        this.timer = setTimeout(
          () => (this.mounted && this.typed.destroy()) || null,
          1500
        );
      },
      onDestroy: self => {
        this.setState({
          page: (
            <div className={styles.finalPage}>
              <div className={styles.left}>
                <h1>Welcome to the Productivity Place</h1>
                <p>
                  Here you will be able to make the most of your time in your
                  daily life and be more effective in the tasks you have before
                  you!
                </p>
                <button
                  onClick={() => this.props.loginFormToggle(this.props.open)}
                  className={styles.mainBtn}
                >
                  Click here to sign up now!
                </button>
              </div>
              <div className={styles.right}>
                <div className={styles.register}>
                  <h1>Username</h1>
                  <input />
                  <h1>Password</h1>
                  <input />
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

const mapStateToProps = state => {
  return {
    open: state.loginForm
  };
};

export default connect(
  mapStateToProps,
  { getUser, loginFormToggle }
)(Landing);
