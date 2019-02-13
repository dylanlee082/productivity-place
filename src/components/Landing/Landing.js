import React, { Component } from "react";
import Login from "./Login";
import { connect } from "react-redux";
import { getUser } from "../../ducks/reducer";
import "./Landing.module.css";

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  render() {
    return (
      <div className="root">
        <header>
          <h1>Productivity Place</h1>
          <nav>
            <button>Pricing</button>
            <Login />
          </nav>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getUser }
)(Landing);
