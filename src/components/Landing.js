import React, { Component } from "react";

class Landing extends Component {
  handleClick = () => {
    this.props.history.push("/main");
  };

  render() {
    return (
      <div>
        <h1>Landing</h1>
        <button onClick={() => this.handleClick()}>Login</button>
      </div>
    );
  }
}

export default Landing;
