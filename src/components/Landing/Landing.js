import React, { Component } from "react";
import "./Landing.module.css";

class Landing extends Component {
  handleClick = () => {
    this.props.history.push("/main");
  };

  render() {
    return (
      <div className="root">
        <header>
          <h1>Productivity Place</h1>
          <nav>
            <button>Pricing</button>
            <button onClick={() => this.handleClick()}>Login</button>
          </nav>
        </header>
      </div>
    );
  }
}

export default Landing;
