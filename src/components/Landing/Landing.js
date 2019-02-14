import React, { Component } from "react";
import Typed from "typed.js";
import Login from "./Login";
import { connect } from "react-redux";
import { getUser } from "../../ducks/reducer";
import styles from "./Landing.module.css";
import picture1 from "../../imgs/alarm-clock-calendar-close-up-908298.jpg";
import picture2 from "../../imgs/background-cellphone-close-up-1376863 (1).jpg";

class Landing extends Component {
  componentDidMount = () => {
    this.typing();
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
      loop: true,
      loopCount: Infinity,
      fadeOut: true,
      fadeOutClass: styles.typedfadeout,
      fadeOutDelay: 1000
    });
  };

  render() {
    return (
      <div className="root">
        <header className={styles.header}>
          <h1>Productivity Place</h1>
          <nav className={styles.nav}>
            <button className={styles.button}>Pricing</button>
            <Login />
          </nav>
        </header>
        <div className={styles.body}>
          <div className={styles.overlay}>
            <span id="innerOverlay" className={styles.text} />
          </div>
          <img className={styles.img1} src={picture1} alt="main pic" />
          {/* <img className={styles.img1} src={picture2} alt="main pic" /> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getUser }
)(Landing);
