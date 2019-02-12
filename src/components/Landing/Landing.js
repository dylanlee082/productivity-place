import React, { Component } from "react";
import axios from "axios";
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

  handleLogin = () => {
    axios
      .post("/auth/login", this.state)
      .then(res => {
        this.props.history.push("/main");
        this.props.getUser();
      })
      .catch(err => console.log(err));
  };

  handleRegister = () => {
    axios
      .post("/auth/register", {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        this.props.history.push("/");
        this.props.getUser();
      })
      .catch(err => console.log(err));
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="root">
        <header>
          <h1>Productivity Place</h1>
          <nav>
            <button>Pricing</button>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              onChange={e => this.handleChange(e)}
            />
            <label>Password:</label>
            <input
              type="password"
              name="password"
              onChange={e => this.handleChange(e)}
            />
            <button onClick={() => this.handleLogin()}>Login</button>
            <button onClick={() => this.handleRegister()}>Register</button>
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
