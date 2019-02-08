import React, { Component } from "react";
import "./App.css";
import routes from "./routes";

class App extends Component {
  render(props) {
    return <div className="App">{routes}</div>;
  }
}

export default App;
